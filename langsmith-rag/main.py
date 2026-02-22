from openai import OpenAI
import uuid
from langsmith.wrappers import wrap_openai
openai_client = wrap_openai(OpenAI())
from rag_module import rag

# This is the retriever we will use in RAG
# This is mocked out, but it could be anything we want
async def retriever(query: str):
    results = ["Harrison worked at Kensho"]
    return results
# Generate a unique run_id
run_id = str(uuid.uuid7())

# Call the RAG function with langsmith_extra
response =  rag(
    "Where did Harrison work?",
    langsmith_extra={"run_id": run_id}  # <-- THIS is where you add it
)

print(response)


# This is the end-to-end RAG chain.
# It does a retrieval step then calls OpenAI
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