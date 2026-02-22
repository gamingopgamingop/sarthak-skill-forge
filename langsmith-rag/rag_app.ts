// @ts-ignore
// @ts-nocheck

import { OpenAI } from "openai";
const openAIClient = new OpenAI();

// This is the retriever we will use in RAG
// This is mocked out, but it could be anything we want
async function retriever(query: string) {
  return ["This is a document"];
}

// This is the end-to-end RAG chain.
// It does a retrieval step then calls OpenAI
async function rag(question: string) {
  const docs = await retriever(question);

  const systemMessage =
    "Answer the users question using only the provided information below:\n\n" +
    docs.join("\n");

  return await openAIClient.chat.completions.create({
    messages: [
      { role: "system", content: systemMessage },
      { role: "user", content: question },
    ],
    model: "gpt-4.1-mini",
  });
}