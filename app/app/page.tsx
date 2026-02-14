import { Navbar } from "@/components/main/navbar";
import { Hero } from "@/components/main/hero";
import { FeatureCards } from "@/components/main/feature-cards";
import { BentoGrid } from "@/components/main/bento-grid";
import { ProcessSteps } from "@/components/main/process-steps";
import { SecuritySection } from "@/components/main/security-section";
import { ControlGrid } from "@/components/main/control-grid";
import { TestimonialsSection } from "@/components/main/testimonials";
import { FAQSection } from "@/components/main/faq-section";
import { Footer } from "@/components/global/footer";
import { SecondarySearch } from "@/components/main/secondary-search";
import { AirnodeShowcase } from "@/components/main/airnode-showcase";

export default function Home() {
  return (
    <main className="min-h-screen bg-black flex flex-col">
      <Navbar hideAnnouncement={false} />
      <Hero />
      {/* <FeatureCards /> */}
      <BentoGrid />
      <AirnodeShowcase />
      {/* <ProcessSteps /> */}
      <SecuritySection />
      <ControlGrid />
      
      {/* <TestimonialsSection /> */}
      <FAQSection />
      <SecondarySearch />
      <Footer />
    </main>
  );
}
