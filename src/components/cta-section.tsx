import { ArrowRight, CheckCircle2 } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { Button } from "./ui/button";

const trustPoints = [
  "Diagnóstico inicial gratuito",
  "Proposta personalizada ao seu contexto",
  "Entrega com documentação incluída",
  "Suporte pós-entrega garantido",
];

export function CTASection() {
  return (
    <section className="relative py-24 sm:py-32 bg-primary text-primary-foreground overflow-hidden">
      {/* Ambient glow behind the content */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, hsla(35, 91%, 52%, 0.1), transparent)",
        }}
      />

      <div className="relative container mx-auto px-4 text-center">
        {/* Badge */}
        <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold bg-accent/20 text-accent border border-accent/30 mb-6">
          Comece Agora
        </span>

        <h2 className="font-headline text-4xl font-bold sm:text-5xl max-w-3xl mx-auto leading-tight">
          Do diagnóstico ao go-live,{" "}
          <span className="text-accent">cada etapa com você.</span>
        </h2>

        <p className="mt-6 text-lg text-primary-foreground/70 max-w-xl mx-auto">
          Levantamento de requisitos, desenvolvimento, automação ou manutenção — construo a solução certa para o seu negócio.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            className="btn-pulse bg-accent text-accent-foreground hover:bg-accent/90 w-full sm:w-auto px-8 text-base font-semibold"
            asChild
          >
            <a
              href="https://wa.me/5527999509227?text=Ol%C3%A1%2C%20tudo%20bem%3F%20Vim%20do%20seu%20site%20e%20quero%20mais%20informa%C3%A7%C3%B5es."
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon className="mr-2 h-5 w-5" />
              Falar no WhatsApp
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="bg-transparent border-white/40 text-white hover:bg-white/10 hover:text-white w-full sm:w-auto px-8 text-base"
            asChild
          >
            <a href="#contact">
              Solicitar Orçamento
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>

        {/* Trust bullets */}
        <div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-3">
          {trustPoints.map((point) => (
            <div
              key={point}
              className="flex items-center gap-2 text-sm text-primary-foreground/60"
            >
              <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0" />
              {point}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
