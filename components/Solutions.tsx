"use client";
import { useState } from "react";
import { Container } from "./Container";
import { StickyReveal } from "./StickyReveal";
import { FadeIn } from "./FadeIn";
import { RequestDemoButton } from "./RequestDemoButton";

const tradeFinanceFeatures = [
  {
    title: "Instant, Conditional Payments",
    body: "Encode conditions like document receipt, milestone completion, or inspection approvals so funds only move when the right triggers fire.",
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    title: "Digital Document Sync",
    body: "Keep invoices, B/Ls, and inspection certificates in lockstep with payment state so everyone sees the same source of truth.",
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
  },
  {
    title: "Seamless ERP & Treasury Integration",
    body: "Connect to the systems you already use so trades show up where finance, risk, and ops teams work today.",
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3" />
      </svg>
    ),
  },
  {
    title: "Multi-Party Authorization",
    body: "Capture approvals from buyers, sellers, banks, and inspectors in a single workflow with auditable on-chain signatures.",
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
  {
    title: "Programmable Risk Controls",
    body: "Encode limits, sanctions lists, and exposure thresholds directly into payment logic to reduce operational and credit risk.",
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    title: "Audit-Ready Trail",
    body: "Every rule, approval, and settlement is recorded for real-time visibility, dispute resolution, and regulatory reporting.",
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
      </svg>
    ),
  },
];

const steps = [
  {
    label: "Connect Documents",
    desc: "Ingest trade docs from your platforms or upload directly: invoices, purchase orders, B/Ls, inspections, and more.",
  },
  {
    label: "Define Conditional Logic",
    desc: "Model when funds should move using no-code and API-based rules: dates, statuses, events, and approvals.",
  },
  {
    label: "Automate Settlement",
    desc: "Tempest executes stablecoin payments as each condition is met, including partials, milestones, and final settlement.",
  },
  {
    label: "Sync Finance Systems",
    desc: "Post back to ERP, treasury, and ledgers in real-time so reconciliations and reporting are always up to date.",
  },
];

const audiences = [
  {
    label: "Exporters & Importers",
    body: "Shorten cash cycles and make working capital predictable with rule-based settlement.",
    emoji: "🚢",
  },
  {
    label: "Banks & Financiers",
    body: "Reduce operational risk and unlock new trade programs with programmable rails you can monitor in real time.",
    emoji: "🏦",
  },
  {
    label: "Carriers & Logistics",
    body: "Tie logistics milestones directly to release of funds, reducing disputes and delays across lanes.",
    emoji: "📦",
  },
];

type Tab = "trade-finance" | "high-value" | "more";

export function Solutions() {
  const [tab, setTab] = useState<Tab>("trade-finance");

  return (
    <>
      <StickyReveal
        id="solutions"
        text="Payment flows built for your industry"
        label="Solutions"
        description="Tempest lays the foundation for programmable, composable stablecoin workflows: conditional payments, automated settlement, and deep integration with financial and operational systems."
        className="text-4xl font-black tracking-tight text-gray-900 md:text-5xl"
        bg="#f9fafb"
        bgVariant="ripple"
      />
      <section className="pb-24 bg-gray-50">
      <Container>
        {/* Tab bar */}
        <FadeIn className="flex justify-center mb-10">
          <div className="inline-flex flex-wrap justify-center gap-1.5 rounded-2xl border border-gray-200 bg-white p-1.5 shadow-sm">
            <TabButton active={tab === "trade-finance"} onClick={() => setTab("trade-finance")}>
              Trade Finance
            </TabButton>
            <TabButton active={tab === "high-value"} onClick={() => setTab("high-value")} soon>
              High-Value Asset Settlement
            </TabButton>
            <TabButton active={tab === "more"} onClick={() => setTab("more")} soon>
              More Flows
            </TabButton>
          </div>
        </FadeIn>

        {/* Tab content */}
        {tab === "trade-finance" && <TradeFinanceTab />}
        {tab === "high-value" && (
          <ComingSoonTab
            title="High-Value Asset Settlement"
            desc="Programmable payments for high-value retail: escrow, milestones, and seamless checkout. Launching soon."
          />
        )}
        {tab === "more" && (
          <ComingSoonTab
            title="More Payment Flows"
            desc="Additional payment flows and industry solutions are in the pipeline. Stay tuned."
          />
        )}
      </Container>
      </section>
    </>
  );
}

function TabButton({
  active,
  onClick,
  children,
  soon,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  soon?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
        active
          ? "bg-brand-primary text-white shadow-sm"
          : "text-gray-500 hover:text-gray-800"
      }`}
    >
      {children}
      {soon && (
        <span className="rounded-full bg-brand-cyan/20 px-1.5 py-0.5 text-[10px] font-bold text-cyan-700">
          Soon
        </span>
      )}
    </button>
  );
}

function TradeFinanceTab() {
  return (
    <div className="space-y-8">
      {/* Hero callout */}
      <FadeIn>
      <div className="overflow-hidden rounded-3xl bg-brand-navy text-white">
        <div className="grid lg:grid-cols-2">
          {/* Left: text */}
          <div className="p-8 md:p-12">
            <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold text-white/80 mb-5">
              Trade Finance
            </span>
            <h3 className="text-3xl font-black leading-tight md:text-4xl">
              Automate. Settle.
              <br />
              <span className="text-brand-cyan">Faster and Smarter.</span>
            </h3>
            <p className="mt-4 text-base leading-relaxed text-white/65">
              Trade finance workflows are slowed down by manual checks, scattered
              documents, and payment risk. Tempest lets you define the rules once,
              and then settlement, documents, and notifications run automatically
              in the background.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <RequestDemoButton className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-brand-primary hover:bg-gray-50 transition-colors">
                Request a Demo
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </RequestDemoButton>
              <a
                href="mailto:david@tempest-pay.com"
                className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/20 transition-colors"
              >
                Contact Sales
              </a>
            </div>
          </div>
          {/* Right: audience pills */}
          <div className="flex flex-col justify-center gap-4 border-t border-white/10 p-8 md:p-12 lg:border-l lg:border-t-0">
            <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-1">
              Built for every party in the trade
            </p>
            {audiences.map((a) => (
              <div key={a.label} className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                <span className="text-2xl flex-shrink-0">{a.emoji}</span>
                <div>
                  <div className="text-sm font-bold text-white">{a.label}</div>
                  <div className="mt-0.5 text-xs leading-relaxed text-white/55">{a.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </FadeIn>

      {/* 6 feature cards */}
      <div>
        <FadeIn>
          <h4 className="text-base font-black text-gray-900 mb-5">
            What you get with Tempest Trade Finance
          </h4>
        </FadeIn>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tradeFinanceFeatures.map((f, i) => (
            <FadeIn key={f.title} delay={i * 65}>
              <div className="h-full rounded-2xl border border-gray-100 bg-white p-5 shadow-sm hover:border-brand-primary/20 hover:shadow-md transition-all">
                <div className="inline-flex items-center justify-center rounded-lg bg-brand-primary/10 p-2 text-brand-primary mb-3">
                  {f.icon}
                </div>
                <h5 className="text-sm font-bold text-gray-900">{f.title}</h5>
                <p className="mt-1.5 text-sm leading-relaxed text-gray-500">{f.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* 4-step process */}
      <FadeIn>
      <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
        <h4 className="text-base font-black text-gray-900 mb-8 text-center">
          How a trade finance flow works
        </h4>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div key={step.label} className="relative flex flex-col">
              {/* Connector */}
              {i < steps.length - 1 && (
                <div className="absolute top-4 left-10 right-0 h-px bg-gradient-to-r from-brand-primary/30 to-brand-cyan/20 hidden lg:block" />
              )}
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-brand-primary text-white text-xs font-black mb-3 relative z-10">
                {i + 1}
              </div>
              <div className="text-sm font-bold text-gray-900">{step.label}</div>
              <div className="mt-1.5 text-xs leading-relaxed text-gray-500">{step.desc}</div>
            </div>
          ))}
        </div>
      </div>
      </FadeIn>

      {/* "See It in Action" closing callout */}
      <FadeIn>
      <div className="rounded-3xl border border-brand-primary/15 bg-brand-primary/5 p-8 text-center">
        <h4 className="text-xl font-black text-gray-900">See It in Action</h4>
        <p className="mx-auto mt-2 max-w-xl text-sm text-gray-500">
          Use Tempest to stand up automated, bank-grade trade workflows without
          rebuilding your stack. See a live demo of programmable settlement,
          documents, and controls for your lanes.
        </p>
        <a
          href="mailto:david@tempest-pay.com"
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-brand-primary px-6 py-3 text-sm font-bold text-white shadow-sm hover:bg-blue-700 transition-colors"
        >
          Request a Demo
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </a>
      </div>
      </FadeIn>
    </div>
  );
}

function ComingSoonTab({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-3xl border border-dashed border-gray-200 bg-white py-24 text-center shadow-sm">
      <span className="inline-flex items-center rounded-full bg-brand-cyan/15 px-4 py-1.5 text-sm font-bold text-cyan-700 mb-4">
        Coming Soon
      </span>
      <h3 className="text-2xl font-black text-gray-900">{title}</h3>
      <p className="mx-auto mt-3 max-w-md text-base text-gray-500">{desc}</p>
      <a
        href="mailto:david@tempest-pay.com"
        className="mt-6 inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 hover:border-brand-primary hover:text-brand-primary transition-all"
      >
        Join the waitlist
      </a>
    </div>
  );
}
