"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Sparkles, ArrowRight } from "lucide-react";
import { navLinks } from "@/consts";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full">
      <nav
        className="
        mx-auto mt-4 flex max-w-7xl items-center justify-between
        rounded-2xl
        border border-[var(--color-border)]
        bg-[var(--color-background)]/80
        px-6 py-4
        shadow-lg backdrop-blur-xl
        animate-in fade-in slide-in-from-top-5 duration-700
        "
      >
        {/* Logo */}
        <Link
          href="/"
          className="
          group flex items-center gap-2
          text-xl font-bold tracking-tight
          text-[var(--color-text)]
          "
        >
          <div
            className="
            flex h-10 w-10 items-center justify-center
            rounded-xl
            bg-[var(--color-secondary)]
            text-[var(--color-secondary-foreground)]
            transition-transform duration-300
            group-hover:rotate-12
            "
          >
            <Sparkles size={20} />
          </div>

          <span>
            Resume
            <span className="text-[var(--color-primary)]">AI</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="
              relative text-sm font-medium
              text-[var(--color-text-muted)]
              transition-colors duration-300
              hover:text-[var(--color-text)]

              after:absolute
              after:-bottom-2
              after:left-0
              after:h-[2px]
              after:w-0
              after:bg-[var(--color-primary)]
              after:transition-all
              after:duration-300

              hover:after:w-full
              "
            >
              {link.name}
            </Link>
          ))}

          {/* CTA */}
          <Link
            href="/analyze"
            className="
            flex items-center gap-2
            rounded-xl
            bg-[var(--color-secondary)]
            px-5 py-2.5

            text-sm font-semibold
            text-[var(--color-secondary-foreground)]

            transition-all duration-300

            hover:-translate-y-1
            hover:bg-[var(--color-secondary-hover)]
            hover:shadow-xl
            "
          >
            Analyze Now
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="
          rounded-lg
          p-2
          text-[var(--color-text)]
          transition
          hover:bg-[var(--color-surface)]
          md:hidden
          "
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div
          className="
          mx-4 mt-3
          rounded-2xl

          border
          border-[var(--color-border)]

          bg-[var(--color-background)]/90

          p-6
          shadow-xl
          backdrop-blur-xl

          animate-in
          fade-in
          slide-in-from-top-5
          duration-300

          md:hidden
          "
        >
          <div className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setOpen(false)}
                className="
                text-sm
                font-medium

                text-[var(--color-text-muted)]

                transition
                hover:text-[var(--color-primary)]
                "
              >
                {link.name}
              </Link>
            ))}

            <Link
              href="/analyze"
              onClick={() => setOpen(false)}
              className="
              rounded-xl

              bg-[var(--color-primary)]

              px-5 py-3

              text-center
              font-semibold

              text-[var(--color-primary-foreground)]

              transition

              hover:bg-[var(--color-primary-hover)]
              "
            >
              Analyze Resume
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
