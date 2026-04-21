import { Container } from "./Container";
import { StickyReveal } from "./StickyReveal";
import { FadeIn } from "./FadeIn";

const steps = [
  {
    number: "01",
    title: "Connect & Onboard",
    body: "Sign up, complete KYC, and connect your business in minutes. Tempest routes you to the right exchange or on-ramp automatically based on your jurisdiction.",
    detail: "Bridge API · Plaid integration · Privy auth",
  },
  {
    number: "02",
    title: "Issue, Pay & Receive",
    body: "Create invoices with exact chain and token specs. Send and receive stablecoin payments across any supported network with automatic routing and conversion.",
    detail: "Multi-chain routing · Cross-token swaps · Human-readable IDs",
  },
  {
    number: "03",
    title: "Auto-Reconcile & Settle",
    body: "Once funds arrive, Tempest syncs automatically with your accounting and ERP software. Every transaction is auditable, exportable, and tax-ready.",
    detail: "ERP sync · Tax software · On-chain audit trail",
  },
];

export function HowItWorks() {
  return (
    <>
      <StickyReveal
        id="how-it-works"
        text={"From setup to settlement\nin three steps"}
        label="How It Works"
        className="text-4xl font-black tracking-tight text-gray-900 md:text-5xl"
        bg="#ffffff"
        bgVariant="streams"
      />
      <section className="pb-24 bg-white">
      <Container>
        <div className="relative">
          <div
            className="absolute top-10 bottom-10 w-px bg-gradient-to-b from-brand-primary/30 via-brand-blue/20 to-transparent hidden md:block"
            style={{ left: "2.5rem" }}
          />

          <div className="space-y-6">
            {steps.map((step, i) => (
              <FadeIn key={step.number} delay={i * 130}>
                <div className="flex gap-6 md:gap-10">
                  <div className="flex-shrink-0 relative z-10">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-primary text-white font-black text-sm shadow-lg">
                      {i + 1}
                    </div>
                  </div>

                  <div className="flex-1 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md hover:border-brand-primary/15 transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:gap-6">
                      <div className="flex-1">
                        <div className="text-xs font-bold uppercase tracking-widest text-brand-primary/50 mb-1">
                          Step {step.number}
                        </div>
                        <h3 className="text-xl font-black text-gray-900">{step.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-gray-500">{step.body}</p>
                      </div>
                      <div className="mt-4 sm:mt-0 sm:flex-shrink-0">
                        <div className="inline-flex flex-wrap gap-1.5">
                          {step.detail.split(" · ").map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full bg-brand-primary/8 px-2.5 py-1 text-xs font-semibold text-brand-primary"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </Container>
      </section>
    </>
  );
}
