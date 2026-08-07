
from .section_utils import is_likely_header, EXPERIENCE_HEADERS
EXPECTED_SECTIONS = [
    "experience", "work experience", "employment",
    "education",
    "skills", "technical skills",
    "summary", "objective", "profile",
]

SENTENCE_ENDERS = (".", "!", "?", ":")


def extract_experience_bullets(text: str) -> str:
    lines = text.split("\n")
    collecting = False
    collected = []

    for line in lines:
        stripped = line.strip()
        stripped_lower = stripped.lower()

        if stripped_lower in EXPERIENCE_HEADERS:
            collecting = True
            continue

        if collecting and is_likely_header(line, stripped_lower):
            last_line = collected[-1].strip() if collected else ""
            previous_line_finished = last_line.endswith(SENTENCE_ENDERS)
            if previous_line_finished or not last_line:
                break

        if collecting:
            collected.append(line)

    return "\n".join(collected).strip()
