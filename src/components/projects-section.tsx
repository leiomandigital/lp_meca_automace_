import { Package, Bot, Building2, Wrench, Sparkles, ClipboardList } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import type { LucideIcon } from "lucide-react";

type ProjectStatus = "Em produção" | "Em desenvolvimento";

interface Project {
  icon: LucideIcon;
  title: string;
  description: string;
  tags: string[];
  status: ProjectStatus;
  url?: string;
}

const projects: Project[] = [
  {
    icon: Package,
    title: "Sistema PWA de Controle de Estoque",
    description:
      "Aplicação web progressiva para gestão de inventário, em uso operacional por clientes.",
    tags: ["PWA", "JavaScript", "PostgreSQL"],
    status: "Em produção",
    url: "https://estoque.mecaautomace.com.br",
  },
  {
    icon: ClipboardList,
    title: "Sistema de Gerenciamento de Consultas (SGC)",
    description:
      "Portal clínico para gestão de consultas, pacientes e agendamentos, em operação contínua.",
    tags: ["React", "TypeScript", "Supabase"],
    status: "Em produção",
    url: "https://sgc.mecaautomace.com.br",
  },
  {
    icon: Sparkles,
    title: "Sistema de Controle para Cosméticos",
    description:
      "Solução personalizada para gestão de produtos e estoque no setor de beleza.",
    tags: ["React", "PWA", "Supabase"],
    status: "Em desenvolvimento",
    url: "https://stockreal.mecaautomace.com.br",
  },
  {
    icon: Wrench,
    title: "Manutenção de Portal — Instituto DNZ",
    description:
      "Evolução contínua e manutenção do portal institutodnz.com.br, garantindo estabilidade, performance e novas funcionalidades.",
    tags: ["Laravel", "Vue.js", "PHP"],
    status: "Em produção",
    url: "https://institutodnz.com.br",
  },
  {
    icon: Bot,
    title: "Agente de IA Conversacional",
    description:
      "Fluxos inteligentes para agendamento de consultas com atendimento 24/7 via WhatsApp, integrando n8n e modelos de IA.",
    tags: ["n8n", "IA", "WhatsApp", "API"],
    status: "Em produção",
  },
  {
    icon: Building2,
    title: "Automação para Imobiliárias",
    description:
      "Funis de atendimento e qualificação automática de leads com ManyChat e n8n, reduzindo tempo de resposta e aumentando conversão.",
    tags: ["ManyChat", "n8n", "CRM"],
    status: "Em produção",
  },
];

const statusConfig: Record<ProjectStatus, string> = {
  "Em produção": "bg-green-50 text-green-700 border border-green-200",
  "Em desenvolvimento": "bg-amber-50 text-amber-700 border border-amber-200",
};

export function ProjectsSection() {
  return (
    <section id="projects" className="py-24 sm:py-32 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-headline text-4xl font-bold text-primary sm:text-5xl">
            Projetos em Destaque
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Soluções reais entregues para clientes e operações próprias.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {projects.map((project) => {
            const Icon = project.icon;
            return (
              <Card
                key={project.title}
                className="h-full hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0 bg-accent/10 p-3 rounded-full">
                      <Icon className="h-6 w-6 text-accent" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-headline text-lg font-semibold text-primary leading-snug">
                        {project.title}
                      </h3>
                      <span
                        className={`inline-block mt-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig[project.status]}`}
                      >
                        {project.status}
                      </span>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                    {project.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground border border-border"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {project.url ? (
                    <Button variant="outline" size="sm" className="mt-5 self-start" asChild>
                      <a href={project.url} target="_blank" rel="noopener noreferrer">
                        Ver mais
                      </a>
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm" className="mt-5 self-start" disabled>
                      Ver mais
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
