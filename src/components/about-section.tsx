import { Cog, Zap, Target } from "lucide-react";

const features = [
  {
    icon: <Zap className="h-8 w-8 text-accent" />,
    title: "Automatize Processos Repetitivos",
    description:
      "Elimine tarefas manuais e libere sua equipe para atividades estratégicas. Ganhe tempo e reduza erros operacionais.",
  },
  {
    icon: <Target className="h-8 w-8 text-accent" />,
    title: "Integração Entre Sistemas",
    description:
      "Conecte suas ferramentas e plataformas em fluxos inteligentes. Dados sincronizados automaticamente, sem retrabalho.",
  },
  {
    icon: <Cog className="h-8 w-8 text-accent" />,
    title: "Soluções Sob Medida",
    description:
      "Desenvolvemos automações personalizadas para seu negócio. Escaláveis, seguras e alinhadas aos seus objetivos.",
  },
];

export function AboutSection() {

  return (
    <section
      id="about"
      className="py-24 sm:py-32 bg-background overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-headline text-4xl font-bold text-primary sm:text-5xl">
            Por que automatizar seus processos?
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Transformamos operações complexas em fluxos automatizados. Reduza
            custos, aumente eficiência e escale seu negócio com inteligência e
            tecnologia.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex-shrink-0 bg-accent/10 p-3 rounded-full">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-headline font-semibold text-primary">
                    {feature.title}
                  </h3>
                  <p className="mt-1 text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center">
            <img
              src="/automacao-processos.jpg"
              alt="Automação de processos empresariais"
              className="rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 object-cover aspect-[3/2] w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
