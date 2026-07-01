import re

# -----------------------------------
# ACTION VERBS
# -----------------------------------

ACTION_VERBS = [
    "developed", "built", "implemented", "optimized", "designed",
    "engineered", "deployed", "created", "automated", "integrated",
    "managed", "improved", "architected", "led", "delivered",
    "reduced", "increased", "launched", "scaled", "migrated"
]


# -----------------------------------
# DYNAMIC KEYWORD WEIGHT FROM JD
# -----------------------------------

def calculate_dynamic_skill_weights(jd_skills, weighted_skills):
    """
    Instead of hardcoded weights, derive weights from JD skill frequency.
    Skills mentioned more in the JD get higher weight automatically.
    """
    weights = {}
    for skill in jd_skills:
        skill_lower = skill.lower()
        jd_info = weighted_skills.get(skill_lower, {})
        priority = jd_info.get("priority", "low")
        frequency = jd_info.get("frequency", 1)

        if priority == "high":
            weights[skill_lower] = 3 + min(frequency, 5)
        elif priority == "medium":
            weights[skill_lower] = 2 + min(frequency, 3)
        else:
            weights[skill_lower] = 1 + min(frequency, 2)

    return weights


# -----------------------------------
# SECTION COMPLETENESS SCORE
# -----------------------------------

def calculate_section_completeness(resume_data):
    """
    Score based on presence of important resume sections.
    """
    sections = resume_data.get("sections", {})

    section_scores = {
        "skills": 30,
        "experience": 30,
        "education": 25,
        "projects": 10,
        "certifications": 5,
    }

    total_possible = sum(section_scores.values())
    achieved = 0

    for section, score in section_scores.items():
        content = sections.get(section, "")
        if content and len(content.strip()) > 10:
            achieved += score

    return (achieved / total_possible) * 100


# -----------------------------------
# ACTION VERB SCORE
# -----------------------------------

def calculate_action_verb_score(resume_data):
    """
    Score based on quality and variety of action verbs used.
    """
    resume_text = str(resume_data.get("sections", {})).lower()

    found_verbs = [verb for verb in ACTION_VERBS if verb in resume_text]
    unique_verb_count = len(set(found_verbs))

    # Reward variety — using 10+ different action verbs = full score
    score = min((unique_verb_count / 10) * 100, 100)
    return score


# -----------------------------------
# EXPERIENCE ALIGNMENT SCORE
# -----------------------------------

def calculate_experience_alignment(resume_data, jd_data):
    """
    Score based on how well candidate experience matches JD requirements.
    """
    resume_intelligence = resume_data.get("experience_intelligence", {})
    jd_intelligence = jd_data.get("jd_intelligence", {})

    score = 0
    checks = 0

    # Experience level match
    jd_exp = jd_data.get("experience_level", "not specified").lower()
    resume_exp = resume_intelligence.get("experience_level", "unknown").lower()

    if jd_exp != "not specified":
        checks += 1
        if jd_exp == "entry-level" and resume_exp == "fresher":
            score += 1
        elif jd_exp == "mid-level" and resume_exp in ["mid-level", "senior"]:
            score += 1
        elif jd_exp == "senior-level" and resume_exp == "senior":
            score += 1
        elif jd_exp == "entry-level" and resume_exp in ["mid-level", "senior"]:
            score += 0.8  # overqualified but still relevant

    # AI role alignment
    if jd_intelligence.get("ai_heavy_role"):
        checks += 1
        if resume_intelligence.get("technical_density") in ["medium", "high"]:
            score += 1

    # Deployment alignment
    if jd_intelligence.get("deployment_focused"):
        checks += 1
        if resume_intelligence.get("project_complexity") in ["intermediate", "advanced"]:
            score += 1

    # Leadership alignment
    if jd_intelligence.get("leadership_role"):
        checks += 1
        if resume_intelligence.get("has_leadership"):
            score += 1

    # Project complexity
    checks += 1
    complexity = resume_intelligence.get("project_complexity", "basic")
    if complexity == "advanced":
        score += 1
    elif complexity == "intermediate":
        score += 0.6
    else:
        score += 0.2

    if checks == 0:
        return 50  # neutral score if no data

    return (score / checks) * 100


# -----------------------------------
# MAIN ATS SCORE CALCULATOR
# -----------------------------------

def calculate_ats_score(resume_data, jd_data):

    # --- Skill Sets ---
    resume_skills = set(
        skill.lower() for skill in resume_data.get("skills", [])
    )
    jd_skills = set(
        skill.lower() for skill in jd_data.get("required_skills", [])
    )

    matched_skills = list(resume_skills.intersection(jd_skills))
    missing_skills = list(jd_skills - resume_skills)

    # --- Dynamic Weighted Keyword Score ---
    weighted_skills = jd_data.get("weighted_skills", {})
    dynamic_weights = calculate_dynamic_skill_weights(jd_skills, weighted_skills)

    total_possible_weight = sum(dynamic_weights.values()) or 1
    achieved_weight = sum(
        dynamic_weights.get(skill, 1)
        for skill in matched_skills
    )

    keyword_score = (achieved_weight / total_possible_weight) * 100

    weighted_matches = {
        skill: dynamic_weights.get(skill, 1)
        for skill in matched_skills
    }

    # --- Section Completeness Score ---
    section_score = calculate_section_completeness(resume_data)

    # --- Action Verb Score ---
    action_verb_score = calculate_action_verb_score(resume_data)

    # --- Experience Alignment Score ---
    experience_score = calculate_experience_alignment(resume_data, jd_data)

    # -----------------------------------
    # FINAL WEIGHTED SCORE
    # Keyword Match:       50%
    # Section Completeness: 25%
    # Action Verbs:        15%
    # Experience Alignment: 10%
    # -----------------------------------

    final_score = (
        keyword_score * 0.50 +
        section_score * 0.25 +
        action_verb_score * 0.15 +
        experience_score * 0.10
    )

    final_score = min(round(final_score, 2), 100)

    # --- Section Analysis ---
    sections = resume_data.get("sections", {})
    section_analysis = {
        "has_projects_section": bool(sections.get("projects")),
        "has_experience_section": bool(sections.get("experience")),
        "has_skills_section": bool(sections.get("skills")),
        "has_certifications_section": bool(sections.get("certifications")),
    }

    # --- Experience Info ---
    experience_intelligence = resume_data.get("experience_intelligence", {})

    return {
        "ats_score": final_score,
        "matched_skills": matched_skills,
        "missing_skills": missing_skills,
        "weighted_matches": weighted_matches,
        "total_jd_skills": len(jd_skills),
        "matched_count": len(matched_skills),
        "action_verb_score": round(action_verb_score, 2),
        "section_score": round(section_score, 2),
        "keyword_score": round(keyword_score, 2),
        "experience_score": round(experience_score, 2),
        "experience_level": experience_intelligence.get("experience_level", "unknown"),
        "project_complexity": experience_intelligence.get("project_complexity", "basic"),
        "section_analysis": section_analysis,
    }