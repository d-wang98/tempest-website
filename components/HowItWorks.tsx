import { getTranslations } from "next-intl/server";
import { Container } from "./Container";
import { StickyReveal } from "./StickyReveal";
import { FadeIn } from "./FadeIn";

export async function HowItWorks() {
  const t = await getTranslations("HowItWorks");

  const steps = [
    {
      number: "01",
      title: t("s1title"),
      body: t("s1body"),
      detail: t("s1detail"),
    },
    {
      number: "02",
      title: t("s2title"),
      body: t("s2body"),
      detail: t("s2detail"),
    },
    {
      number: "03",
      title: t("s3title"),
      body: t("s3body"),
      detail: t("s3detail"),
    },
  ];

  return (
    <>
      <StickyReveal
        id="how-it-works"
        text={t("heading")}
        label={t("label")}
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
                            {t("stepPrefix")} {step.number}
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
