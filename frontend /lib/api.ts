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
