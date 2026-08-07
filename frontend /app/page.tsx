"use client";

import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <main className="overflow-x-hidden">
        <Hero />
        <Features />
      </main>

      <Footer />
    </>
  );
}
