"use client";
import { useMemo, useState } from "react";
import { useTranslations, useLocale } from "next-intl";

type Role = "importer" | "exporter";
type Incumbent = "lc" | "factoring";
type RiskLevel = "low" | "med" | "high";
type Mode = "deal" | "year";
type Status = "idle" | "loading" | "success" | "error";

const COUNTRIES: { code: string; en: string; zh: string }[] = [
  { code: "US", en: "United States", zh: "美国" }, { code: "CN", en: "China", zh: "中国" },
  { code: "HK", en: "Hong Kong SAR", zh: "香港" }, { code: "DE", en: "Germany", zh: "德国" },
  { code: "JP", en: "Japan", zh: "日本" }, { code: "GB", en: "United Kingdom", zh: "英国" },
  { code: "IN", en: "India", zh: "印度" }, { code: "KR", en: "South Korea", zh: "韩国" },
  { code: "SG", en: "Singapore", zh: "新加坡" }, { code: "NL", en: "Netherlands", zh: "荷兰" },
  { code: "VN", en: "Vietnam", zh: "越南" }, { code: "TH", en: "Thailand", zh: "泰国" },
  { code: "ID", en: "Indonesia", zh: "印度尼西亚" }, { code: "MY", en: "Malaysia", zh: "马来西亚" },
  { code: "AE", en: "United Arab Emirates", zh: "阿联酋" }, { code: "TR", en: "Türkiye", zh: "土耳其" },
  { code: "MX", en: "Mexico", zh: "墨西哥" }, { code: "BR", en: "Brazil", zh: "巴西" },
  { code: "TW", en: "Taiwan", zh: "台湾" }, { code: "OTHER", en: "Other", zh: "其他" },
];

const GOODS = [
  "goodsElectronics", "goodsApparel", "goodsMachinery", "goodsCommodities",
  "goodsFood", "goodsAuto", "goodsChemicals", "goodsOther",
];

const PD: Record<RiskLevel, number> = { low: 0.5, med: 2, high: 5 };

function money(n: number) {
  const v = Math.round(n);
  return (v < 0 ? "-$" : "$") + Math.abs(v).toLocaleString();
}

export function TradeCalculator() {
  const t = useTranslations("TradeCalculator");
  const locale = useLocale();

  const [role, setRoleState] = useState<Role>("exporter");
  const [incumbent, setIncumbent] = useState<Incumbent>("lc");

  const [value, setValue] = useState(100000);
  const [term, setTerm] = useState(60);
  const [deals, setDeals] = useState(12);

  const [origin, setOrigin] = useState("CN");
  const [dest, setDest] = useState("US");
  const [goods, setGoods] = useState("goodsElectronics");

  // common assumptions
  const [fxTrad, setFxTrad] = useState(2.0);
  const [fxTempest, setFxTempest] = useState(0.5);
  const [coc, setCoc] = useState(12);
  const [tempestFee, setTempestFee] = useState(0.75);
  // LC
  const [lcIssuance, setLcIssuance] = useState(1.5);
  const [lcConfirmed, setLcConfirmed] = useState(true);
  const [lcConfirmation, setLcConfirmation] = useState(1.0);
  const [lcDocFee, setLcDocFee] = useState(150);
  const [lcDocDays, setLcDocDays] = useState(10);
  // factoring
  const [factorFee, setFactorFee] = useState(2.0);
  const [factorAdvance, setFactorAdvance] = useState(85);
  const [factorDiscount, setFactorDiscount] = useState(12);
  const [factorRecourse, setFactorRecourse] = useState(false);
  // time
  const [wireDays, setWireDays] = useState(3);
  const [tempestSettle, setTempestSettle] = useState(1);
  const [restructure, setRestructure] = useState(false);
  const [shipmentDays, setShipmentDays] = useState(5);
  // risk
  const [riskLevel, setRiskLevel] = useState<RiskLevel>("med");
  const [recovery, setRecovery] = useState(30);
  const [riskAdjusted, setRiskAdjusted] = useState(true);

  const [mode, setMode] = useState<Mode>("deal");
  const [showAssumptions, setShowAssumptions] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "" });
  const [status, setStatus] = useState<Status>("idle");

  const setRole = (r: Role) => {
    setRoleState(r);
    if (r === "importer") setIncumbent("lc");
  };

  const m = useMemo(() => {
    const el = value * (PD[riskLevel] / 100) * (1 - recovery / 100);
    const cap = (days: number) => value * (coc / 100) * (days / 365);
    const fxT = value * (fxTrad / 100);

    const open = {
      key: "open", fees: 0, fx: fxT, days: term + wireDays, capital: 0, riskCovered: false,
    };
    open.capital = cap(open.days);

    const lc = {
      key: "lc",
      fees: value * (lcIssuance / 100) + (lcConfirmed ? value * (lcConfirmation / 100) : 0) + lcDocFee,
      fx: fxT,
      days: role === "exporter" ? shipmentDays + lcDocDays : term + lcDocDays,
      capital: 0, riskCovered: true,
    };
    lc.capital = cap(lc.days);

    const factoring = {
      key: "factoring",
      fees: value * (factorFee / 100) + (factorAdvance / 100) * value * (factorDiscount / 100) * (term / 365),
      fx: fxT,
      days: 2, capital: 0, riskCovered: !factorRecourse,
    };
    factoring.capital = cap(factoring.days);

    const inc = incumbent === "lc" ? lc : factoring;
    // Tempest releases on the shipment milestone (instant settle). It removes the
    // incumbent's processing lag but does NOT compress the commercial term by default;
    // an importer can only shorten the net-term via the "release on shipment" restructure.
    const shipMilestone = shipmentDays + tempestSettle;
    const tempDays =
      incumbent === "factoring"
        ? shipMilestone
        : role === "exporter"
          ? shipMilestone
          : restructure
            ? shipMilestone
            : term + tempestSettle;
    const tempest = {
      key: "tempest", fees: value * (tempestFee / 100), fx: value * (fxTempest / 100),
      days: tempDays, capital: cap(tempDays), riskCovered: true,
    };

    const total = (o: typeof open) => o.fees + o.fx + o.capital + (riskAdjusted && !o.riskCovered ? el : 0);

    const incTotal = total(inc);
    const tempTotal = total(tempest);
    const savePer = incTotal - tempTotal;
    const pct = incTotal > 0 ? (savePer / incTotal) * 100 : 0;
    const wcDays = inc.days - tempest.days;
    const wcAmt = cap(inc.days) - cap(tempest.days);

    const all =
      role === "exporter"
        ? [tempest, lc, factoring, open]
        : [tempest, lc, open];

    return { el, open, lc, factoring, inc, tempest, total, incTotal, tempTotal, savePer, pct, wcDays, wcAmt, all };
  }, [
    value, term, role, incumbent, fxTrad, fxTempest, coc, tempestFee, lcIssuance, lcConfirmed,
    lcConfirmation, lcDocFee, lcDocDays, factorFee, factorAdvance, factorDiscount, factorRecourse,
    wireDays, tempestSettle, restructure, shipmentDays, riskLevel, recovery, riskAdjusted,
  ]);

  const mult = mode === "year" ? deals : 1;
  const openAdj = m.open.fees + m.open.fx + m.open.capital + m.el;
  const maxT = Math.max(m.incTotal, m.tempTotal, riskAdjusted ? openAdj : 0, 1);

  const incName = incumbent === "lc" ? (lcConfirmed ? t("incLcConfirmed") : t("incLc")) : t("incFactoring");
  const optName = (key: string) =>
    key === "tempest" ? "Tempest"
      : key === "lc" ? (lcConfirmed ? t("incLcConfirmed") : t("incLc"))
        : key === "factoring" ? t("incFactoring") : t("incOpen");

  const wcNote = incumbent === "factoring" ? t("wcNoteFactor") : (restructure && role === "importer") ? t("wcNoteRestructure") : t("wcNoteDefault");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/calculator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name, email: form.email, company: form.company, locale,
          scenario: {
            role: role === "importer" ? t("roleImporter") : t("roleExporter"),
            comparedAgainst: incName,
            riskAdjusted, restructure,
          },
          inputs: {
            dealValue: value, termDays: term, dealsPerYear: deals,
            originCountry: COUNTRIES.find((c) => c.code === origin)?.en ?? origin,
            destinationCountry: COUNTRIES.find((c) => c.code === dest)?.en ?? dest,
            goods: t(goods as never),
            fxTradPct: fxTrad, fxTempestPct: fxTempest, costOfCapitalPct: coc, tempestFeePct: tempestFee,
            lcIssuancePct: lcIssuance, lcConfirmed, lcConfirmationPct: lcConfirmation, lcDocDays,
            factorFeePct: factorFee, factorAdvancePct: factorAdvance, factorDiscountPct: factorDiscount, factorRecourse,
            riskLevel, recoveryPct: recovery,
          },
          results: {
            incumbentAllIn: Math.round(m.incTotal),
            tempestAllIn: Math.round(m.tempTotal),
            savingsPerDeal: Math.round(m.savePer),
            savingsPerYear: Math.round(m.savePer * deals),
            savingsPct: Math.round(m.pct),
            workingCapitalDaysFreed: Math.round(m.wcDays),
            workingCapitalAmountFreed: Math.round(m.wcAmt),
            riskCoveredIncumbent: m.inc.riskCovered,
          },
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="grid gap-5 lg:grid-cols-[1.02fr_0.98fr]">
      {/* ---------- Inputs ---------- */}
      <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
        <p className="mb-4 text-sm leading-relaxed text-gray-500">{t("intro")}</p>

        <Label>{t("roleHeading")}</Label>
        <Segmented
          options={[{ k: "importer", label: t("roleImporter") }, { k: "exporter", label: t("roleExporter") }]}
          value={role}
          onChange={(k) => setRole(k as Role)}
        />

        <div className="mt-5">
          <Label>{t("compareHeading")}</Label>
          <Segmented
            options={
              role === "exporter"
                ? [{ k: "lc", label: t("incLc") }, { k: "factoring", label: t("incFactoring") }]
                : [{ k: "lc", label: t("incLc") }]
            }
            value={incumbent}
            onChange={(k) => setIncumbent(k as Incumbent)}
          />
        </div>

        <div className="mt-6 space-y-5 border-t border-gray-100 pt-5">
          <Slider label={t("value")} hint={t("valueHint")} value={value} display={money(value)} min={5000} max={2000000} step={5000} onChange={setValue} />
          <Slider label={t("term")} hint={t("termHint")} value={term} display={`${term} ${t("termUnit")}`} min={0} max={180} step={5} onChange={setTerm} />
          <Slider label={t("deals")} value={deals} display={String(deals)} min={1} max={200} step={1} onChange={setDeals} />
        </div>

        {/* Details & assumptions — collapsed for a clean default view */}
        <div className="mt-6 border-t border-gray-100 pt-5">
          <button type="button" onClick={() => setShowAssumptions((s) => !s)} className="flex items-center gap-1.5 text-xs font-bold text-brand-primary">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} className={`transition-transform ${showAssumptions ? "rotate-90" : ""}`}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            {t("assumptionsToggle")}
          </button>
          {showAssumptions && (
            <div className="mt-4 space-y-5">
              <div>
                <p className="mb-2.5 text-xs font-bold uppercase tracking-wide text-gray-400">{t("tradeHeading")}</p>
                <div className="grid gap-3 sm:grid-cols-3">
                  <Select label={t("originCountry")} value={origin} onChange={setOrigin}>
                    {COUNTRIES.map((c) => <option key={c.code} value={c.code}>{locale === "zh" ? c.zh : c.en}</option>)}
                  </Select>
                  <Select label={t("destCountry")} value={dest} onChange={setDest}>
                    {COUNTRIES.map((c) => <option key={c.code} value={c.code}>{locale === "zh" ? c.zh : c.en}</option>)}
                  </Select>
                  <Select label={t("goodsType")} value={goods} onChange={setGoods}>
                    {GOODS.map((g) => <option key={g} value={g}>{t(g as never)}</option>)}
                  </Select>
                </div>
              </div>

              <div>
                <p className="mb-2.5 text-xs font-bold uppercase tracking-wide text-gray-400">{t("riskHeading")}</p>
                <Segmented
                  options={[{ k: "low", label: t("riskLow") }, { k: "med", label: t("riskMed") }, { k: "high", label: t("riskHigh") }]}
                  value={riskLevel}
                  onChange={(k) => setRiskLevel(k as RiskLevel)}
                />
                <div className="mt-2.5 space-y-0.5 text-[11px] leading-relaxed text-gray-400">
                  <p>{t("riskTiers", { low: 0.5, med: 2, high: 5 })}</p>
                  <p className="tabular-nums">{t("riskFormula", { value: money(value), pd: PD[riskLevel], recovery, el: money(m.el) })}</p>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <NumField label={t("recovery")} value={recovery} step={5} suffix="%" onChange={setRecovery} />
                </div>
                <label className="mt-3 flex cursor-pointer items-start gap-2.5">
                  <input type="checkbox" checked={riskAdjusted} onChange={(e) => setRiskAdjusted(e.target.checked)} className="mt-0.5 h-4 w-4 accent-brand-primary" />
                  <span>
                    <span className="text-sm font-semibold text-gray-700">{t("riskAdjusted")}</span>
                    <span className="block text-xs text-gray-400">{t("riskAdjustedHint")}</span>
                  </span>
                </label>
              </div>

              <Group title={t("grpCommon")}>
                <NumField label={t("fxSpread")} value={fxTrad} step={0.1} suffix="%" onChange={setFxTrad} />
                <NumField label={t("tempestFx")} value={fxTempest} step={0.1} suffix="%" onChange={setFxTempest} />
                <NumField label={t("coc")} value={coc} step={0.5} suffix={t("cocUnit")} onChange={setCoc} />
                <NumField label={t("tempestFee")} value={tempestFee} step={0.05} suffix="%" onChange={setTempestFee} />
              </Group>

              {incumbent === "lc" && (
                <Group title={t("grpLc")}>
                  <NumField label={t("lcIssuance")} value={lcIssuance} step={0.1} suffix="%" onChange={setLcIssuance} />
                  <NumField label={t("lcConfirmation")} value={lcConfirmation} step={0.1} suffix="%" onChange={setLcConfirmation} />
                  <NumField label={t("lcDocFee")} value={lcDocFee} step={25} suffix="$" onChange={setLcDocFee} />
                  <NumField label={t("lcDocDays")} value={lcDocDays} step={1} suffix={t("termUnit")} onChange={setLcDocDays} />
                  <Check label={t("lcConfirmedToggle")} checked={lcConfirmed} onChange={setLcConfirmed} />
                </Group>
              )}

              {incumbent === "factoring" && (
                <Group title={t("grpFactoring")}>
                  <NumField label={t("factorFee")} value={factorFee} step={0.1} suffix="%" onChange={setFactorFee} />
                  <NumField label={t("factorAdvance")} value={factorAdvance} step={1} suffix="%" onChange={setFactorAdvance} />
                  <NumField label={t("factorDiscount")} value={factorDiscount} step={0.5} suffix={t("cocUnit")} onChange={setFactorDiscount} />
                  <Check label={t("factorRecourse")} checked={factorRecourse} onChange={setFactorRecourse} />
                </Group>
              )}

              <Group title={t("grpTime")}>
                <NumField label={t("wireDays")} value={wireDays} step={1} suffix={t("termUnit")} onChange={setWireDays} />
                <NumField label={t("tempestSettle")} value={tempestSettle} step={1} suffix={t("termUnit")} onChange={setTempestSettle} />
                <NumField label={t("shipmentDays")} value={shipmentDays} step={1} suffix={t("termUnit")} onChange={setShipmentDays} />
                <Check label={t("restructure")} checked={restructure} onChange={setRestructure} hint={t("restructureHint")} />
              </Group>
            </div>
          )}
        </div>
      </div>

      {/* ---------- Results ---------- */}
      <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
        <div className="mb-4 flex items-center justify-between gap-3">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-primary">{t("resultsHeading", { incumbent: incName })}</p>
          <div className="inline-flex shrink-0 rounded-lg bg-gray-100 p-0.5">
            <button type="button" onClick={() => setMode("deal")} className={`rounded-md px-2.5 py-1 text-xs font-semibold transition-colors ${mode === "deal" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"}`}>{t("perDeal")}</button>
            <button type="button" onClick={() => setMode("year")} className={`rounded-md px-2.5 py-1 text-xs font-semibold transition-colors ${mode === "year" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"}`}>{t("perYear")}</button>
          </div>
        </div>

        <div className="rounded-2xl bg-brand-navy p-5 text-white">
          <div className="text-sm text-white/70">{mode === "year" ? t("saveYear") : t("saveDeal")}</div>
          <div className="mt-1 text-4xl font-black tabular-nums tracking-tight">{money(m.savePer * mult)}</div>
          <span className="mt-2 inline-block rounded-full bg-white/15 px-2.5 py-0.5 text-xs font-semibold">{t("pctLower", { pct: Math.round(m.pct) })}</span>
        </div>

        {/* Cost breakdown — shown by default */}
        <div className="mt-5 space-y-4">
          {riskAdjusted && (
            <CostBar label={t("incOpen")} amount={money(openAdj * mult)} o={m.open} el={m.el} maxT={maxT} />
          )}
          <CostBar label={t("incAllIn", { name: incName })} amount={money(m.incTotal * mult)} o={m.inc} el={riskAdjusted && !m.inc.riskCovered ? m.el : 0} maxT={maxT} />
          <CostBar label={t("tempestAllIn")} amount={money(m.tempTotal * mult)} o={m.tempest} el={0} maxT={maxT} highlight />
        </div>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-[11px] text-gray-500">
          <Legend color="bg-brand-navy" label={t("legendFees")} />
          <Legend color="bg-brand-blue" label={t("legendFx")} />
          <Legend color="bg-amber-400" label={t("legendCapital")} />
          {riskAdjusted && <Legend color="bg-rose-400" label={t("legendRisk")} />}
        </div>

        {/* Working capital & risk (collapsed) */}
        <div className="mt-4 border-t border-gray-100 pt-4">
          <button type="button" onClick={() => setShowDetail((s) => !s)} className="flex items-center gap-1.5 text-xs font-bold text-brand-primary">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} className={`transition-transform ${showDetail ? "rotate-90" : ""}`}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            {t("detailToggle")}
          </button>
          {showDetail && (
            <div className="mt-3 overflow-hidden rounded-2xl border border-gray-100">
              <div className="flex items-center justify-between gap-3 px-4 py-3">
                <span className="text-sm text-gray-500">{t("wcFreed")}</span>
                <span className="text-right text-sm font-bold tabular-nums text-gray-900">
                  {t("wcFreedValue", { days: Math.max(Math.round(m.wcDays), 0), amount: money(Math.max(m.wcAmt, 0) * mult) })}
                </span>
              </div>
              <div className="flex items-center justify-between gap-3 border-t border-gray-100 px-4 py-3">
                <span className="text-sm text-gray-500">{t("riskRow")}</span>
                <span className="text-right text-sm font-bold">
                  {m.inc.riskCovered ? (
                    <span className="text-brand-primary">{t("covered")}</span>
                  ) : (
                    <span className="text-brand-primary">Tempest {t("covered")} · <span className="text-rose-500">{incName} {t("notCovered")}</span></span>
                  )}
                  <span className="ml-2 font-normal tabular-nums text-gray-400">{money(m.el * mult)}</span>
                </span>
              </div>
              <div className="border-t border-gray-100 px-4 py-3">
                <p className="text-[11px] leading-relaxed text-gray-400">{wcNote}</p>
                <p className="mt-1 text-[11px] leading-relaxed text-gray-400">{t("exposureNote", { name: incName })}</p>
              </div>
            </div>
          )}
        </div>

        {/* Compare all (collapsed) */}
        <div className="mt-3 border-t border-gray-100 pt-4">
          <button type="button" onClick={() => setShowAll((s) => !s)} className="flex items-center gap-1.5 text-xs font-bold text-brand-primary">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} className={`transition-transform ${showAll ? "rotate-90" : ""}`}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            {showAll ? t("hideCompare") : t("compareAll")}
          </button>
          {showAll && (
            <table className="mt-3 w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-left text-[11px] uppercase tracking-wide text-gray-400">
                  <th className="pb-2 font-semibold">{t("colOption")}</th>
                  <th className="pb-2 text-right font-semibold">{t("colCost")}</th>
                  <th className="pb-2 text-right font-semibold">{t("colRisk")}</th>
                </tr>
              </thead>
              <tbody>
                {m.all.map((o) => (
                  <tr key={o.key} className="border-b border-gray-50 last:border-0">
                    <td className={`py-2 font-semibold ${o.key === "tempest" ? "text-brand-primary" : "text-gray-700"}`}>{optName(o.key)}</td>
                    <td className="py-2 text-right tabular-nums text-gray-900">{money(m.total(o) * mult)}</td>
                    <td className="py-2 text-right">{o.riskCovered ? "✓" : "✗"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Lead capture (revealed on demand) */}
        <div className="mt-6 border-t border-gray-100 pt-5">
          {status === "success" ? (
            <div className="py-4 text-center">
              <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-green-50">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} className="text-green-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h4 className="text-sm font-bold text-gray-900">{t("successTitle")}</h4>
              <p className="mt-1 text-sm text-gray-500">{t("successDesc")}</p>
            </div>
          ) : showForm ? (
            <form onSubmit={submit} className="space-y-3">
              <div>
                <h4 className="text-sm font-bold text-gray-900">{t("contactHeading")}</h4>
                <p className="mt-0.5 text-xs text-gray-500">{t("contactDesc")}</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <input required type="text" placeholder={t("namePlaceholder")} aria-label={t("name")} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-300 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20" />
                <input required type="email" placeholder={t("emailPlaceholder")} aria-label={t("email")} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-300 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20" />
              </div>
              <input type="text" placeholder={t("companyPlaceholder")} aria-label={t("company")} value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-300 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20" />
              {status === "error" && (
                <p className="text-xs text-red-500">{t("errorText")} <a href="mailto:info@tempest-pay.com" className="underline">info@tempest-pay.com</a></p>
              )}
              <button type="submit" disabled={status === "loading"} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-primary py-3 text-sm font-bold text-white shadow-lg shadow-brand-primary/25 transition-colors hover:bg-blue-700 disabled:opacity-60">
                {status === "loading" ? t("submitting") : t("submit")}
              </button>
            </form>
          ) : (
            <button type="button" onClick={() => setShowForm(true)} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-primary py-3 text-sm font-bold text-white shadow-lg shadow-brand-primary/25 transition-colors hover:bg-blue-700">
              {t("contactHeading")}
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
            </button>
          )}
        </div>

        <p className="mt-4 text-[11px] leading-relaxed text-gray-400">{t("disclaimer")}</p>
      </div>
    </div>
  );
}

/* ---------- helpers ---------- */

function Label({ children }: { children: React.ReactNode }) {
  return <p className="mb-2.5 text-xs font-bold uppercase tracking-widest text-gray-400">{children}</p>;
}

function Segmented({ options, value, onChange }: { options: { k: string; label: string }[]; value: string; onChange: (k: string) => void }) {
  return (
    <div className="inline-flex flex-wrap gap-1 rounded-xl border border-gray-200 bg-white p-1">
      {options.map((o) => (
        <button key={o.k} type="button" onClick={() => onChange(o.k)}
          className={`rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors ${value === o.k ? "bg-brand-primary text-white shadow-sm" : "text-gray-500 hover:text-gray-800"}`}>
          {o.label}
        </button>
      ))}
    </div>
  );
}

function Slider({ label, hint, value, display, min, max, step, onChange }: { label: string; hint?: string; value: number; display: string; min: number; max: number; step: number; onChange: (v: number) => void }) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between">
        <span className="text-sm font-semibold text-gray-700">{label}</span>
        <span className="text-sm font-bold tabular-nums text-brand-navy">{display}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-gray-200 accent-brand-primary" />
      {hint && <p className="mt-1.5 text-xs text-gray-400">{hint}</p>}
    </div>
  );
}

function Select({ label, value, onChange, children }: { label: string; value: string; onChange: (v: string) => void; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-gray-600">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm font-medium text-gray-900 outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20">
        {children}
      </select>
    </label>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-2.5 text-xs font-bold uppercase tracking-wide text-gray-400">{title}</p>
      <div className="grid grid-cols-2 gap-3">{children}</div>
    </div>
  );
}

function NumField({ label, value, step, suffix, onChange }: { label: string; value: number; step: number; suffix: string; onChange: (v: number) => void }) {
  return (
    <div>
      <span className="mb-1.5 block text-xs font-semibold text-gray-600">{label}</span>
      <div className="flex items-center overflow-hidden rounded-lg border border-gray-200 bg-white focus-within:border-brand-primary focus-within:ring-2 focus-within:ring-brand-primary/20">
        <input type="number" value={value} step={step} min={0} onChange={(e) => onChange(Number(e.target.value || 0))} className="w-full px-3 py-2 text-sm tabular-nums text-gray-900 outline-none" />
        <span className="px-2.5 text-xs text-gray-400">{suffix}</span>
      </div>
    </div>
  );
}

function Check({ label, checked, onChange, hint }: { label: string; checked: boolean; onChange: (v: boolean) => void; hint?: string }) {
  return (
    <label className="col-span-2 flex cursor-pointer items-start gap-2.5">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="mt-0.5 h-4 w-4 accent-brand-primary" />
      <span>
        <span className="text-sm font-semibold text-gray-700">{label}</span>
        {hint && <span className="block text-xs text-gray-400">{hint}</span>}
      </span>
    </label>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return <span className="flex items-center gap-1.5"><i className={`h-2.5 w-2.5 rounded-sm ${color}`} />{label}</span>;
}

function CostBar({ label, amount, o, el, maxT, highlight }: { label: string; amount: string; o: { fees: number; fx: number; capital: number }; el: number; maxT: number; highlight?: boolean }) {
  const tot = o.fees + o.fx + o.capital + el;
  const scale = (tot / maxT) * 100;
  const d = tot || 1;
  const seg = (v: number, cls: string) => <div className={`h-full ${cls}`} style={{ width: `${(scale * v) / d}%` }} />;
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-xs">
        <b className={highlight ? "text-brand-primary" : "text-gray-700"}>{label}</b>
        <span className="font-bold tabular-nums text-gray-900">{amount}</span>
      </div>
      <div className="flex h-7 overflow-hidden rounded-lg bg-gray-100">
        {seg(o.fees, "bg-brand-navy")}
        {seg(o.fx, "bg-brand-blue")}
        {seg(o.capital, "bg-amber-400")}
        {seg(el, "bg-rose-400")}
      </div>
    </div>
  );
}
