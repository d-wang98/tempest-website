"use client";
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Container } from "./Container";
import { TextReveal } from "./TextReveal";
import { FadeIn } from "./FadeIn";
import { RequestDemoButton } from "./RequestDemoButton";

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
  const t = useTranslations("Calculator");

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
            {t("label")}
          </p>
          <TextReveal
            as="h2"
            className="text-4xl font-black tracking-tight text-gray-900 md:text-5xl"
          >
            {t("heading")}
          </TextReveal>
          <p className="mx-auto mt-4 max-w-xl text-lg text-gray-500">
            {t("description")}
          </p>
        </FadeIn>

        <div className="mx-auto max-w-4xl">
          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm md:p-10">
            <div className="grid gap-10 lg:grid-cols-2">
              <FadeIn delay={100}>
                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-6">{t("inputsHeading")}</h3>
                  <div className="space-y-5">
                    <CalcField label={t("fieldTx")} value={txPerYear} onChange={setTxPerYear} step={100} />
                    <CalcField label={t("fieldAvg")} value={avgAmount} onChange={setAvgAmount} step={10} />
                    <CalcField label={t("fieldFee")} value={bankFeeBps} onChange={setBankFeeBps} step={1} hint={t("fieldFeeHint")} />
                    <CalcField label={t("fieldStable")} value={stablecoinPerTx} onChange={setStablecoinPerTx} step={0.01} />
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={200}>
                <div className="flex flex-col gap-4">
                  <h3 className="text-base font-bold text-gray-900">{t("resultsHeading")}</h3>

                  <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                    <div className="text-sm font-medium text-gray-500 mb-1">{t("bankLabel")}</div>
                    <div className="text-3xl font-black text-gray-900">{fmt(bankAnnual)}</div>
                    <div className="text-xs text-gray-400 mt-1">
                      {bankFeeBps} bps × {txPerYear.toLocaleString()} tx × ${avgAmount}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-brand-primary/20 bg-brand-primary/5 p-5">
                    <div className="text-sm font-medium text-brand-primary mb-1">{t("stableLabel")}</div>
                    <div className="text-3xl font-black text-brand-primary">{fmt(stablecoinAnnual)}</div>
                    <div className="text-xs text-brand-primary/60 mt-1">
                      ${stablecoinPerTx} × {txPerYear.toLocaleString()} tx
                    </div>
                  </div>

                  <div className="rounded-2xl bg-brand-primary p-5 text-white">
                    <div className="text-sm font-semibold text-white/80 mb-1">{t("savingsLabel")}</div>
                    <div className="text-4xl font-black">{fmt(savings)}</div>
                    <div className="mt-1 text-sm font-bold text-white/80">
                      {t("savingsPct", { pct: savingsPct.toFixed(0) })}
                    </div>
                  </div>

                  <RequestDemoButton className="mt-1 inline-flex items-center justify-center gap-2 rounded-xl bg-brand-primary px-6 py-3 text-sm font-bold text-white hover:bg-blue-700 transition-all">
                    {t("cta")}
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </RequestDemoButton>
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
