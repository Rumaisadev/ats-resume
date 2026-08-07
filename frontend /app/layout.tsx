import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const sora = Sora({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
});
// apply sora.variable on your <body> or <html>, then reference font-display in Tailwind config:
// fontFamily: { display: ["var(--font-display)", "sans-serif"] }

export const metadata: Metadata = {
  title: "ResumeAI",
  description: "AI powered ATS resume analyzer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sora.variable} h-full antialiased`}>
      <body className="bg-[var(--color-background)] text-[var(--color-text)]">
        {" "}
        <Navbar></Navbar>
        {children}
      </body>
    </html>
  );
}
