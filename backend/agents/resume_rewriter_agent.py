import re
from agents.llm_setup import llm


def clean_rewritten_resume(text):

    # -----------------------------------
    # REMOVE EXCESSIVE EMPTY LINES
    # -----------------------------------

    text = re.sub(
        r"\n\s*\n\s*\n+",
        "\n\n",
        text
    )

    
    # -----------------------------------
    # REMOVE TEMPLATE/TITLE ARTIFACTS
    # -----------------------------------

    artifact_patterns = [ 

    r"REWRITTEN RESUME",

    r"OPTIMIZED RESUME",

    r"IMPROVED RESUME",

    r"={3,}",

    r"-{3,}"
]

    for pattern in artifact_patterns:
 
     text = re.sub(
 
        pattern,

        "",

        text,

        flags=re.IGNORECASE
    )






    # -----------------------------------
    # REMOVE REPEATED BUZZWORDS
    # -----------------------------------

    buzzword_patterns = [

        r"\bresults-driven\b",

        r"\bhighly motivated\b",

        r"\bdynamic professional\b",

        r"\bteam player\b"
    ]

    for pattern in buzzword_patterns:

        matches = re.findall(
            pattern,
            text,
            flags=re.IGNORECASE
        )

        if len(matches) > 1:

            first_found = False

            cleaned_lines = []

            for line in text.split("\n"):

                if re.search(
                    pattern,
                    line,
                    flags=re.IGNORECASE
                ):

                    if not first_found:

                        cleaned_lines.append(line)

                        first_found = True

                else:

                    cleaned_lines.append(line)

            text = "\n".join(cleaned_lines)

    # -----------------------------------
    # REMOVE DUPLICATE CONSECUTIVE LINES
    # -----------------------------------

    unique_lines = []

    previous_line = ""

    for line in text.split("\n"):

        cleaned_line = line.strip()

        if (
            cleaned_line
            and
            cleaned_line != previous_line
        ):

            unique_lines.append(line)

        previous_line = cleaned_line

    text = "\n".join(unique_lines)

        # -----------------------------------
    # REMOVE MARKDOWN SYMBOLS
    # -----------------------------------

    text = re.sub(r"\*\*", "", text)

    text = re.sub(r"^\*\s+", "- ", text, flags=re.MULTILINE)

    text = re.sub(r"^#+\s*", "", text, flags=re.MULTILINE)

    # -----------------------------------
    # FIX BROKEN SECTION SPACING
    # -----------------------------------

    section_headers = [
        "EDUCATION",
        "EXPERIENCE",
        "PROJECTS",
        "TECHNICAL SKILLS",
        "SKILLS",
        "CERTIFICATIONS",
        "ACHIEVEMENTS"
    ]

    for header in section_headers:

        text = re.sub(
            rf"\s*{header}\s*",
            f"\n\n{header}\n",
            text,
            flags=re.IGNORECASE
        )

    # -----------------------------------
    # CLEAN EXCESSIVE SPACING
    # -----------------------------------

    text = re.sub(
        r"\n{3,}",
        "\n\n",
        text
    )

    

    return text.strip()



#
def build_keyword_amplification_context(

    parsed_resume,

    parsed_jd
):

    resume_skills = parsed_resume.get(
        "skills",
        []
    )

    jd_skills = parsed_jd.get(
        "required_skills",
        []
    )

    overlapping_skills = [

        skill
        for skill in resume_skills
        if skill.lower() in [
            x.lower()
            for x in jd_skills
        ]
    ]

    amplification_context = {

        "safe_keywords": overlapping_skills,

        "resume_strengths": [],

        "technical_focus": []
    }

    # -----------------------------------
    # DETECT BACKEND STRENGTH
    # -----------------------------------

    backend_keywords = [
        "fastapi",
        "django",
        "flask",
        "sql",
        "mongodb",
        "docker"
    ]

    if any(
        skill.lower() in backend_keywords
        for skill in resume_skills
    ):

        amplification_context[
            "resume_strengths"
        ].append(
            "backend engineering"
        )

    # -----------------------------------
    # DETECT ML STRENGTH
    # -----------------------------------

    ml_keywords = [
        "machine learning",
        "tensorflow",
        "pytorch",
        "nlp"
    ]

    if any(
        skill.lower() in ml_keywords
        for skill in resume_skills
    ):

        amplification_context[
            "resume_strengths"
        ].append(
            "machine learning"
        )

    # -----------------------------------
    # TECHNICAL FOCUS
    # -----------------------------------

    amplification_context[
        "technical_focus"
    ] = overlapping_skills[:10]

    return amplification_context




#
def strengthen_resume_phrasing(text):

    replacements = {

        # -----------------------------------
        # WEAK → STRONG TECHNICAL PHRASING
        # -----------------------------------

        "worked on learning":
            "built practical experience in",

        "worked on":
            "developed",

        "created apis":
            "developed RESTful APIs",

        "made a project":
            "developed a project",

        "used":
            "utilized",

        "helped with":
            "contributed to",

        "learned":
            "applied",

        "did backend":
            "developed backend systems",

        "did frontend":
            "developed frontend interfaces",

        "made":
            "engineered",

        "built a system":
            "architected a system",

        "stored and fetched":
            "managed and retrieved",

        "worked with":
            "collaborated using"
    }

    improved_text = text

    for weak, strong in replacements.items():

        improved_text = re.sub(

            weak,

            strong,

            improved_text,

            flags=re.IGNORECASE
        )

    return improved_text




#
def amplify_achievement_impact(text):

    replacements = {

        # -----------------------------------
        # ACHIEVEMENT AMPLIFICATION
        # -----------------------------------

        "optimized":
            "optimized and improved",

        "developed":
            "designed and developed",

        "created":
            "engineered and implemented",

        "built":
            "designed and built",

        "used git":
            "utilized Git for collaborative version control",

        "worked with":
            "collaborated using",

        "maintained":
            "managed and maintained",

        "handled":
            "managed",

        "made APIs":
            "developed scalable APIs",

        "stored and fetched":
            "managed and retrieved",

        "automated tasks":
            "automated operational workflows",

        "made a game":
            "engineered an interactive game",

        "developed a system":
            "architected and developed a system",

        "created login system":
            "implemented authentication workflows"
    }

    amplified_text = text

    for weak, strong in replacements.items():

        amplified_text = re.sub(

            weak,

            strong,

            amplified_text,

            flags=re.IGNORECASE
        )

    return amplified_text




#
def inject_safe_ats_keywords(

    text,

    amplification_context
):

    safe_keywords = amplification_context.get(
        "safe_keywords",
        []
    )

    enhanced_text = text

    # -----------------------------------
    # SAFE ATS EMPHASIS
    # -----------------------------------

    keyword_enhancements = {

        "docker":
            "Docker-based deployment workflows",

        "fastapi":
            "FastAPI backend development",

        "sql":
            "SQL database optimization",

        "mongodb":
            "MongoDB data management",

        "machine learning":
            "machine learning model development",

        "tensorflow":
            "TensorFlow-based deep learning workflows",

        "pytorch":
            "PyTorch model development",

        "git":
            "Git-based collaborative development",

        "aws":
            "AWS cloud infrastructure",

        "react":
            "React frontend development"
    }

    for keyword in safe_keywords:

        keyword_lower = keyword.lower()

        if keyword_lower in keyword_enhancements:

            enhanced_phrase = (
                keyword_enhancements[
                    keyword_lower
                ]
            )

            enhanced_text = re.sub(

                rf"\b{re.escape(keyword)}\b",

                enhanced_phrase,

                enhanced_text,

                flags=re.IGNORECASE
            )

    return enhanced_text






def rewrite_resume(
    resume_text,
    job_description,
    missing_skills,
    resume_data,
    jd_data
):
    




    role = jd_data.get("role", "unknown")

    experience_level = (
    resume_data
    .get("experience_intelligence", {})
    .get("experience_level", "unknown")
)

    jd_intelligence = jd_data.get(
    "jd_intelligence",
    {}
)

    weighted_skills = jd_data.get(
    "weighted_skills",
    {}
)
    
    amplification_context = (
    build_keyword_amplification_context(

        resume_data,

        jd_data
    )
)
    

    strengthened_resume = (
    strengthen_resume_phrasing(
        resume_text
    )
)



    amplified_resume = (
        amplify_achievement_impact(
            strengthened_resume
    )
)


    ats_amplified_resume = (
    inject_safe_ats_keywords(

        amplified_resume,

        amplification_context
    )
)



    prompt = f"""
You are an elite ATS resume optimization assistant.

Your task is to improve the wording,
clarity, professionalism, ATS alignment,
and recruiter readability of the EXISTING resume.

==================================================
CRITICAL SAFETY RULES
==================================================

You MUST NEVER:

- invent fake experience
- invent projects
- invent companies
- invent tools
- invent technologies
- invent metrics
- invent certifications
- invent achievements
- invent dates
- invent leadership
- invent internships
- invent publications
- invent responsibilities

You MUST ONLY:
- improve wording
- improve grammar
- improve readability
- improve action verbs
- improve professionalism
- improve ATS optimization
- improve clarity
- improve sentence structure

==================================================
ROLE CONTEXT
==================================================

Target Role:
{role}

Candidate Experience Level:
{experience_level}

==================================================
JD INTELLIGENCE
==================================================

{jd_intelligence}

==================================================
IMPORTANT ATS SKILLS
==================================================

{weighted_skills}


==================================================
SAFE KEYWORD AMPLIFICATION
==================================================

{amplification_context}

IMPORTANT:
- You MAY emphasize existing matching technologies
- You MAY strengthen ATS-relevant wording
- You MAY improve technical phrasing
- You MAY improve accomplishment framing
- You MUST NOT invent unsupported skills


==================================================
MISSING SKILLS
==================================================

{missing_skills}

IMPORTANT:
- NEVER add missing skills unless already present
- You may strengthen wording around existing matching skills
- Emphasize relevant existing technologies naturally

==================================================
JOB DESCRIPTION
==================================================

{job_description}

==================================================
ORIGINAL RESUME
==================================================

{ats_amplified_resume}

==================================================
REWRITE INSTRUCTIONS
==================================================

- Preserve the original structure closely
- Keep section ordering similar
- Preserve factual accuracy
- Use stronger action verbs where appropriate
- Improve ATS readability
- Improve recruiter readability
- Make bullet points more impactful
- Make project descriptions more professional
- Improve technical phrasing naturally
- Keep wording realistic
- Avoid repetitive wording
- Avoid excessive buzzwords
- Keep tone professional and concise
- Preserve compact ATS-friendly formatting
- Maintain professional resume density
- Strengthen weak bullet points naturally
- Improve accomplishment framing
- Improve technical impact
- Use recruiter-style action verbs
- Emphasize production-ready experience where supported
- Improve backend/API/deployment phrasing when supported
- Improve ML/system design wording when supported
- Do NOT use markdown
- Do NOT use ** symbols
- Do NOT use bullet markdown like * or #
- Use clean plain-text resume formatting
- Preserve professional resume spacing
- Use line breaks naturally between sections
- Keep formatting ATS-friendly
- Keep resumes compact like professional one-page ATS resumes
- Avoid excessive whitespace
- Avoid decorative formatting
- Keep section headers simple
- Use plain professional formatting only

==================================================
GOOD REWRITE EXAMPLES
==================================================

Weak:
"Worked on frontend technologies"

Better:
"Built frontend features using React and JavaScript"

Weak:
"Created APIs"

Better:
"Developed RESTful APIs for efficient data handling"

Weak:
"Learned backend development"

Better:
"Built backend systems using FastAPI and SQL"

IMPORTANT:
- Stronger wording is encouraged
- Truthfulness must ALWAYS be preserved


==================================================
OUTPUT REQUIREMENTS
==================================================

- Return ONLY the rewritten resume
- Do NOT explain changes
- Do NOT add notes
- Do NOT add markdown
- Do NOT add placeholders
- Do NOT generate multiple versions
- Do NOT generate commentary
"""

    response = llm.invoke(prompt)

    rewritten_resume = response.content

    cleaned_resume = clean_rewritten_resume(
    rewritten_resume
)

    return cleaned_resume