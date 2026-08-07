"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { ResumeScanPreview } from "./ResumeScanPreview";
export default function Hero() {
  return (
    <section
      className="
      relative
      min-h-screen
      overflow-hidden
      bg-white
      px-6
      pt-28
      pb-20
    "
    >
      {/* Background */}

      <div
        className="
        pointer-events-none
        absolute
        inset-0
        -z-10
      "
      >
        <div
          className="
          absolute
          -right-40
          top-20
          h-[600px]
          w-[600px]
          rounded-full
          bg-orange-400/10
          blur-[120px]
          animate-pulse
        "
        />

        <div
          className="
          absolute
          inset-0
          opacity-[0.035]
          "
          style={{
            backgroundImage:
              "linear-gradient(#111 1px, transparent 1px),linear-gradient(90deg,#111 1px,transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div
        className="
        mx-auto
        grid
        max-w-7xl
        items-center
        gap-20
        lg:grid-cols-[1fr_0.9fr]
      "
      >
        {/* LEFT */}

        <div
          className="
        animate-in
        fade-in
        slide-in-from-left-10
        duration-1000
        "
        >
          <div
            className="
            mb-7
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            border-orange-200
            bg-orange-50
            px-5
            py-2
            text-sm
            font-semibold
            text-orange-600
          "
          >
            <Sparkles size={16} />
            AI Resume Intelligence
          </div>

          <h1
            className="
            font-heading
            text-5xl
            font-bold
            leading-[1.05]
            tracking-tight
            text-gray-950
            sm:text-6xl
            lg:text-[72px]
          "
          >
            Get your resume
            <br />
            <span
              className="
              bg-gradient-to-r
              from-orange-500
              via-orange-600
              to-red-500
              bg-clip-text
              text-transparent
            "
            >
              noticed faster.
            </span>
          </h1>

          <p
            className="
            mt-7
            max-w-xl
            text-lg
            leading-relaxed
            text-gray-600
          "
          >
            Our AI analyzes your resume against real job descriptions, finds
            missing keywords, improves ATS compatibility, and tells you exactly
            what recruiters are looking for.
          </p>

          <div
            className="
            mt-10
            flex
            flex-wrap
            gap-4
          "
          >
            <Link
              href="/analyze"
              className="
              group
              flex
              items-center
              gap-2
              rounded-xl
              bg-orange-500
              px-8
              py-4
              font-heading
              font-semibold
              text-white
              shadow-lg
              shadow-orange-500/20
              transition-all
              hover:-translate-y-1
              hover:bg-orange-600
              hover:shadow-xl
            "
            >
              Analyze Resume
              <ArrowRight
                size={18}
                className="
              transition
              group-hover:translate-x-1
              "
              />
            </Link>

            <Link
              href="/templates"
              className="
              rounded-xl
              border
              border-gray-200
              bg-white
              px-8
              py-4
              font-heading
              font-semibold
              text-gray-900
              transition-all
              hover:-translate-y-1
              hover:border-orange-300
              hover:bg-orange-50
            "
            >
              Explore Templates
            </Link>
          </div>

          {/* Trust */}

          <div
            className="
          mt-8
          flex
          gap-6
          text-sm
          text-gray-500
          "
          >
            <span>✓ No signup</span>

            <span>✓ AI powered</span>

            <span>✓ Instant report</span>
          </div>
        </div>

        {/* RIGHT */}

        <ResumeScanPreview />
      </div>
    </section>
  );
}
