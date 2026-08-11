import { applyEdits } from "@/lib/api";
import { Flag, BulletState } from "@/types/types";

export function ImprovedResumePreview({
  flags,
  bulletState,
  updateBulletText,
  originalFile,
}: {
  flags: Flag[];
  bulletState: Record<string, BulletState>;
  updateBulletText: (id: string, text: string) => void;
  originalFile: File | null;
}) {
  console.log("ImprovedResumePreview originalFile:", originalFile);
  const hasChanges = flags.some((flag) => {
    const state = bulletState[flag.id];

    if (!state?.accepted) {
      return false;
    }

    const currentText = state.currentText ?? flag.line;

    return currentText !== flag.line;
  });

  const bulletLines = flags.map((flag) => ({
    id: flag.id,
    text: bulletState[flag.id]?.currentText ?? flag.line,
  }));

  const compiledText = [
    "EXPERIENCE",
    ...bulletLines.map((bullet) => `• ${bullet.text}`),
    "",
    // "SKILLS",
    // allSkills.join(", "),
  ].join("\n");

  const hasUnfilledPlaceholders = /\[add a specific[^\]]*\]/i.test(
    compiledText,
  );

  const handleCopy = () => navigator.clipboard.writeText(compiledText);
  const handleDownload = async () => {
    if (!originalFile) return;
    console.log("originalFile:", originalFile);
    console.log("file name:", originalFile.name);
    console.log("file size:", originalFile.size);
    console.log("file type:", originalFile.type);
    try {
      const blob = await applyEdits(originalFile, flags, bulletState);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "updated_resume.docx";
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="rounded-2xl border border-orange-200 bg-orange-50/30 p-6">
      <h3 className="font-semibold text-gray-900">Your updated content</h3>
      <p className="mt-1 text-xs text-gray-500">
        Based on the suggestions and skills you&apos;ve accepted.
      </p>

      <div
        className={`mt-4 rounded-xl p-4 font-mono text-sm text-gray-700 shadow-sm transition-colors ${
          hasUnfilledPlaceholders
            ? "border border-orange-200 bg-orange-50"
            : "border border-gray-100 bg-white"
        }`}
      >
        {" "}
        <div className="font-semibold tracking-wide text-gray-500">
          EXPERIENCE
        </div>
        <div className="mt-2 space-y-1.5">
          {bulletLines.map((bullet) => (
            <div key={bullet.id} className="flex items-start gap-2">
              <span className="mt-2 text-gray-400">•</span>
              <div className="grid">
                <textarea
                  value={bullet.text}
                  onChange={(e) => updateBulletText(bullet.id, e.target.value)}
                  className="col-start-1 row-start-1 w-full resize-none overflow-hidden rounded-lg border border-transparent bg-transparent p-2 text-[15px] leading-relaxed text-gray-800 outline-none transition focus:border-orange-200 focus:bg-orange-50/60 focus:ring-2 focus:ring-orange-100"
                />
                <div
                  aria-hidden
                  className="invisible col-start-1 row-start-1 whitespace-pre-wrap p-2 text-[15px] leading-relaxed"
                >
                  {bullet.text + " "}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {hasUnfilledPlaceholders && (
        <p className="mt-3 flex items-center gap-1.5 text-xs font-medium text-orange-600">
          ⚠️ Replace any bracketed placeholders with your real numbers.
        </p>
      )}

      <div className="mt-4 flex gap-3">
        <button
          onClick={handleCopy}
          disabled={!hasChanges}
          className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-900 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Copy text
        </button>

        <button
          onClick={() => {
            console.log("DOWNLOAD BUTTON CLICKED");
            console.log("hasChanges:", hasChanges);
            console.log("originalFile:", originalFile);
            console.log("bulletState:", bulletState);

            handleDownload();
          }}
          disabled={!hasChanges}
          className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Download .docx
        </button>
      </div>
    </div>
  );
}
