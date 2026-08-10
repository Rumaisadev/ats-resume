from fastapi import FastAPI, HTTPException, Depends, Request, APIRouter
from fastapi.responses import StreamingResponse
from app.apply_edits import apply_edits_to_docx
import io
from fastapi import FastAPI, UploadFile, File, Form, HTTPException, Depends, Request, APIRouter

editRouter = APIRouter()


@editRouter.post("/apply-edits")
async def apply_edits(
    resumeFile: UploadFile = File(...),
    acceptedFlags: str = Form(...),   # JSON string from frontend
    # addedSkills: str = Form(...),     # JSON string from frontend
    # allFlags: str = Form(...),        # JSON string from frontend
):
    import json
    accepted = json.loads(acceptedFlags)
    # skills = json.loads(addedSkills)
    # all_flags = json.loads(allFlags)

    filename = resumeFile.filename.lower()
    file_bytes = await resumeFile.read()

    if filename.endswith(".docx"):
        result_bytes = apply_edits_to_docx(file_bytes, accepted)
    else:
        # PDF — generate a new clean document instead of pretending to edit in place
        matched = []  # pass matched_skills through similarly if needed
        # result_bytes = generate_clean_docx(accepted, all_flags, matched, skills)

    return StreamingResponse(
        io.BytesIO(result_bytes),
        media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        headers={"Content-Disposition": "attachment; filename=updated_resume.docx"},
    )


# @app.post("/apply-edits")
# async def apply_edits(
#     resumeFile: UploadFile = File(...),
#     acceptedFlags: str = Form(...),   # JSON string from frontend
#     addedSkills: str = Form(...),     # JSON string from frontend
#     allFlags: str = Form(...),        # JSON string from frontend
# ):
#     import json
#     accepted = json.loads(acceptedFlags)
#     skills = json.loads(addedSkills)
#     all_flags = json.loads(allFlags)

#     filename = resumeFile.filename.lower()
#     file_bytes = await resumeFile.read()

#     if filename.endswith(".docx"):
#         result_bytes = apply_edits_to_docx(file_bytes, accepted, skills)
#     else:
#         # PDF — generate a new clean document instead of pretending to edit in place
#         matched = []  # pass matched_skills through similarly if needed
#         result_bytes = generate_clean_docx(accepted, all_flags, matched, skills)

#     return StreamingResponse(
#         io.BytesIO(result_bytes),
#         media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
#         headers={"Content-Disposition": "attachment; filename=updated_resume.docx"},
#     )
