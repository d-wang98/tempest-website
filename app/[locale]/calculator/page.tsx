import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CTA } from "@/components/CTA";
import { Container } from "@/components/Container";
import { FadeIn } from "@/components/FadeIn";
import { TradeCalculator } from "@/components/TradeCalculator";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "CalculatorPage" });
  return buildMetadata({ locale, path: "calculator", title: t("metaTitle"), description: t("metaDesc") });
}

export default async function CalculatorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("CalculatorPage");

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="relative overflow-hidden pt-28 pb-16 bg-gray-50/60">
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[360px] bg-brand-primary/5 rounded-full blur-3xl" />
        <Container className="relative">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-brand-primary mb-3">{t("label")}</p>
            <h1 className="text-4xl font-black tracking-tight text-gray-900 md:text-5xl">{t("heading")}</h1>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-gray-500">{t("desc")}</p>
          </FadeIn>
        </Container>
      </section>

      <section className="bg-gray-50/60 pb-20 md:pb-24">
        <Container>
          <TradeCalculator />
        </Container>
      </section>

      <CTA />
      <Footer />
    </main>
  );
}
