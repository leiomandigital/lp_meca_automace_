import { Check } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Iniciante",
    price: "R$49",
    pricePeriod: "/mês",
    description: "Para pequenas equipes e startups que estão começando com automação.",
    features: [
      "Fluxos de Automação Básicos",
      "Até 1.000 Operações",
      "Suporte Comunitário",
      "1 Usuário",
    ],
    isPopular: false,
  },
  {
    name: "Profissional",
    price: "R$99",
    pricePeriod: "/mês",
    description: "Para empresas em crescimento que precisam de mais poder e flexibilidade.",
    features: [
      "Fluxos de Automação Avançados",
      "Até 10.000 Operações",
      "Suporte por E-mail e Chat",
      "5 Usuários",
      "Acesso à API",
    ],
    isPopular: true,
  },
  {
    name: "Empresarial",
    price: "Personalizado",
    pricePeriod: "",
    description: "Para grandes organizações com necessidades personalizadas e requisitos de escalonamento.",
    features: [
      "Soluções de Automação Personalizadas",
      "Operações Ilimitadas",
      "Gerente de Contas Dedicado",
      "Usuários Ilimitados",
      "Implantação Local",
    ],
    isPopular: false,
  },
];

export function PlansSection() {
  return (
    <section id="plans" className="py-24 sm:py-32 bg-secondary/30 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-headline text-4xl font-bold text-primary sm:text-5xl">
            Planos de Preços
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Escolha o plano perfeito para o seu negócio. Todos os planos vêm com nosso 
            compromisso com a excelência.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={cn(
                "flex flex-col",
                plan.isPopular && "border-primary ring-2 ring-primary shadow-lg"
              )}
            >
              <CardHeader>
                <CardTitle className="font-headline">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.pricePeriod}</span>
                </div>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  variant={plan.isPopular ? "default" : "outline"}
                >
                  {plan.name === 'Empresarial' ? 'Fale Conosco' : 'Comece Agora'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
