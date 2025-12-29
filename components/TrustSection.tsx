import { Container } from "./Container";
import Image, { StaticImageData } from "next/image";

import seamlessOnboardingIcon from "@/assets/seamless_onboarding.png";
import dynamicInvoicingIcon from "@/assets/dynamic_invoicing.png";
import nonCustodialByDesignIcon from "@/assets/non_custodial_by_design.png";
import saveOnFeesIcon from "@/assets/save_on_fees.png";
import smartStablecoinPaymentsIcon from "@/assets/smart_stablecoin_payments.png";
import accountingNativeSettlementIcon from "@/assets/accounting_native_settlement.png";
import unifiedIdentityAcrossChainsIcon from "@/assets/unified_identity_across_chains.png";
import humanReadablePaymentsIcon from "@/assets/human_readable_payments.png";

type Feature = {
  title: string;
  body: string;
  icon?: StaticImageData;
};

const features: Feature[] = [
  {
    title: "Smart Onboarding",
    body:
      "Automatically route users to the most efficient exchange or on‑ramp based on KYC, jurisdiction, and payment needs.",
    icon: seamlessOnboardingIcon,
  },
  {
    title: "Dynamic Invoicing",
    body:
      "Generate invoices and payment codes containing the exact chain, token, wallet address, and amount—precise and unambiguous.",
    icon: dynamicInvoicingIcon,
  },
  {
    title: "Non-Custodial by Design",
    body:
      "Tempest is built as a self-custody wallet powered by MPC signatures. Users and businesses retain full control of their funds—Tempest never takes custody.",
    icon: nonCustodialByDesignIcon,
  },
  {
    title: "Save on fees when making high frequent transactions.",
    body:
      "Payments in stablecoin are extremely low compared to traditional fiat ramps.",
    icon: saveOnFeesIcon,
  },
  {
    title: "Seamless Stablecoin Payments",
    body:
      "Pay across chains and tokens using existing balances. Tempest handles routing, conversion, and settlement behind the scenes.",
    icon: smartStablecoinPaymentsIcon,
  },
  {
    title: "Accounting‑Native Settlement",
    body:
      "Sync automatically with ERP, accounting, and tax software once funds are received—keeping records clean and auditable.",
    icon: accountingNativeSettlementIcon,
  },
  {
    title: "Unified Identity Across Chains",
    body:
      "Link counterparties to a single verified identity—even across multiple wallets and blockchains.",
    icon: unifiedIdentityAcrossChainsIcon,
  },
  {
    title: "Human‑Readable Payments",
    body:
      "Send and receive using familiar identifiers like phone numbers or verified business profiles—no error‑prone wallet addresses.",
    icon: humanReadablePaymentsIcon,
  },
];

export function TrustSection() {
  return (
    <section id="product" className="py-16 md:py-24">
      <Container>
        <div className="max-w-4xl text-left md:max-w-[calc(50%-8px)]">
          <h2 className="text-gradient text-[28px] font-regular leading-tight">
            How Tempest Works
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-white">
            We abstract exchanges, blockchains, and wallets into a single flow—so stablecoins can be onboarded, sent, and settled as easily as traditional payments, while remaining fully on‑chain.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {features.map((f) => (
            <div key={f.title} className="relative rounded-xl p-4">
              {/* True Gradient Border (B7ACFF to 5338FF) */}
              <div 
                className="absolute inset-0 rounded-xl"
                style={{
                  padding: '1px',
                  background: 'linear-gradient(to right,rgba(255, 255, 255, 0.5), #B7ACFF)',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                  pointerEvents: 'none',
                }}
              />
              {/* 5% Black Background Fill */}
              <div className="absolute inset-0 rounded-xl bg-black/5 pointer-events-none" />
              
              <div className="relative flex items-start gap-3">
                <div className="relative mt-0.5 h-8 w-8 shrink-0">
                  {f.icon ? (
                    <Image
                      src={f.icon}
                      alt=""
                      fill
                      sizes="32px"
                      className="object-contain object-center"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-md bg-gradient-to-br from-white/20 to-white/5" />
                  )}
                </div>
                <div>
                  <div className="text-[16px] font-semibold text-white">{f.title}</div>
                  <div className="mt-1 text-[12px] leading-relaxed text-white">{f.body}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
