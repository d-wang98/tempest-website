import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TrustSection } from "@/components/TrustSection";
import { Closing } from "@/components/Closing";
import { HeadlineDivider } from "@/components/HeadlineDivider";
import { Calculator } from "@/components/Calculator";
import { InfoBlocks } from "@/components/InfoBlocks";
import { CaseStudies } from "@/components/CaseStudies";
import { ScrollReveal } from "@/components/ScrollReveal";

export default function Page() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <ScrollReveal>
        <TrustSection />
      </ScrollReveal>
      <ScrollReveal>
        <HeadlineDivider />
      </ScrollReveal>
      {/* <Calculator /> */}
      <ScrollReveal>
        <InfoBlocks />
      </ScrollReveal>
      <ScrollReveal>
        <CaseStudies />
      </ScrollReveal>
      <ScrollReveal>
        <Closing />
      </ScrollReveal>
    </main>
  );
}
