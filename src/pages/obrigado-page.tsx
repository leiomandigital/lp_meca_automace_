import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";

export function ObrigadoPage() {
  const [searchParams] = useSearchParams();
  const pedido = searchParams.get("pedido");
  const { limparCarrinho } = useCart();

  useEffect(() => {
    limparCarrinho();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <div className="container mx-auto px-4 max-w-lg text-center">
        <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-6" />
        <h1 className="font-headline text-3xl sm:text-4xl font-bold text-primary mb-4">
          Pedido recebido!
        </h1>
        <p className="text-muted-foreground mb-2">
          Assim que a confirmação do pagamento chegar, você receberá o(s) fluxo(s) por e-mail,
          com o arquivo .json e o PDF de instruções em anexo.
        </p>
        {pedido && (
          <p className="text-xs text-muted-foreground mb-8">Referência do pedido: {pedido}</p>
        )}
        <Button asChild>
          <Link to="/loja">Voltar para a loja</Link>
        </Button>
      </div>
    </section>
  );
}
