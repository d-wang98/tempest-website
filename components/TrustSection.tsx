import { Container } from "./Container";
import Image, { StaticImageData } from "next/image";

import smartOnboardingIcon from "@/assets/smart_onboarding.png";
import dynamicInvoicingIcon from "@/assets/dynamic_invoicing.png";
import nonCustodialByDesignIcon from "@/assets/non_custodial_by_design.png";
import seamlessStablecoinPaymentsIcon from "@/assets/seamless_stablecoin_payments.png";
import unifiedIdentityAcrossChainsIcon from "@/assets/unified_identity_across_chains.png";
import humanReadablePaymentsIcon from "@/assets/human_readable_payments.png";

function GradientBorder() {
  return (
    <div className="absolute inset-0 rounded-2xl border border-white/[0.08] pointer-events-none" />
  );
}

function CardIcon({ src }: { src: StaticImageData }) {
  return (
    <div className="relative h-10 w-10">
      <Image src={src} alt="" fill sizes="40px" className="object-contain" />
    </div>
  );
}

export function TrustSection() {
  return (
    <section id="product" className="py-16 md:py-24">
      <Container>
        <div className="max-w-4xl text-left md:max-w-[calc(50%-8px)]">
          <h2 className="text-gradient text-[28px] font-regular leading-tight">
            How Tempest Works
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-white">
            We abstract exchanges, blockchains, and wallets into a single
            flow–so stablecoins can be onboarded, sent, and settled as easily
            while unlocking the capabilities of on‑chain tools.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">

          {/* ── Row 1 ── */}

          {/* Seamless Liquidity Access — large */}
          <div className="relative overflow-hidden rounded-2xl p-6 md:col-span-2">
            <GradientBorder />
            <div className="absolute inset-0 rounded-2xl bg-[#001e69]/[0.2]" />
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
            <div className="relative">
              <CardIcon src={smartOnboardingIcon} />
              <h3 className="mt-4 text-xl font-bold text-white">
                Seamless Liquidity Access
              </h3>
              <p className="mt-2 max-w-sm text-sm text-white/60">
                Integrated on and off-ramps allow businesses to move between
                traditional fiat and stablecoins without leaving the platform.
              </p>
              {/* Flow visual */}
              <div className="mt-6 rounded-xl border border-white/[0.06] bg-white/[0.04] p-5">
                <div className="flex items-center justify-center gap-3">
                  {[
                    { label: "USD / EUR", sub: "Fiat", accent: false },
                    null,
                    { label: "Tempest", sub: "Hub", accent: true },
                    null,
                    { label: "USDC / USDT", sub: "Stablecoin", accent: false },
                  ].map((item, i) =>
                    item === null ? (
                      <svg
                        key={i}
                        className="shrink-0 text-white/20"
                        width="20"
                        height="10"
                        viewBox="0 0 20 10"
                        fill="none"
                      >
                        <path
                          d="M0 5h17M13 1l4 4-4 4"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      <div
                        key={item.label}
                        className="flex flex-col items-center gap-1"
                      >
                        <div
                          className={`rounded-lg border px-4 py-2 text-xs font-medium whitespace-nowrap ${
                            item.accent
                              ? "border-[#489EFF]/40 bg-[#489EFF]/10 text-[#489EFF]"
                              : "border-white/10 bg-white/5 text-white/80"
                          }`}
                        >
                          {item.label}
                        </div>
                        <span className="text-[10px] text-white/30">
                          {item.sub}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Institutional Transparency — small */}
          <div className="relative overflow-hidden rounded-2xl p-6 md:col-span-1">
            <GradientBorder />
            <div className="absolute inset-0 rounded-2xl bg-[#001e69]/[0.2]" />
            <div className="relative">
              <CardIcon src={dynamicInvoicingIcon} />
              <h3 className="mt-4 text-lg font-bold text-white">
                Institutional Transparency
              </h3>
              <p className="mt-2 text-sm text-white/60">
                Clear, immutable audit trail and robust counterparty
                identification to build trust between stakeholders.
              </p>
            </div>
          </div>

          {/* ── Row 2 ── */}

          {/* Enterprise-Grade Security — small */}
          <div className="relative overflow-hidden rounded-2xl p-6 md:col-span-1">
            <GradientBorder />
            <div className="absolute inset-0 rounded-2xl bg-[#001e69]/[0.2]" />
            <div className="relative">
              <CardIcon src={nonCustodialByDesignIcon} />
              <h3 className="mt-4 text-lg font-bold text-white">
                Enterprise-Grade Security
              </h3>
              <p className="mt-2 text-sm text-white/60">
                Multi-party authorization rules to maintain strict internal
                controls and prevent unauthorized fund movements.
              </p>
            </div>
          </div>

          {/* Deep Ecosystem Integration — large */}
          <div className="relative overflow-hidden rounded-2xl p-6 md:col-span-2">
            <GradientBorder />
            <div className="absolute inset-0 rounded-2xl bg-[#001e69]/[0.2]" />
            <div className="absolute -left-20 -bottom-20 h-56 w-56 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
            <div className="relative">
              <CardIcon src={seamlessStablecoinPaymentsIcon} />
              <h3 className="mt-4 text-xl font-bold text-white">
                Deep Ecosystem Integration
              </h3>
              <p className="mt-2 max-w-sm text-sm text-white/60">
                Native connectivity with eBL platforms ensures that digital
                bills of lading and payment triggers work in perfect sync.
              </p>
              {/* Node diagram */}
              <div className="mt-6 overflow-x-auto rounded-xl border border-white/[0.06] bg-white/[0.04] p-5">
                <div className="flex min-w-max items-center gap-2">
                  {[
                    { label: "eBL Platform", sub: "Document" },
                    { label: "Tempest", sub: "Orchestration", accent: true },
                    { label: "Payment Rails", sub: "Settlement" },
                    { label: "ERP System", sub: "Records" },
                  ].map((node, i, arr) => (
                    <div key={node.label} className="flex items-center gap-2">
                      <div className="flex flex-col items-center gap-1 text-center">
                        <div
                          className={`rounded-lg border px-3 py-1.5 text-[11px] font-medium whitespace-nowrap ${
                            node.accent
                              ? "border-[#489EFF]/40 bg-[#489EFF]/10 text-[#489EFF]"
                              : "border-white/10 bg-white/5 text-white/80"
                          }`}
                        >
                          {node.label}
                        </div>
                        <span className="text-[9px] text-white/30">
                          {node.sub}
                        </span>
                      </div>
                      {i < arr.length - 1 && (
                        <svg
                          className="shrink-0 text-white/20"
                          width="20"
                          height="10"
                          viewBox="0 0 20 10"
                          fill="none"
                        >
                          <path
                            d="M0 5h17M13 1l4 4-4 4"
                            stroke="currentColor"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Row 3 ── */}

          {/* Automated Settlement Logic — large */}
          <div className="relative overflow-hidden rounded-2xl p-6 md:col-span-2">
            <GradientBorder />
            <div className="absolute inset-0 rounded-2xl bg-[#001e69]/[0.2]" />
            <div className="absolute -right-20 -bottom-20 h-56 w-56 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
            <div className="relative">
              <CardIcon src={humanReadablePaymentsIcon} />
              <h3 className="mt-4 text-xl font-bold text-white">
                Automated Settlement Logic
              </h3>
              <p className="mt-2 max-w-sm text-sm text-white/60">
                Programmable rules facilitate automated payment release
                conditional upon the receipt of trade documents.
              </p>
              {/* No-code rule builder GUI */}
              <div className="mt-6 overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02]">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-2.5">
                  <span className="text-[11px] font-medium text-white/50">Rule Builder</span>
                  <span className="rounded-full bg-green-500/15 px-2 py-0.5 text-[10px] font-medium text-green-400">Active</span>
                </div>

                <div className="space-y-2 p-4">

                  {/* WHEN row */}
                  <div className="flex items-center gap-2">
                    <span className="w-12 shrink-0 text-[10px] font-semibold uppercase tracking-widest text-[#489EFF]/70">When</span>
                    <div className="flex flex-1 items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-2">
                      {/* doc icon */}
                      <svg className="h-3.5 w-3.5 shrink-0 text-white/50" viewBox="0 0 16 16" fill="none">
                        <rect x="2" y="1" width="10" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
                        <path d="M5 5h6M5 8h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                      </svg>
                      <span className="flex-1 text-[12px] text-white/80">Document is received</span>
                      <svg className="h-3 w-3 text-white/30" viewBox="0 0 10 10" fill="none"><path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                  </div>

                  {/* Connector */}
                  <div className="ml-14 h-3 w-px bg-white/[0.08]" />

                  {/* AND row */}
                  <div className="flex items-center gap-2">
                    <span className="w-12 shrink-0 text-[10px] font-semibold uppercase tracking-widest text-white/40">And</span>
                    <div className="flex flex-1 items-center gap-2">
                      <div className="flex flex-1 items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-2">
                        <span className="flex-1 text-[12px] text-white/80">eBL status</span>
                        <svg className="h-3 w-3 text-white/30" viewBox="0 0 10 10" fill="none"><path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </div>
                      <div className="flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-2">
                        <span className="text-[12px] text-white/50">=</span>
                      </div>
                      <div className="flex flex-1 items-center gap-2 rounded-lg border border-[#489EFF]/20 bg-[#489EFF]/[0.06] px-3 py-2">
                        <span className="flex-1 text-[12px] text-[#489EFF]/90">Delivered</span>
                        <svg className="h-3 w-3 text-[#489EFF]/40" viewBox="0 0 10 10" fill="none"><path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </div>
                    </div>
                  </div>

                  {/* Connector */}
                  <div className="ml-14 h-3 w-px bg-white/[0.08]" />

                  {/* THEN row */}
                  <div className="flex items-center gap-2">
                    <span className="w-12 shrink-0 text-[10px] font-semibold uppercase tracking-widest text-purple-400/70">Then</span>
                    <div className="flex flex-1 items-center gap-2 rounded-lg border border-purple-500/20 bg-purple-500/[0.06] px-3 py-2">
                      {/* payment icon */}
                      <svg className="h-3.5 w-3.5 shrink-0 text-purple-400/70" viewBox="0 0 16 16" fill="none">
                        <rect x="1" y="4" width="14" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
                        <path d="M1 7h14" stroke="currentColor" strokeWidth="1.2"/>
                        <rect x="3" y="9.5" width="3" height="1.5" rx="0.5" fill="currentColor"/>
                      </svg>
                      <span className="flex-1 text-[12px] text-purple-300/90">Release payment</span>
                      <svg className="h-3 w-3 text-purple-400/30" viewBox="0 0 10 10" fill="none"><path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                  </div>

                  {/* Amount sub-row */}
                  <div className="ml-14 flex items-center gap-2">
                    <span className="text-[10px] text-white/30">Amount</span>
                    <div className="flex items-center gap-1.5 rounded-md border border-white/[0.06] bg-white/[0.03] px-2.5 py-1">
                      <span className="text-[11px] text-white/50">Invoice total</span>
                    </div>
                  </div>

                </div>

                {/* Footer */}
                <div className="border-t border-white/[0.06] px-4 py-2.5">
                  <button className="flex items-center gap-1.5 text-[11px] text-white/30 transition hover:text-white/50">
                    <svg className="h-3 w-3" viewBox="0 0 10 10" fill="none"><path d="M5 2v6M2 5h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    Add condition
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ERP Connectivity — small */}
          <div className="relative overflow-hidden rounded-2xl p-6 md:col-span-1">
            <GradientBorder />
            <div className="absolute inset-0 rounded-2xl bg-[#001e69]/[0.2]" />
            <div className="relative">
              <CardIcon src={unifiedIdentityAcrossChainsIcon} />
              <h3 className="mt-4 text-lg font-bold text-white">
                ERP Connectivity
              </h3>
              <p className="mt-2 text-sm text-white/60">
                Built-in integration layers for major ERP systems to synchronize
                trade data with your existing financial records.
              </p>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
