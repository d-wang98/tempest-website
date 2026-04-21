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

const problems = [
  {
    title: "Slow and fragmented",
    body: "Cross-border transactions take days, moving through multiple intermediaries with little visibility or control.",
  },
  {
    title: "Expensive and inefficient",
    body: "Businesses pay significant fees across FX spreads, wire costs, and reconciliation overhead — often 1–4% per transaction.",
  },
  {
    title: "No programmability",
    body: "Money doesn't move based on business logic. Payments require manual coordination across emails, documents, and approvals.",
  },
  {
    title: "Disconnected from real-world workflows",
    body: "In trade finance, payments and ownership documents like Bills of Lading are not synchronized — creating risk, delays, and operational burden.",
  },
];

const features = [
  {
    title: "Global, instant settlement",
    body: "Send and receive payments across borders in seconds using stablecoins — without relying on traditional banking rails.",
  },
  {
    title: "Programmable payment workflows",
    body: "Define exactly how money should move.",
    items: [
      "Escrow and conditional release",
      "Multi-party approvals",
      "Time-locked or milestone-based payments",
      "Document-triggered settlement (e.g. eBL events)",
    ],
  },
  {
    title: "Non-custodial by design",
    body: "Maintain full control of funds while enabling teams to operate through structured permissions and workflows.",
  },
  {
    title: "Unified identity and routing",
    body: "Send payments using emails or phone numbers. Tempest automatically resolves routing across chains, assets, and recipients.",
  },
  {
    title: "Built for complex, multi-party systems",
    body: "From global trade to high-value marketplaces, Tempest enables coordination across multiple stakeholders with automated, verifiable payment execution.",
  },
];

function SectionRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-gray-100 py-20">
      <Container>
        <div className="grid gap-12 md:grid-cols-[200px_1fr] md:gap-20">
          <FadeIn>
            <p className="text-sm font-medium text-brand-primary pt-1">{label}</p>
          </FadeIn>
          <FadeIn delay={80}>{children}</FadeIn>
        </div>
      </Container>
    </section>
  );
}

export default function CompanyPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="bg-brand-navy pt-28 pb-24 text-center">
        <Container>
          <div className="mx-auto max-w-4xl">
            <FadeIn>
              <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-brand-blue">
                Company
              </p>
            </FadeIn>
            <FadeIn delay={80}>
              <h1 className="font-expanded text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
                Build the financial infrastructure for how modern businesses
                actually operate.
              </h1>
            </FadeIn>
            <FadeIn delay={180}>
              <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/60">
                Tempest enables companies to move and control money as easily as
                software — instant, programmable, and global by default.
              </p>
            </FadeIn>
            <FadeIn delay={260}>
              <div className="mt-8 flex items-center justify-center gap-4">
                <a
                  href="mailto:david@tempest-pay.com"
                  className="inline-flex items-center rounded-lg bg-brand-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors shadow-sm"
                >
                  Get in touch
                </a>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Mission */}
      <SectionRow label="The mission">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
          Make money move as freely as software.
        </h2>
        <div className="mt-5 max-w-2xl space-y-4 text-[15px] leading-relaxed text-gray-500">
          <p>
            Tempest enables companies to move and control money as easily as
            software — instant, programmable, and global by default.
          </p>
          <p>
            We believe payments shouldn't be slow, opaque, or manual. They
            should be real-time, automated, and directly tied to the underlying
            business logic.
          </p>
        </div>
        <ul className="mt-8 space-y-3">
          {[
            "Settlements in seconds, not days",
            "Costs reduced to near zero",
            "Payments that execute on business logic, automatically",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm text-gray-600">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-primary" />
              {item}
            </li>
          ))}
        </ul>
      </SectionRow>

      {/* Problem */}
      <SectionRow label="The problem">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
          The global financial system wasn't built for the digital age.
        </h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          {problems.map((p, i) => (
            <FadeIn key={p.title} delay={i * 70}>
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-6">
                <h3 className="text-[15px] font-semibold text-brand-primary">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">
                  {p.body}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </SectionRow>

      {/* Platform */}
      <SectionRow label="The platform">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
          A payment orchestration platform built on stablecoin rails.
        </h2>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-gray-500">
          We abstract away blockchain complexity and give businesses a single
          system to move, control, and program money globally.
        </p>
        <div className="mt-8 divide-y divide-gray-100">
          {features.map((f, i) => (
            <FadeIn key={f.title} delay={i * 60}>
              <div className="py-7">
                <div className="grid gap-4 md:grid-cols-[1fr_1.6fr]">
                  <h3 className="text-[15px] font-semibold text-gray-900">
                    {f.title}
                  </h3>
                  <div>
                    <p className="text-sm leading-relaxed text-gray-500">
                      {f.body}
                    </p>
                    {f.items && (
                      <ul className="mt-4 space-y-2">
                        {f.items.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2.5 text-sm text-gray-400"
                          >
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-blue" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </SectionRow>

      {/* CTA */}
      <section className="border-t border-gray-100 py-20">
        <Container>
          <div className="grid gap-12 md:grid-cols-[200px_1fr] md:gap-20">
            <FadeIn>
              <p className="text-sm font-medium text-brand-primary pt-1">Get in touch</p>
            </FadeIn>
            <FadeIn delay={80}>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl mb-6">
                Ready to build the future of payments?
              </h2>
              <p className="text-[15px] text-gray-500 mb-8 max-w-lg">
                Whether you're exploring stablecoin payments for your business or
                ready to integrate, we'd love to hear from you.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="mailto:david@tempest-pay.com"
                  className="inline-flex items-center rounded-lg bg-brand-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors shadow-sm"
                >
                  Email us
                </a>
                <a
                  href="https://t.me/dwang1215"
                  className="inline-flex items-center rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
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
