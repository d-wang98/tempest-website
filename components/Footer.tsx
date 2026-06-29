import { getTranslations } from "next-intl/server";
import { Container } from "./Container";
import { LogoWhite } from "./Logo";
import { FadeIn } from "./FadeIn";

export async function Footer() {
  const t = await getTranslations("Footer");

  const links = {
    [t("groupProduct")]: [
      { label: t("linkFeatures"), href: "/#product" },
      { label: t("linkHowItWorks"), href: "/#how-it-works" },
      { label: t("linkTradeFinance"), href: "/trade-finance" },
      { label: t("linkCalculator"), href: "/calculator" },
    ],
    [t("groupCompany")]: [
      { label: t("linkAbout"), href: "/company" },
      { label: t("linkContact"), href: "mailto:info@tempest-pay.com" },
      { label: t("linkTwitter"), href: "https://x.com/Tempest_Pay" },
      { label: t("linkTelegram"), href: "https://t.me/dwang1215" },
      { label: t("linkLinkedin"), href: "https://www.linkedin.com/company/tempest-pay/" },
    ],
    [t("groupLegal")]: [
      { label: t("linkPrivacy"), href: "#" },
      { label: t("linkTerms"), href: "#" },
    ],
  };

  return (
    <footer className="bg-brand-navy text-white">
      <Container className="py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <FadeIn className="sm:col-span-2 lg:col-span-1">
            <div>
              <LogoWhite />
              <p className="mt-4 text-sm leading-relaxed text-white/55 max-w-xs">
                {t("tagline")}
              </p>
              <div className="mt-5 flex gap-3">
                <a
                  href="https://x.com/d_wang98"
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-all"
                  aria-label="X / Twitter"
                >
                  <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="https://t.me/dwang1215"
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-all"
                  aria-label="Telegram"
                >
                  <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/company/tempest-pay/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-all"
                  aria-label="LinkedIn"
                >
                  <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                  </svg>
                </a>
              </div>
            </div>
          </FadeIn>

          {Object.entries(links).map(([group, items], i) => (
            <FadeIn key={group} delay={(i + 1) * 80}>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">
                  {group}
                </h4>
                <ul className="space-y-2.5">
                  {items.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        className="text-sm text-white/60 hover:text-white transition-colors"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-white/35">
            {t("copyright", { year: new Date().getFullYear() })}
          </p>
          <p className="text-xs text-white/35">{t("domain")}</p>
        </div>
      </Container>
    </footer>
  );
}
