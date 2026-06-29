import { NextRequest, NextResponse } from "next/server";

const esc = (v: unknown) =>
  String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const usd = (n: unknown) => {
  const v = Number(n);
  return Number.isFinite(v) ? `$${Math.round(v).toLocaleString()}` : esc(n);
};

const yn = (b: unknown) => (b ? "Yes" : "No");

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, company, locale } = body || {};
  const scenario = body?.scenario ?? {};
  const inputs = body?.inputs ?? {};
  const results = body?.results ?? {};

  if (!name || !email) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set");
    return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
  }

  const row = (label: string, value: string) =>
    `<tr><td style="padding:4px 12px 4px 0;color:#5b6678;font-size:13px">${label}</td><td style="padding:4px 0;font-weight:600;font-size:13px">${value}</td></tr>`;

  const html = `
    <div style="font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif;color:#1b2436">
      <h2 style="margin:0 0 4px">New calculator lead</h2>
      <p style="margin:0 0 16px;color:#5b6678;font-size:13px">Submitted from the Tempest cost calculator${locale ? ` (${esc(locale)})` : ""}.</p>

      <h3 style="margin:18px 0 6px;font-size:14px">Contact</h3>
      <table style="border-collapse:collapse">
        ${row("Name", esc(name))}
        ${row("Email", `<a href="mailto:${esc(email)}">${esc(email)}</a>`)}
        ${row("Company", esc(company) || "Not provided")}
      </table>

      <h3 style="margin:18px 0 6px;font-size:14px">Scenario</h3>
      <table style="border-collapse:collapse">
        ${row("Role", esc(scenario.role))}
        ${row("Compared against", esc(scenario.comparedAgainst))}
        ${row("Risk-adjusted view", yn(scenario.riskAdjusted))}
        ${row("Release on shipment (restructure)", yn(scenario.restructure))}
      </table>

      <h3 style="margin:18px 0 6px;font-size:14px">Their deal</h3>
      <table style="border-collapse:collapse">
        ${row("Deal value", usd(inputs.dealValue))}
        ${row("Payment term", `${esc(inputs.termDays)} days`)}
        ${row("Deals per year", esc(inputs.dealsPerYear))}
        ${row("Origin", esc(inputs.originCountry))}
        ${row("Destination", esc(inputs.destinationCountry))}
        ${row("Goods", esc(inputs.goods))}
        ${row("Counterparty risk", `${esc(inputs.riskLevel)} (recovery ${esc(inputs.recoveryPct)}%)`)}
      </table>

      <h3 style="margin:18px 0 6px;font-size:14px">Assumptions</h3>
      <table style="border-collapse:collapse">
        ${row("FX spread (traditional)", `${esc(inputs.fxTradPct)}%`)}
        ${row("Tempest FX", `${esc(inputs.fxTempestPct)}%`)}
        ${row("Cost of capital", `${esc(inputs.costOfCapitalPct)}%/yr`)}
        ${row("Tempest fee", `${esc(inputs.tempestFeePct)}%`)}
        ${row("LC issuance", `${esc(inputs.lcIssuancePct)}%`)}
        ${row("LC confirmed", `${yn(inputs.lcConfirmed)} (${esc(inputs.lcConfirmationPct)}%)`)}
        ${row("LC document cycle", `${esc(inputs.lcDocDays)} days`)}
        ${row("Factoring fee", `${esc(inputs.factorFeePct)}%`)}
        ${row("Factoring advance", `${esc(inputs.factorAdvancePct)}%`)}
        ${row("Factoring discount", `${esc(inputs.factorDiscountPct)}%/yr`)}
        ${row("Factoring recourse", yn(inputs.factorRecourse))}
      </table>

      <h3 style="margin:18px 0 6px;font-size:14px">Estimated result</h3>
      <table style="border-collapse:collapse">
        ${row(`${esc(scenario.comparedAgainst)} all-in / deal`, usd(results.incumbentAllIn))}
        ${row("Tempest all-in / deal", usd(results.tempestAllIn))}
        ${row("Savings / deal", usd(results.savingsPerDeal))}
        ${row("Savings / year", usd(results.savingsPerYear))}
        ${row("Lower cost", `${esc(results.savingsPct)}%`)}
        ${row("Working capital freed", `${esc(results.workingCapitalDaysFreed)} days · ${usd(results.workingCapitalAmountFreed)} / deal`)}
        ${row("Counterparty risk covered", `Tempest: Yes · ${esc(scenario.comparedAgainst)}: ${yn(results.riskCoveredIncumbent)}`)}
      </table>
    </div>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Tempest Website <onboarding@resend.dev>",
      to: ["info@tempest-pay.com"],
      subject: `Calculator lead: ${name}${company ? ` from ${company}` : ""}`,
      html,
      reply_to: email,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("Resend error:", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
