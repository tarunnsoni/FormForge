import { Menu, X, FileText } from "lucide-react";
import { useState } from "react";

import {
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/tanstack-react-start";
import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import HeaderUser from "@/integrations/clerk/header-user";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200/80 bg-[#faf9fc]/90 backdrop-blur-md">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex size-8 items-center justify-center rounded-lg bg-indigo-500 text-white shadow-sm">
            <FileText className="size-4.5" strokeWidth={2.2} />
          </div>

          <span className="text-[17px] font-semibold tracking-[-0.02em] text-neutral-900">
            FormForge
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#features"
            className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-950"
          >
            Features
          </a>

          <a
            href="#how-it-works"
            className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-950"
          >
            How it Works
          </a>
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          <HeaderUser />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <Show when="signed-in">
            <UserButton />
          </Show>

          <button
            type="button"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((value) => !value)}
            className="flex size-9 items-center justify-center rounded-lg text-neutral-700 transition-colors hover:bg-neutral-100"
          >
            {isOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-neutral-200 bg-[#faf9fc] md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4 sm:px-8">
            <a
              href="#features"
              onClick={() => setIsOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100"
            >
              Features
            </a>

            <a
              href="#how-it-works"
              onClick={() => setIsOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100"
            >
              How it Works
            </a>

            <div className="my-2 h-px bg-neutral-200" />

            <Show when="signed-out">
              <Button asChild variant='secondary'>
                <SignInButton mode="modal">Sign In</SignInButton>
              </Button>

              <Button
                asChild
                className="h-10 rounded-lg bg-indigo-600 px-5 text-sm font-medium text-white shadow-sm transition-all hover:bg-indigo-700 hover:shadow-md"
              >
                <SignUpButton mode="modal">Sign Up</SignUpButton>
              </Button>
            </Show>

            <Show when="signed-in">
              <Button
                asChild
                className="h-10 rounded-lg bg-indigo-600 px-5 text-sm font-medium text-white shadow-sm transition-all hover:bg-indigo-700 hover:shadow-md"
              >
                <Link
                  to="/dashboard/forms/new"
                  onClick={() => setIsOpen(false)}
                >
                  Create a Form
                </Link>
              </Button>
            </Show>
          </nav>
        </div>
      )}
    </header>
  );
}
