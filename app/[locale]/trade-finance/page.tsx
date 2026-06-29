import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CTA } from "@/components/CTA";
import { Container } from "@/components/Container";
import { FadeIn } from "@/components/FadeIn";
import { RequestDemoButton } from "@/components/RequestDemoButton";
import { TradeCalculator } from "@/components/TradeCalculator";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "TradeFinancePage" });
  return buildMetadata({ locale, path: "trade-finance", title: t("metaTitle"), description: t("metaDesc") });
}

const ArrowRight = ({ className = "" }: { className?: string }) => (
  <svg className={className} width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);

const IconLock = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 0h10.5a1.5 1.5 0 011.5 1.5v6.75a1.5 1.5 0 01-1.5 1.5H6.75a1.5 1.5 0 01-1.5-1.5v-6.75a1.5 1.5 0 011.5-1.5z" />
  </svg>
);

const IconBank = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 10.5v7.5m4.5-7.5v7.5m6-7.5v7.5m4.5-7.5v7.5M3.75 10.5h16.5L12 3.75 3.75 10.5z" />
  </svg>
);

const IconGlobe = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18zm0 0c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3M3.6 9h16.8M3.6 15h16.8" />
  </svg>
);

const IconCheck = ({ className = "" }: { className?: string }) => (
  <svg className={className} width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const IconCalculator = () => (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z" />
  </svg>
);

const IconChevronDown = ({ className = "" }: { className?: string }) => (
  <svg className={className} width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
);

const IconBolt = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
  </svg>
);

function BlockGrid() {
  const blocks = [
    { col: 0, row: 0, color: "#2DAAFF", opacity: 0.5 },
    { col: 1, row: 0, color: "#2DAAFF", opacity: 0.4 },
    { col: 2, row: 0, color: "#55DCFF", opacity: 0.5 },
    { col: 1, row: 1, color: "#0073FF", opacity: 0.45 },
    { col: 2, row: 1, color: "#2DAAFF", opacity: 0.4 },
    { col: 3, row: 1, color: "#2DAAFF", opacity: 0.35 },
    { col: 1, row: 2, color: "#55DCFF", opacity: 0.4 },
    { col: 2, row: 2, color: "#2DAAFF", opacity: 0.35 },
    { col: 2, row: 3, color: "#2DAAFF", opacity: 0.3 },
  ];
  const unit = 72;
  const W = 4 * unit;
  const H = 4 * unit;
  return (
    <svg width={W * 1.5} height={H * 1.5} viewBox={`0 0 ${W} ${H}`}>
      {blocks.map((b, i) => (
        <rect key={i} x={b.col * unit} y={b.row * unit} width={unit - 2} height={unit - 2} fill={b.color} opacity={b.opacity} rx={4} />
      ))}
    </svg>
  );
}

/** A dotted "money locked over time" track for the capital-in-transit visual. */
function DottedTrack() {
  return (
    <span className="mx-3 hidden h-px flex-1 items-center sm:flex" aria-hidden>
      <span className="h-px w-full bg-[repeating-linear-gradient(90deg,#F59E0B_0_6px,transparent_6px_12px)] opacity-60" />
    </span>
  );
}

export default async function TradeFinancePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("TradeFinancePage");

  const pillars = [
    { n: "01", title: t("sol1Title"), body: t("sol1Body") },
    { n: "02", title: t("sol2Title"), body: t("sol2Body") },
    { n: "03", title: t("sol3Title"), body: t("sol3Body") },
  ];

  const escrowReleases = [t("escrowR1"), t("escrowR2"), t("escrowR3")];
  const importerItems = [t("ffI1"), t("ffI2"), t("ffI3")];
  const exporterItems = [t("ffE1"), t("ffE2"), t("ffE3")];

  const faqs = [1, 2, 3, 4].map((n) => ({
    q: t(`faq${n}q` as never),
    a: t(`faq${n}a` as never),
  }));

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero — the trust gap */}
      <section className="relative overflow-hidden pt-28 pb-20 bg-white">
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-brand-primary/5 rounded-full blur-3xl" />
        <div className="pointer-events-none absolute -top-4 right-0 opacity-60 hidden lg:block">
          <BlockGrid />
        </div>
        <Container className="relative">
          <div className="max-w-3xl">
            <FadeIn>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-primary mb-6">{t("heroLabel")}</p>
            </FadeIn>
            <FadeIn delay={80}>
              <h1 className="text-5xl font-black leading-[1.05] tracking-tight text-gray-900 md:text-6xl">{t("heroHeadline")}</h1>
            </FadeIn>
            <FadeIn delay={160}>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-gray-500">{t("heroDesc")}</p>
            </FadeIn>
            <FadeIn delay={240}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <RequestDemoButton className="inline-flex items-center gap-2 rounded-xl bg-brand-primary px-6 py-3 text-sm font-bold text-white shadow-lg shadow-brand-primary/25 hover:bg-blue-700 transition-colors">
                  {t("heroCta")}
                  <ArrowRight />
                </RequestDemoButton>
                <a href="#calculator" className="group inline-flex items-center gap-2 rounded-xl border border-brand-primary/20 bg-brand-primary/10 px-6 py-3 text-sm font-bold text-brand-primary hover:bg-brand-primary/15 hover:border-brand-primary/30 transition-colors">
                  <IconCalculator />
                  {t("heroCalc")}
                  <IconChevronDown className="transition-transform group-hover:translate-y-0.5" />
                </a>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* The Problem */}
      <section className="border-t border-gray-100 bg-gray-50/60 py-20">
        <Container>
          <FadeIn>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-primary mb-3">{t("problemLabel")}</p>
            <h2 className="max-w-2xl text-3xl font-black tracking-tight text-gray-900 md:text-4xl">{t("problemHeading")}</h2>
          </FadeIn>

          <div className="mt-12 space-y-5">
            {/* Problem 01 — the standoff */}
            <FadeIn>
              <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm md:p-10">
                <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-3">{t("p1Tag")}</p>
                    <h3 className="text-2xl font-black tracking-tight text-gray-900">{t("p1Title")}</h3>
                    <p className="mt-4 text-[15px] leading-relaxed text-gray-500">{t("p1Body")}</p>
                  </div>
                  <div className="flex items-stretch gap-3">
                    <div className="flex-1 rounded-2xl bg-gray-50 p-5">
                      <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400">{t("standoffImporterLabel")}</p>
                      <p className="mt-2 text-base font-bold leading-snug text-gray-900">“{t("standoffImporter")}”</p>
                    </div>
                    <div className="flex flex-col items-center justify-center px-1 text-center">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-navy text-white">
                        <IconLock />
                      </span>
                      <span className="mt-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">{t("standoffLabel")}</span>
                    </div>
                    <div className="flex-1 rounded-2xl bg-gray-50 p-5 text-right">
                      <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400">{t("standoffExporterLabel")}</p>
                      <p className="mt-2 text-base font-bold leading-snug text-gray-900">“{t("standoffExporter")}”</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Problem 02 — capital in transit */}
            <FadeIn delay={60}>
              <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm md:p-10">
                <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-3">{t("p2Tag")}</p>
                    <h3 className="text-2xl font-black tracking-tight text-gray-900">{t("p2Title")}</h3>
                    <p className="mt-4 text-[15px] leading-relaxed text-gray-500">{t("p2Body")}</p>
                  </div>
                  <div>
                    <div className="rounded-2xl bg-gray-50 p-5">
                      <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400">{t("timelineImporterLabel")}</p>
                      <div className="mt-2 flex items-center text-sm font-bold text-gray-900">
                        <span>{t("timelineImporterFrom")}</span>
                        <DottedTrack />
                        <span className="ml-auto sm:ml-0">{t("timelineImporterTo")}</span>
                      </div>
                    </div>
                    <div className="mt-3 rounded-2xl bg-gray-50 p-5">
                      <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400">{t("timelineExporterLabel")}</p>
                      <div className="mt-2 flex items-center text-sm font-bold text-gray-900">
                        <span>{t("timelineExporterFrom")}</span>
                        <DottedTrack />
                        <span className="ml-auto sm:ml-0">{t("timelineExporterTo")}</span>
                      </div>
                    </div>
                    <p className="mt-4 flex items-center gap-2 text-xs font-bold text-amber-600">
                      <span className="h-2 w-2 rounded-sm bg-amber-500" />
                      {t("timelineNote")}
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Problem 03 — financing doesn't reach */}
            <FadeIn delay={120}>
              <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm md:p-10">
                <div className="max-w-2xl">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-3">{t("p3Tag")}</p>
                  <h3 className="text-2xl font-black tracking-tight text-gray-900">{t("p3Title")}</h3>
                  <p className="mt-4 text-[15px] leading-relaxed text-gray-500">{t("p3Body")}</p>
                </div>
                <div className="mt-8 grid gap-4 md:grid-cols-2">
                  <div className="flex items-start gap-4 rounded-2xl bg-gray-50 p-5">
                    <span className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary"><IconBank /></span>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">{t("p3aTitle")}</h4>
                      <p className="mt-1 text-sm leading-relaxed text-gray-500">{t("p3aBody")}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 rounded-2xl bg-gray-50 p-5">
                    <span className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary"><IconGlobe /></span>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">{t("p3bTitle")}</h4>
                      <p className="mt-1 text-sm leading-relaxed text-gray-500">{t("p3bBody")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* The Solution — three pillars */}
      <section className="relative overflow-hidden border-t border-white/5 bg-brand-navy py-20">
        <div className="pointer-events-none absolute -right-10 top-10 opacity-30 hidden lg:block">
          <BlockGrid />
        </div>
        <Container className="relative">
          <FadeIn>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-cyan mb-3">{t("solutionLabel")}</p>
            <h2 className="max-w-2xl text-3xl font-black tracking-tight text-white md:text-4xl">{t("solutionHeading")}</h2>
          </FadeIn>
          <div className="mt-10 space-y-4">
            {pillars.map((p, i) => (
              <FadeIn key={p.n} delay={i * 70}>
                <div className="flex items-center gap-6 rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/10">
                  <span className="text-2xl font-black text-brand-cyan tabular-nums">{p.n}</span>
                  <div>
                    <h3 className="text-lg font-bold text-white">{p.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-white/55">{p.body}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* Calculator — featured */}
      <section id="calculator" className="scroll-mt-20 relative overflow-hidden bg-gradient-to-b from-brand-primary/[0.06] to-white py-20 md:py-24">
        <div className="pointer-events-none absolute top-0 left-1/2 h-[360px] w-[900px] -translate-x-1/2 -translate-y-1/4 rounded-full bg-brand-primary/10 blur-3xl" />
        <Container className="relative">
          <FadeIn className="mb-10 text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-brand-primary mb-3">{t("calcLabel")}</p>
            <h2 className="mx-auto max-w-2xl text-3xl font-black tracking-tight text-gray-900 md:text-4xl">{t("calcHeading")}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">{t("calcDesc")}</p>
          </FadeIn>
          <FadeIn delay={80}>
            <div className="rounded-[2rem] border border-brand-primary/15 bg-gray-50/80 p-3 shadow-xl shadow-brand-primary/10 sm:p-4">
              <TradeCalculator />
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* 01 · Conditional escrow */}
      <section className="border-t border-gray-100 py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <FadeIn>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-primary mb-3">{t("escrowLabel")}</p>
              <h2 className="text-3xl font-black tracking-tight text-gray-900 md:text-4xl">{t("escrowHeading")}</h2>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-gray-500">{t("escrowDesc")}</p>
            </FadeIn>
            <FadeIn delay={80}>
              <div className="rounded-3xl border border-gray-100 bg-gray-50/70 p-7">
                <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400">{t("escrowLifecycleLabel")}</p>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full bg-brand-primary/10 px-3 py-1.5 text-xs font-bold text-brand-primary"><span className="h-1.5 w-1.5 rounded-full bg-brand-primary" />{t("escrowStage1")}</span>
                  <ArrowRight className="text-gray-300" />
                  <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1.5 text-xs font-bold text-amber-700"><span className="h-1.5 w-1.5 rounded-full bg-amber-500" />{t("escrowStage2")}</span>
                  <ArrowRight className="text-gray-300" />
                  <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-bold text-emerald-700"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />{t("escrowStage3")}</span>
                </div>
                <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-5">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400">{t("escrowReleaseLabel")}</p>
                  <ul className="mt-3 space-y-2.5">
                    {escrowReleases.map((r) => (
                      <li key={r} className="flex items-center gap-3 text-base font-bold text-gray-900">
                        <IconCheck className="text-emerald-500" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* 02 · Financing / 03 · Factoring */}
      <section className="border-t border-gray-100 bg-gray-50/60 py-20">
        <Container>
          <FadeIn>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-primary mb-3">{t("ffLabel")}</p>
            <h2 className="max-w-2xl text-3xl font-black tracking-tight text-gray-900 md:text-4xl">{t("ffHeading")}</h2>
          </FadeIn>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <FadeIn>
              <div className="h-full rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
                <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400">{t("ffImporterLabel")}</p>
                <h3 className="mt-1 text-xl font-black text-brand-primary">{t("ffImporterTitle")}</h3>
                <ul className="mt-5 space-y-3">
                  {importerItems.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-[15px] font-medium text-gray-700">
                      <IconCheck className="text-brand-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
            <FadeIn delay={80}>
              <div className="h-full rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
                <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400">{t("ffExporterLabel")}</p>
                <h3 className="mt-1 text-xl font-black text-brand-primary">{t("ffExporterTitle")}</h3>
                <ul className="mt-5 space-y-3">
                  {exporterItems.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-[15px] font-medium text-gray-700">
                      <IconCheck className="text-brand-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
          <FadeIn delay={140}>
            <div className="mt-5 flex items-start gap-3 rounded-2xl bg-brand-primary/5 p-5 text-[15px] font-medium leading-relaxed text-brand-primary">
              <span className="mt-0.5 flex-shrink-0"><IconBolt /></span>
              <span>{t("ffNote")}</span>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* FAQ */}
      <section className="border-t border-gray-100 bg-gray-50/60 py-20">
        <Container>
          <div className="grid gap-12 md:grid-cols-[1fr_2fr]">
            <FadeIn>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">{t("faqLabel")}</p>
                <h2 className="text-3xl font-black tracking-tight text-gray-900 md:text-4xl">{t("faqHeading")}</h2>
              </div>
            </FadeIn>
            <div className="space-y-4">
              {faqs.map((f, i) => (
                <FadeIn key={i} delay={i * 50}>
                  <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                    <h3 className="text-base font-bold text-gray-900">{f.q}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-500">{f.a}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <CTA />
      <Footer />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </main>
  );
}
