import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

import { footerLinks } from "@/consts";
import { FaGithub, FaLinkedin } from "react-icons/fa";
export default function Footer() {
  return (
    <footer
      className="
      border-t
      border-[var(--color-border)]
      bg-[var(--color-background)]
      "
    >
      <div
        className="
        mx-auto
        max-w-7xl
        px-6
        py-16
        "
      >
        <div
          className="
          grid
          gap-12
          md:grid-cols-4
          "
        >
          {/* Brand */}

          <div className="md:col-span-2">
            <Link
              href="/"
              className="
              flex
              items-center
              gap-3
              text-xl
              font-bold
              text-[var(--color-text)]
              "
            >
              <div
                className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl

                bg-[var(--color-secondary)]

                text-[var(--color-secondary-foreground)]
                "
              >
                <Sparkles size={20} />
              </div>
              Resume
              <span
                className="
                text-[var(--color-primary)]
                "
              >
                AI
              </span>
            </Link>

            <p
              className="
              mt-5
              max-w-md

              text-[var(--color-text-muted)]
              "
            >
              Optimize your resume with ATS insights, AI suggestions, keyword
              matching, and actionable improvements.
            </p>
          </div>

          {/* Links */}

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3
                className="
                font-semibold
                text-[var(--color-text)]
                "
              >
                {section.title}
              </h3>

              <ul
                className="
                mt-5
                space-y-3
                "
              >
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="
                      text-sm

                      text-[var(--color-text-muted)]

                      transition

                      hover:text-[var(--color-primary)]
                      "
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}

        <div
          className="
          mt-12
          flex
          flex-col
          items-center
          justify-between

          gap-5

          border-t
          border-[var(--color-border)]

          pt-8

          md:flex-row
          "
        >
          <p
            className="
            text-sm
            text-[var(--color-text-muted)]
            "
          >
            © {new Date().getFullYear()} ResumeAI. All rights reserved.
          </p>

          <div
            className="
            flex
            gap-4
            "
          >
            <Link
              href="#"
              className="
              rounded-lg
              border
              border-[var(--color-border)]

              p-2

              text-[var(--color-text)]

              transition

              hover:text-[var(--color-primary)]
              "
            >
              <FaGithub size={24} />
            </Link>

            <Link
              href="#"
              className="
              rounded-lg
              border
              border-[var(--color-border)]

              p-2

              text-[var(--color-text)]

              transition

              hover:text-[var(--color-primary)]
              "
            >
              <FaLinkedin size={24} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
