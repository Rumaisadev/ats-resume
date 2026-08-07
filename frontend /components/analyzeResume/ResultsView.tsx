"use client";
import { ScoreCard } from "./ScoreCard";
import { CheckRow } from "./CheckRow";
import { Sparkles } from "lucide-react";
interface Flag {
  type: "weak_verb" | "unquantified" | "passive_voice" | "unclear";
  line: string;
  suggestion: string;
}

interface AnalysisResult {
  filename: string;
  word_count: number;
  preview: string;
  job_description_length: number;
  checks: {
    contact: { has_email: boolean; has_phone: boolean; passed: boolean };
    length: { word_count: number; status: string; score: number };
    sections: {
      sections_found: string[];
      has_experience: boolean;
      has_education: boolean;
      has_skills: boolean;
      score: number;
    };
    layout: { issues: string[]; score: number };
    ats_score: number;
    structure_score: number;
  };
  keywords: {
    required_skills: string[];
    matched_skills: string[];
    missing_skills: string[];
    score: number;
  };
  flags: Flag[];
  summary: string;
  reviewed: boolean;
}
const flagLabels: Record<Flag["type"], string> = {
  weak_verb: "Weak verb",
  unquantified: "No measurable outcome",
  passive_voice: "Passive voice",
  unclear: "Unclear",
};

export default function ResultsView({ result }: { result: AnalysisResult }) {
  const { checks, keywords } = result;
  const hasJobDescription = result.job_description_length > 0;
  const hasTrackedSkills = keywords.required_skills.length > 0;
  return (
    <div className="mx-auto max-w-4xl">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">Analysis for</p>
          <h2 className="text-xl font-semibold text-gray-900">
            {result.filename}
          </h2>
        </div>
        <span className="rounded-full bg-orange-50 px-4 py-1.5 text-sm font-medium text-orange-600">
          {result.word_count} words
        </span>
      </div>

      {/* Three honest scores, not one blended number */}
      <div className="grid grid-cols-3 gap-4">
        <ScoreCard label="ATS Score" score={checks.ats_score} />
        <ScoreCard label="Structure" score={checks.structure_score} />
        <ScoreCard
          label="Keyword Match"
          score={hasJobDescription ? keywords.score : null}
        />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Keywords */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="font-semibold text-gray-900">Keywords</h3>

          {!hasJobDescription ? (
            <div className="mt-4 flex flex-col items-center rounded-xl border border-dashed border-gray-200 py-8 text-center">
              <span className="text-2xl">📋</span>
              <p className="mt-3 text-sm font-medium text-gray-600">
                No job description provided
              </p>
              <p className="mt-1 max-w-[220px] text-xs text-gray-400">
                Paste a job posting next time to see which keywords your resume
                is missing.
              </p>
            </div>
          ) : !hasTrackedSkills ? (
            <div className="mt-4 flex flex-col items-center rounded-xl border border-dashed border-gray-200 py-8 text-center">
              <span className="text-2xl">🔍</span>
              <p className="mt-3 text-sm font-medium text-gray-600">
                No tracked skills found in this posting
              </p>
              <p className="mt-1 max-w-[220px] text-xs text-gray-400">
                This job description didn't mention any of the skills we
                currently check for.
              </p>
            </div>
          ) : (
            <>
              {keywords.missing_skills.length > 0 ? (
                <div className="mt-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-red-500">
                    Missing — add these
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {keywords.missing_skills.map((kw) => (
                      <span
                        key={kw}
                        className="rounded-full border border-red-200 bg-red-50 px-3 py-1 text-sm font-medium text-red-700"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="mt-4 flex items-center gap-2 rounded-xl bg-green-50 px-4 py-3">
                  <span className="text-green-600">✓</span>
                  <p className="text-sm font-medium text-green-700">
                    Every keyword from the posting was found
                  </p>
                </div>
              )}

              {keywords.matched_skills.length > 0 && (
                <div className="mt-5">
                  <p className="text-xs font-medium uppercase tracking-wide text-green-600">
                    Matched
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {keywords.matched_skills.map((kw) => (
                      <span
                        key={kw}
                        className="rounded-full border border-green-200 bg-green-50 px-3 py-1 text-sm font-medium text-green-700"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="font-semibold text-gray-900">Checks</h3>
          <div className="mt-4 space-y-3">
            <CheckRow
              label="Email address found"
              passed={checks.contact.has_email}
            />
            <CheckRow
              label="Phone number found"
              passed={checks.contact.has_phone}
            />
            <CheckRow
              label="Experience section"
              passed={checks.sections.has_experience}
            />
            <CheckRow
              label="Education section"
              passed={checks.sections.has_education}
            />
            <CheckRow
              label="Skills section"
              passed={checks.sections.has_skills}
            />
            <CheckRow
              label="No layout issues"
              passed={checks.layout.issues.length === 0}
            />
          </div>

          {checks.layout.issues.length > 0 && (
            <div className="mt-4 space-y-1.5 border-t border-gray-100 pt-4">
              {checks.layout.issues.map((issue, i) => (
                <p key={i} className="text-sm text-gray-500">
                  {issue}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* Bullet review — three possible states */}

        {/* Checks breakdown */}
      </div>
      {/* AI Summary */}
      {result.summary && (
        <div className="mt-6 rounded-2xl border border-orange-100 bg-orange-50/50 p-6">
          <span className="flex items-center gap-1.5 text-xs font-medium text-orange-600">
            <Sparkles size={12} />
            AI summary
          </span>
          <p className="mt-2 text-sm leading-relaxed text-gray-700">
            {result.summary}
          </p>
        </div>
      )}
      {!result.reviewed ? (
        <div></div>
      ) : // <div className="mt-6 flex items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-6">
      //   <span className="text-2xl">⚠️</span>
      //   <div>
      //     <p className="text-sm font-medium text-gray-900">
      //       Couldn't review bullet points
      //     </p>
      //     <p className="text-xs text-gray-500">{result.summary}</p>
      //   </div>
      // </div>
      result.flags.length === 0 ? (
        <div className="mt-6 flex items-center gap-3 rounded-2xl border border-green-100 bg-green-50/50 p-6">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
            ✓
          </span>
          <div>
            <p className="text-sm font-medium text-gray-900">
              Your bullet points are strong
            </p>
            <p className="text-xs text-gray-500">
              No weak verbs or unquantified claims found in your experience
              section.
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Suggested rewrites</h3>
            <span className="flex items-center gap-1.5 rounded-full bg-orange-50 px-2.5 py-1 text-xs font-medium text-orange-600">
              <Sparkles size={12} />
              AI-generated
            </span>
          </div>
          <p className="mt-1 text-xs text-gray-400">
            Review before using — AI suggestions can be imperfect.
          </p>

          <div className="mt-5 space-y-5">
            {result.flags.map((flag, i) => (
              <div
                key={i}
                className="border-t border-gray-100 pt-5 first:border-0 first:pt-0"
              >
                <span className="inline-block rounded-full bg-gray-100 px-2.5 py-0.5 text-[11px] font-medium text-gray-600">
                  {flagLabels[flag.type]}
                </span>

                <div className="mt-3 flex items-start gap-2.5">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs text-red-600">
                    ✕
                  </span>
                  <p className="text-sm text-gray-500 line-through decoration-red-300">
                    {flag.line}
                  </p>
                </div>

                <div className="mt-2 flex items-start gap-2.5">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-100 text-xs text-green-600">
                    ✓
                  </span>
                  <p className="text-sm font-medium text-gray-900">
                    {flag.suggestion}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
