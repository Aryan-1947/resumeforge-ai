#
def get_priority_weight(priority):

    weights = {

        "high": 3,

        "medium": 2,

        "low": 1
    }

    return weights.get(priority, 1)



#
def calculate_responsibility_score(
    resume_data,
    jd_data
):

    resume_experience = " ".join(
        resume_data.get("experience", [])
    ).lower()

    jd_responsibilities = jd_data.get(
        "responsibilities",
        []
    )

    if not jd_responsibilities:
        return 0

    matched_responsibilities = 0

    for responsibility in jd_responsibilities:

        responsibility_words = responsibility.lower().split()

        # -----------------------------------
        # SIMPLE CONTEXT MATCHING
        # -----------------------------------

        overlap = sum(
            word in resume_experience
            for word in responsibility_words
        )

        # -----------------------------------
        # MATCH THRESHOLD
        # -----------------------------------

        if overlap >= max(
            2,
            len(responsibility_words) // 4
        ):

            matched_responsibilities += 1

    responsibility_score = (
        matched_responsibilities
        / len(jd_responsibilities)
    ) * 100

    return responsibility_score




#
def calculate_intelligence_alignment(
    resume_data,
    jd_data
):

    resume_intelligence = resume_data.get(
        "experience_intelligence",
        {}
    )

    jd_intelligence = jd_data.get(
        "jd_intelligence",
        {}
    )

    alignment_score = 0

    total_checks = 0

    # -----------------------------------
    # AI ROLE ALIGNMENT
    # -----------------------------------

    if jd_intelligence.get("ai_heavy_role"):

        total_checks += 1

        if resume_intelligence.get(
            "technical_density"
        ) in ["medium", "high"]:

            alignment_score += 1

    # -----------------------------------
    # DEPLOYMENT ALIGNMENT
    # -----------------------------------

    if jd_intelligence.get(
        "deployment_focused"
    ):

        total_checks += 1

        if resume_intelligence.get(
            "project_complexity"
        ) in ["intermediate", "advanced"]:

            alignment_score += 1

    # -----------------------------------
    # LEADERSHIP ALIGNMENT
    # -----------------------------------

    if jd_intelligence.get(
        "leadership_role"
    ):

        total_checks += 1

        if resume_intelligence.get(
            "has_leadership"
        ):

            alignment_score += 1

    # -----------------------------------
    # CLOUD / BACKEND ALIGNMENT
    # -----------------------------------

    if (
        jd_intelligence.get(
            "cloud_heavy_role"
        )
        or
        jd_intelligence.get(
            "backend_heavy_role"
        )
    ):

        total_checks += 1

        if resume_intelligence.get(
            "project_complexity"
        ) != "basic":

            alignment_score += 1

    # -----------------------------------
    # EXPERIENCE LEVEL ALIGNMENT
    # -----------------------------------

    jd_experience = jd_data.get(
        "experience_level",
        ""
    ).lower()

    resume_experience = resume_intelligence.get(
        "experience_level",
        ""
    ).lower()

    if jd_experience != "not specified":

        total_checks += 1

        if (
            jd_experience == "entry-level"
            and resume_experience == "fresher"
        ):

            alignment_score += 1

        elif (
            jd_experience == "mid-level"
            and resume_experience in [
                "mid-level",
                "senior"
            ]
        ):

            alignment_score += 1

        elif (
            jd_experience == "senior-level"
            and resume_experience == "senior"
        ):

            alignment_score += 1

    # -----------------------------------
    # FINAL SCORE
    # -----------------------------------

    if total_checks == 0:
        return 100

    return (
        alignment_score
        / total_checks
    ) * 100



# -----------------------------------
# IMPORTANT SKILL WEIGHTS
# -----------------------------------

IMPORTANT_SKILLS = {

    "python": 10,

    "machine learning": 10,

    "deep learning": 9,

    "tensorflow": 8,

    "pytorch": 8,

    "sql": 7,

    "docker": 7,

    "kubernetes": 7,

    "aws": 8,

    "fastapi": 7,

    "django": 6,

    "react": 6,

    "mongodb": 5,

    "nlp": 8,

    "computer vision": 8,

    "data analysis": 7
}



# -----------------------------------
# STRONG ACTION VERBS
# -----------------------------------

ACTION_VERBS = [

    "developed",
    "built",
    "implemented",
    "optimized",
    "designed",
    "engineered",
    "deployed",
    "created",
    "automated",
    "integrated",
    "managed",
    "improved"
]




def calculate_ats_score(

    resume_data,

    jd_data
):

    # -----------------------------------
    # BASIC SKILL SETS
    # -----------------------------------

    resume_skills = set(

        skill.lower()

        for skill in resume_data.get(
            "skills",
            []
        )
    )

    jd_skills = set(

        skill.lower()

        for skill in jd_data.get(
            "required_skills",
            []
        )
    )

    matched_skills = list(
        resume_skills.intersection(jd_skills)
    )

    missing_skills = list(
        jd_skills - resume_skills
    )

    # -----------------------------------
    # WEIGHTED SKILL SCORING
    # -----------------------------------

    total_possible_weight = 0

    achieved_weight = 0

    weighted_matches = {}

    for skill in jd_skills:

        weight = IMPORTANT_SKILLS.get(
            skill,
            5
        )

        total_possible_weight += weight

        if skill in resume_skills:

            achieved_weight += weight

            weighted_matches[skill] = weight

    if total_possible_weight == 0:

        weighted_skill_score = 0

    else:

        weighted_skill_score = (
            achieved_weight
            /
            total_possible_weight
        ) * 100

    # -----------------------------------
    # ACTION VERB ANALYSIS
    # -----------------------------------

    resume_text = str(
        resume_data.get(
            "sections",
            {}
        )
    ).lower()

    action_verb_count = sum(

        verb in resume_text

        for verb in ACTION_VERBS
    )

    action_verb_score = min(
        action_verb_count * 5,
        100
    )

    # -----------------------------------
    # EXPERIENCE INTELLIGENCE
    # -----------------------------------

    experience_intelligence = (
        resume_data.get(
            "experience_intelligence",
            {}
        )
    )

    experience_level = (
        experience_intelligence.get(
            "experience_level",
            "unknown"
        )
    )

    experience_bonus = 0

    if experience_level == "senior":

        experience_bonus = 10

    elif experience_level == "mid-level":

        experience_bonus = 6

    elif experience_level == "fresher":

        experience_bonus = 3

    # -----------------------------------
    # PROJECT COMPLEXITY BONUS
    # -----------------------------------

    project_complexity = (
        experience_intelligence.get(
            "project_complexity",
            "basic"
        )
    )

    project_bonus = 0

    if project_complexity == "advanced":

        project_bonus = 10

    elif project_complexity == "intermediate":

        project_bonus = 5

    # -----------------------------------
    # FINAL ATS SCORE
    # -----------------------------------

    final_score = (

        weighted_skill_score * 0.65

        +

        action_verb_score * 0.15

        +

        experience_bonus

        +

        project_bonus
    )

    final_score = min(
        round(final_score, 2),
        100
    )

    # -----------------------------------
    # SECTION ANALYSIS
    # -----------------------------------

    sections = resume_data.get(
        "sections",
        {}
    )

    section_analysis = {

        "has_projects_section":
            bool(sections.get("projects")),

        "has_experience_section":
            bool(sections.get("experience")),

        "has_skills_section":
            bool(sections.get("skills")),

        "has_certifications_section":
            bool(sections.get("certifications"))
    }

    # -----------------------------------
    # FINAL RESULT
    # -----------------------------------

    ats_result = {

        "ats_score": final_score,

        "matched_skills": matched_skills,

        "missing_skills": missing_skills,

        "weighted_matches": weighted_matches,

        "total_jd_skills": len(jd_skills),

        "matched_count": len(matched_skills),

        "action_verb_score": action_verb_score,

        "experience_level": experience_level,

        "project_complexity": project_complexity,

        "section_analysis": section_analysis
    }

    return ats_result