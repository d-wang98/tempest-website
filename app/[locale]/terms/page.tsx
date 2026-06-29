import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { LegalDoc, type LegalSection } from "@/components/LegalDoc";

const EFFECTIVE_DATE = "May 12, 2026";

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
    path: "terms",
    title: "Terms of Service | Tempest",
    description:
      "The Terms of Service governing your use of the Tempest platform, website, APIs, and related services.",
  });
}

const INTRO = [
  "IMPORTANT — PLEASE READ CAREFULLY. These Terms of Service (the “Terms”) form a binding contract between you and Tempest Pay LLC, a New York limited liability company (“Tempest”, “we”, “us” or “our”). By creating an account, clicking “I agree,” or otherwise accessing or using the Tempest platform, website, APIs, smart contracts, or any other product or service we make available (collectively, the “Service”), you agree to be bound by these Terms.",
  "SECTION 21 CONTAINS A BINDING ARBITRATION AGREEMENT AND A CLASS-ACTION WAIVER. Except where prohibited by law, you and Tempest agree to resolve disputes by individual arbitration and waive the right to participate in class or representative proceedings.",
  "THE SERVICE IS DESIGNED FOR BUSINESSES. You may use the Service only on behalf of a legal entity (a corporation, LLC, partnership, or similar) for bona fide commercial purposes. Consumers and individuals acting for personal, family, or household purposes are not permitted users.",
  "THE SERVICE IS A SOFTWARE PRODUCT, NOT A FINANCIAL SERVICE. Tempest is a software platform sold to businesses on a subscription basis. We do not take custody of fiat currency, we do not hold digital assets on your behalf, we do not effect money transmission, and we do not earn fees tied to the number, value, or volume of your transactions. Fiat on- and off-ramping is provided by Bridge Ventures, Inc. (“Bridge”) under Bridge’s own terms; wallet infrastructure is provided by Privy.io, Inc. (“Privy”); bank-account linking is provided by Plaid Inc. (“Plaid”). See Section 6.",
];

const OUTRO =
  "By using the Service, you acknowledge that you have read, understood, and agree to be bound by these Terms.";

const SECTIONS: LegalSection[] = [
  {
    heading: "Definitions",
    body: [
      {
        list: [
          "“Account” means the account you create with Tempest to access the Service, including any organizational account, sub-account, or seat created within your Organization.",
          "“Admin” means a User designated within your Organization with authority to manage members, accounts, and signing quorums, as set in the Service.",
          "“Affiliate” means with respect to any party, an entity that controls, is controlled by, or is under common control with that party.",
          "“Applicable Law” means all laws, statutes, regulations, rules, orders, judgments, and administrative pronouncements that apply to a party or to the Service.",
          "“Digital Asset” means a stablecoin or other digital asset accessible through the Service, including (without limitation) USDC.",
          "“Org Account” means a smart-contract account associated with your Organization that holds Digital Assets, the keys to which are controlled by a key quorum of Admins through the Wallet Provider, as further described in Section 6.",
          "“Organization” means the legal entity on whose behalf you access the Service.",
          "“User” means any natural person who accesses or uses the Service, including Admins, members, and viewers.",
          "“Wallet Provider” means Privy, the third-party provider of the embedded wallet infrastructure that holds the cryptographic key shares used to control your Org Account.",
        ],
      },
    ],
  },
  {
    heading: "Eligibility and Business Use",
    body: [
      "You may use the Service only if all of the following are true:",
      {
        list: [
          "You are at least 18 years old and have full legal capacity to enter into binding contracts.",
          "You are accessing the Service on behalf of a legal entity validly formed under the laws of an eligible jurisdiction, and you are authorized to bind that entity to these Terms.",
          "Neither you nor your Organization is a Prohibited Person (defined in Section 10), is located in a Prohibited Jurisdiction (defined in Section 10), or is owned 50% or more by any Prohibited Person.",
          "You will use the Service only for bona fide commercial purposes and not for personal, family, or household purposes.",
        ],
      },
      "We may refuse, suspend, or terminate access at any time, including to comply with Applicable Law, sanctions, or our risk policies.",
    ],
  },
  {
    heading: "Accounts, Authorized Users, and Quorums",
    body: [
      "When your Organization registers, you designate one or more Admins. Admins may invite additional Users (Admins, members, or viewers) and configure key quorums that govern signing authority over Org Accounts. Each Admin’s role within a quorum is recorded with the Wallet Provider; transactions from an Org Account require authorization from a quorum participant in accordance with the configured policy.",
      "You are responsible for: (a) the accuracy of information you submit; (b) the actions and omissions of every User authenticated to your Account; (c) maintaining the confidentiality of credentials, embedded-wallet recovery factors, and any signing keys; (d) the configuration and operation of your quorum; and (e) ensuring that each User accepts these Terms before using the Service.",
      "Tempest is not a party to any signing quorum and has no signing authority over your Org Account. We do not maintain a co-signer, recovery key, or shadow administrator role. We cannot reverse, recall, or rewrite an on-chain transaction once it has been broadcast.",
    ],
  },
  {
    heading: "The Service",
    body: [
      "The Service is a software platform that helps Organizations: (a) create and operate Org Accounts that hold Digital Assets through the Wallet Provider; (b) initiate, route, and view stablecoin transfers between Org Accounts and external blockchain addresses; (c) connect to third-party fiat on- and off-ramp providers (currently Bridge) for the conversion of Digital Assets to and from fiat currency; (d) construct, view, and settle programmable invoices and escrow contracts; and (e) integrate with enterprise resource planning systems for bookkeeping and reconciliation.",
      "Tempest provides software, user interfaces, APIs, and orchestration logic. We are not a counterparty to any transaction conducted through the Service. We do not take title to, possess, or control Digital Assets or fiat funds at any point in any transaction. Tempest is compensated by the periodic subscription fees set out in your order form; Tempest does not earn fees, take-rates, spreads, markups, or any other compensation tied to the number, value, or volume of transactions you conduct through the Service.",
    ],
  },
  {
    heading: "Non-Custodial Wallet Architecture",
    body: [
      "Org Accounts are smart-contract wallets (ERC-4337 “Kernel” accounts) deployed on supported blockchains. Each Org Account is owned by an externally owned account whose private key material is held in a multi-party-computation arrangement by the Wallet Provider. The key shares necessary to sign transactions are released only on authenticated instruction from a configured quorum participant.",
      "Although Tempest’s backend mediates communication with the Wallet Provider’s API for convenience and observability, Tempest does not at any point hold, escrow, custody, or have unilateral signing authority over your Digital Assets. The Wallet Provider is the entity that operates the underlying key infrastructure under its own terms of service, which we recommend that you review.",
      "You are solely responsible for: (a) the security of your authentication factors and any recovery material associated with your User account or quorum role; (b) verifying the destination address, amount, network, and asset before authorizing any transfer; and (c) all consequences of authorizing, or failing to authorize, a transaction.",
    ],
  },
  {
    heading: "Third-Party Services",
    body: [
      "The Service relies on independent third parties to provide certain functionality. Your use of those third parties is governed by their own terms of service and privacy policies, in addition to these Terms. We do not control and are not responsible for the acts or omissions of any third-party provider.",
      { subheading: "6.1 Wallet infrastructure (Privy)." },
      "Privy provides the embedded-wallet and server-wallet infrastructure that holds the cryptographic key material associated with your User account and Org Accounts. Your use of Privy is subject to Privy’s terms of service. You acknowledge that the security of your private key material depends on Privy’s systems, and that loss of access to your Privy account or its recovery factors may result in permanent loss of access to Digital Assets.",
      { subheading: "6.2 Fiat on- and off-ramp (Bridge)." },
      "Fiat-currency conversion is performed by Bridge, a money services business and money transmitter licensed in applicable U.S. jurisdictions. To use the on- or off-ramp, you must complete Bridge’s customer onboarding (including identity verification, business verification, and beneficial-ownership disclosures) and accept Bridge’s terms of service. Bridge — not Tempest — is the financial institution conducting the conversion of fiat to and from Digital Assets, and Bridge is the party responsible for compliance with applicable money-transmission, banking, and Bank-Secrecy-Act obligations relating to that activity. Any fees, spreads, or charges associated with the conversion of fiat to or from Digital Assets are charged by Bridge under Bridge’s own pricing; Tempest does not receive any portion of those fees or spreads and does not earn compensation tied to your fiat conversion activity. Tempest acts solely as a software interface that helps you initiate and observe transactions you have authorized through Bridge.",
      { subheading: "6.3 Bank account linking (Plaid)." },
      "Plaid provides bank-account verification and connectivity. Your use of Plaid is subject to Plaid’s end-user terms and privacy policy. You authorize Tempest and our service providers to receive and use the data returned by Plaid in order to provide the Service.",
      { subheading: "6.4 Smart-account infrastructure (ZeroDev)." },
      "Smart-account bundling, gas sponsorship, and paymaster services are provided by ZeroDev. ZeroDev is not a custodian and does not take custody of your Digital Assets.",
      { subheading: "6.5 Cross-chain swaps (Mayan and similar protocols)." },
      "Cross-chain swap functionality is provided by Mayan Finance and similar non-custodial decentralized protocols. Such protocols operate on smart contracts and are not controlled by Tempest. Slippage, price impact, failed transactions, and bridge-protocol risks are borne by you.",
    ],
  },
  {
    heading: "Fees",
    body: [
      "Tempest charges a periodic subscription fee for access to the Service, as set out in your order form or pricing schedule. The subscription fee is not tied to the number, value, or volume of transactions you conduct through the Service. Tempest may from time to time introduce additional product modules with separately disclosed pricing; any such additional pricing will be presented to you in-app or in writing before you incur it.",
      "Fees charged by third-party providers (including, without limitation, fees and spreads charged by Bridge in connection with fiat conversion, and blockchain network gas costs) are not collected by Tempest and are governed by those providers’ own terms. Where Tempest sponsors network gas through a paymaster as part of the Service, that sponsorship is offered as a convenience and may be modified or withdrawn at our discretion.",
      "All subscription fees are non-refundable except as expressly stated in these Terms or as required by Applicable Law. Late payments accrue interest at the lesser of 1.5% per month or the maximum permitted by law.",
    ],
  },
  {
    heading: "Your Representations, Warranties, and Covenants",
    body: [
      "You represent, warrant, and covenant on a continuing basis that:",
      {
        list: [
          "You and your Organization are duly formed, validly existing, and in good standing under the laws of the jurisdiction of formation, and you have all corporate power and authority to enter into and perform these Terms.",
          "All information you submit (including beneficial ownership, business activity, and source-of-funds information) is true, accurate, complete, and not misleading, and you will update it promptly when it changes.",
          "You will use the Service only for lawful purposes and in compliance with all Applicable Law, including sanctions, anti-money-laundering, counter-terrorism-financing, tax, securities, commodities, and consumer-protection laws.",
          "The funds and Digital Assets you use through the Service are derived from lawful sources and are not the proceeds of, and will not be used in connection with, criminal activity.",
          "You have obtained any consents necessary for your authorized Users to access the Service and for Tempest and its service providers to process their personal data in accordance with our privacy policy.",
        ],
      },
    ],
  },
  {
    heading: "Prohibited Uses",
    body: [
      "You agree not to (and not to permit any third party to):",
      {
        list: [
          "use the Service in violation of any sanctions program administered by the U.S. Office of Foreign Assets Control (OFAC), the United Nations, the European Union, the United Kingdom, or any other applicable authority;",
          "use the Service in furtherance of money laundering, terrorist financing, fraud, market manipulation, theft, ransomware, sanctions evasion, human trafficking, child exploitation, or any other criminal activity;",
          "use the Service to transmit funds on behalf of a third party except as expressly permitted in writing by Tempest, or to act as an unlicensed money transmitter, money services business, or virtual-asset service provider;",
          "operate gambling, lotteries, sweepstakes, or unlicensed securities or derivatives offerings through the Service;",
          "interfere with or attempt to interfere with the security, integrity, or availability of the Service, including by probing, scanning, testing, or reverse engineering except to the extent expressly permitted by Applicable Law;",
          "use the Service in any manner that could damage, disable, overburden, or impair the Service or interfere with any other party’s use of the Service;",
          "scrape, crawl, or use automated means to access the Service other than through authorized API endpoints; or",
          "use the Service to develop a product or service that competes with the Service.",
        ],
      },
    ],
  },
  {
    heading: "Sanctions, AML, and Compliance",
    body: [
      "You and your Organization, and each of your beneficial owners, officers, directors, and authorized Users, must not be: (a) a person listed on, or owned 50% or more in the aggregate by persons listed on, the OFAC Specially Designated Nationals and Blocked Persons List, the Consolidated Sanctions List, or any equivalent list maintained by the United Nations, the European Union, the United Kingdom, or any other applicable governmental authority; (b) located, organized, or ordinarily resident in any jurisdiction subject to comprehensive sanctions (currently Cuba, Iran, North Korea, Syria, and the Crimea, so-called Donetsk People’s Republic, and so-called Luhansk People’s Republic regions of Ukraine) (each, a “Prohibited Person” and “Prohibited Jurisdiction” respectively).",
      "We may screen Users, wallet addresses, counterparties, and transactions against sanctions and watchlists. We may delay, decline, freeze, or reverse where technically possible, or report any transaction to authorities, where we determine in our discretion that doing so is necessary to comply with Applicable Law or our risk policies.",
      "We may collect and verify identity, ownership, business, and source-of-funds information from you (directly or through service providers such as Bridge) and may share that information with our service providers, counterparties, and authorities as permitted or required by Applicable Law.",
    ],
  },
  {
    heading: "Taxes",
    body: [
      "You are solely responsible for determining what taxes apply to your transactions through the Service and for reporting and remitting those taxes to the appropriate authorities. Tempest does not provide tax advice and does not collect or withhold taxes on your behalf, except where required by Applicable Law.",
    ],
  },
  {
    heading: "Smart-Contract, Blockchain, and Stablecoin Risk",
    body: [
      "You acknowledge that the Service relies on public, permissionless blockchains and smart contracts (including those operated by Tempest, ZeroDev, Mayan, and stablecoin issuers). These technologies are novel and evolving. Risks include, without limitation:",
      {
        list: [
          "irreversibility of on-chain transactions, including transactions sent to incorrect addresses or networks;",
          "bugs, vulnerabilities, or unintended behavior in smart-contract code that may result in loss of Digital Assets;",
          "blockchain congestion, reorganizations, chain halts, MEV, and front-running;",
          "depegging, redemption suspension, insolvency, censorship, freezing, or regulatory action affecting any stablecoin or its issuer;",
          "bridge or cross-chain protocol failure or exploit, and slippage on swaps;",
          "compromise of the Wallet Provider, including loss of your authentication factors or recovery material; and",
          "changes in law or regulation that may make some or all of the Service unlawful in your jurisdiction.",
        ],
      },
      "You assume all of these risks. Tempest is not responsible for loss of Digital Assets arising from any of them.",
    ],
  },
  {
    heading: "No Investment, Legal, Tax, or Accounting Advice",
    body: [
      "Tempest does not provide investment, legal, tax, or accounting advice. Nothing in the Service is a recommendation to buy, sell, or hold any Digital Asset, to enter into any transaction, or to adopt any treatment for accounting, tax, or regulatory purposes. You should consult your own advisors.",
    ],
  },
  {
    heading: "Intellectual Property; License",
    body: [
      "Tempest and its licensors own all right, title, and interest in and to the Service, including all software, content, trademarks, and other intellectual property. Subject to your compliance with these Terms, Tempest grants you a limited, non-exclusive, non-transferable, non-sublicensable, revocable license during the Term to access and use the Service for your internal business purposes.",
      "You retain ownership of the data you submit to the Service (“Customer Data”). You grant Tempest a worldwide, royalty-free license to host, copy, process, transmit, display, and create derivative works of Customer Data solely as necessary to provide and improve the Service, to comply with Applicable Law, and to produce de-identified, aggregated analytics. We will not sell Customer Data.",
      "If you provide feedback or suggestions about the Service, you grant Tempest a perpetual, irrevocable, royalty-free license to use that feedback without restriction.",
    ],
  },
  {
    heading: "Privacy",
    body: [
      "Tempest’s collection and use of personal data are described in our Privacy Policy, which is incorporated by reference. By using the Service, you consent to the data practices described there.",
    ],
  },
  {
    heading: "Disclaimers",
    body: [
      "THE SERVICE IS PROVIDED “AS IS” AND “AS AVAILABLE,” WITHOUT WARRANTY OF ANY KIND. TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, TEMPEST AND ITS AFFILIATES, OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, AND LICENSORS (THE “TEMPEST PARTIES”) DISCLAIM ALL WARRANTIES, EXPRESS, IMPLIED, OR STATUTORY, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, NON-INFRINGEMENT, ACCURACY, AND ANY WARRANTIES ARISING OUT OF COURSE OF DEALING OR USAGE OF TRADE.",
      "The Tempest Parties do not warrant that the Service will be uninterrupted, timely, secure, or error-free; that defects will be corrected; that the Service or its servers are free of viruses or other harmful components; or that any information obtained through the Service is accurate or reliable. The Tempest Parties do not warrant the conduct of any User, counterparty, or third-party provider, including Privy, Bridge, Plaid, ZeroDev, Mayan, or any stablecoin issuer.",
    ],
  },
  {
    heading: "Limitation of Liability",
    body: [
      "TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW: (a) THE TEMPEST PARTIES SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, OR FOR ANY LOSS OF PROFITS, REVENUE, DATA, BUSINESS, GOODWILL, OR DIGITAL ASSETS, REGARDLESS OF THE THEORY OF LIABILITY AND EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES; AND (b) THE AGGREGATE LIABILITY OF THE TEMPEST PARTIES ARISING OUT OF OR RELATING TO THESE TERMS OR THE SERVICE SHALL NOT EXCEED THE GREATER OF (i) THE FEES PAID BY YOU TO TEMPEST DURING THE TWELVE (12) MONTHS PRECEDING THE EVENT GIVING RISE TO THE CLAIM AND (ii) ONE HUNDRED U.S. DOLLARS (US$100).",
      "Some jurisdictions do not allow the exclusion of certain warranties or the limitation of certain damages. To the extent these exclusions or limitations are unenforceable, they apply to the maximum extent permitted by Applicable Law.",
    ],
  },
  {
    heading: "Indemnification",
    body: [
      "You will defend, indemnify, and hold harmless the Tempest Parties from and against any third-party claim, demand, action, loss, damage, liability, cost, or expense (including reasonable attorneys’ fees) arising out of or relating to: (a) your or your Users’ access to or use of the Service; (b) your breach of these Terms or violation of Applicable Law; (c) your Customer Data or the data you upload, transmit, or transact through the Service; (d) any transaction you initiate or authorize; or (e) your violation of any third party’s rights, including intellectual property, privacy, or contractual rights.",
    ],
  },
  {
    heading: "Term and Termination",
    body: [
      "These Terms remain in effect for so long as you use the Service. You may terminate at any time by ceasing to use the Service and closing your Account. We may suspend or terminate your access to the Service at any time, for any reason or no reason, including for actual or suspected violation of these Terms, suspected fraud, or to comply with Applicable Law or our risk policies. We will use commercially reasonable efforts to give you notice when feasible.",
      "Upon termination, the license granted in Section 14 immediately ends, and Sections that by their nature should survive will survive, including Sections 7 (Fees), 8 (Representations), 11 (Taxes), 14 (IP), 16 (Disclaimers), 17 (Limitation of Liability), 18 (Indemnification), 21 (Governing Law and Arbitration), and 22 (Miscellaneous). You remain responsible for amounts owed and for the consequences of any transaction initiated before termination.",
      "Termination of the Service does not deprive you of access to the Digital Assets in your Org Account. Because Org Accounts are non-custodial smart-contract wallets controlled through the Wallet Provider, you may continue to sign transactions from your Org Account directly with the Wallet Provider or by importing your keys to a compatible wallet client. We will use commercially reasonable efforts to assist with such migration, except where prohibited by Applicable Law.",
    ],
  },
  {
    heading: "Modifications to the Service and to These Terms",
    body: [
      "We may modify, suspend, or discontinue the Service or any portion of it at any time. We may modify these Terms by posting the updated Terms in the Service or by providing notice. Material changes will take effect no earlier than the date specified in the notice, but in no event sooner than the date of posting. Your continued use of the Service after the effective date constitutes acceptance of the updated Terms. If you do not agree, you must stop using the Service.",
    ],
  },
  {
    heading: "Governing Law; Arbitration; Class Waiver",
    body: [
      { subheading: "21.1 Governing law." },
      "These Terms and any dispute arising out of or relating to them or the Service are governed by the laws of the State of New York, without regard to its conflict-of-laws principles. The United Nations Convention on Contracts for the International Sale of Goods does not apply.",
      { subheading: "21.2 Arbitration." },
      "Any dispute, claim, or controversy arising out of or relating to these Terms or the Service (including their existence, validity, breach, interpretation, or termination) will be finally resolved by binding arbitration administered by JAMS under its Comprehensive Arbitration Rules and Procedures then in effect. The arbitration will be conducted in English and seated in New York, New York. The arbitrator will have authority to grant any remedy that would otherwise be available in court, subject to the limitations in these Terms. Judgment on the award may be entered in any court of competent jurisdiction.",
      { subheading: "21.3 Class waiver." },
      "Disputes will be arbitrated only on an individual basis. YOU AND TEMPEST WAIVE ANY RIGHT TO PARTICIPATE IN A CLASS, COLLECTIVE, OR REPRESENTATIVE PROCEEDING. The arbitrator may not consolidate proceedings or preside over any form of representative or class proceeding.",
      { subheading: "21.4 Exceptions; injunctive relief." },
      "Either party may bring an action in the state or federal courts located in New York County, New York solely to seek injunctive or other equitable relief to protect intellectual property rights or confidential information, and each party irrevocably submits to the exclusive jurisdiction of those courts for that purpose.",
    ],
  },
  {
    heading: "Miscellaneous",
    body: [
      { subheading: "22.1 Entire agreement." },
      "These Terms, together with any order form, pricing schedule, and the Privacy Policy, constitute the entire agreement between you and Tempest concerning the Service and supersede all prior or contemporaneous agreements on that subject.",
      { subheading: "22.2 Severability." },
      "If any provision of these Terms is held unenforceable, the remaining provisions will remain in full force and effect, and the unenforceable provision will be reformed to the minimum extent necessary to make it enforceable.",
      { subheading: "22.3 No waiver." },
      "Our failure to enforce any provision is not a waiver of that provision or of any other provision.",
      { subheading: "22.4 Assignment." },
      "You may not assign these Terms or any rights or obligations under them without our prior written consent. We may assign these Terms, in whole or in part, including in connection with a merger, acquisition, reorganization, or sale of assets. Any prohibited assignment is void.",
      { subheading: "22.5 Force majeure." },
      "Neither party is liable for any failure or delay in performance caused by circumstances beyond its reasonable control, including acts of God, war, terrorism, civil unrest, governmental action, labor disputes, internet outages, blockchain congestion or reorganization, third-party service-provider failure, or pandemic.",
      { subheading: "22.6 Relationship of the parties." },
      "Nothing in these Terms creates a partnership, joint venture, agency, fiduciary, or employment relationship between you and Tempest.",
      { subheading: "22.7 Notices." },
      "We may give notices through the Service, by email to the address associated with your Account, or by other reasonable means. Legal notices to Tempest must be sent to: Tempest Pay LLC, Attn: Legal, 13620 38th Ave Ste 9I, Flushing, NY 11354, with a copy by email to info@tempest-pay.com.",
      { subheading: "22.8 Headings." },
      "Section headings are for convenience only and do not affect interpretation.",
      { subheading: "22.9 Export control." },
      "You will comply with all applicable export-control and re-export-control laws and regulations of the United States and other jurisdictions, and you will not export, re-export, or transfer the Service, or any product derived from it, in violation of those laws.",
    ],
  },
  {
    heading: "Contact",
    body: [
      {
        list: [
          "Tempest Pay LLC",
          "13620 38th Ave Ste 9I, Flushing, NY 11354",
          "Email: info@tempest-pay.com",
        ],
      },
    ],
  },
];

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <LegalDoc
      title="Terms of Service"
      updated={EFFECTIVE_DATE}
      dateLabel="Effective date"
      intro={INTRO}
      sections={SECTIONS}
      outro={OUTRO}
    />
  );
}
