"use client";
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { Container } from "./Container";
import { Logo } from "./Logo";
import { RequestDemoButton } from "./RequestDemoButton";

const navHrefs = [
  { key: "product" as const, href: "/#product" },
  { key: "solutions" as const, href: "/#solutions" },
  { key: "howItWorks" as const, href: "/#how-it-works" },
  { key: "company" as const, href: "/company" },
];

function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggle = () => {
    router.replace(pathname, { locale: locale === "en" ? "zh" : "en" });
  };

  return (
    <button
      onClick={toggle}
      className="text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors px-2"
      aria-label="Switch language"
    >
      {locale === "en" ? "CN" : "EN"}
    </button>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const t = useTranslations("Navbar");

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <Container className="flex h-16 items-center justify-between">
        <a href="/" className="flex-shrink-0">
          <Logo />
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navHrefs.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className="text-sm font-medium text-gray-600 hover:text-brand-primary transition-colors"
            >
              {t(item.key)}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <LanguageSwitcher />
          <RequestDemoButton className="inline-flex items-center rounded-lg bg-brand-primary px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors shadow-sm">
            {t("requestDemo")}
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
            {navHrefs.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="text-sm font-medium text-gray-700 hover:text-brand-primary"
                onClick={() => setOpen(false)}
              >
                {t(item.key)}
              </a>
            ))}
            <div className="flex items-center gap-3 pt-1">
              <LanguageSwitcher />
              <RequestDemoButton className="flex-1 inline-flex justify-center rounded-lg bg-brand-primary px-4 py-2.5 text-sm font-semibold text-white">
                {t("requestDemo")}
              </RequestDemoButton>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
