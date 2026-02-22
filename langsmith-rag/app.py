from openai import OpenAI
from langsmith.wrappers import wrap_openai  # traces openai calls
from langsmith import traceable

async def retriever(query: str):
    # Minimal example retriever
    return ["Harrison worked at Kensho"]

client = wrapOpenAI(OpenAI())

@traceable
async def rag(question: str) -> str:
    docs = await retriever(question)
    system_message = (
        "Answer the user's question using only the provided information below:\n"
        + "\n".join(docs)
    )

    # This call is not traced yet
    resp = await client.chat.completions.create(
        model="gpt-4.1-mini",
        messages=[
            {"role": "system", "content": system_message},
            {"role": "user", "content": question},
        ],
    )
    return resp.choices[0].message.content

if __name__ == "__main__":
    print(rag("Where did Harrison work?").result)