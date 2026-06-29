import os
import pdfplumber
from docx import Document
import re


def extract_text_from_pdf(file_path):
    text = ""

    with pdfplumber.open(file_path) as pdf:
        for page in pdf.pages:
            extracted = page.extract_text()

            if extracted:
                text += extracted + "\n"

    return text


def extract_text_from_docx(file_path):
    doc = Document(file_path)

    text = ""

    for para in doc.paragraphs:
        text += para.text + "\n"

    return text


def extract_text_from_txt(file_path):
    with open(file_path, "r", encoding="utf-8") as file:
        return file.read()


#
def clean_resume_text(text):

    # -----------------------------------
    # REMOVE WEIRD UNICODE CHARACTERS
    # -----------------------------------

    text = text.replace("\xa0", " ")

    # -----------------------------------
    # NORMALIZE BULLETS
    # -----------------------------------

    bullet_patterns = ["•", "●", "▪", "►", "▸"]

    for bullet in bullet_patterns:
        text = text.replace(bullet, "-")

    # -----------------------------------
    # REMOVE EXTRA WHITESPACES
    # -----------------------------------

    text = re.sub(r"[ \t]+", " ", text)

    # -----------------------------------
    # FIX MULTIPLE EMPTY LINES
    # -----------------------------------

    text = re.sub(r"\n\s*\n+", "\n\n", text)

    # -----------------------------------
    # CLEAN LINE BY LINE
    # -----------------------------------

    cleaned_lines = []

    for line in text.split("\n"):

        line = line.strip()

        if line:

            cleaned_lines.append(line)

    text = "\n".join(cleaned_lines)

    # -----------------------------------
    # FIX BROKEN SECTION HEADINGS
    # -----------------------------------

    section_headers = [
        "education",
        "experience",
        "projects",
        "skills",
        "certifications",
        "internships",
        "summary"
    ]

    formatted_lines = []

    for line in text.split("\n"):

        if line.lower() in section_headers:

            formatted_lines.append(f"\n{line.upper()}\n")

        else:

            formatted_lines.append(line)

    text = "\n".join(formatted_lines)

    return text




#
def merge_broken_lines(text):

    lines = text.split("\n")
    merged_lines = []
    current_line = ""

    bullet_starters = ("-", "•", "*")

    section_headers = [
        "EDUCATION",
        "EXPERIENCE",
        "PROJECTS",
        "SKILLS",
        "CERTIFICATIONS",
        "INTERNSHIPS",
        "SUMMARY"
    ]

    # Patterns that indicate a line should NOT be merged
    # (contact info, dates, short standalone lines)
    def is_standalone_line(line):
        standalone_patterns = [
            r"^\+?\d[\d\s\-]{7,}",          # phone numbers
            r"[a-zA-Z0-9._%+-]+@",           # email
            r"^https?://|linkedin|github",    # URLs
            r"\d{4}",                         # years/dates
            r"^[A-Z][a-z]+\s[A-Z][a-z]+",   # Name (two capitalized words)
            r"fresher|intern|engineer|developer|scientist",  # job titles
            r"b\.tech|m\.tech|b\.sc|m\.sc|bachelor|master|phd",  # degrees
        ]
        line_lower = line.lower()
        for pattern in standalone_patterns:
            if re.search(pattern, line_lower):
                return True
        # Short lines (under 60 chars) are likely standalone
        if len(line) < 60:
            return True
        return False

    for line in lines:
        line = line.strip()

        if not line:
            if current_line:
                merged_lines.append(current_line.strip())
                current_line = ""
            merged_lines.append("")
            continue

        # Section headers
        if line.upper() in section_headers:
            if current_line:
                merged_lines.append(current_line.strip())
                current_line = ""
            merged_lines.append(f"\n{line}\n")
            continue

        # Bullet points
        if line.startswith(bullet_starters):
            if current_line:
                merged_lines.append(current_line.strip())
            current_line = line
            continue

        # Standalone lines — don't merge
        if is_standalone_line(line):
            if current_line:
                merged_lines.append(current_line.strip())
                current_line = ""
            merged_lines.append(line)
            continue

        # Long descriptive lines — try merging only if continuation
        if current_line:
            if not current_line.endswith((".", "!", "?", ":")):
                current_line += " " + line
            else:
                merged_lines.append(current_line.strip())
                current_line = line
        else:
            current_line = line

    if current_line:
        merged_lines.append(current_line.strip())

    # Clean up excessive blank lines
    result = "\n".join(merged_lines)
    result = re.sub(r"\n{3,}", "\n\n", result)
    return result






def extract_resume_text(file_path):

    extension = os.path.splitext(file_path)[1].lower()

    if extension == ".pdf":

        raw_text = extract_text_from_pdf(file_path)

    elif extension == ".docx":

        raw_text = extract_text_from_docx(file_path)

    elif extension == ".txt":

        raw_text = extract_text_from_txt(file_path)

    else:

        raise ValueError("Unsupported file format")

    cleaned_text = clean_resume_text(raw_text)

    cleaned_text = merge_broken_lines(cleaned_text)

    return cleaned_text