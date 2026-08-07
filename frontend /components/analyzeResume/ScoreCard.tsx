import { scoreColor } from "@/lib/utils";

export function ScoreCard({
  label,
  score,
}: {
  label: string;
  score: number | null; 
}) {
  const circumference = 2 * Math.PI * 34;

  if (score === null) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm">
        <svg viewBox="0 0 80 80" className="mx-auto h-20 w-20 -rotate-90">
          <circle
            cx="40"
            cy="40"
            r="34"
            fill="none"
            stroke="#F3F4F6"
            strokeWidth="8"
          />
        </svg>
        <div className="-mt-[52px] text-2xl font-extrabold text-gray-300">
          —
        </div>
        <p className="mt-8 text-sm font-medium text-gray-600">{label}</p>
        <p className="mt-0.5 text-xs text-gray-400">No job description given</p>
      </div>
    );
  }

  const c = scoreColor(score);
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm">
      <svg viewBox="0 0 80 80" className="mx-auto h-20 w-20 -rotate-90">
        <circle
          cx="40"
          cy="40"
          r="34"
          fill="none"
          stroke="#F3F4F6"
          strokeWidth="8"
        />
        <circle
          cx="40"
          cy="40"
          r="34"
          fill="none"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={`${c.ring} transition-all duration-700`}
        />
      </svg>
      <div className={`-mt-[52px] text-2xl font-extrabold ${c.text}`}>
        {score}
      </div>
      <p className="mt-8 text-sm font-medium text-gray-600">{label}</p>
    </div>
  );
}
