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

const featureIcons = [
  <svg key="1" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>,
  <svg key="2" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>,
  <svg key="3" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3" /></svg>,
  <svg key="4" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg>,
  <svg key="5" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>,
  <svg key="6" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" /></svg>,
];

const audienceEmojis = ["🚢", "🏦", "📦"];

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

export default async function TradeFinancePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("TradeFinancePage");
  const s = await getTranslations("Solutions");

  const features = featureIcons.map((icon, i) => ({
    icon,
    title: s(`tfF${i + 1}title` as never),
    body: s(`tfF${i + 1}body` as never),
  }));

  const audiences = audienceEmojis.map((emoji, i) => ({
    emoji,
    label: s(`tfA${i + 1}label` as never),
    body: s(`tfA${i + 1}body` as never),
  }));

  const steps = [1, 2, 3, 4].map((n) => ({
    label: s(`tfS${n}label` as never),
    desc: s(`tfS${n}desc` as never),
  }));

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

      {/* Hero */}
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
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                </RequestDemoButton>
                <a href="#calculator" className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-colors">
                  {t("heroCalc")}
                </a>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Audiences */}
      <section className="border-t border-gray-100 bg-gray-50/60 py-20">
        <Container>
          <FadeIn>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-8">{s("tfAudienceTitle")}</p>
          </FadeIn>
          <div className="grid gap-5 md:grid-cols-3">
            {audiences.map((a, i) => (
              <FadeIn key={a.label} delay={i * 70}>
                <div className="flex h-full items-start gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                  <span className="text-3xl flex-shrink-0">{a.emoji}</span>
                  <div>
                    <div className="text-sm font-bold text-gray-900">{a.label}</div>
                    <div className="mt-1 text-sm leading-relaxed text-gray-500">{a.body}</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* Features */}
      <section className="border-t border-gray-100 py-20">
        <Container>
          <FadeIn>
            <h2 className="text-3xl font-black tracking-tight text-gray-900 md:text-4xl">{s("tfFeaturesHeading")}</h2>
          </FadeIn>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <FadeIn key={i} delay={i * 55}>
                <div className="h-full rounded-2xl border border-gray-100 bg-white p-5 shadow-sm hover:border-brand-primary/20 hover:shadow-md transition-all">
                  <div className="inline-flex items-center justify-center rounded-lg bg-brand-primary/10 p-2 text-brand-primary mb-3">{f.icon}</div>
                  <h3 className="text-sm font-bold text-gray-900">{f.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-gray-500">{f.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* Steps */}
      <section className="border-t border-gray-100 bg-gray-50/60 py-20">
        <Container>
          <FadeIn>
            <h2 className="text-3xl font-black tracking-tight text-gray-900 md:text-4xl text-center">{s("tfStepsHeading")}</h2>
          </FadeIn>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <FadeIn key={i} delay={i * 60}>
                <div className="relative flex flex-col">
                  {i < steps.length - 1 && (
                    <div className="absolute top-4 left-10 right-0 h-px bg-gradient-to-r from-brand-primary/30 to-brand-cyan/20 hidden lg:block" />
                  )}
                  <div className="relative z-10 mb-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-brand-primary text-xs font-black text-white">{i + 1}</div>
                  <div className="text-sm font-bold text-gray-900">{step.label}</div>
                  <div className="mt-1.5 text-xs leading-relaxed text-gray-500">{step.desc}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* Calculator */}
      <section id="calculator" className="scroll-mt-20 border-t border-gray-100 py-20 md:py-24">
        <Container>
          <FadeIn className="mb-10 text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-brand-primary mb-3">{t("calcLabel")}</p>
            <h2 className="mx-auto max-w-2xl text-3xl font-black tracking-tight text-gray-900 md:text-4xl">{t("calcHeading")}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">{t("calcDesc")}</p>
          </FadeIn>
          <TradeCalculator />
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
