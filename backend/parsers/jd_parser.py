import re


# -----------------------------
# SKILLS DATABASE
# -----------------------------

from parsers.skills_db import SKILLS_DB


# -----------------------------
# SOFT SKILLS
# -----------------------------

SOFT_SKILLS = [
    "communication",
    "leadership",
    "teamwork",
    "problem solving",
    "critical thinking",
    "collaboration",
    "time management"
]


# -----------------------------
# ROLE KEYWORDS
# -----------------------------

ROLE_KEYWORDS = [
    "data scientist",
    "machine learning engineer",
    "backend developer",
    "ai engineer",
    "software engineer",
    "frontend developer",
    "full stack developer",
    "devops engineer",
    "cloud engineer",
    "data engineer",
    "ios developer",
    "android developer",
    "qa engineer",
    "security engineer",
    "product manager",
]




#
ACTION_VERBS = [

    "develop",
    "build",
    "design",
    "implement",
    "collaborate",
    "maintain",
    "optimize",
    "deploy",
    "analyze",
    "create",
    "improve",
    "manage",
    "lead",
    "research",
    "train",
    "evaluate",
    "integrate",
    "automate",
    "monitor",
    "architect"
]





# -----------------------------
# EXPERIENCE LEVEL
# -----------------------------

EXPERIENCE_LEVELS = {
    "entry-level": ["0-1", "fresher", "junior"],
    "mid-level": ["2+", "3+", "mid-level"],
    "senior-level": ["5+", "senior", "lead"]
}


# -----------------------------
# REQUIRED SKILLS
# -----------------------------

def extract_required_skills(text):

    text = text.lower()

    found_skills = []

    for skill in SKILLS_DB:
        if skill.lower() in text:
            found_skills.append(skill)

    return list(set(found_skills))




#
def extract_weighted_skills(text):

    text_lower = text.lower()

    weighted_skills = {}

    for skill in SKILLS_DB:

        pattern = re.escape(skill.lower())

        matches = re.findall(pattern, text_lower)

        frequency = len(matches)

        if frequency > 0:

            # -----------------------------------
            # WEIGHT CALCULATION
            # -----------------------------------

            if frequency >= 5:

                priority = "high"

            elif frequency >= 2:

                priority = "medium"

            else:

                priority = "low"

            weighted_skills[skill] = {

                "frequency": frequency,

                "priority": priority
            }

    return weighted_skills




#
def analyze_jd_intelligence(text):

    text_lower = text.lower()

    intelligence = {

        "ai_heavy_role": False,

        "backend_heavy_role": False,

        "cloud_heavy_role": False,

        "research_oriented": False,

        "deployment_focused": False,

        "leadership_role": False
    }

    # -----------------------------------
    # AI / ML DETECTION
    # -----------------------------------

    ai_keywords = [
        "machine learning",
        "deep learning",
        "nlp",
        "computer vision",
        "tensorflow",
        "pytorch",
        "llm",
        "artificial intelligence"
    ]

    if any(
        keyword in text_lower
        for keyword in ai_keywords
    ):

        intelligence["ai_heavy_role"] = True

    # -----------------------------------
    # BACKEND DETECTION
    # -----------------------------------

    backend_keywords = [
        "fastapi",
        "django",
        "flask",
        "api",
        "microservices",
        "backend",
        "database"
    ]

    if any(
        keyword in text_lower
        for keyword in backend_keywords
    ):

        intelligence["backend_heavy_role"] = True

    # -----------------------------------
    # CLOUD DETECTION
    # -----------------------------------

    cloud_keywords = [
        "aws",
        "azure",
        "gcp",
        "docker",
        "kubernetes",
        "deployment",
        "cloud"
    ]

    if any(
        keyword in text_lower
        for keyword in cloud_keywords
    ):

        intelligence["cloud_heavy_role"] = True

    # -----------------------------------
    # RESEARCH DETECTION
    # -----------------------------------

    research_keywords = [
        "research",
        "paper",
        "experimentation",
        "prototype",
        "analysis"
    ]

    if any(
        keyword in text_lower
        for keyword in research_keywords
    ):

        intelligence["research_oriented"] = True

    # -----------------------------------
    # DEPLOYMENT DETECTION
    # -----------------------------------

    deployment_keywords = [
        "deploy",
        "production",
        "scalable",
        "real-time",
        "monitoring",
        "pipeline"
    ]

    if any(
        keyword in text_lower
        for keyword in deployment_keywords
    ):

        intelligence["deployment_focused"] = True

    # -----------------------------------
    # LEADERSHIP DETECTION
    # -----------------------------------

    leadership_keywords = [
        "lead",
        "mentor",
        "manage",
        "ownership",
        "stakeholders",
        "team"
    ]

    if any(
        keyword in text_lower
        for keyword in leadership_keywords
    ):

        intelligence["leadership_role"] = True

    return intelligence






# -----------------------------
# SOFT SKILLS
# -----------------------------

def extract_soft_skills(text):

    text = text.lower()

    found_soft_skills = []

    for skill in SOFT_SKILLS:
        if skill.lower() in text:
            found_soft_skills.append(skill)

    return list(set(found_soft_skills))


# -----------------------------
# ROLE DETECTION
# -----------------------------

def detect_role(text):

    text = text.lower()

    for role in ROLE_KEYWORDS:
        if role.lower() in text:
            return role

    return "unknown"


# -----------------------------
# EXPERIENCE LEVEL
# -----------------------------

def detect_experience_level(text):

    text = text.lower()

    for level, keywords in EXPERIENCE_LEVELS.items():

        for keyword in keywords:

            if keyword.lower() in text:
                return level

    return "not specified"


# -----------------------------
# RESPONSIBILITIES
# -----------------------------

def extract_responsibilities(text):

    lines = text.split("\n")

    responsibilities = []

    for line in lines:

        cleaned_line = line.strip()

        if len(cleaned_line) < 25:
            continue

        line_lower = cleaned_line.lower()

        # -----------------------------------
        # ACTION VERB DETECTION
        # -----------------------------------

        contains_action_verb = any(

            verb in line_lower

            for verb in ACTION_VERBS
        )

        # -----------------------------------
        # RESPONSIBILITY FILTERING
        # -----------------------------------

        if contains_action_verb:

            responsibilities.append(cleaned_line)

        # -----------------------------------
        # BULLET-POINT BASED EXTRACTION
        # -----------------------------------

        elif cleaned_line.startswith(("-", "•", "*")):

            responsibilities.append(cleaned_line)

    # -----------------------------------
    # REMOVE DUPLICATES
    # -----------------------------------

    responsibilities = list(set(responsibilities))

    # -----------------------------------
    # SORT FOR CONSISTENCY
    # -----------------------------------

    responsibilities.sort()

    return responsibilities



# -----------------------------
# MAIN JD PARSER
# -----------------------------

def parse_job_description(text):

    weighted_skills = extract_weighted_skills(text)
    jd_intelligence = analyze_jd_intelligence(text)

    parsed_jd = {

        "role": detect_role(text),

        "required_skills": extract_required_skills(text),

        "weighted_skills": weighted_skills,

        "soft_skills": extract_soft_skills(text),

        "experience_level": detect_experience_level(text),

        "responsibilities": extract_responsibilities(text),

        "jd_intelligence": jd_intelligence
    }

    return parsed_jd