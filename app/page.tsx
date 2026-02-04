import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TrustSection } from "@/components/TrustSection";
import { Closing } from "@/components/Closing";
import { HeadlineDivider } from "@/components/HeadlineDivider";
import { Calculator } from "@/components/Calculator";
import { InfoBlocks } from "@/components/InfoBlocks";

export default function Page() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <TrustSection />
      <HeadlineDivider />
      {/* <Calculator /> */}
      <InfoBlocks />
      <Closing />
    </main>
  );
}
