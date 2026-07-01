import re
import spacy


nlp = spacy.load("en_core_web_sm")


#
SECTION_HEADERS = {

    "skills": [
        "skills",
        "technical skills",
        "core competencies"
    ],

    "experience": [
        "experience",
        "work experience",
        "employment",
        "internship",
        "internships"
    ],

    "projects": [
        "projects",
        "personal projects",
        "academic projects"
    ],

    "education": [
        "education",
        "academic background",
        "qualifications"
    ],

    "certifications": [
        "certifications",
        "licenses"
    ],

    "summary": [
        "summary",
        "profile",
        "about"
    ]
}


# -----------------------------
# SKILLS DATABASE
# -----------------------------

from parsers.skills_db import SKILLS_DB



#
def detect_resume_sections(text):

    lines = text.split("\n")

    sections = {}

    current_section = "other"

    sections[current_section] = []

    for line in lines:

        cleaned_line = line.strip().lower()

        found_section = None

        # -----------------------------------
        # MATCH SECTION HEADERS
        # -----------------------------------

        for section_name, keywords in SECTION_HEADERS.items():

            if cleaned_line in keywords:

                found_section = section_name

                break

        # -----------------------------------
        # START NEW SECTION
        # -----------------------------------

        if found_section:

            current_section = found_section

            if current_section not in sections:

                sections[current_section] = []

        else:

            sections[current_section].append(line)

    # -----------------------------------
    # JOIN LINES
    # -----------------------------------

    for section in sections:

        sections[section] = "\n".join(sections[section]).strip()

    return sections




# -----------------------------
# EMAIL EXTRACTION
# -----------------------------

def extract_email(text):

    pattern = r"[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+"

    matches = re.findall(pattern, text)

    return matches[0] if matches else None


# -----------------------------
# PHONE EXTRACTION
# -----------------------------

def extract_phone(text):

    pattern = r"(\+?\d[\d\s\-]{8,15}\d)"

    matches = re.findall(pattern, text)

    return matches[0] if matches else None


# -----------------------------
# SKILLS EXTRACTION
# -----------------------------

def extract_skills(text):

    text = text.lower()

    found_skills = []

    for skill in SKILLS_DB:
        if skill.lower() in text:
            found_skills.append(skill)

    return list(set(found_skills))


# -----------------------------
# EDUCATION EXTRACTION
# -----------------------------

def extract_education(text):

    education_keywords = [
        "b.tech",
        "bachelor",
        "master",
        "m.tech",
        "b.sc",
        "m.sc",
        "phd",
        "university",
        "college"
    ]

    lines = text.split("\n")

    education = []

    for line in lines:
        for keyword in education_keywords:
            if keyword.lower() in line.lower():
                education.append(line.strip())

    return list(set(education))


# -----------------------------
# EXPERIENCE EXTRACTION
# -----------------------------

def extract_experience(text):

    experience_keywords = [
        "experience",
        "intern",
        "worked",
        "developer",
        "engineer",
        "research"
    ]

    lines = text.split("\n")

    experience = []

    for line in lines:
        for keyword in experience_keywords:
            if keyword.lower() in line.lower():
                experience.append(line.strip())

    return list(set(experience))


# -----------------------------
# PROJECT EXTRACTION
# -----------------------------

def extract_projects(text):

    project_keywords = [
        "project",
        "developed",
        "built",
        "created",
        "implemented"
    ]

    lines = text.split("\n")

    projects = []

    for line in lines:
        for keyword in project_keywords:
            if keyword.lower() in line.lower():
                projects.append(line.strip())

    return list(set(projects))




#
def analyze_experience_intelligence(text):

    text_lower = text.lower()

    intelligence = {

        "experience_level": "unknown",

        "has_internship": False,

        "has_leadership": False,

        "project_complexity": "basic",

        "technical_density": "low"
    }

    # -----------------------------------
    # EXPERIENCE LEVEL DETECTION
    # -----------------------------------

    experience_patterns = [
        r"(\d+)\+?\s+years",
        r"(\d+)\+?\s+yrs"
    ]

    years_found = 0

    for pattern in experience_patterns:

        matches = re.findall(pattern, text_lower)

        if matches:

            years_found = max([
                int(x) for x in matches
            ])

    if years_found >= 5:

        intelligence["experience_level"] = "senior"

    elif years_found >= 2:

        intelligence["experience_level"] = "mid-level"

    elif years_found >= 0:

        intelligence["experience_level"] = "fresher"

    # -----------------------------------
    # INTERNSHIP DETECTION
    # -----------------------------------

    internship_keywords = [
        "intern",
        "internship",
        "trainee"
    ]

    if any(
        keyword in text_lower
        for keyword in internship_keywords
    ):

        intelligence["has_internship"] = True

    # -----------------------------------
    # LEADERSHIP DETECTION
    # -----------------------------------

    leadership_keywords = [
        "led",
        "managed",
        "mentor",
        "leadership",
        "team lead",
        "coordinated"
    ]

    if any(
        keyword in text_lower
        for keyword in leadership_keywords
    ):

        intelligence["has_leadership"] = True

    # -----------------------------------
    # PROJECT COMPLEXITY
    # -----------------------------------

    advanced_project_keywords = [
        "deployment",
        "scalable",
        "microservices",
        "optimization",
        "pipeline",
        "transformer",
        "distributed",
        "real-time"
    ]

    advanced_count = sum(
        keyword in text_lower
        for keyword in advanced_project_keywords
    )

    if advanced_count >= 4:

        intelligence["project_complexity"] = "advanced"

    elif advanced_count >= 2:

        intelligence["project_complexity"] = "intermediate"

    # -----------------------------------
    # TECHNICAL DENSITY
    # -----------------------------------

    skill_count = len(extract_skills(text))

    if skill_count >= 12:

        intelligence["technical_density"] = "high"

    elif skill_count >= 6:

        intelligence["technical_density"] = "medium"

    return intelligence




#
# -----------------------------------
# CANDIDATE PROFILE INTELLIGENCE
# -----------------------------------

def analyze_candidate_profile(text):

    text_lower = text.lower()

    profile = {

        "primary_domain": "general",

        "secondary_domain": None,

        "deployment_exposure": False,

        "research_orientation": False,

        "full_stack_capability": False,

        "ml_focus": False
    }

    # -----------------------------------
    # DOMAIN KEYWORDS
    # -----------------------------------

    backend_keywords = [
        "fastapi",
        "django",
        "flask",
        "node.js",
        "mongodb",
        "sql",
        "api",
        "backend"
    ]

    frontend_keywords = [
        "react",
        "frontend",
        "javascript",
        "html",
        "css",
        "tailwind"
    ]

    ml_keywords = [
        "machine learning",
        "deep learning",
        "tensorflow",
        "pytorch",
        "nlp",
        "computer vision",
        "transformer"
    ]

    devops_keywords = [
        "docker",
        "kubernetes",
        "aws",
        "deployment",
        "ci/cd"
    ]

    research_keywords = [
        "research",
        "paper",
        "publication",
        "transformer",
        "optimization"
    ]

    # -----------------------------------
    # DOMAIN SCORING
    # -----------------------------------

    backend_score = sum(
        keyword in text_lower
        for keyword in backend_keywords
    )

    frontend_score = sum(
        keyword in text_lower
        for keyword in frontend_keywords
    )

    ml_score = sum(
        keyword in text_lower
        for keyword in ml_keywords
    )

    devops_score = sum(
        keyword in text_lower
        for keyword in devops_keywords
    )

    research_score = sum(
        keyword in text_lower
        for keyword in research_keywords
    )

    domain_scores = {

        "backend": backend_score,

        "frontend": frontend_score,

        "machine_learning": ml_score,

        "devops": devops_score
    }

    sorted_domains = sorted(
        domain_scores.items(),
        key=lambda x: x[1],
        reverse=True
    )

    if sorted_domains[0][1] > 0:

        profile["primary_domain"] = (
            sorted_domains[0][0]
        )

    if sorted_domains[1][1] > 0:

        profile["secondary_domain"] = (
            sorted_domains[1][0]
        )

    # -----------------------------------
    # DEPLOYMENT EXPOSURE
    # -----------------------------------

    if devops_score >= 2:

        profile["deployment_exposure"] = True

    # -----------------------------------
    # RESEARCH ORIENTATION
    # -----------------------------------

    if research_score >= 2:

        profile["research_orientation"] = True

    # -----------------------------------
    # FULL STACK DETECTION
    # -----------------------------------

    if (
        backend_score >= 2
        and
        frontend_score >= 2
    ):

        profile["full_stack_capability"] = True

    # -----------------------------------
    # ML FOCUS
    # -----------------------------------

    if ml_score >= 3:

        profile["ml_focus"] = True

    return profile






# -----------------------------
# MAIN PARSER
# -----------------------------

def parse_resume(text):

    sections = detect_resume_sections(text)
    experience_intelligence = analyze_experience_intelligence(text)
    candidate_profile = analyze_candidate_profile(text)

    parsed_data = {

        "email": extract_email(text),

        "phone": extract_phone(text),

        "skills": extract_skills(text),

        "education": extract_education(
            sections.get("education", text)
        ),

        "experience": extract_experience(
            sections.get("experience", text)
        ),

        "projects": extract_projects(
            sections.get("projects", text)
        ),

        "experience_intelligence": experience_intelligence,

        "candidate_profile": candidate_profile,
    
        "sections": sections
    }

    return parsed_data