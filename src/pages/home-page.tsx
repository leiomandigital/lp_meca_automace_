import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { PartnersSection } from "@/components/partners-section";
import { ProjectsSection } from "@/components/projects-section";
import { PlansSection } from "@/components/plans-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { CTASection } from "@/components/cta-section";
import { ContactSection } from "@/components/contact-form";

export function HomePage() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const section = document.getElementById(hash.replace("#", ""));
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }, [hash]);

  return (
    <>
      <HeroSection />
      <ProjectsSection />
      <AboutSection />
      <PartnersSection />
      <PlansSection />
      <TestimonialsSection />
      <CTASection />
      <ContactSection />
    </>
  );
}
