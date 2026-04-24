"use client";
import { useState } from "react";
import { Container } from "./Container";
import { Logo } from "./Logo";
import { RequestDemoButton } from "./RequestDemoButton";

const nav = [
  { label: "Product", href: "/#product" },
  { label: "Solutions", href: "/#solutions" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Company", href: "/company" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <Container className="flex h-16 items-center justify-between">
        <a href="/" className="flex-shrink-0">
          <Logo />
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-gray-600 hover:text-brand-primary transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <RequestDemoButton className="inline-flex items-center rounded-lg bg-brand-primary px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors shadow-sm">
            Request Demo
          </RequestDemoButton>
        </div>

        <button
          className="md:hidden p-2 text-gray-600"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </Container>

      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <Container className="py-4 flex flex-col gap-4">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-gray-700 hover:text-brand-primary"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <RequestDemoButton className="inline-flex justify-center rounded-lg bg-brand-primary px-4 py-2.5 text-sm font-semibold text-white">
              Request Demo
            </RequestDemoButton>
          </Container>
        </div>
      )}
    </header>
  );
}
