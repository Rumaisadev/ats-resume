from docx import Document
import io


def apply_edits_to_docx(file_bytes: bytes, accepted_flags: list[dict]) -> bytes:
    doc = Document(io.BytesIO(file_bytes))
    replacements = {flag["line"].strip(): flag["suggestion"]
                    for flag in accepted_flags}

    for paragraph in doc.paragraphs:
        original_text = paragraph.text.strip()
        if original_text in replacements:
            # Replace text while trying to preserve the paragraph's existing formatting
            for run in paragraph.runs:
                run.text = ""
            if paragraph.runs:
                paragraph.runs[0].text = replacements[original_text]
            else:
                paragraph.text = replacements[original_text]

    output = io.BytesIO()
    doc.save(output)
    return output.getvalue()
