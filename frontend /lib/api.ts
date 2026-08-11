import { BulletState, Flag } from "@/types/types";

export async function analyzeResume(resumeFile: File, jobDescription: string) {
  const formData = new FormData();
  formData.append("resumeFile", resumeFile);
  formData.append("jobDescription", jobDescription);

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/analyze`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    const detail = errorData?.detail;
    const message =
      typeof detail === "string"
        ? detail
        : Array.isArray(detail)
          ? detail.map((d: any) => d.msg).join(", ")
          : "Something went wrong analyzing your resume.";
    throw new Error(message);
  }

  return res.json();
}

export async function applyEdits(
  originalFile: File,
  flags: Flag[],
  bulletState: Record<string, BulletState>,
) {
  const acceptedFlags = flags
    .map((flag) => {
      const currentText = bulletState[flag.id]?.currentText ?? flag.line;
      return { line: flag.line, suggestion: currentText };
    })
    .filter((entry) => entry.suggestion !== entry.line);

  const formData = new FormData();
  formData.append("resumeFile", originalFile);
  formData.append("acceptedFlags", JSON.stringify(acceptedFlags));

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/apply-edits`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.detail ?? "Failed to generate updated resume.");
  }

  return res.blob();
}
