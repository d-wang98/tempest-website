import Link from "next/link";
import { Container } from "./Container";

const flows = [
  {
    title: "Trade Finance",
    description: "Automate conditional settlement, documents, and multi-party workflows for global trade.",
    href: "/solutions/trade-finance",
    label: "View Case Study",
    active: true,
  },
  {
    title: "High-Value Asset Settlement",
    description: "Programmable payments for high-value retail—escrow, milestones, and seamless checkout.",
    href: "#",
    label: "Coming Soon",
    active: false,
  },
  {
    title: "More Flows",
    description: "Additional payment flows and industry solutions are in the pipeline.",
    href: "#",
    label: "Coming Soon",
    active: false,
  },
];

export function CaseStudies() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center mb-10">
          <h2 className="text-gradient text-2xl font-regular md:text-3xl">
            Payment Flows & Case Studies
          </h2>
          <p className="mt-3 text-sm text-white/80">
            See how Tempest powers conditional payments and settlement across industries.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {flows.map((flow) => {
            const card = (
              <div
                className={`relative rounded-xl p-5 flex flex-col h-full ${
                  flow.active
                    ? "cursor-pointer"
                    : "opacity-75 cursor-not-allowed"
                }`}
              >
                <div
                  className="absolute inset-0 rounded-xl"
                  style={{
                    padding: "1px",
                    background: flow.active
                      ? "linear-gradient(to right, #489EFF, #0050FF)"
                      : "linear-gradient(to right, rgba(255,255,255,0.15), rgba(255,255,255,0.05))",
                    WebkitMask:
                      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                  }}
                />
                <div className="relative flex flex-col flex-1">
                  <h3 className="text-base font-semibold text-white">
                    {flow.title}
                  </h3>
                  <p className="mt-2 text-sm text-white/80 flex-1">
                    {flow.description}
                  </p>
                  <div className="mt-4">
                    {flow.active ? (
                      <span className="inline-flex items-center text-sm font-semibold text-[#489EFF] group-hover:text-[#6BB0FF] transition">
                        {flow.label}
                        <span className="ml-1.5">→</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center text-sm text-white/50">
                        {flow.label}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );

            return flow.active ? (
              <Link key={flow.title} href={flow.href} className="group block h-full">
                {card}
              </Link>
            ) : (
              <div key={flow.title} className="h-full">
                {card}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
