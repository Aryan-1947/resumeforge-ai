from agents.cover_letter_agent import generate_cover_letter


resume_text = """
Worked on machine learning models using Python.
Created data analysis projects.
"""

job_description = """
We are looking for a Machine Learning Engineer
with Python, TensorFlow, SQL, and Docker skills.
"""


resume_skills = [
    "python",
    "machine learning",
    "tensorflow",
    "sql"
]

result = generate_cover_letter(
    resume_text,
    job_description,
    resume_skills
)

print(result)
