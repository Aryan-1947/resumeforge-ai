import re


# -----------------------------------
# ACTION VERBS
# -----------------------------------

ACTION_VERBS = [

    "developed",
    "built",
    "implemented",
    "designed",
    "optimized",
    "deployed",
    "managed",
    "created",
    "integrated",
    "automated",
    "engineered",
    "analyzed"
]


# -----------------------------------
# WORD COUNTER
# -----------------------------------

def count_words(text):

    return len(text.split())


# -----------------------------------
# ACTION VERB COUNTER
# -----------------------------------

def count_action_verbs(text):

    text_lower = text.lower()

    count = 0

    for verb in ACTION_VERBS:

        count += len(
            re.findall(
                r"\b" + re.escape(verb) + r"\b",
                text_lower
            )
        )

    return count


# -----------------------------------
# SKILL COUNT
# -----------------------------------

def count_skills(skill_list):

    return len(set(skill_list))


# -----------------------------------
# MAIN COMPARISON ENGINE
# -----------------------------------

def compare_resumes(

    original_resume,

    optimized_resume,

    original_skills,

    optimized_skills
):

    original_word_count = count_words(
        original_resume
    )

    optimized_word_count = count_words(
        optimized_resume
    )

    original_action_verbs = count_action_verbs(
        original_resume
    )

    optimized_action_verbs = count_action_verbs(
        optimized_resume
    )

    original_skill_count = count_skills(
        original_skills
    )

    optimized_skill_count = count_skills(
        optimized_skills
    )

    comparison_result = {

        "word_count_change":

            optimized_word_count
            -
            original_word_count,

        "action_verb_improvement":

            optimized_action_verbs
            -
            original_action_verbs,

        "skill_improvement":

            optimized_skill_count
            -
            original_skill_count,

        "original_word_count":
            original_word_count,

        "optimized_word_count":
            optimized_word_count,

        "original_action_verbs":
            original_action_verbs,

        "optimized_action_verbs":
            optimized_action_verbs,

        "original_skill_count":
            original_skill_count,

        "optimized_skill_count":
            optimized_skill_count
    }

    return comparison_result