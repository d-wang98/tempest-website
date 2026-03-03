import { Navbar } from "@/components/Navbar";
import { Container } from "@/components/Container";

export const metadata = {
  title: "Trade Finance | Tempest",
  description: "Automate conditional settlement and documents for trade finance.",
};

export default function TradeFinancePage() {
  return (
    <main className="relative min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-20 pb-16">
        <Container className="flex flex-col gap-10">
          <div className="max-w-xl">
            <h1 className="text-gradient text-4xl md:text-6xl leading-[1.1]">
              Tempest for
              <br />
              Trade Finance
            </h1>
            <p className="mt-6 text-sm md:text-base text-white/80 max-w-lg">
              Trade finance workflows are slowed down by manual checks, scattered
              documents, and payment risk. Tempest lets you define the rules once
              — then settlement, documents, and notifications run automatically in
              the background.
            </p>
            <div className="mt-8">
              <a
                href="#see-it-in-action"
                className="relative inline-flex items-center justify-center p-[1px] rounded-md overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#489EFF] to-[#0050FF]" />
                <div className="relative bg-[#0078FF]/80 px-4 py-2 rounded-[5px] text-sm font-semibold text-white hover:bg-[#0078FF]/90 transition">
                  Learn More
                </div>
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Center headline */}
      <section className="py-10">
        <Container className="text-center">
          <h2 className="text-gradient text-2xl md:text-3xl">
            Automate. Settle — Faster and Smarter.
          </h2>
        </Container>
      </section>

      {/* What You Get */}
      <section className="py-16">
        <Container className="grid gap-10 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:items-start">
          <div className="space-y-3">
            <div className="text-xs uppercase tracking-[0.2em] text-white/60">
              What You Get with Tempest
            </div>
            <p className="text-sm text-white/80 max-w-xs">
              Replace brittle, manual trade settlement with programmable,
              conditional workflows that move at the speed of your supply chain.
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-white">
                Instant, Conditional Payments
              </h3>
              <p className="text-xs text-white/80">
                Encode conditions like document receipt, milestone completion, or
                inspection approvals so funds only move when the right triggers
                fire.
              </p>
              <div className="mt-4 h-px w-full bg-gradient-to-r from-white/0 via-white/40 to-white/0" />
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-white">
                Digital Document Sync
              </h3>
              <p className="text-xs text-white/80">
                Keep invoices, B/Ls, and inspection certificates in lockstep with
                payment state so everyone sees the same source of truth.
              </p>
              <div className="mt-4 h-px w-full bg-gradient-to-r from-white/0 via-white/40 to-white/0" />
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-white">
                Seamless ERP &amp; Treasury Integration
              </h3>
              <p className="text-xs text-white/80">
                Connect to the systems you already use so trades show up where
                finance, risk, and ops teams work today.
              </p>
              <div className="mt-4 h-px w-full bg-gradient-to-r from-white/0 via-white/40 to-white/0" />
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-white">
                Multi-Party Authorization
              </h3>
              <p className="text-xs text-white/80">
                Capture approvals from buyers, sellers, banks, and inspectors in
                a single workflow with auditable on-chain signatures.
              </p>
              <div className="mt-4 h-px w-full bg-gradient-to-r from-white/0 via-white/40 to-white/0" />
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-white">
                Programmable Risk Controls
              </h3>
              <p className="text-xs text-white/80">
                Encode limits, sanctions lists, and exposure thresholds directly
                into payment logic to reduce operational and credit risk.
              </p>
              <div className="mt-4 h-px w-full bg-gradient-to-r from-white/0 via-white/40 to-white/0" />
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-white">
                Audit-Ready Trail
              </h3>
              <p className="text-xs text-white/80">
                Every rule, approval, and settlement is recorded for real-time
                visibility, dispute resolution, and regulatory reporting.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* How It Works */}
      <section className="py-16 border-t border-white/5 border-b">
        <Container className="space-y-10">
          <div className="flex items-baseline justify-between gap-4">
            <div className="space-y-2">
              <div className="text-xs uppercase tracking-[0.2em] text-white/60">
                How It Works
              </div>
              <p className="text-sm text-white/80">
                Start with your documents and rules — Tempest handles the rest in
                the background.
              </p>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 md:text-sm text-xs">
            <ol className="space-y-6 list-decimal list-inside">
              <li>
                <div className="font-semibold text-white">Connect Documents</div>
                <p className="mt-1 text-white/80">
                  Ingest trade docs from your platforms or upload directly —
                  invoices, purchase orders, B/Ls, inspections, and more.
                </p>
              </li>
              <li>
                <div className="font-semibold text-white">
                  Define Conditional Logic
                </div>
                <p className="mt-1 text-white/80">
                  Model when funds should move using no-code and API-based rules:
                  dates, statuses, events, and approvals.
                </p>
              </li>
            </ol>

            <ol start={3} className="space-y-6 list-decimal list-inside">
              <li>
                <div className="font-semibold text-white">
                  Automate Settlement
                </div>
                <p className="mt-1 text-white/80">
                  Tempest executes stablecoin payments as each condition is met —
                  partials, milestones, and final settlement included.
                </p>
              </li>
              <li>
                <div className="font-semibold text-white">
                  Sync Finance Systems
                </div>
                <p className="mt-1 text-white/80">
                  Post back to ERP, treasury, and ledgers in real-time so
                  reconciliations and reporting are always up to date.
                </p>
              </li>
            </ol>
          </div>
        </Container>
      </section>

      {/* Who It Helps */}
      <section className="py-16">
        <Container className="space-y-8">
          <div className="flex items-baseline justify-between gap-4">
            <div className="space-y-2">
              <div className="text-xs uppercase tracking-[0.2em] text-white/60">
                Who It Helps
              </div>
              <p className="text-sm text-white/80">
                Coordinate every party in a trade without adding more email
                threads or spreadsheets.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-white/5/5 bg-white/5 px-4 py-5">
              <div className="text-sm font-semibold text-white">
                Exporters &amp; Importers
              </div>
              <p className="mt-2 text-xs text-white/80">
                Shorten cash cycles and make working capital predictable with
                rule-based settlement.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-5">
              <div className="text-sm font-semibold text-white">
                Banks &amp; Financiers
              </div>
              <p className="mt-2 text-xs text-white/80">
                Reduce operational risk and unlock new trade programs with
                programmable rails you can monitor in real time.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-5">
              <div className="text-sm font-semibold text-white">
                Carriers &amp; Logistics
              </div>
              <p className="mt-2 text-xs text-white/80">
                Tie logistics milestones directly to release of funds, reducing
                disputes and delays across lanes.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* See It In Action */}
      <section id="see-it-in-action" className="py-16 border-t border-white/5">
        <Container className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-white/60">
              See It in Action
            </div>
            <p className="mt-3 text-sm text-white/80 max-w-xl">
              Use Tempest to stand up automated, bank-grade trade workflows
              without rebuilding your stack. See a live demo of programmable
              settlement, documents, and controls for your lanes.
            </p>
          </div>
          <a
            href="#get-started"
            className="relative inline-flex items-center justify-center p-[1px] rounded-md overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#489EFF] to-[#0050FF]" />
            <div className="relative bg-[#0078FF]/80 px-4 py-2 rounded-[5px] text-sm font-semibold text-white hover:bg-[#0078FF]/90 transition">
              Learn More
            </div>
          </a>
        </Container>
      </section>
    </main>
  );
}
