import { Linkedin, Instagram } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { Button } from "./ui/button";

const skillCategories = [
  {
    label: "Automação & IA",
    skills: ["n8n", "Make", "ManyChat", "APIs de IA"],
    className: "bg-accent/10 text-accent border border-accent/30",
  },
  {
    label: "Desenvolvimento",
    skills: ["React", "TypeScript", "Vue.js", "Laravel", "PWA", "React Native", ".NET", "Angular"],
    className: "bg-primary/10 text-primary border border-primary/20",
  },
  {
    label: "Banco de Dados",
    skills: ["PostgreSQL", "Supabase", "SQL Server", "Transact-SQL"],
    className: "bg-secondary text-secondary-foreground border border-border",
  },
  {
    label: "QA & Suporte",
    skills: ["Testes de Software", "Help Desk", "Infra TI"],
    className: "bg-muted text-muted-foreground border border-border",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="py-24 sm:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <img
              src="/profile-photo.jpg"
              alt="Leiomanaluz Bet Diniz"
              data-ai-hint="developer portrait"
              className="w-40 h-40 rounded-full object-cover shadow-lg mb-6 border-4 border-accent/20"
            />
            <h2 className="font-headline text-3xl font-bold text-primary">
              Leiomanaluz Bet Diniz
            </h2>
            <p className="text-accent font-medium mt-1 text-sm">
              Analista de Automação e Processos | Desenvolvedor Low-Code
            </p>
            <p className="mt-4 text-muted-foreground text-base leading-relaxed max-w-lg">
              Mais de 15 anos de trajetória em tecnologia — de suporte técnico
              e QA a desenvolvimento Full Stack — hoje dedicados a construir
              automações de atendimento com IA, integrações entre sistemas e
              plataformas web sob medida. Já entreguei, do zero ao ar,
              sistemas em produção como um Sistema de Gerenciamento de
              Consultas completo para clínica médica e a plataforma do
              Instituto DNZ, usando n8n, IA e integrações via API. Bacharel em
              Sistemas de Informação, com visão prática de negócio por trás de
              cada automação.
            </p>
            <div className="flex gap-3 mt-6">
              <Button variant="outline" size="icon" asChild aria-label="LinkedIn">
                <a
                  href="https://www.linkedin.com/in/leiomanaluz-diniz/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild aria-label="Instagram">
                <a
                  href="https://www.instagram.com/mecaautomace/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild aria-label="WhatsApp">
                <a
                  href="https://wa.me/5527999509227?text=Ol%C3%A1%2C%20tudo%20bem%3F%20Vim%20do%20seu%20site%20e%20quero%20mais%20informa%C3%A7%C3%B5es."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-headline text-2xl font-bold text-primary mb-8">
              Stack de Tecnologias
            </h3>
            <div className="space-y-6">
              {skillCategories.map((category) => (
                <div key={category.label}>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
                    {category.label}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium ${category.className}`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
