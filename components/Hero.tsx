import { Container } from "./Container";
import { FadeIn } from "./FadeIn";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white pt-20 pb-24 md:pt-28 md:pb-32">
      {/* Decorative block grid top-right */}
      <div className="pointer-events-none absolute -top-4 right-0 opacity-60 hidden lg:block">
        <BlockGrid />
      </div>
      {/* Blue glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-brand-primary/5 rounded-full blur-3xl" />

      <Container className="relative">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <FadeIn className="flex justify-center mb-6" delay={0}>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-4 py-1.5 text-xs font-semibold text-brand-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-primary animate-pulse" />
              Enterprise Stablecoin Infrastructure
            </span>
          </FadeIn>

          {/* Headline: static (above the fold, should be immediately impactful) */}
          <FadeIn delay={80}>
            <h1 className="text-5xl font-black leading-[1.05] tracking-tight text-gray-900 md:text-7xl">
              Stablecoin Payments,{" "}
              <span className="text-brand-gradient">Built for Business</span>
            </h1>
          </FadeIn>

          {/* Subheading */}
          <FadeIn className="mt-6" delay={180}>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-500 md:text-xl">
              Tempest is the non-custodial orchestration layer that makes
              stablecoin payments simple, trusted, and enterprise-ready, so you
              can accept, pay, and reconcile across any chain with confidence.
            </p>
          </FadeIn>

          {/* CTAs */}
          <FadeIn className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row" delay={280}>
            <a
              href="https://app.tempest-pay.com"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-primary px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-brand-primary/25 hover:bg-blue-700 transition-all sm:w-auto"
            >
              Start for Free
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
            <a
              href="#how-it-works"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-8 py-3.5 text-base font-semibold text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-all sm:w-auto"
            >
              See How It Works
            </a>
          </FadeIn>

          <FadeIn className="mt-5" delay={360}>
            <p className="text-xs text-gray-400">
              No credit card required · Non-custodial · Enterprise SLA available
            </p>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}

function BlockGrid() {
  const blocks = [
    { col: 0, row: 0, color: "#2DAAFF", opacity: 0.5 },
    { col: 1, row: 0, color: "#2DAAFF", opacity: 0.4 },
    { col: 2, row: 0, color: "#55DCFF", opacity: 0.5 },
    { col: 1, row: 1, color: "#0073FF", opacity: 0.45 },
    { col: 2, row: 1, color: "#2DAAFF", opacity: 0.4 },
    { col: 3, row: 1, color: "#2DAAFF", opacity: 0.35 },
    { col: 1, row: 2, color: "#55DCFF", opacity: 0.4 },
    { col: 2, row: 2, color: "#2DAAFF", opacity: 0.35 },
    { col: 2, row: 3, color: "#2DAAFF", opacity: 0.3 },
  ];
  const unit = 72;
  const W = 4 * unit;
  const H = 4 * unit;
  return (
    <svg width={W * 1.5} height={H * 1.5} viewBox={`0 0 ${W} ${H}`}>
      {blocks.map((b, i) => (
        <rect key={i} x={b.col * unit} y={b.row * unit} width={unit - 2} height={unit - 2} fill={b.color} opacity={b.opacity} rx={4} />
      ))}
    </svg>
  );
}
