import json
import os
import requests
from .extract_sections import extract_experience_bullets
from app.core.config import config

GEMINI_API_KEY = config("GEMINI_API_KEY")
print("KEY LOADED:", GEMINI_API_KEY[:8] if GEMINI_API_KEY else "MISSING")
GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent"
PROMPT_INSTRUCTIONS = """You are a resume reviewer. For each bullet point, check two things: does it start with a passive phrase like "responsible for" or "helped with" instead of a strong action verb like "led" or "built"? And does it describe an activity without stating a measurable result — a number, percentage, or concrete outcome?

Only report bullets that have one or both of these problems — skip any bullet that's already strong.

For each flagged bullet, provide the original line and a rewritten version. IMPORTANT: Never invent specific numbers, percentages, or metrics that are not present in or directly implied by the original text. If the bullet lacks a measurable outcome and no real number can be inferred from the given text, rewrite it with a stronger verb only, and instead of a fake number, insert a bracketed placeholder like [add a specific number or percentage here] to prompt the user to fill in their own real data — never fabricate one.

Respond ONLY with valid JSON, in exactly this structure, with no extra text before or after:
{
  "flags": [
    {"type": "weak_verb" | "unquantified" | "passive_voice" | "unclear", "line": "original bullet text", "suggestion": "rewritten bullet text"}
  ],
  "summary": "a 2-3 sentence overview of the resume's biggest opportunities"
}

If no bullets have issues, return an empty array for "flags" and still provide a summary."""


def review_bullets(resume_text: str) -> dict:
    experience_text = extract_experience_bullets(resume_text)

    if not experience_text:
        return {"flags": [], "summary": "No work experience section was found to review.", "reviewed": False, }

    prompt = f"{PROMPT_INSTRUCTIONS}\n\nRESUME TEXT TO ANALYZE:\n{experience_text}"

    try:
        response = requests.post(
            GEMINI_URL,
            params={"key": GEMINI_API_KEY},
            json={"contents": [{"parts": [{"text": prompt}]}]},
            timeout=20,
        )
        # print(response.status_code)
        # print(response.json())
        response.raise_for_status()

        data = response.json()
        raw_text = data["candidates"][0]["content"]["parts"][0]["text"].strip()

        if raw_text.startswith("```"):
            raw_text = raw_text.strip("`")
            raw_text = raw_text.replace("json\n", "", 1).strip()

        parsed = json.loads(raw_text)
        return {
            "reviewed": True,
            "flags": parsed.get("flags", []),
            "summary": parsed.get("summary", ""),
        }

    except (requests.RequestException, KeyError, json.JSONDecodeError) as e:
        print("LLM REVIEW FAILED:", type(e).__name__, str(e))
        return {"flags": [], "summary": "AI review unavailable for this scan.", "reviewed": False}
