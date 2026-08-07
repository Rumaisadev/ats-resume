import { UploadCloud, ScanSearch, FileCheck } from "lucide-react";

import FeatureCard from "./FeatureCard";

export default function Features() {
  return (
    <section
      className="
px-6
py-24
"
    >
      <div
        className="
mx-auto
max-w-6xl
"
      >
        <div className="text-center">
          <h2
            className="
text-4xl
font-bold
text-[var(--color-text)]
font-heading
"
          >
            Everything You Need To Get Hired
          </h2>

          <p
            className="
mt-4

text-[var(--color-text-muted)]
"
          >
            AI powered tools to improve your resume.
          </p>
        </div>

        <div
          className="
mt-16

grid

gap-6

md:grid-cols-3
"
        >
          <FeatureCard
            icon={<UploadCloud />}
            title="Upload Resume"
            text="Upload PDF or DOCX and analyze instantly."
          />

          <FeatureCard
            icon={<ScanSearch />}
            title="ATS Analysis"
            text="Find missing keywords and improve compatibility."
          />

          <FeatureCard
            icon={<FileCheck />}
            title="AI Suggestions"
            text="Receive actionable resume improvements."
          />
        </div>
      </div>
    </section>
  );
}
