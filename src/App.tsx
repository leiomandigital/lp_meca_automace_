import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { PartnersSection } from "@/components/partners-section";
import { ProjectsSection } from "@/components/projects-section";
import { PlansSection } from "@/components/plans-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { CTASection } from "@/components/cta-section";
import { ContactSection } from "@/components/contact-form";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ProjectsSection />
        <AboutSection />
        <PartnersSection />
        <PlansSection />
        <TestimonialsSection />
        <CTASection />
        <ContactSection />
      </main>
      <Footer />
      <Toaster />
    </>
  );
}