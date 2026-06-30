import { Star } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  initials: string;
  avatarColor: string;
}

const columns: Testimonial[][] = [
  [
    {
      name: "Carlos Mendes",
      role: "Gestor Comercial",
      company: "FluxoImob",
      quote: "A qualificação de leads ficou automática. Nossa equipe parou de perder tempo com contatos frios e o faturamento cresceu.",
      initials: "CM",
      avatarColor: "bg-blue-500",
    },
    {
      name: "Fernanda Lima",
      role: "COO",
      company: "Grupo Nexus",
      quote: "Em 2 semanas já tínhamos todo o fluxo de aprovação de pedidos automatizado. O retorno foi imediato.",
      initials: "FL",
      avatarColor: "bg-violet-500",
    },
    {
      name: "Bruno Carvalho",
      role: "Gerente de Operações",
      company: "TechMove Logística",
      quote: "Reduzimos o tempo de processamento de pedidos em 70%. Vale muito cada centavo do investimento.",
      initials: "BC",
      avatarColor: "bg-emerald-500",
    },
  ],
  [
    {
      name: "Ana Paula Rocha",
      role: "Diretora Clínica",
      company: "Clínica Viva Saúde",
      quote: "O agendamento via WhatsApp mudou nossa operação. Atendemos 24h sem precisar contratar nenhum colaborador.",
      initials: "AR",
      avatarColor: "bg-rose-500",
    },
    {
      name: "Marcos Oliveira",
      role: "Fundador",
      company: "Studio Lab Design",
      quote: "O agente de IA responde clientes no Instagram e WhatsApp enquanto durmo. As vendas aumentaram 40%.",
      initials: "MO",
      avatarColor: "bg-amber-500",
    },
    {
      name: "Juliana Costa",
      role: "Gestora Financeira",
      company: "Construtora Valore",
      quote: "Conciliação bancária que levava 3 dias agora é automática. A equipe foca no que realmente importa.",
      initials: "JC",
      avatarColor: "bg-teal-500",
    },
  ],
  [
    {
      name: "Ricardo Fernandes",
      role: "CEO",
      company: "StockPro Distribuidora",
      quote: "O sistema de estoque eliminou planilhas e retrabalho por completo. Resultado visível já no primeiro mês.",
      initials: "RF",
      avatarColor: "bg-indigo-500",
    },
    {
      name: "Patricia Souza",
      role: "Diretora de Marketing",
      company: "Agência Impacto",
      quote: "Os relatórios de campanha que levavam horas chegam automáticos todo dia. Trabalho excelente.",
      initials: "PS",
      avatarColor: "bg-pink-500",
    },
    {
      name: "Eduardo Nunes",
      role: "Proprietário",
      company: "Farmácia Bem Estar",
      quote: "Integrou nosso PDV com o WhatsApp. Clientes recebem lembretes de medicamentos automaticamente. Sensacional.",
      initials: "EN",
      avatarColor: "bg-green-600",
    },
  ],
];

const colAnimClass = [
  "testimonial-col-1",
  "testimonial-col-2",
  "testimonial-col-3",
];

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="bg-card border border-border rounded-xl p-5 mb-4 shadow-sm">
      <div className="flex gap-0.5 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-3.5 w-3.5 fill-accent text-accent" />
        ))}
      </div>
      <blockquote className="text-sm text-foreground leading-relaxed mb-4">
        "{t.quote}"
      </blockquote>
      <div className="flex items-center gap-3">
        <div
          className={`${t.avatarColor} h-9 w-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}
        >
          {t.initials}
        </div>
        <div>
          <p className="text-sm font-semibold text-primary">{t.name}</p>
          <p className="text-xs text-muted-foreground">
            {t.role} · {t.company}
          </p>
        </div>
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  return null;
  // eslint-disable-next-line no-unreachable
  return (
    <section
      id="testimonials"
      className="py-24 sm:py-32 bg-secondary/20 overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-accent/10 text-accent border border-accent/20 mb-4">
            Depoimentos
          </span>
          <h2 className="font-headline text-4xl font-bold text-primary sm:text-5xl">
            O que nossos clientes dizem
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Resultados reais de empresas que automatizaram seus processos
            conosco.
          </p>
        </div>

        <div
          className="testimonials-grid flex gap-4 max-w-5xl mx-auto"
          style={{
            height: "480px",
            overflow: "hidden",
            maskImage:
              "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",
          }}
        >
          {columns.map((col, colIdx) => (
            <div
              key={colIdx}
              className={`flex-1 min-w-0 ${colAnimClass[colIdx]} ${
                colIdx === 1 ? "hidden md:block" : ""
              } ${colIdx === 2 ? "hidden lg:block" : ""}`}
            >
              {[...col, ...col].map((t, i) => (
                <TestimonialCard key={i} t={t} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
