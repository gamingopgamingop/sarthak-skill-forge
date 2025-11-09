import { readdir } from 'fs/promises'
import { join, resolve, basename } from 'path'
import { EventConfig, Handlers } from 'motia'
import { z } from 'zod'
 
export const config: EventConfig = {
  type: 'event',
  name: 'read-pdfs',
  flows: ['rag-workflow'],
  subscribes: ['rag.read.pdfs'],
  emits: [{ topic: 'rag.process.pdfs', label: 'Start processing PDFs' }],
  input: z.object({
    folderPath: z.string(),
    streamId: z.string().optional(),
  }),
}
 
export const handler: Handlers['read-pdfs'] = async (input, { emit, logger }) => {
  const { folderPath: inputFolderPath, streamId } = input
  logger.info(`Reading PDFs from folder: ${inputFolderPath}`)
 
  // Intelligent path resolution to prevent ENOENT errors
  const currentDirName = basename(process.cwd())
  let resolvedFolderPath = resolve(inputFolderPath)
 
  // Handle duplicated path segments
  const duplicatedSegment = `${currentDirName}/${currentDirName}`
  if (resolvedFolderPath.includes(duplicatedSegment)) {
    resolvedFolderPath = resolvedFolderPath.replace(duplicatedSegment, currentDirName)
  }
 
  logger.info(`Resolved folder path: ${resolvedFolderPath}`)
 
  try {
    const files = await readdir(resolvedFolderPath)
    const pdfFiles = files.filter((file) => file.endsWith('.pdf'))
 
    logger.info(`Found ${pdfFiles.length} PDF files`)
 
    const filesInfo = await Promise.all(
      pdfFiles.map(async (pdfFile) => {
        const filePath = join(resolvedFolderPath, pdfFile)
        return {
          filePath,
          fileName: pdfFile,
        }
      })
    )
 
    await emit({
      topic: 'rag.process.pdfs',
      data: { files: filesInfo, streamId },
    })
  } catch (error) {
    logger.error(`Failed to read PDFs from folder: ${resolvedFolderPath}`, { error })
    throw error
  }
}