import asyncio
from openai import OpenAI
from langsmith import traceable
from langsmith.wrappers import wrap_openai
openai_client = wrap_openai(OpenAI())

def retriever(query: str):
    results = ["Harrison worked at Kensho"]
    return results

@traceable
async def rag(question):
    docs = await retriever(question)
    system_message = """Answer the users question using only the provided information below:
        {docs}""".format(docs="\n".join(docs))

    return openai_client.chat.completions.create(
        messages=[
            {"role": "system", "content": system_message},
            {"role": "user", "content": question},
        ],
        model="gpt-4.1-mini",
    )