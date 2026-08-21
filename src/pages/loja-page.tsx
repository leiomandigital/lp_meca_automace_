import { useState, type MouseEvent } from "react";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatarPreco, type CategoriaProduto, type ProdutoPublico } from "@/types/produto";
import { useProdutos } from "@/hooks/use-produtos";
import { useCart } from "@/context/cart-context";
import { useToast } from "@/hooks/use-toast";

const categorias: CategoriaProduto[] = [
  "Vendas",
  "Atendimento",
  "Financeiro",
  "Marketing",
  "Produtividade",
];

export function LojaPage() {
  const { dados: produtos, carregando, erro } = useProdutos();
  const [categoriaAtiva, setCategoriaAtiva] = useState<CategoriaProduto | "Todas">("Todas");
  const { adicionarItem, possuiItem } = useCart();
  const { toast } = useToast();

  const handleAdicionar = (e: MouseEvent, produto: ProdutoPublico) => {
    e.preventDefault();
    e.stopPropagation();
    adicionarItem(produto);
    toast({ title: "Adicionado ao carrinho", description: produto.titulo });
  };

  const produtosFiltrados =
    !produtos || categoriaAtiva === "Todas"
      ? produtos
      : produtos.filter((produto) => produto.categoria === categoriaAtiva);

  return (
    <section className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-accent/10 text-accent border border-accent/20 mb-4">
            Loja de Fluxos
          </span>
          <h1 className="font-headline text-4xl font-bold text-primary sm:text-5xl">
            Automações Prontas para Importar
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Fluxos n8n testados e documentados, prontos para importar e adaptar ao seu negócio.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <Button
            variant={categoriaAtiva === "Todas" ? "default" : "outline"}
            size="sm"
            onClick={() => setCategoriaAtiva("Todas")}
          >
            Todas
          </Button>
          {categorias.map((categoria) => (
            <Button
              key={categoria}
              variant={categoriaAtiva === categoria ? "default" : "outline"}
              size="sm"
              onClick={() => setCategoriaAtiva(categoria)}
            >
              {categoria}
            </Button>
          ))}
        </div>

        {carregando && (
          <div className="flex justify-center py-16 text-muted-foreground">
            <Loader2 className="h-6 w-6 animate-spin mr-2" /> Carregando catálogo...
          </div>
        )}

        {erro && !carregando && (
          <p className="text-center text-destructive">{erro}</p>
        )}

        {!carregando && !erro && produtosFiltrados && produtosFiltrados.length === 0 && (
          <div className="text-center py-16">
            <p className="text-lg font-medium text-foreground mb-2">
              {categoriaAtiva === "Todas"
                ? "Estamos preparando os primeiros fluxos da loja."
                : `Ainda não temos fluxos na categoria "${categoriaAtiva}".`}
            </p>
            <p className="text-muted-foreground">
              Volte em breve — novidades chegando por aqui.
            </p>
          </div>
        )}

        {!carregando && !erro && produtosFiltrados && produtosFiltrados.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {produtosFiltrados.map((produto) => (
              <Link key={produto.slug} to={`/loja/${produto.slug}`}>
                <Card className="h-full flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div
                    className={cn(
                      "aspect-video w-full rounded-t-lg bg-muted overflow-hidden",
                      "flex items-center justify-center"
                    )}
                  >
                    {produto.imagens[0] && (
                      <img
                        src={produto.imagens[0]}
                        alt={produto.titulo}
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>
                  <CardContent className="p-6 flex flex-col flex-1">
                    <span className="text-xs font-semibold text-accent mb-2">
                      {produto.categoria}
                    </span>
                    <h2 className="font-headline text-lg font-bold text-primary mb-2 leading-snug">
                      {produto.titulo}
                    </h2>
                    <p className="text-sm text-muted-foreground flex-1 mb-4">
                      {produto.descricaoCurta}
                    </p>
                    <div className="flex items-center justify-between mt-auto mb-4">
                      <span className="font-headline text-xl font-bold text-primary">
                        {formatarPreco(produto.precoCentavos)}
                      </span>
                      <span className="text-sm font-medium text-accent">Ver detalhes →</span>
                    </div>
                    <Button
                      className="w-full"
                      variant={possuiItem(produto.slug) ? "outline" : "default"}
                      disabled={possuiItem(produto.slug)}
                      onClick={(e) => handleAdicionar(e, produto)}
                    >
                      {possuiItem(produto.slug) ? "Já está no carrinho" : "Adicionar ao carrinho"}
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
