// @ts-ignore
// @ts-nocheck

import { OpenAI } from "openai";
import { traceable } from "langsmith/traceable";
import { wrapOpenAI } from "langsmith/wrappers";
const openAIClient = wrapOpenAI(new OpenAI());

async function retriever(query: string) {
  return ["This is a document"];
}

const rag = traceable(async function rag(question: string) {
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
});