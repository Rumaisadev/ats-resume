export function CheckRow({
  label,
  passed,
}: {
  label: string;
  passed: boolean;
}) {
  return (
    <div className="flex items-center gap-2.5 text-sm">
      <span
        className={`flex h-5 w-5 items-center justify-center rounded-full text-xs ${
          passed ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
        }`}
      >
        {passed ? "✓" : "!"}
      </span>
      <span className="text-gray-700">{label}</span>
    </div>
  );
}
