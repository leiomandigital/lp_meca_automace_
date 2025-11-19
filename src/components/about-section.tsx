import { Cog, Zap, Target } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const features = [
  {
    icon: <Zap className="h-8 w-8 text-accent" />,
    title: "Eficiência Inigualável",
    description:
      "Otimize suas operações e aumente a produtividade com nossa automação de ponta.",
  },
  {
    icon: <Target className="h-8 w-8 text-accent" />,
    title: "Engenharia de Precisão",
    description:
      "Experimente uma execução impecável com sistemas projetados para precisão e confiabilidade.",
  },
  {
    icon: <Cog className="h-8 w-8 text-accent" />,
    title: "Soluções Escaláveis",
    description:
      "Nossos serviços crescem com você, fornecendo uma estrutura flexível para suas necessidades em evolução.",
  },
];

export function AboutSection() {
  const aboutImage = PlaceHolderImages.find((p) => p.id === "about-image");

  return (
    <section id="about" className="py-24 sm:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-headline text-4xl font-bold text-primary sm:text-5xl">
            O Futuro da Automação
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Dedicamo-nos a revolucionar indústrias por meio da automação
            inteligente, fornecendo soluções robustas e inovadoras que
            impulsionam o sucesso.
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
            {aboutImage && (
              <img
                src={aboutImage.imageUrl}
                alt={aboutImage.description}
                className="rounded-lg shadow-2xl object-cover aspect-[3/2] w-full h-auto"
                data-ai-hint={aboutImage.imageHint}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
