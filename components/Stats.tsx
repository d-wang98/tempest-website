import { getTranslations } from "next-intl/server";
import { Container } from "./Container";
import { FadeIn } from "./FadeIn";

export async function Stats() {
  const t = await getTranslations("Stats");

  const stats = [
    { value: "<3s", label: t("settlementTime") },
    { value: "10+", label: t("chainsSupported") },
    { value: "100%", label: t("nonCustodial") },
  ];

  return (
    <section className="border-y border-gray-100 bg-gray-50/60 py-10">
      <Container>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
          {stats.map((stat, i) => (
            <FadeIn key={stat.label} delay={i * 90} className="text-center">
              <div className="text-3xl font-black tracking-tight text-brand-primary md:text-4xl">
                {stat.value}
              </div>
              <div className="mt-1.5 text-sm font-medium text-gray-500">
                {stat.label}
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
