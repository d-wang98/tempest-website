import { Container } from "./Container";
import { StickyReveal } from "./StickyReveal";
import { FadeIn } from "./FadeIn";

type Feature = {
  title: string;
  body: string;
  accent: string;
  icon: React.ReactNode;
};

const features: Feature[] = [
  {
    title: "Seamless Liquidity Access",
    body: "Integrated on and off-ramps allow businesses to move between traditional fiat and stablecoins without leaving the platform.",
    accent: "bg-brand-primary/10 text-brand-primary",
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
      </svg>
    ),
  },
  {
    title: "Institutional Transparency",
    body: "Clear, immutable audit trail and robust counterparty identification to build trust between stakeholders at every step.",
    accent: "bg-brand-cyan/15 text-cyan-700",
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    title: "Enterprise-Grade Security",
    body: "Multi-party authorization rules maintain strict internal controls and prevent unauthorized fund movements, without sacrificing speed.",
    accent: "bg-brand-navy/10 text-brand-navy",
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
  },
  {
    title: "Deep Ecosystem Integration",
    body: "Native connectivity with eBL platforms ensures that digital bills of lading and payment triggers work in perfect sync with your workflows.",
    accent: "bg-purple-50 text-purple-700",
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
  },
  {
    title: "Automated Settlement Logic",
    body: "Programmable rules facilitate automated payment release conditional upon document receipt, milestone completion, or inspection approvals.",
    accent: "bg-green-50 text-green-700",
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    title: "ERP Connectivity",
    body: "Built-in integration layers for major ERP systems synchronize trade data with your existing financial records, with no manual re-entry.",
    accent: "bg-orange-50 text-orange-700",
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" />
      </svg>
    ),
  },
];

export function Features() {
  return (
    <>
      <StickyReveal
        id="product"
        text="Everything your payments stack needs"
        label="Platform Capabilities"
        description="We abstract exchanges, blockchains, and wallets into a single flow so stablecoins can be onboarded, sent, and settled easily while unlocking the full power of on-chain tools."
        className="text-4xl font-black tracking-tight text-gray-900 md:text-5xl"
        bg="#ffffff"
        bgVariant="wave"
      />
      <section className="pb-24 bg-white">
        <Container>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <FadeIn key={f.title} delay={i * 70}>
                <div className="group h-full rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md hover:border-brand-primary/20 transition-all">
                  <div className={`inline-flex items-center justify-center rounded-xl p-2.5 ${f.accent}`}>
                    {f.icon}
                  </div>
                  <h3 className="mt-4 text-base font-bold text-gray-900">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-500">{f.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
