import { Check, Code2, Wrench, Zap } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  deliverables: string[];
  highlight: boolean;
}

const services: Service[] = [
  {
    icon: Code2,
    title: "Desenvolvimento PWA & Low-Code",
    description:
      "Aplicações web progressivas e sistemas customizados com ferramentas low-code, entregando rápido sem abrir mão da qualidade.",
    deliverables: [
      "Levantamento de requisitos",
      "UI responsiva para web e mobile",
      "Integração com APIs e bancos de dados",
      "Deploy e documentação entregue",
    ],
    highlight: false,
  },
  {
    icon: Wrench,
    title: "Manutenção e Evolução de Portais",
    description:
      "Cuidado contínuo do seu sistema web — correções, melhorias de performance, novas funcionalidades e estabilidade em produção.",
    deliverables: [
      "Análise do código existente",
      "Correção de bugs e falhas",
      "Evolução incremental por demanda",
      "Monitoramento e suporte técnico",
    ],
    highlight: true,
  },
  {
    icon: Zap,
    title: "Automação de Processos",
    description:
      "Fluxos inteligentes com n8n, Make e IA para eliminar tarefas repetitivas e conectar seus sistemas sem esforço manual.",
    deliverables: [
      "Mapeamento do processo atual",
      "Integração entre plataformas",
      "Agentes de IA conversacional",
      "Relatórios e alertas automáticos",
    ],
    highlight: false,
  },
];

export function PlansSection() {
  return (
    <section
      id="services"
      className="py-24 sm:py-32 bg-secondary/30 overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-accent/10 text-accent border border-accent/20 mb-4">
            Serviços
          </span>
          <h2 className="font-headline text-4xl font-bold text-primary sm:text-5xl">
            Como Posso Ajudar
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Prestação de serviço focada em manutenção, desenvolvimento de
            aplicações PWA low-code e automação de processos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Card
                key={service.title}
                className={cn(
                  "flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300",
                  service.highlight && "border-primary ring-2 ring-primary"
                )}
              >
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex-shrink-0 bg-accent/10 p-3 rounded-full w-fit mb-4">
                    <Icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-headline text-xl font-bold text-primary leading-snug mb-2">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                    {service.description}
                  </p>
                  <ul className="space-y-2 flex-1 mb-6">
                    {service.deliverables.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full mt-auto"
                    variant={service.highlight ? "default" : "outline"}
                    asChild
                  >
                    <a href="#contact">Solicitar Orçamento</a>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
