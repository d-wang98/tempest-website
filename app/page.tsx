import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { Features } from "@/components/Features";
import { Solutions } from "@/components/Solutions";
import { HowItWorks } from "@/components/HowItWorks";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

export default function Page() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <Solutions />
      <HowItWorks />
      <CTA />
      <Footer />
    </main>
  );
}
