import re
from .section_utils import EXPECTED_SECTIONS, is_likely_header, EXPERIENCE_HEADERS


EMAIL_PATTERN = re.compile(r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}")
PHONE_PATTERN = re.compile(
    r"(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}")


def check_contact_info(text: str) -> dict:
    has_email = bool(EMAIL_PATTERN.search(text))
    has_phone = bool(PHONE_PATTERN.search(text))
    return {
        "has_email": has_email,
        "has_phone": has_phone,
        "passed": has_email and has_phone,
    }


def check_length(word_count: int) -> dict:
    if word_count < 150:
        status, score = "too_short", 40
    elif word_count <= 800:
        status, score = "good", 100
    elif word_count <= 1200:
        status, score = "a_bit_long", 75
    else:
        status, score = "too_long", 50

    return {"word_count": word_count, "status": status, "score": score}


def check_sections(text: str) -> dict:
    lines = text.split("\n")

    found = []

    for line in lines:
        stripped_lower = line.strip().lower()

        if is_likely_header(line, stripped_lower):
            found.append(stripped_lower)

    has_experience = any(
        section in EXPERIENCE_HEADERS
        for section in found
    )

    has_education = "education" in found

    has_skills = any(
        section in {"skills", "technical skills"}
        for section in found
    )

    core_found = sum([
        has_experience,
        has_education,
        has_skills
    ])

    return {
        "sections_found": found,
        "has_experience": has_experience,
        "has_education": has_education,
        "has_skills": has_skills,
        "score": int((core_found / 3) * 100),
    }


def check_layout(has_tables: bool, has_images: bool, is_multi_column: bool) -> dict:
    issues = []
    if has_tables:
        issues.append(
            "Tables detected — many ATS systems misread table content or skip it entirely.")
    if has_images:
        issues.append(
            "Images/graphics detected — text inside images isn't readable by ATS parsers.")
    if is_multi_column:
        issues.append(
            "Multi-column layout detected — some ATS systems read columns out of order.")

    score = max(100 - (len(issues) * 30), 10)

    return {"issues": issues, "score": score}

# for each issue 30 point is reduced for layout


def run_deterministic_checks(text: str, layout: dict) -> dict:
    contact = check_contact_info(text)
    length = check_length(len(text.split()))
    sections = check_sections(text)
    layout_check = check_layout(
        layout["has_tables"], layout["has_images"], layout["is_multi_column"]
    )

    ats_score = int(
        (layout_check["score"] + (100 if contact["passed"] else 50)) / 2)
    structure_score = int((sections["score"] + length["score"]) / 2)

    return {
        "contact": contact,
        "length": length,
        "sections": sections,
        "layout": layout_check,
        "ats_score": ats_score,
        "structure_score": structure_score,
    }
