import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/Container";
import { FadeIn } from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Company | Tempest",
  description:
    "Build the financial infrastructure for how modern businesses actually operate.",
};

const team = [
  {
    name: "David Wang",
    role: "Co-founder & CEO",
    bg: "Ex-Bloomberg · Carnegie Mellon",
    bio: "Quantitative analyst at Bloomberg who built models on US Bill of Lading and customs data to analyze global trade flows, shipping risk, and capital impact — turning real-world cargo movement into financial insight.",
    initials: "DW",
  },
  {
    name: "Brian Li",
    role: "Co-founder & CTO",
    bg: "Ex-Google · Yale University",
    bio: "Software engineer with 3 years at Google building scalable cloud infrastructure, specializing in third-party developer platforms and distributed systems.",
    initials: "BL",
  },
];

const advisors = [
  {
    name: "Tony Liu",
    affiliation: "Blackstone · Wharton",
    bio: "Brings deep institutional finance and private equity expertise, with experience spanning cross-border capital markets and high-value asset transactions.",
    initials: "TL",
  },
];

const partners = [
  {
    name: "Bridge",
    desc: "Stablecoin issuance & on/off-ramp rails · a Stripe company",
  },
  {
    name: "Privy",
    desc: "Embedded wallet & user auth infrastructure",
  },
  {
    name: "Matrixport",
    desc: "Institutional digital asset services",
  },
  {
    name: "IQAX",
    desc: "Digital trade document platform",
    soon: true,
  },
];

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

export default function CompanyPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-24 bg-white">
        {/* Blue glow */}
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-brand-primary/5 rounded-full blur-3xl" />
        {/* Block grid top-right */}
        <div className="pointer-events-none absolute -top-4 right-0 opacity-60 hidden lg:block">
          <BlockGrid />
        </div>
        <Container className="relative">
          <div className="max-w-4xl">
            <FadeIn>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-primary mb-8">
                Company
              </p>
            </FadeIn>
            <FadeIn delay={80}>
              <h1 className="text-6xl font-black leading-[1.0] tracking-tight text-gray-900 md:text-7xl lg:text-8xl">
                Money should move like software.
              </h1>
            </FadeIn>
            <FadeIn delay={180}>
              <p className="mt-10 max-w-xl text-xl leading-relaxed text-gray-400">
                We're building the financial infrastructure that lets businesses
                send, receive, and program payments globally — without the
                friction of the traditional system.
              </p>
            </FadeIn>
            <FadeIn delay={260}>
              <div className="mt-10 flex items-center gap-6">
                <a
                  href="mailto:david@tempest-pay.com"
                  className="inline-flex items-center gap-2 rounded-xl bg-brand-primary px-6 py-3 text-sm font-bold text-white shadow-lg shadow-brand-primary/25 hover:bg-blue-700 transition-colors"
                >
                  Get in touch
                </a>
                <a
                  href="https://app.tempest-pay.com"
                  className="text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors"
                >
                  Try the platform →
                </a>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* 01 — Mission */}
      <section className="border-t border-gray-100 py-24">
        <Container>
          <div className="grid gap-16 md:grid-cols-[1fr_2fr]">
            <FadeIn>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-300 pt-1">
                01 / Mission
              </p>
            </FadeIn>
            <FadeIn delay={80}>
              <h2 className="text-3xl font-black tracking-tight text-gray-900 md:text-4xl">
                The global financial system is slow, expensive, and disconnected
                from the way modern businesses actually operate.
              </h2>
              <div className="mt-8 space-y-5 text-[17px] leading-relaxed text-gray-500 max-w-2xl">
                <p>
                  Cross-border payments still take days. Businesses pay 1–4% in
                  fees per transaction. Money can't respond to business logic —
                  every payment requires manual coordination, and nothing is
                  synchronized with the underlying trade or contract.
                </p>
                <p>
                  We believe that's a solvable problem. Stablecoins and
                  programmable payment infrastructure make it possible to settle
                  in seconds, cut costs to near zero, and tie money movement
                  directly to business events — automatically.
                </p>
                <p>
                  Tempest is the orchestration layer that makes this real for
                  businesses. Not a crypto product — a payments product built on
                  better rails.
                </p>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* 02 — Problem */}
      <section className="border-t border-gray-100 py-24 bg-gray-50/50">
        <Container>
          <div className="grid gap-16 md:grid-cols-[1fr_2fr]">
            <FadeIn>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-300 pt-1">
                02 / The Problem
              </p>
            </FadeIn>
            <FadeIn delay={80}>
              <h2 className="text-3xl font-black tracking-tight text-gray-900 md:text-4xl">
                Four things broken about how money moves today.
              </h2>
              <ol className="mt-10 space-y-10">
                {[
                  {
                    n: "01",
                    title: "Slow and fragmented",
                    body: "Cross-border transactions move through multiple intermediaries with little visibility. What should take seconds takes days.",
                  },
                  {
                    n: "02",
                    title: "Expensive at every step",
                    body: "FX spreads, wire fees, and reconciliation overhead compound to 1–4% per transaction — a tax on every business that operates globally.",
                  },
                  {
                    n: "03",
                    title: "No programmability",
                    body: "Money doesn't respond to business logic. Every conditional payment, escrow, or milestone release requires manual intervention.",
                  },
                  {
                    n: "04",
                    title: "Disconnected from documents",
                    body: "In trade finance, payments and ownership documents like Bills of Lading are completely out of sync — creating risk, disputes, and delays.",
                  },
                ].map((item, i) => (
                  <FadeIn key={item.n} delay={i * 60}>
                    <li className="flex gap-8">
                      <span className="text-xs font-bold tabular-nums text-gray-300 pt-1.5 shrink-0">
                        {item.n}
                      </span>
                      <div>
                        <h3 className="text-base font-bold text-gray-900">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-gray-500">
                          {item.body}
                        </p>
                      </div>
                    </li>
                  </FadeIn>
                ))}
              </ol>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* 03 — Team */}
      <section className="border-t border-gray-100 py-24">
        <Container>
          <div className="grid gap-16 md:grid-cols-[1fr_2fr]">
            <FadeIn>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-300 pt-1">
                03 / Team
              </p>
            </FadeIn>
            <div>
              <FadeIn delay={80}>
                <h2 className="text-3xl font-black tracking-tight text-gray-900 md:text-4xl">
                  Built by people who've seen the problem up close.
                </h2>
                <p className="mt-5 text-[17px] leading-relaxed text-gray-500 max-w-2xl">
                  We came from institutions where slow, fragmented payment rails
                  created real friction every day. We left to fix it.
                </p>
              </FadeIn>

              {/* Founders */}
              <div className="mt-14 space-y-10">
                {team.map((person, i) => (
                  <FadeIn key={person.name} delay={100 + i * 80}>
                    <div className="flex gap-6">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-primary/10 text-sm font-black text-brand-primary">
                        {person.initials}
                      </div>
                      <div>
                        <div className="flex items-baseline gap-3 flex-wrap">
                          <h3 className="text-base font-black text-gray-900">
                            {person.name}
                          </h3>
                          <span className="text-xs font-semibold text-brand-primary">
                            {person.role}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 mt-0.5">{person.bg}</p>
                        <p className="mt-2 text-sm leading-relaxed text-gray-500 max-w-xl">
                          {person.bio}
                        </p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>

              {/* Advisors */}
              <div className="mt-14 border-t border-gray-100 pt-10">
                <FadeIn>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-8">
                    Advisors
                  </p>
                </FadeIn>
                <div className="space-y-8">
                  {advisors.map((a, i) => (
                    <FadeIn key={a.name} delay={i * 80}>
                      <div className="flex gap-6">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-xs font-black text-gray-500">
                          {a.initials}
                        </div>
                        <div>
                          <div className="flex items-baseline gap-3">
                            <h3 className="text-base font-black text-gray-900">
                              {a.name}
                            </h3>
                            <span className="text-xs font-semibold text-gray-400">
                              {a.affiliation}
                            </span>
                          </div>
                          <p className="mt-1.5 text-sm leading-relaxed text-gray-500 max-w-xl">
                            {a.bio}
                          </p>
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

      {/* 04 — Partners */}
      <section className="border-t border-gray-100 py-24 bg-gray-50/50">
        <Container>
          <div className="grid gap-16 md:grid-cols-[1fr_2fr]">
            <FadeIn>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-300 pt-1">
                04 / Partners
              </p>
            </FadeIn>
            <div>
              <FadeIn delay={80}>
                <h2 className="text-3xl font-black tracking-tight text-gray-900 md:text-4xl">
                  Built with the best infrastructure in the space.
                </h2>
                <p className="mt-5 text-[17px] leading-relaxed text-gray-500 max-w-2xl">
                  We partner with category-defining companies to deliver a
                  complete, reliable stack — from stablecoin rails to identity,
                  custody, and trade documents.
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
                          <span className="text-sm font-bold text-gray-900">
                            {p.name}
                          </span>
                          {p.soon && (
                            <span className="rounded-full bg-brand-cyan/20 px-2 py-0.5 text-[10px] font-bold text-cyan-700">
                              Coming soon
                            </span>
                          )}
                        </div>
                        <p className="mt-0.5 text-xs leading-relaxed text-gray-400">
                          {p.desc}
                        </p>
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
                Get in touch
              </p>
              <h2 className="text-4xl font-black tracking-tight text-gray-900 md:text-5xl">
                Let's build something together.
              </h2>
              <p className="mt-6 text-[17px] leading-relaxed text-gray-500">
                Whether you're exploring stablecoin payments, building a
                trade finance workflow, or just want to learn more — we'd
                love to hear from you.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href="mailto:david@tempest-pay.com"
                  className="inline-flex items-center gap-2 rounded-xl bg-brand-primary px-6 py-3 text-sm font-bold text-white shadow-lg shadow-brand-primary/25 hover:bg-blue-700 transition-colors"
                >
                  Email us
                </a>
                <a
                  href="https://t.me/dwang1215"
                  className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  Telegram
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
