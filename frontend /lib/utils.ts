export function scoreColor(score: number) {
  if (score >= 80) return { text: "text-green-600", ring: "stroke-green-500" };
  if (score >= 50)
    return { text: "text-orange-600", ring: "stroke-orange-500" };
  return { text: "text-red-600", ring: "stroke-red-500" };
}
