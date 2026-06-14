from agents.llm_setup import llm


def generate_cover_letter(
    resume_text,
    job_description,
    resume_skills
):

    prompt = f"""
You are an expert professional cover letter writer.

Your task is to generate a concise,
professional, ATS-friendly cover letter body
based ONLY on the provided resume information.

STRICT RULES:
- Do NOT invent fake experience
- Do NOT invent projects
- Do NOT invent technologies
- Do NOT invent tools
- Do NOT invent achievements
- Do NOT invent certifications
- Do NOT mention skills NOT present in ALLOWED SKILLS
- ONLY use information explicitly available
- Keep the tone professional and realistic
- Tailor naturally to the target role
- Keep it concise

==============================
JOB DESCRIPTION:
==============================

{job_description}

==============================
ALLOWED SKILLS:
==============================

{resume_skills}

IMPORTANT:
You may ONLY mention skills present
inside ALLOWED SKILLS.

==============================
RESUME:
==============================

{resume_text}

==============================
OUTPUT REQUIREMENTS:
==============================

- Return ONLY the cover letter body
- No placeholders
- No addresses
- No signatures
- No bullet points
- No explanations
"""

    response = llm.invoke(prompt)

    return response.content