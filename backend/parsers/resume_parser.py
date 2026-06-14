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

    for line in lines:

        line = line.strip()

        if not line:
            continue

        # -----------------------------------
        # NEW SECTION HEADER
        # -----------------------------------

        if line.upper() in section_headers:

            if current_line:
                merged_lines.append(current_line.strip())

            merged_lines.append(f"\n{line}\n")

            current_line = ""

            continue

        # -----------------------------------
        # BULLET POINT
        # -----------------------------------

        if line.startswith(bullet_starters):

            if current_line:
                merged_lines.append(current_line.strip())

            current_line = line

            continue

        # -----------------------------------
        # CONTINUATION LINE
        # -----------------------------------

        if current_line:

            # merge fragmented sentence
            if not current_line.endswith((".", "!", "?", ":")):

                current_line += " " + line

            else:

                merged_lines.append(current_line.strip())

                current_line = line

        else:

            current_line = line

    # -----------------------------------
    # FINAL APPEND
    # -----------------------------------

    if current_line:

        merged_lines.append(current_line.strip())

    return "\n".join(merged_lines)






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