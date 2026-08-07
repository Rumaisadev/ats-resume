"use client";
import { analyzeResume } from "@/lib/api";
import { X, FileText } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import ResultsView from "@/components/analyzeResume/ResultsView";
import { deliverables, loadingSteps } from "@/consts";
export default function AnalyzePage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState("");
  const [result, setResult] = useState<any>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isProcessing) return;
    setCurrentStep(0);
    const interval = setInterval(() => {
      setCurrentStep((prev) =>
        prev >= loadingSteps.length - 1 ? prev : prev + 1,
      );
    }, 2200);
    return () => clearInterval(interval);
  }, [isProcessing]);

  useEffect(() => {
    if ((isProcessing || result) && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [isProcessing, result]);

  const formSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fileInput = form.elements.namedItem("resumeFile") as HTMLInputElement;
    const file = fileInput.files?.[0];
    const jobDescription = (
      form.elements.namedItem("jobDescription") as HTMLTextAreaElement
    ).value;

    if (!file) {
      setError("Please select a resume file.");
      return;
    }

    setIsProcessing(true);
    setError("");
    setResult(null);

    try {
      const data = await analyzeResume(file, jobDescription);
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const MAX_SIZE = 5 * 1024 * 1024;

    if (file.size > MAX_SIZE) {
      setError("File size must be less than 5 MB.");
      setSelectedFile(null);
      return;
    }
    setError("");
    setSelectedFile(file);
  };

  return (
    <div className="min-h-screen bg-white px-6 pb-20 pt-32">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="rounded-full bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-600">
            AI-Powered
          </span>
          <h1 className="mt-5 text-5xl font-extrabold tracking-tight text-gray-900">
            Resume Analysis
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Upload your resume and receive an ATS report in seconds.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm lg:col-span-2">
            <h2 className="text-2xl font-semibold text-gray-900">
              Upload Resume
            </h2>
            <p className="mt-2 text-gray-500">PDF or DOCX, up to 5 MB</p>

            <form onSubmit={formSubmitHandler} className="mt-8">
              <label
                htmlFor="resume"
                className="flex h-72 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-orange-200 bg-orange-50/50 px-6 text-center transition hover:border-orange-400 hover:bg-orange-50"
              >
                <FileText
                  className="h-12 w-12 text-orange-400"
                  strokeWidth={1.5}
                />
                <h3 className="mt-5 text-xl font-semibold text-gray-900">
                  Drag & drop your resume
                </h3>
                <p className="mt-2 text-gray-500">or click to browse</p>

                {selectedFile && (
                  <div
                    className="mt-6 flex w-full max-w-sm items-center justify-between rounded-xl bg-white px-5 py-3 shadow-sm"
                    onClick={(e) => e.preventDefault()}
                  >
                    <div className="min-w-0 text-left">
                      <p className="text-sm font-medium text-gray-700">
                        Selected
                      </p>
                      <p className="mt-0.5 truncate text-sm text-orange-600">
                        {selectedFile.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedFile(null)}
                      className="rounded-full p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-600"
                      aria-label="Remove file"
                    >
                      <X size={18} />
                    </button>
                  </div>
                )}
              </label>

              <input
                id="resume"
                type="file"
                name="resumeFile"
                accept=".pdf,.docx"
                className="hidden"
                onChange={fileChangeHandler}
              />

              <label className="mb-2 mt-8 block font-medium text-gray-900">
                Job Description{" "}
                <span className="font-normal text-gray-400">(optional)</span>
              </label>
              <textarea
                rows={8}
                name="jobDescription"
                placeholder="Paste the job description to receive keyword matching..."
                className="w-full rounded-xl border border-gray-200 p-4 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-500/30"
              />

              {error && (
                <p className="mt-4 text-sm font-medium text-red-600">{error}</p>
              )}

              <button
                type="submit"
                disabled={isProcessing}
                className="mt-8 w-full rounded-xl bg-orange-500 py-4 text-lg font-semibold text-white transition hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/20 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {isProcessing ? "Analyzing..." : "Analyze resume"}
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900">
                You&apos;ll receive
              </h3>
              <div className="mt-6 space-y-4">
                {deliverables.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <span className="text-green-600">✓</span>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-gradient-to-br from-orange-500 to-red-500 p-6 text-white">
              <h3 className="text-lg font-semibold text-white/90">
                Average improvement
              </h3>
              <p className="mt-4 text-5xl font-extrabold">+38%</p>
              <p className="mt-2 text-white/80">
                Higher ATS score after AI optimization.
              </p>
            </div>
          </div>
        </div>

        {/* Processing / results appear BELOW the form, form stays visible above */}
        {(isProcessing || result) && (
          <div ref={resultRef} className="mt-12 scroll-mt-24">
            {isProcessing ? (
              <div className="mx-auto max-w-2xl rounded-3xl border border-gray-200 bg-white p-8 shadow-lg shadow-orange-900/5">
                <div className="flex items-center gap-5">
                  <div className="h-12 w-12 animate-spin rounded-full border-4 border-orange-100 border-t-orange-500" />
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {loadingSteps[currentStep].title}
                    </h2>
                    <p className="mt-1 text-gray-500">
                      {loadingSteps[currentStep].description}
                    </p>
                  </div>
                </div>
                <div className="mt-6 flex gap-1.5">
                  {loadingSteps.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-colors ${
                        i <= currentStep ? "bg-orange-500" : "bg-gray-100"
                      }`}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <ResultsView result={result} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
