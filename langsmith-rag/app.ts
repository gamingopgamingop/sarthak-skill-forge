// @ts-ignore
// @ts-nocheck
import "dotenv/config";
import { wrapOpenAI, traceable } from "langsmith/wrappers";
import OpenAI from "openai";

// Minimal example retriever
function retriever(query: string): string[] {
    return ["Harrison worked at Kensho"];
}
//
// OpenAI client call
const client = new OpenAI();
//
// Wrap the OpenAI client with LangSmith
const wrappedClient = wrapOpenAI(client);
//
const rag = traceable(async (question: string) => {
    const docs = retriever(question);
    const systemMessage =
        "Answer the user's question using only the provided information below:\n" +
        docs.join("\n");
//
    const resp = await wrappedClient.chat.completions.create({
        model: "gpt-4.1-mini",
        messages: [
            { role: "system", content: systemMessage },
            { role: "user", content: question },
        ],
    });
//
    return resp.choices[0].message?.content;
});
//
(async () => {
  console.log(await rag("Where did Harrison work?"));
})();
