import { FileText } from "lucide-react";

import { Link } from "@tanstack/react-router";

const footerLinks = [
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
  { label: "Security", href: "#" },
  { label: "System Status", href: "#" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="px-4 pb-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-t-2xl border border-neutral-200 bg-[#faf9fc]">
        <div className="flex flex-col gap-6 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-7 sm:py-5">
          {/* Brand + Copyright */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-2.5">
            <Link
              to="/"
              className="flex w-fit items-center gap-2 text-sm font-semibold tracking-tight text-neutral-900"
            >
              <span className="flex size-6 items-center justify-center rounded-md bg-indigo-600 text-white">
                <FileText
                  className="size-3.5"
                  strokeWidth={2.2}
                />
              </span>

              FormForge
            </Link>

            <span className="hidden text-neutral-300 sm:inline">
              /
            </span>

            <span className="text-[10px] leading-4 text-neutral-400 sm:text-[11px]">
              © {currentYear} FormForge, Inc. Crafted for clarity.
            </span>
          </div>

          <nav className="flex flex-wrap gap-x-5 gap-y-2 sm:justify-end">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[10px] text-neutral-500 transition-colors hover:text-neutral-900 sm:text-[11px]"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
