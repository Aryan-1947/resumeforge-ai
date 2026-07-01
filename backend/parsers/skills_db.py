# Shared skills database used by both resume and JD parsers

SKILLS_DB = [
    # Languages
    "python", "java", "c++", "c#", "javascript", "typescript",
    "go", "rust", "kotlin", "swift", "php", "ruby", "scala", "r",

    # Frontend
    "react", "vue", "angular", "next.js", "html", "css",
    "tailwind", "bootstrap", "redux", "webpack",

    # Backend
    "fastapi", "flask", "django", "node.js", "express",
    "spring", "laravel", "rails", "graphql", "rest api",

    # Databases
    "sql", "postgresql", "mysql", "mongodb", "redis",
    "elasticsearch", "cassandra", "firebase", "sqlite",

    # ML / AI
    "machine learning", "deep learning", "tensorflow", "pytorch",
    "keras", "scikit-learn", "nlp", "computer vision",
    "langchain", "openai", "hugging face", "llm",

    # Data
    "pandas", "numpy", "matplotlib", "seaborn", "tableau",
    "power bi", "excel", "hadoop", "spark", "kafka",
    "data analysis", "data engineering", "etl",

    # DevOps / Cloud
    "docker", "kubernetes", "aws", "azure", "gcp",
    "terraform", "jenkins", "github actions", "ci/cd",
    "linux", "nginx", "ansible",

    # Tools
    "git", "github", "jira", "figma", "postman",
    "opencv", "opencv", "selenium", "pytest",

    # Mobile
    "flutter", "react native", "android", "ios",
]

# Remove duplicates while preserving order
SKILLS_DB = list(dict.fromkeys(SKILLS_DB))