import { Navigate, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { formatarPreco } from "@/types/produto";
import { useProduto } from "@/hooks/use-produtos";
import { useCart } from "@/context/cart-context";
import { useToast } from "@/hooks/use-toast";

function paraEmbedYoutube(url: string): string | null {
  const match = url.match(/(?:v=|youtu\.be\/)([\w-]{11})/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

export function ProdutoPage() {
  const { slug } = useParams<{ slug: string }>();
  const { dados: produto, carregando, erro } = useProduto(slug);
  const { adicionarItem, possuiItem } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  const voltarParaLoja = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/loja");
    }
  };

  if (carregando) {
    return (
      <section className="pt-32 pb-24 sm:pt-40 sm:pb-32">
        <div className="flex justify-center py-16 text-muted-foreground">
          <Loader2 className="h-6 w-6 animate-spin mr-2" /> Carregando produto...
        </div>
      </section>
    );
  }

  if (erro) {
    return (
      <section className="pt-32 pb-24 sm:pt-40 sm:pb-32">
        <p className="text-center text-destructive">{erro}</p>
      </section>
    );
  }

  if (!produto) {
    return <Navigate to="/loja" replace />;
  }

  const embedUrl = paraEmbedYoutube(produto.videoUrl);
  const jaNoCarrinho = possuiItem(produto.slug);

  const handleAdicionar = () => {
    adicionarItem(produto);
    toast({ title: "Adicionado ao carrinho", description: produto.titulo });
  };

  return (
    <section className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <div className="container mx-auto px-4 max-w-5xl">
        <button
          onClick={voltarParaLoja}
          className="inline-flex items-center gap-2 text-sm font-medium text-foreground/70 hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para a loja
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <Carousel>
              <CarouselContent>
                {produto.imagens.map((imagem) => (
                  <CarouselItem key={imagem}>
                    <div className="aspect-video w-full rounded-lg bg-muted overflow-hidden">
                      <img src={imagem} alt={produto.titulo} className="h-full w-full object-cover" />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {produto.imagens.length > 1 && (
                <>
                  <CarouselPrevious />
                  <CarouselNext />
                </>
              )}
            </Carousel>

            {embedUrl && (
              <div className="aspect-video w-full rounded-lg overflow-hidden mt-6">
                <iframe
                  src={embedUrl}
                  title={`Vídeo demonstrativo — ${produto.titulo}`}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}
          </div>

          <div>
            <span className="text-xs font-semibold text-accent">{produto.categoria}</span>
            <h1 className="font-headline text-3xl sm:text-4xl font-bold text-primary mt-2 mb-4">
              {produto.titulo}
            </h1>
            <p className="text-muted-foreground leading-relaxed mb-6">
              {produto.descricaoCompleta}
            </p>

            <ul className="space-y-2 mb-8">
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                Arquivo .json do fluxo, pronto para importar no n8n
              </li>
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                PDF explicativo com pré-requisitos, credenciais e nodes necessários
              </li>
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                Entrega automática por e-mail após confirmação do pagamento
              </li>
            </ul>

            <div className="flex items-center justify-between mb-6">
              <span className="font-headline text-3xl font-bold text-primary">
                {formatarPreco(produto.precoCentavos)}
              </span>
            </div>

            <Button size="lg" className="w-full" onClick={handleAdicionar} disabled={jaNoCarrinho}>
              {jaNoCarrinho ? "Já está no carrinho" : "Adicionar ao carrinho"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
