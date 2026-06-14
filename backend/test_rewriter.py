from agents.resume_rewriter_agent import rewrite_resume


resume_text = """
Worked on machine learning models using Python.
Created data analysis projects.
"""

job_description = """
We are looking for a Machine Learning Engineer
with Python, TensorFlow, Docker, AWS, and SQL skills.
"""

missing_skills = [
    "docker",
    "aws",
    "tensorflow"
]


result = rewrite_resume(
    resume_text,
    job_description,
    missing_skills
)

print(result)