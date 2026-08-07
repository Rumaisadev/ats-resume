import re


def find_skills_in_text(text: str, skill_list: list[str]) -> list[str]:
    lowered_text = text.lower()
    found = []

    for skill in skill_list:
        # \b = word boundary, so "SQL" doesn't accidentally match inside "MySQLite"
        pattern = r"\b" + re.escape(skill) + r"\b"
        if re.search(pattern, lowered_text):
            found.append(skill)

    return found

def calculate_keyword_score(matched: list[str], total_required: list[str]) -> int:
    if not total_required:
        return 100  # no skills detected in posting — nothing to penalize against

    return round((len(matched) / len(total_required)) * 100)

def analyze_keywords(resume_text: str, job_description: str, skill_list: list[str]) -> dict:
    required_skills = find_skills_in_text(job_description, skill_list)
    matched_skills = find_skills_in_text(resume_text, required_skills)
    missing_skills = [s for s in required_skills if s not in matched_skills]

    score = calculate_keyword_score(matched_skills, required_skills)

    return {
        "required_skills": required_skills,
        "matched_skills": matched_skills,
        "missing_skills": missing_skills,
        "score": score,
    }