import { Container } from "./Container";
import { LogoMark } from "./Logo";
import { FadeIn } from "./FadeIn";
import { RequestDemoButton } from "./RequestDemoButton";

function BlockPatternBg() {
  const blocks = [
    { col: 0, row: 0, color: "#2DAAFF", opacity: 0.15 },
    { col: 1, row: 0, color: "#2DAAFF", opacity: 0.12 },
    { col: 2, row: 0, color: "#55DCFF", opacity: 0.15 },
    { col: 1, row: 1, color: "#55DCFF", opacity: 0.1 },
    { col: 2, row: 1, color: "#2DAAFF", opacity: 0.12 },
    { col: 3, row: 1, color: "#2DAAFF", opacity: 0.08 },
    { col: 1, row: 2, color: "#55DCFF", opacity: 0.08 },
    { col: 2, row: 2, color: "#2DAAFF", opacity: 0.1 },
    { col: 2, row: 3, color: "#2DAAFF", opacity: 0.08 },
  ];
  const unit = 56;
  const w = 4 * unit;
  const h = 4 * unit;
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg className="absolute -left-10 -top-6 opacity-70" width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
        {blocks.map((b, i) => (
          <rect key={i} x={b.col * unit} y={b.row * unit} width={unit - 3} height={unit - 3} fill={b.color} opacity={b.opacity} rx={3} />
        ))}
      </svg>
      <svg className="absolute -right-10 -bottom-6 opacity-40 rotate-180" width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
        {blocks.map((b, i) => (
          <rect key={i} x={b.col * unit} y={b.row * unit} width={unit - 3} height={unit - 3} fill={b.color} opacity={b.opacity} rx={3} />
        ))}
      </svg>
    </div>
  );
}

export function CTA() {
  return (
    <section className="py-20 md:py-28 bg-brand-navy">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-primary to-brand-navy px-8 py-16 text-center shadow-2xl md:px-16">
          <BlockPatternBg />

          <div className="relative">
            <FadeIn className="mb-6 flex justify-center">
              <LogoMark size={48} />
            </FadeIn>

            <h2 className="text-4xl font-black tracking-tight text-white md:text-5xl">
              Ready to modernize<br />your payments?
            </h2>

            <FadeIn className="mt-5" delay={120}>
              <p className="mx-auto max-w-xl text-lg text-white/70">
                Join businesses already using Tempest to cut payment costs, settle
                faster, and stay in full control of their funds.
              </p>
            </FadeIn>

            <FadeIn className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row" delay={220}>
              <RequestDemoButton className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-8 py-3.5 text-base font-bold text-brand-primary hover:bg-gray-50 transition-all shadow-lg sm:w-auto">
                Request a Demo
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </RequestDemoButton>
              <a
                href="mailto:david@tempest-pay.com"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-8 py-3.5 text-base font-semibold text-white hover:bg-white/20 transition-all sm:w-auto"
              >
                Contact Sales
              </a>
            </FadeIn>

            <FadeIn className="mt-6" delay={320}>
            <p className="text-sm text-white/50">
              Enterprise SLA · Non-custodial · USDC & USDT support
            </p>
            </FadeIn>
          </div>
        </div>
      </Container>
    </section>
  );
}
