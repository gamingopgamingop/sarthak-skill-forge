import weaviate from 'weaviate-client'
import { EventConfig, Handlers } from 'motia'
import { z } from 'zod'
 
const ChunkSchema = z.object({
  text: z.string(),
  title: z.string(),
  source: z.string(),
  page: z.number(),
  chunk_id: z.string(),
})
 
export const config: EventConfig = {
  type: 'event',
  name: 'load-weaviate',
  subscribes: ['rag.load.weaviate'],
  emits: [],
  flows: ['rag-workflow'],
  input: z.object({
    chunks: z.array(ChunkSchema),
    streamId: z.string().optional(),
    totalFiles: z.number().optional(),
    totalChunks: z.number().optional(),
  }),
}
 
export const handler: Handlers['load-weaviate'] = async (input, { logger }) => {
  const { chunks, streamId, totalFiles, totalChunks } = input
  
  logger.info('Loading chunks into Weaviate', { 
    chunkCount: chunks.length,
    totalFiles,
    totalChunks,
    streamId 
  })
 
  const client = await weaviate.connectToWeaviateCloud(process.env.WEAVIATE_URL!, {
    authCredentials: new weaviate.ApiKey(process.env.WEAVIATE_API_KEY!),
    headers: { 'X-OpenAI-Api-Key': process.env.OPENAI_API_KEY! },
  })
 
  try {
    const collection = client.collections.get('Books')
    const BATCH_SIZE = 100
 
    // Process chunks in batches for optimal performance
    for (let i = 0; i < chunks.length; i += BATCH_SIZE) {
      const batch = chunks.slice(i, i + BATCH_SIZE)
      const batchNumber = Math.floor(i / BATCH_SIZE) + 1
      const totalBatches = Math.ceil(chunks.length / BATCH_SIZE)
 
      logger.info(`Inserting batch ${batchNumber}/${totalBatches}`, {
        batchSize: batch.length,
        streamId
      })
 
      const objects = batch.map(chunk => ({
        properties: {
          text: chunk.text,
          title: chunk.title,
          source: chunk.source,
          page: chunk.page,
        }
      }))
 
      const result = await collection.data.insertMany(objects)
      
      if (result.hasErrors) {
        logger.error('Batch insertion had errors', { 
          errors: result.errors,
          batchNumber,
          streamId 
        })
      } else {
        logger.info(`Successfully inserted batch ${batchNumber}/${totalBatches}`)
      }
    }
 
    logger.info('Successfully loaded all chunks into Weaviate', {
      totalChunks: chunks.length,
      streamId
    })
 
  } catch (error) {
    logger.error('Error loading chunks into Weaviate', { error, streamId })
    throw error
  } finally {
    await client.close()
  }
}