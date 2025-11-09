import weaviate, { WeaviateClient, vectorizer, generative } from 'weaviate-client'
import { EventConfig, Handlers } from 'motia'
import { z } from 'zod'
 
export const config: EventConfig = {
  type: 'event',
  name: 'init-weaviate',
  subscribes: ['rag.read.pdfs'],
  emits: [],
  flows: ['rag-workflow'],
  input: z.object({
    folderPath: z.string(),
    streamId: z.string().optional(),
  }),
}
 
const WEAVIATE_SCHEMA = {
  name: 'Books',
  description: 'Document chunks with metadata',
  vectorizers: vectorizer.text2VecOpenAI({
    model: 'text-embedding-3-small',
    sourceProperties: ['text'],
  }),
  generative: generative.openAI({
    model: 'gpt-4o',
    maxTokens: 4096,
  }),
  properties: [
    { name: 'text', dataType: 'text' as const },
    { name: 'title', dataType: 'text' as const },
    { name: 'source', dataType: 'text' as const },
    { name: 'page', dataType: 'number' as const },
  ],
}
 
export const handler: Handlers['init-weaviate'] = async (input, { logger }) => {
  logger.info('Initializing Weaviate client')
  
  const client = await weaviate.connectToWeaviateCloud(process.env.WEAVIATE_URL!, {
    authCredentials: new weaviate.ApiKey(process.env.WEAVIATE_API_KEY!),
    headers: { 'X-OpenAI-Api-Key': process.env.OPENAI_API_KEY! },
  })
 
  try {
    const exists = await client.collections.get('Books').exists()
    if (!exists) {
      logger.info('Creating Books collection with OpenAI integration...')
      await client.collections.create(WEAVIATE_SCHEMA)
      logger.info('Collection created successfully')
    } else {
      logger.info('Books collection already exists')
    }
  } catch (error) {
    logger.error('Error initializing Weaviate', { error })
    throw error
  } finally {
    await client.close()
  }
}