from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import fitz
from docx import Document
import io
from .skills import COMMON_SKILLS
from .calculate_score import analyze_keywords
from .extract_pdf_data import extract_document_data
from .checks import run_deterministic_checks
from .llm_review import review_bullets
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/analyze")
async def analyze_resume(
    resumeFile: UploadFile = File(...),
    jobDescription: str = Form(""),
):
    filename = resumeFile.filename.lower()

    if not (filename.endswith(".pdf") or filename.endswith(".docx")):
        raise HTTPException(
            status_code=400,
            detail="Only PDF and DOCX files are supported.",
        )

    file_bytes = await resumeFile.read()
    try:
        parsed = extract_document_data(resumeFile.filename, file_bytes)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    if not parsed["text"]:
        raise HTTPException(
            status_code=422,
            detail="Couldn't extract any text — this may be a scanned image.",
        )

    keyword_results = analyze_keywords(
        parsed["text"], jobDescription, COMMON_SKILLS)
    checks = run_deterministic_checks(parsed["text"], parsed)
    llm_results = review_bullets(parsed["text"])
    return {
        "filename": resumeFile.filename,
        "word_count":  len(parsed["text"].split()),
        "checks": checks,
        "preview": parsed["text"][:200],
        "job_description_length": len(jobDescription.split()),
        "keywords": keyword_results,
        "flags": llm_results["flags"],
        "summary": llm_results["summary"],
        "reviewed": llm_results["reviewed"],
    }
