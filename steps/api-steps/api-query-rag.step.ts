import weaviate from 'weaviate-client'
import { Handlers } from 'motia'
import { z } from 'zod'
 
const RAGResponse = z.object({
  answer: z.string(),
  chunks: z.array(z.object({
    text: z.string(),
    title: z.string(),
    source: z.string(),
    page: z.number(),
  })),
  query: z.string(),
  timestamp: z.string(),
})
 
export const config = {
  type: 'api',
  name: 'api-query-rag',
  description: 'Query the RAG system for answers',
  path: '/api/rag/query',
  method: 'POST',
  emits: [],
  bodySchema: z.object({
    query: z.string().min(1, 'Query is required'),
    limit: z.number().min(1).max(10).default(3),
  }),
  flows: ['rag-workflow'],
} as const
 
export const handler: Handlers['api-query-rag'] = async (req, { logger }) => {
  const { query, limit = 3 } = req.body
 
  logger.info('Processing RAG query', { query, limit })
 
  const client = await weaviate.connectToWeaviateCloud(process.env.WEAVIATE_URL!, {
    authCredentials: new weaviate.ApiKey(process.env.WEAVIATE_API_KEY!),
    headers: { 'X-OpenAI-Api-Key': process.env.OPENAI_API_KEY! },
  })
 
  try {
    const collection = client.collections.get('Books')
    
    // Perform semantic search with AI generation
    const results = await collection.generate.nearText(
      query,
      { limit, distance: 0.6 },
      { 
        singlePrompt: `Answer this question based on the provided context: ${query}. 
                      Be specific and cite the sources when possible.` 
      }
    )
 
    // Extract the generated answer and source chunks
    const generatedAnswer = results.generated || 'No answer could be generated.'
    
    const chunks = results.objects.map(obj => ({
      text: obj.properties.text as string,
      title: obj.properties.title as string,
      source: obj.properties.source as string,
      page: obj.properties.page as number,
    }))
 
    const response = RAGResponse.parse({
      answer: generatedAnswer,
      chunks,
      query,
      timestamp: new Date().toISOString(),
    })
 
    logger.info('RAG query completed successfully', { 
      query, 
      chunksFound: chunks.length,
      answerLength: generatedAnswer.length 
    })
 
    return {
      status: 200,
      body: response,
    }
 
  } catch (error) {
    logger.error('Error processing RAG query', { error, query })
    return {
      status: 500,
      body: { error: 'Failed to process query' },
    }
  } finally {
    await client.close()
  }
}