from agents.llm_setup import llm


response = llm.invoke(
    "Rewrite this professionally: Worked on machine learning models."
)

print(response.content)