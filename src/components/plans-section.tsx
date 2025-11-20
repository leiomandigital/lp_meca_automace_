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
    name: "Essencial",
    price: "R$ 169,90",
    pricePeriod: "/mês",
    description:
      "Ideal para pequenas empresas que estão começando com automação.",
    features: [
      "1 automação simples",
      "Integração com Google Sheets/NocoDB",
      "Melhorias 1x por mês",
      "Suporte via e-mail e WhatsApp",
    ],
    isPopular: false,
    isSubscription: true,
  },
  {
    name: "Avançada",
    price: "R$ 269,90",
    pricePeriod: "/mês",
    description:
      "Para empresas que precisam de mais automações e inteligência artificial.",
    features: [
      "Até 3 automações simples ou 1 com IA",
      "Integrações básicas incluídas",
      "Melhorias até 3x por mês",
      "Suporte via e-mail e WhatsApp",
    ],
    isPopular: true,
    isSubscription: true,
  },
  {
    name: "Premium",
    price: "R$ 749,90",
    pricePeriod: "/mês",
    description:
      "Solução completa para empresas que precisam de automação em escala.",
    features: [
      "Automações e integrações ilimitadas (CRM, ERP, APIs, N8N,...)",
      "IA própria",
      "Melhorias sempre que necessário",
      "Suporte prioritário via e-mail e WhatsApp",
    ],
    isPopular: false,
    isSubscription: true,
  },
  {
    name: "Desenvolvimento Personalizado",
    price: "A partir de R$ 1.500",
    pricePeriod: "/projeto",
    description:
      "Pagamento único para projetos específicos. Você mantém total controle.",
    features: [
      "Fluxo simples: R$ 1.500",
      "Fluxo com IA: R$ 3.000",
      "Automação vinculada à sua conta",
      "Você assume gestão após 30 dias",
      "Custos de plataformas por sua conta",
    ],
    isPopular: false,
    isSubscription: false,
  },
];

export function PlansSection() {
  return (
    <section
      id="plans"
      className="py-24 sm:py-32 bg-secondary/30 overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-headline text-4xl font-bold text-primary sm:text-5xl">
            Planos de Automação
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Escolha o plano ideal para automatizar seus processos. Assinatura
            mensal sem setup ou desenvolvimento único com autonomia total.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={cn(
                "flex flex-col shadow-xl hover:shadow-2xl transition-shadow duration-300",
                plan.isPopular && "border-primary ring-2 ring-primary"
              )}
            >
              <CardHeader>
                {plan.isPopular && (
                  <div className="text-xs font-semibold text-primary mb-2">
                    MAIS POPULAR
                  </div>
                )}
                <CardTitle className="font-headline">{plan.name}</CardTitle>
                <CardDescription className="min-h-[3rem]">
                  {plan.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="mb-6">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">
                    {plan.pricePeriod}
                  </span>
                </div>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  variant={plan.isPopular ? "default" : "outline"}
                >
                  {plan.isSubscription
                    ? "Assinar Agora"
                    : "Solicitar Orçamento"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
