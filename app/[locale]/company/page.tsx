import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/Container";
import { FadeIn } from "@/components/FadeIn";
import { RequestDemoButton } from "@/components/RequestDemoButton";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "CompanyPage" });
  return { title: t("metaTitle"), description: t("metaDesc") };
}

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

export default async function CompanyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("CompanyPage");

  const team = [
    {
      name: t("davidName"),
      role: t("davidRole"),
      bg: t("davidBg"),
      bio: t("davidBio"),
      photo: "/assets/images/David_headshot.jpg",
      initials: "DW",
    },
    {
      name: t("brianName"),
      role: t("brianRole"),
      bg: t("brianBg"),
      bio: t("brianBio"),
      photo: "/assets/images/brian_headshot.jpeg",
      initials: "BL",
    },
  ];

  const advisors = [
    {
      name: t("tonyName"),
      role: t("tonyRole"),
      affiliation: t("tonyAffiliation"),
      bio: t("tonyBio"),
      highlights: [t("tonyH1"), t("tonyH2"), t("tonyH3")],
      photo: "/assets/images/tony_headshot.jpeg",
      initials: "TL",
    },
  ];

  const partners = [
    { name: "Bridge", desc: t("bridgeDesc") },
    { name: "Privy", desc: t("privyDesc") },
    { name: "Matrixport", desc: t("matrixportDesc") },
    { name: "IQAX", desc: t("iqaxDesc"), soon: true },
  ];

  const problems = [
    { n: "01", title: t("p1title"), body: t("p1body") },
    { n: "02", title: t("p2title"), body: t("p2body") },
    { n: "03", title: t("p3title"), body: t("p3body") },
    { n: "04", title: t("p4title"), body: t("p4body") },
  ];

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-24 bg-white">
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-brand-primary/5 rounded-full blur-3xl" />
        <div className="pointer-events-none absolute -top-4 right-0 opacity-60 hidden lg:block">
          <BlockGrid />
        </div>
        <Container className="relative">
          <div className="max-w-4xl">
            <FadeIn>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-primary mb-8">
                {t("heroLabel")}
              </p>
            </FadeIn>
            <FadeIn delay={80}>
              <h1 className="text-6xl font-black leading-[1.0] tracking-tight text-gray-900 md:text-7xl lg:text-8xl">
                {t("heroHeadline")}
              </h1>
            </FadeIn>
            <FadeIn delay={180}>
              <p className="mt-10 max-w-xl text-xl leading-relaxed text-gray-400">
                {t("heroDesc")}
              </p>
            </FadeIn>
            <FadeIn delay={260}>
              <div className="mt-10 flex items-center gap-6">
                <a
                  href="mailto:david@tempest-pay.com"
                  className="inline-flex items-center gap-2 rounded-xl bg-brand-primary px-6 py-3 text-sm font-bold text-white shadow-lg shadow-brand-primary/25 hover:bg-blue-700 transition-colors"
                >
                  {t("heroCta")}
                </a>
                <RequestDemoButton className="text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors">
                  {t("heroCtaSecondary")}
                </RequestDemoButton>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* 01: Mission */}
      <section className="border-t border-gray-100 py-24">
        <Container>
          <div className="grid gap-16 md:grid-cols-[1fr_2fr]">
            <FadeIn>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-300 pt-1">
                {t("missionLabel")}
              </p>
            </FadeIn>
            <FadeIn delay={80}>
              <h2 className="text-3xl font-black tracking-tight text-gray-900 md:text-4xl">
                {t("missionHeading")}
              </h2>
              <div className="mt-8 space-y-5 text-[17px] leading-relaxed text-gray-500 max-w-2xl">
                <p>{t("missionP1")}</p>
                <p>{t("missionP2")}</p>
                <p>{t("missionP3")}</p>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* 02: Problem */}
      <section className="border-t border-gray-100 py-24 bg-gray-50/50">
        <Container>
          <div className="grid gap-16 md:grid-cols-[1fr_2fr]">
            <FadeIn>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-300 pt-1">
                {t("problemLabel")}
              </p>
            </FadeIn>
            <FadeIn delay={80}>
              <h2 className="text-3xl font-black tracking-tight text-gray-900 md:text-4xl">
                {t("problemHeading")}
              </h2>
              <ol className="mt-10 space-y-10">
                {problems.map((item, i) => (
                  <FadeIn key={item.n} delay={i * 60}>
                    <li className="flex gap-8">
                      <span className="text-xs font-bold tabular-nums text-gray-300 pt-1.5 shrink-0">
                        {item.n}
                      </span>
                      <div>
                        <h3 className="text-base font-bold text-gray-900">{item.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-gray-500">{item.body}</p>
                      </div>
                    </li>
                  </FadeIn>
                ))}
              </ol>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* 03: Team */}
      <section className="border-t border-gray-100 py-24">
        <Container>
          <div className="grid gap-16 md:grid-cols-[1fr_2fr]">
            <FadeIn>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-300 pt-1">
                {t("teamLabel")}
              </p>
            </FadeIn>
            <div>
              <FadeIn delay={80}>
                <h2 className="text-3xl font-black tracking-tight text-gray-900 md:text-4xl">
                  {t("teamHeading")}
                </h2>
                <p className="mt-5 text-[17px] leading-relaxed text-gray-500 max-w-2xl">
                  {t("teamDesc")}
                </p>
              </FadeIn>

              <div className="mt-14 grid gap-6 sm:grid-cols-2">
                {team.map((person, i) => (
                  <FadeIn key={person.name} delay={100 + i * 80}>
                    <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden shadow-sm">
                      <div className="aspect-square w-full overflow-hidden bg-gray-100">
                        <img src={person.photo} alt={person.name} className="h-full w-full object-cover object-top" />
                      </div>
                      <div className="p-5">
                        <h3 className="text-base font-black text-gray-900">{person.name}</h3>
                        <p className="text-xs font-semibold text-brand-primary mt-0.5">{person.role}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{person.bg}</p>
                        <p className="mt-3 text-sm leading-relaxed text-gray-500">{person.bio}</p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>

              <div className="mt-14 border-t border-gray-100 pt-10">
                <FadeIn>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">
                    {t("advisoryBoard")}
                  </p>
                  <p className="text-sm text-gray-400 mb-8">{t("advisoryBoardDesc")}</p>
                </FadeIn>
                <div className="grid gap-6 sm:grid-cols-2">
                  {advisors.map((a, i) => (
                    <FadeIn key={a.name} delay={i * 80}>
                      <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden shadow-sm">
                        <div className="aspect-square w-full overflow-hidden bg-gray-100">
                          <img src={a.photo} alt={a.name} className="h-full w-full object-cover object-top" />
                        </div>
                        <div className="p-5">
                          <h3 className="text-base font-black text-gray-900">{a.name}</h3>
                          <p className="text-xs font-semibold text-brand-primary mt-0.5">{a.role}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{a.affiliation}</p>
                          <p className="mt-3 text-sm leading-relaxed text-gray-500">{a.bio}</p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {a.highlights.map((h) => (
                              <span key={h} className="rounded-full bg-gray-50 border border-gray-200 px-3 py-1 text-xs font-semibold text-gray-600">
                                {h}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 04: Partners */}
      <section className="border-t border-gray-100 py-24 bg-gray-50/50">
        <Container>
          <div className="grid gap-16 md:grid-cols-[1fr_2fr]">
            <FadeIn>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-300 pt-1">
                {t("partnersLabel")}
              </p>
            </FadeIn>
            <div>
              <FadeIn delay={80}>
                <h2 className="text-3xl font-black tracking-tight text-gray-900 md:text-4xl">
                  {t("partnersHeading")}
                </h2>
                <p className="mt-5 text-[17px] leading-relaxed text-gray-500 max-w-2xl">
                  {t("partnersDesc")}
                </p>
              </FadeIn>
              <div className="mt-12 grid gap-5 sm:grid-cols-2">
                {partners.map((p, i) => (
                  <FadeIn key={p.name} delay={80 + i * 60}>
                    <div className="flex items-start gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-primary/8 text-xs font-black text-brand-primary">
                        {p.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-gray-900">{p.name}</span>
                          {p.soon && (
                            <span className="rounded-full bg-brand-cyan/20 px-2 py-0.5 text-[10px] font-bold text-cyan-700">
                              {t("comingSoon")}
                            </span>
                          )}
                        </div>
                        <p className="mt-0.5 text-xs leading-relaxed text-gray-400">{p.desc}</p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="border-t border-gray-100 py-24">
        <Container>
          <div className="max-w-2xl">
            <FadeIn>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-primary mb-6">
                {t("ctaLabel")}
              </p>
              <h2 className="text-4xl font-black tracking-tight text-gray-900 md:text-5xl">
                {t("ctaHeading")}
              </h2>
              <p className="mt-6 text-[17px] leading-relaxed text-gray-500">{t("ctaDesc")}</p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href="mailto:david@tempest-pay.com"
                  className="inline-flex items-center gap-2 rounded-xl bg-brand-primary px-6 py-3 text-sm font-bold text-white shadow-lg shadow-brand-primary/25 hover:bg-blue-700 transition-colors"
                >
                  {t("ctaEmail")}
                </a>
                <a
                  href="https://t.me/dwang1215"
                  className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  {t("ctaTelegram")}
                </a>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
