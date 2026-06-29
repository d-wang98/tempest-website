// Site-wide JSON-LD structured data. Validate at
// https://search.google.com/test/rich-results and https://validator.schema.org
// NOTE: optional fields (foundingDate, address) intentionally omitted — add when confirmed.

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Tempest",
  alternateName: "Tempest Pay",
  url: "https://www.tempest-pay.com",
  logo: "https://www.tempest-pay.com/assets/images/logo_blacktext.png",
  description:
    "Non-custodial stablecoin orchestration layer for B2B payments and trade finance. Accept, pay, and reconcile across any chain, with programmable settlement that releases funds when trade conditions are met.",
  email: "info@tempest-pay.com",
  founder: [
    {
      "@type": "Person",
      name: "David Wang",
      jobTitle: "Co-founder & CEO",
      alumniOf: "Carnegie Mellon University",
    },
    {
      "@type": "Person",
      name: "Brian Li",
      jobTitle: "Co-founder & CTO",
      alumniOf: "Yale University",
    },
  ],
  sameAs: [
    "https://x.com/Tempest_Pay",
    "https://www.linkedin.com/company/tempest-pay/",
  ],
};

const softwareApplication = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Tempest",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  url: "https://www.tempest-pay.com",
  description:
    "Programmable stablecoin payment and trade-finance platform. Funds sit in non-custodial escrow and release automatically when documents, inspections, or milestones are verified — settled in dollars, in seconds, on any chain, with ERP and digital-trade-document integration.",
  offers: {
    "@type": "Offer",
    category: "B2B payments / trade finance",
    availability: "https://schema.org/PreOrder",
  },
  provider: {
    "@type": "Organization",
    name: "Tempest",
    url: "https://www.tempest-pay.com",
  },
};

export function StructuredData() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplication) }} />
    </>
  );
}
