"use client";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export function HeroSection() {
  const heroImage = PlaceHolderImages.find((p) => p.id === "hero-background");

  // State to track if the page has been scrolled
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      // Set the state to true if user has scrolled more than 50px
      setIsScrolled(window.scrollY > 50);
    };
    // Add the event listener when the component mounts
    window.addEventListener("scroll", handleScroll);
    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // The empty array ensures this effect runs only once

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/hero-background.jpg"
          alt="Automação inteligente"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-background/80" />
      </div>
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="container mx-auto px-4 text-center">
          <div className="container mx-auto px-4 pt-32 text-center sm:pt-0 max-w-full">
            <h1 className="font-headline text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
              Automatize. Inove. Domine.
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-white sm:text-xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              Transformamos seus processos manuais em fluxos automatizados
              inteligentes. Aumente a produtividade, reduza custos e escale seu
              negócio com automação de processos de ponta.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-x-6">
              {/* <Button size="lg" asChild>
              <a href="#plans">Conheça Nossas Soluções</a>
            </Button>
            <Button size="lg" variant="outline" asChild className="bg-white/10 text-white backdrop-blur-sm border-white/20 hover:bg-white/20">*/}

              {/* Wrapper for the animated "Conheça Nossas Soluções" button */}
              <div
                className={`w-full sm:w-auto transition-all duration-300 ease-in-out ${
                  isScrolled
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-5 sm:opacity-100 sm:translate-y-0"
                }`}
              >
                <Button size="lg" asChild className="w-full sm:w-auto">
                  <a href="#plans">Conheça Nossas Soluções</a>
                </Button>
              </div>
              {/* "Contact Sales" button, now hidden on mobile */}
              <Button
                size="lg"
                variant="outline"
                asChild
                className="bg-white/10 text-white backdrop-blur-sm border-white/20 hover:bg-white/20 hidden sm:flex"
              >
                <a href="#contact">Solicitar Diagnóstico Gratuito</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
