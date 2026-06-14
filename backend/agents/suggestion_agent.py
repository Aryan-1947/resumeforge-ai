import re
from agents.llm_setup import llm

def clean_suggestions(text):

    # -----------------------------------
    # REMOVE EXCESSIVE EMPTY LINES
    # -----------------------------------

    text = re.sub(
        r"\n\s*\n\s*\n+",
        "\n\n",
        text
    )

    # -----------------------------------
    # REMOVE GENERIC PHRASES
    # -----------------------------------

    generic_patterns = [

        r"keep up the good work",

        r"continue learning",

        r"stay motivated",

        r"never give up"
    ]

    cleaned_lines = []

    for line in text.split("\n"):

        is_generic = any(

            re.search(
                pattern,
                line,
                flags=re.IGNORECASE
            )

            for pattern in generic_patterns
        )

        if not is_generic:

            cleaned_lines.append(line)

    text = "\n".join(cleaned_lines)

    # -----------------------------------
    # REMOVE DUPLICATE LINES
    # -----------------------------------

    unique_lines = []

    seen = set()

    for line in text.split("\n"):

        cleaned_line = line.strip()

        if (
            cleaned_line
            and
            cleaned_line.lower() not in seen
        ):

            unique_lines.append(line)

            seen.add(cleaned_line.lower())

    text = "\n".join(unique_lines)

    # -----------------------------------
    # NORMALIZE SPACING
    # -----------------------------------

    text = re.sub(
        r"[ \t]+",
        " ",
        text
    )



    # -----------------------------------
    # REMOVE MARKDOWN SYMBOLS
    # -----------------------------------

    text = re.sub(r"\*\*", "", text)


    # -----------------------------------
# REMOVE STANDALONE COLONS
# -----------------------------------

    text = re.sub(
    r"\n\s*:\s*\n",
    "\n",
    text
)

    return text.strip()





#
def semantic_deduplicate(text):

    lines = [
        line.strip()
        for line in text.split("\n")
        if line.strip()
    ]

    filtered_lines = []

    seen_keywords = []

    similarity_keywords = [

        ["data analysis", "analytics"],

        ["machine learning", "ml"],

        ["deployment", "production"],

        ["backend", "api"],

        ["frontend", "ui"],

        ["docker", "containerization"],

        ["leadership", "team lead"],

        ["optimization", "performance"]
    ]

    for line in lines:

        lower_line = line.lower()

        is_duplicate = False

        # -----------------------------------
        # CHECK SEMANTIC OVERLAP
        # -----------------------------------

        for keyword_group in similarity_keywords:

            matches = sum(
                keyword in lower_line
                for keyword in keyword_group
            )

            if matches >= 2:

                normalized = tuple(keyword_group)

                if normalized in seen_keywords:

                    is_duplicate = True

                else:

                    seen_keywords.append(normalized)

        # -----------------------------------
        # ADD UNIQUE LINES
        # -----------------------------------

        if not is_duplicate:

            filtered_lines.append(line)

    return "\n".join(filtered_lines)








# -----------------------------------
# ROLE-SPECIFIC COACHING
# -----------------------------------

def generate_role_specific_guidance(

    target_role,

    candidate_profile
):

    role = target_role.lower()

    profile_domain = candidate_profile.get(
        "primary_domain",
        "general"
    )

    guidance = []

    # -----------------------------------
    # MACHINE LEARNING ENGINEER
    # -----------------------------------

    if "machine learning" in role:

        guidance.extend([

            "Emphasize production-ready ML projects with deployment exposure.",

            "Highlight model optimization, inference pipelines, and scalability.",

            "Showcase practical ML deployment using APIs or Docker.",

            "Include measurable ML outcomes where available."
        ])

    # -----------------------------------
    # DATA SCIENTIST
    # -----------------------------------

    elif "data scientist" in role:

        guidance.extend([

            "Strengthen analytical storytelling and business impact.",

            "Highlight data visualization and experimentation.",

            "Emphasize statistical reasoning and model evaluation.",

            "Showcase real-world datasets and problem-solving."
        ])

    # -----------------------------------
    # BACKEND DEVELOPER
    # -----------------------------------

    elif "backend" in role:

        guidance.extend([

            "Highlight API architecture and scalable backend systems.",

            "Emphasize database optimization and system performance.",

            "Showcase authentication, deployment, and cloud exposure.",

            "Demonstrate clean backend project structure."
        ])

    # -----------------------------------
    # FULL STACK DEVELOPER
    # -----------------------------------

    elif "full stack" in role:

        guidance.extend([

            "Highlight end-to-end application development.",

            "Showcase frontend-backend integration projects.",

            "Emphasize deployment and production-ready architecture.",

            "Demonstrate responsive UI and scalable backend integration."
        ])

    # -----------------------------------
    # AI ENGINEER
    # -----------------------------------

    elif "ai engineer" in role:

        guidance.extend([

            "Highlight LLM, NLP, or AI system integration projects.",

            "Showcase real AI applications rather than only notebooks.",

            "Demonstrate inference pipelines and deployment capabilities.",

            "Emphasize practical AI engineering skills."
        ])

    # -----------------------------------
    # PROFILE-BASED ENHANCEMENTS
    # -----------------------------------

    if candidate_profile.get(
        "deployment_exposure"
    ):

        guidance.append(
            "Your deployment experience is valuable — emphasize production readiness."
        )

    if candidate_profile.get(
        "research_orientation"
    ):

        guidance.append(
            "Your research-oriented background can strengthen technical credibility."
        )

    if candidate_profile.get(
        "full_stack_capability"
    ):

        guidance.append(
            "Your cross-domain full-stack capability is a strong differentiator."
        )

    return guidance



#
# -----------------------------------
# SUGGESTION FORMATTER
# -----------------------------------

def format_suggestions_output(text):

    replacements = {

        "ATS Score Analysis":
            "\n# ATS Score Analysis\n",

        "Most Important Missing Areas":
            "\n# Most Important Missing Areas\n",

        "Technical Improvement Suggestions":
            "\n# Technical Improvement Suggestions\n",

        "Resume Wording Improvement Suggestions":
            "\n# Resume Wording Improvement Suggestions\n",

        "Project Improvement Suggestions":
            "\n# Project Improvement Suggestions\n",

        "Experience-Specific Suggestions":
            "\n# Experience-Specific Suggestions\n",

        "Role-Specific Suggestions":
            "\n# Role-Specific Suggestions\n",

        "ATS Optimization Suggestions":
            "\n# ATS Optimization Suggestions\n",

        "Strategic Career Improvement Advice":
            "\n# Strategic Career Improvement Advice\n"
    }

    # -----------------------------------
    # ADD HEADINGS
    # -----------------------------------

    for old, new in replacements.items():

        text = text.replace(old, new)

    # -----------------------------------
    # CLEAN EXCESSIVE NEWLINES
    # -----------------------------------

    text = re.sub(
        r"\n{3,}",
        "\n\n",
        text
    )

    return text.strip()







def generate_suggestions(
    ats_score,
    matched_skills,
    missing_skills,
    parsed_resume,
    parsed_jd
):
    


    resume_intelligence = parsed_resume.get(
    "experience_intelligence",
    {}
)

    jd_intelligence = parsed_jd.get(
    "jd_intelligence",
    {}
)

    weighted_skills = parsed_jd.get(
    "weighted_skills",
    {}
)

    target_role = parsed_jd.get(
    "role",
    "unknown"
)
    

    candidate_profile = parsed_resume.get(
    "candidate_profile",
    {}
)


    experience_level = resume_intelligence.get(
    "experience_level",
    "unknown"
)


    role_specific_guidance = (
    generate_role_specific_guidance(

        target_role,

        candidate_profile
    )
)





    prompt = f"""
You are an elite ATS resume reviewer,
career strategist,
and recruiter-style resume coach.

Your task is to generate intelligent,
practical,
role-aware,
and personalized suggestions
to improve the candidate's resume.

==================================================
TARGET ROLE
==================================================

{target_role}

==================================================
CANDIDATE EXPERIENCE LEVEL
==================================================

{experience_level}

==================================================
ATS SCORE
==================================================

{ats_score}

==================================================
MATCHED SKILLS
==================================================

{matched_skills}

==================================================
MISSING SKILLS
==================================================

{missing_skills}

==================================================
WEIGHTED JD SKILLS
==================================================

{weighted_skills}

==================================================
RESUME INTELLIGENCE
==================================================

{resume_intelligence}

==================================================
JD INTELLIGENCE
==================================================

{jd_intelligence}

==================================================
ROLE-SPECIFIC GUIDANCE
==================================================

{role_specific_guidance}

==================================================
PARSED RESUME
==================================================

{parsed_resume}

==================================================
PARSED JOB DESCRIPTION
==================================================

{parsed_jd}

==================================================
INSTRUCTIONS
==================================================

Provide:

1. ATS score analysis
2. Most important missing areas
3. Technical improvement suggestions
4. Resume wording improvement suggestions
5. Project improvement suggestions
6. Experience-specific suggestions
7. Role-specific suggestions
8. ATS optimization suggestions
9. Strategic career improvement advice

==================================================
IMPORTANT RULES
==================================================

You MUST:
- keep suggestions realistic
- keep suggestions practical
- personalize suggestions
- prioritize high-impact improvements
- focus on recruiter expectations
- focus on ATS optimization

You MUST NEVER:
- invent fake experience
- invent fake projects
- invent fake achievements
- suggest lying
- suggest fake certifications

==================================================
OUTPUT STYLE
==================================================

- concise
- professional
- recruiter-style
- actionable
- realistic
- well-structured

Return ONLY the suggestions.
"""

    response = llm.invoke(prompt)

    suggestions = response.content

    cleaned_suggestions = clean_suggestions(
    suggestions
)

    deduplicated_suggestions = semantic_deduplicate(
    cleaned_suggestions
)

    formatted_output = format_suggestions_output(
    deduplicated_suggestions
)

    return formatted_output