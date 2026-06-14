import re


def format_resume_display(text):

    # Remove excessive empty lines
    text = re.sub(
        r"\n{3,}",
        "\n\n",
        text
    )

    # Normalize section spacing
    section_headers = [
        "EDUCATION",
        "EXPERIENCE",
        "PROJECTS",
        "SKILLS",
        "TECHNICAL SKILLS",
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

    return text.strip()