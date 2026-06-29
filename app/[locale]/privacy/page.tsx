import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { LegalDoc, type LegalSection } from "@/components/LegalDoc";

const UPDATED = "29 June 2026";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    locale,
    path: "privacy",
    title: "Privacy Policy | Tempest",
    description:
      "How Tempest collects, uses, shares, and protects your personal data, and the rights available to you.",
  });
}

const INTRO = [
  "Tempest (“Tempest”, “we”, “us”, or “our”) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal data when you visit www.tempest-pay.com (the “Site”), contact us, request a demo, use our tools such as the trade calculator, or otherwise engage with our services.",
  "By using the Site or providing us with your personal data, you acknowledge that you have read and understood this Privacy Policy. If you do not agree with it, please do not use the Site or provide us with your personal data.",
];

const SECTIONS: LegalSection[] = [
  {
    heading: "Information We Collect",
    body: [
      "We collect personal data that you provide directly to us, data generated through your use of the Site, and data we receive from third parties. In particular:",
      { subheading: "Information you provide to us" },
      {
        list: [
          "Contact and demo requests: your name, email address, company name, role, phone number, and any message or information you submit through our contact, inquiry, or “Request Demo” forms.",
          "Onboarding, account, and KYC/KYB data: where you proceed beyond the marketing Site to engage our services, identity verification information, business and corporate documents, beneficial ownership details, banking and financial information, and other data required to meet our legal and compliance obligations.",
          "Calculator inputs: trade values, amounts, currencies, and similar figures you enter into our trade calculator. These are used to generate estimates for you and to improve our tools.",
        ],
      },
      { subheading: "Information we collect automatically" },
      {
        list: [
          "Device and usage data: IP address, browser type, operating system, referring pages, pages visited, and the dates and times of your visits.",
          "Cookies and similar technologies: small data files stored on your device that help the Site function and allow us to understand how it is used. See “Cookies and Analytics” below.",
        ],
      },
    ],
  },
  {
    heading: "How We Use Your Information",
    body: [
      "We use personal data for the following purposes:",
      {
        list: [
          "To respond to your inquiries, schedule and conduct demos, and communicate with you about our products and services.",
          "To provide, operate, maintain, and improve the Site, the trade calculator, and our services.",
          "To onboard customers, verify identity, and conduct due diligence, fraud prevention, anti-money-laundering (AML), counter-terrorism-financing, and sanctions screening.",
          "To send administrative information, service updates, and, where permitted, marketing communications (which you may opt out of at any time).",
          "To analyse usage and trends so that we can improve the design, content, and performance of the Site.",
          "To comply with applicable laws, regulations, and lawful requests from public authorities, and to enforce our terms and protect our rights.",
        ],
      },
    ],
  },
  {
    heading: "Cookies and Analytics",
    body: [
      "We use cookies and similar technologies to operate the Site, remember your preferences, and measure performance. We may use analytics providers (such as web and product analytics services) that set cookies or collect usage data on our behalf to help us understand how visitors interact with the Site.",
      "You can control cookies through your browser settings and may delete or block them. Note that disabling certain cookies may affect how the Site functions.",
    ],
  },
  {
    heading: "How We Share Your Information",
    body: [
      "We do not sell your personal data. We may share personal data with:",
      {
        list: [
          "Service providers and vendors who perform services on our behalf, such as hosting, analytics, communications, identity verification, and payment or financial infrastructure providers, under appropriate confidentiality and data-protection obligations.",
          "Financial institutions, banking, and trade-finance partners as necessary to provide and facilitate our services.",
          "Regulators, law enforcement, courts, and other authorities where required by law or to protect our rights, users, or the public.",
          "Parties to a corporate transaction, such as a merger, acquisition, financing, or sale of assets, subject to standard confidentiality protections.",
        ],
      },
    ],
  },
  {
    heading: "International Transfers",
    body: [
      "Tempest operates across borders, and your personal data may be transferred to, stored in, or processed in countries other than the one in which you reside. Where we transfer personal data out of Singapore, we take reasonable steps to ensure that the recipient provides a standard of protection comparable to that under the Personal Data Protection Act 2012 (“PDPA”), including through contractual safeguards.",
    ],
  },
  {
    heading: "Data Retention",
    body: [
      "We retain personal data for as long as necessary to fulfil the purposes described in this Policy, including to satisfy any legal, accounting, regulatory, or reporting requirements. Retention periods for compliance and financial records may be set by applicable law. When personal data is no longer required, we will take reasonable steps to securely delete or anonymise it.",
    ],
  },
  {
    heading: "Data Security",
    body: [
      "We implement reasonable administrative, technical, and physical safeguards designed to protect personal data against unauthorised access, use, alteration, and disclosure. However, no method of transmission or storage is completely secure, and we cannot guarantee absolute security.",
    ],
  },
  {
    heading: "Your Rights",
    body: [
      "Subject to applicable law, including the PDPA, you may have the right to:",
      {
        list: [
          "Request access to the personal data we hold about you and information on how it has been used or disclosed.",
          "Request correction of personal data that is inaccurate or incomplete.",
          "Withdraw consent to our collection, use, or disclosure of your personal data, subject to legal or contractual restrictions and reasonable notice.",
          "Opt out of marketing communications at any time by following the unsubscribe instructions or contacting us.",
        ],
      },
      "To exercise any of these rights, please contact us using the details below. We may need to verify your identity before responding.",
    ],
  },
  {
    heading: "Children’s Privacy",
    body: [
      "The Site and our services are intended for businesses and individuals aged 18 and over. We do not knowingly collect personal data from children. If you believe a child has provided us with personal data, please contact us so we can take appropriate action.",
    ],
  },
  {
    heading: "Third-Party Links",
    body: [
      "The Site may contain links to third-party websites and services that we do not operate or control. This Privacy Policy does not apply to those third parties, and we encourage you to review their privacy policies.",
    ],
  },
  {
    heading: "Changes to This Policy",
    body: [
      "We may update this Privacy Policy from time to time. When we do, we will revise the “Last updated” date at the top of this page. Material changes will be communicated through the Site or by other appropriate means. Your continued use of the Site after changes take effect constitutes acceptance of the updated Policy.",
    ],
  },
  {
    heading: "Contact Us",
    body: [
      "If you have questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact us at:",
      {
        list: [
          "Email: info@tempest-pay.com",
          "Website: www.tempest-pay.com",
        ],
      },
    ],
  },
];

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <LegalDoc
      title="Privacy Policy"
      updated={UPDATED}
      intro={INTRO}
      sections={SECTIONS}
    />
  );
}
