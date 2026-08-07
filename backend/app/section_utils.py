EXPECTED_SECTIONS = [
    "experience", "work experience", "employment history",
    "education", "Professional Experience",
    "Career History"
    "skills", "technical skills",
    "summary", "objective", "profile",
]
EXPERIENCE_HEADERS = {"experience", "work experience",
                      "employment", "employment history"}


def is_likely_header(original_line: str, stripped_lower: str) -> bool:
    word_count = len(stripped_lower.split())
    is_short = word_count <= 4
    stripped_original = original_line.strip()
    is_header_styled = stripped_original.isupper() or stripped_original.istitle()
    return stripped_lower in EXPECTED_SECTIONS and is_short and is_header_styled
