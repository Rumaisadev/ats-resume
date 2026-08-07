export function ResumeScanPreview() {
  return (
    <div
      className="
      relative
      flex
      items-center
      justify-center
      animate-in
      fade-in
      slide-in-from-right-10
      duration-1000
      "
    >
      {/* Background glow */}

      <div
        className="
        absolute
        h-[500px]
        w-[500px]
        rounded-full
        bg-orange-500/10
        blur-[120px]
        "
      />

      {/* Resume document */}

      <div
        className="
        relative
        w-[360px]
        rounded-2xl
        border
        border-gray-200
        bg-white
        p-8
        shadow-[0_30px_80px_-20px_rgba(0,0,0,0.25)]
        transition-all
        duration-700
        hover:-translate-y-3
        "
      >
        {/* Scanning animation */}

        <div
          className="
          pointer-events-none
          absolute
          left-5
          right-5
          top-0
          h-24
          rounded-full
          bg-gradient-to-b
          from-transparent
          via-orange-400/30
          to-transparent
          animate-scan
          "
        />

        {/* Resume top */}

        <div className="relative">
          <div
            className="
          h-5
          w-36
          rounded-md
          bg-gray-900
          "
          />

          <div
            className="
          mt-3
          h-2
          w-24
          rounded-full
          bg-gray-300
          "
          />

          <div
            className="
          mt-8
          flex
          gap-2
          "
          >
            <span
              className="
            rounded-full
            bg-orange-100
            px-3
            py-1
            text-[11px]
            font-medium
            text-orange-600
            "
            >
              React
            </span>

            <span
              className="
            rounded-full
            bg-green-100
            px-3
            py-1
            text-[11px]
            font-medium
            text-green-600
            "
            >
              ATS Ready
            </span>
          </div>
        </div>

        {/* Resume content */}

        <div className="mt-10 space-y-5">
          <div>
            <p
              className="
            mb-3
            text-[10px]
            font-bold
            tracking-[0.2em]
            text-gray-400
            "
            >
              EXPERIENCE
            </p>

            <div
              className="
            space-y-3
            "
            >
              <div
                className="
              h-2
              w-full
              rounded-full
              bg-gray-200
              "
              />

              <div
                className="
              h-2
              w-4/5
              rounded-full
              bg-gray-200
              "
              />
            </div>
          </div>

          {/* AI highlighted section */}

          <div
            className="
          rounded-xl
          border
          border-orange-200
          bg-orange-50
          p-4
          "
          >
            <p
              className="
            text-xs
            leading-relaxed
            text-gray-700
            "
            >
              Built scalable{" "}
              <span
                className="
              rounded
              bg-orange-200
              px-1
              font-semibold
              text-gray-900
              "
              >
                React applications
              </span>{" "}
              improving performance.
            </p>
          </div>

          <div
            className="
          rounded-xl
          border
          border-red-200
          bg-red-50
          p-4
          "
          >
            <p
              className="
            text-xs
            font-medium
            text-red-600
            "
            >
              ⚠ Missing keyword
            </p>

            <p
              className="
            mt-1
            text-xs
            text-gray-500
            "
            >
              Docker appears in job description
            </p>
          </div>
        </div>
      </div>

      {/* ATS Floating score */}

      <div
        className="
      absolute
      -right-8
      top-16
      rounded-2xl
      border
      border-gray-200
      bg-white/90
      p-5
      shadow-xl
      backdrop-blur
      "
      >
        <div
          className="
        relative
        flex
        h-20
        w-20
        items-center
        justify-center
        rounded-full
        bg-orange-100
        "
        >
          <div
            className="
          absolute
          inset-2
          rounded-full
          border-4
          border-orange-500
          "
          />

          <span
            className="
          font-heading
          text-xl
          font-bold
          text-gray-900
          "
          >
            92
          </span>
        </div>

        <p
          className="
        mt-2
        text-center
        text-[10px]
        font-bold
        tracking-widest
        text-gray-400
        "
        >
          ATS SCORE
        </p>
      </div>

      {/* Floating AI result */}

      <div
        className="
      absolute
      -left-14
      bottom-24
      rounded-xl
      border
      border-orange-200
      bg-white
      px-5
      py-4
      shadow-xl
      animate-bounce
      "
      >
        <p
          className="
        text-xs
        font-bold
        text-orange-600
        "
        >
          ✨ AI MATCH
        </p>

        <p
          className="
        mt-1
        text-xs
        text-gray-500
        "
        >
          18 keywords found
        </p>
      </div>
    </div>
  );
}
