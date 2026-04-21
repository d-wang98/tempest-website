"use client";
import { useMemo, useState } from "react";
import { Container } from "./Container";
import { TextReveal } from "./TextReveal";
import { FadeIn } from "./FadeIn";

function fmt(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`;
  return `$${n.toFixed(2)}`;
}

export function Calculator() {
  const [txPerYear, setTxPerYear] = useState(1000);
  const [avgAmount, setAvgAmount] = useState(80);
  const [bankFeeBps, setBankFeeBps] = useState(19);
  const [stablecoinPerTx, setStablecoinPerTx] = useState(0.18);

  const { bankAnnual, stablecoinAnnual, savings, savingsPct } = useMemo(() => {
    const bankAnnual = txPerYear * avgAmount * (bankFeeBps / 10000);
    const stablecoinAnnual = txPerYear * stablecoinPerTx;
    const savings = Math.max(bankAnnual - stablecoinAnnual, 0);
    const savingsPct = bankAnnual > 0 ? (savings / bankAnnual) * 100 : 0;
    return { bankAnnual, stablecoinAnnual, savings, savingsPct };
  }, [txPerYear, avgAmount, bankFeeBps, stablecoinPerTx]);

  return (
    <section id="calculator" className="py-20 md:py-28 bg-gray-50">
      <Container>
        <FadeIn className="text-center mb-14">
          <p className="text-sm font-bold uppercase tracking-widest text-brand-primary mb-3">
            ROI Calculator
          </p>
          <TextReveal
            as="h2"
            className="text-4xl font-black tracking-tight text-gray-900 md:text-5xl"
          >
            See the difference in dollars
          </TextReveal>
          <p className="mx-auto mt-4 max-w-xl text-lg text-gray-500">
            Input your payment volume to see exactly how much you save switching
            to stablecoin payments with Tempest.
          </p>
        </FadeIn>

        <div className="mx-auto max-w-4xl">
          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm md:p-10">
            <div className="grid gap-10 lg:grid-cols-2">
              {/* Inputs */}
              <FadeIn delay={100}>
              <div>
                <h3 className="text-base font-bold text-gray-900 mb-6">
                  Your Payment Activity
                </h3>
                <div className="space-y-5">
                  <CalcField
                    label="Transactions per year"
                    value={txPerYear}
                    onChange={setTxPerYear}
                    step={100}
                  />
                  <CalcField
                    label="Average transaction amount ($)"
                    value={avgAmount}
                    onChange={setAvgAmount}
                    step={10}
                  />
                  <CalcField
                    label="Bank fee (basis points)"
                    value={bankFeeBps}
                    onChange={setBankFeeBps}
                    step={1}
                    hint="1 bps = 0.01%"
                  />
                  <CalcField
                    label="Stablecoin cost per transaction ($)"
                    value={stablecoinPerTx}
                    onChange={setStablecoinPerTx}
                    step={0.01}
                  />
                </div>
              </div>
              </FadeIn>

              {/* Results */}
              <FadeIn delay={200}>
              <div className="flex flex-col gap-4">
                <h3 className="text-base font-bold text-gray-900">
                  Annual Cost Comparison
                </h3>

                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                  <div className="text-sm font-medium text-gray-500 mb-1">
                    Bank / wire transfers
                  </div>
                  <div className="text-3xl font-black text-gray-900">
                    {fmt(bankAnnual)}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {bankFeeBps} bps × {txPerYear.toLocaleString()} tx × ${avgAmount}
                  </div>
                </div>

                <div className="rounded-2xl border border-brand-primary/20 bg-brand-primary/5 p-5">
                  <div className="text-sm font-medium text-brand-primary mb-1">
                    With Tempest stablecoins
                  </div>
                  <div className="text-3xl font-black text-brand-primary">
                    {fmt(stablecoinAnnual)}
                  </div>
                  <div className="text-xs text-brand-primary/60 mt-1">
                    ${stablecoinPerTx} × {txPerYear.toLocaleString()} tx
                  </div>
                </div>

                <div className="rounded-2xl bg-brand-primary p-5 text-white">
                  <div className="text-sm font-semibold text-white/80 mb-1">
                    You save annually
                  </div>
                  <div className="text-4xl font-black">
                    {fmt(savings)}
                  </div>
                  <div className="mt-1 text-sm font-bold text-white/80">
                    {savingsPct.toFixed(0)}% reduction in payment costs
                  </div>
                </div>

                <a
                  href="https://app.tempest-pay.com"
                  className="mt-1 inline-flex items-center justify-center gap-2 rounded-xl bg-brand-primary px-6 py-3 text-sm font-bold text-white hover:bg-blue-700 transition-all"
                >
                  Start saving today
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </a>
              </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function CalcField({
  label,
  value,
  onChange,
  step,
  hint,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  step?: number;
  hint?: string;
}) {
  return (
    <label className="block">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm font-semibold text-gray-700">{label}</span>
        {hint && <span className="text-xs text-gray-400">{hint}</span>}
      </div>
      <input
        type="number"
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value || 0))}
        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all"
      />
    </label>
  );
}
