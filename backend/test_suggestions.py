from agents.suggestion_agent import generate_suggestions


ats_score = 50

matched_skills = [
    "python",
    "tensorflow",
    "sql",
    "machine learning"
]

missing_skills = [
    "docker",
    "aws",
    "fastapi",
    "data analysis"
]

parsed_resume = {
    "skills": [
        "python",
        "tensorflow",
        "sql",
        "machine learning"
    ]
}

parsed_jd = {
    "role": "machine learning engineer"
}


result = generate_suggestions(
    ats_score,
    matched_skills,
    missing_skills,
    parsed_resume,
    parsed_jd
)

print(result)