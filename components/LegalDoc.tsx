import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Container } from "./Container";
import { FadeIn } from "./FadeIn";

/** A paragraph of body text, or a bulleted list, within a legal section. */
export type LegalBlock = string | { list: string[] } | { subheading: string };

export type LegalSection = {
  heading: string;
  body: LegalBlock[];
};

function Block({ block }: { block: LegalBlock }) {
  if (typeof block === "string") {
    return <p className="mt-4 text-[15px] leading-relaxed text-gray-600">{block}</p>;
  }
  if ("subheading" in block) {
    return (
      <h3 className="mt-6 text-base font-bold text-gray-900">{block.subheading}</h3>
    );
  }
  return (
    <ul className="mt-4 space-y-2 pl-1">
      {block.list.map((item, i) => (
        <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-gray-600">
          <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-primary/60" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function LegalDoc({
  title,
  updated,
  dateLabel = "Last updated",
  intro,
  sections,
  outro,
}: {
  title: string;
  /** Human-readable date, e.g. "29 June 2026". */
  updated: string;
  /** Label shown before the date, e.g. "Last updated" or "Effective date". */
  dateLabel?: string;
  intro?: string[];
  sections: LegalSection[];
  /** Optional closing statement rendered after the final section. */
  outro?: string;
}) {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="relative overflow-hidden border-b border-gray-100 pt-28 pb-12 bg-gray-50/60">
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[320px] bg-brand-primary/5 rounded-full blur-3xl" />
        <Container className="relative">
          <FadeIn className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-widest text-brand-primary mb-3">
              Legal
            </p>
            <h1 className="text-4xl font-black tracking-tight text-gray-900 md:text-5xl">
              {title}
            </h1>
            <p className="mt-4 text-sm text-gray-500">{dateLabel}: {updated}</p>
          </FadeIn>
        </Container>
      </section>

      <section className="py-16 md:py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            {intro && intro.length > 0 && (
              <FadeIn className="mb-12">
                {intro.map((p, i) => (
                  <p
                    key={i}
                    className="mt-4 text-[15px] leading-relaxed text-gray-600 first:mt-0"
                  >
                    {p}
                  </p>
                ))}
              </FadeIn>
            )}

            <div className="space-y-12">
              {sections.map((section, i) => (
                <FadeIn key={section.heading} delay={Math.min(i, 4) * 40}>
                  <div className="scroll-mt-24">
                    <h2 className="text-xl font-extrabold tracking-tight text-gray-900 md:text-2xl">
                      {i + 1}. {section.heading}
                    </h2>
                    {section.body.map((block, j) => (
                      <Block key={j} block={block} />
                    ))}
                  </div>
                </FadeIn>
              ))}
            </div>

            {outro && (
              <FadeIn className="mt-12 border-t border-gray-100 pt-8">
                <p className="text-[15px] font-medium leading-relaxed text-gray-700">
                  {outro}
                </p>
              </FadeIn>
            )}
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
