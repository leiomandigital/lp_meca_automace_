import type { CartItem } from "@/context/cart-context";

const CRIAR_PEDIDO_WEBHOOK_URL =
  import.meta.env.VITE_LOJA_CRIAR_PEDIDO_WEBHOOK_URL ??
  "https://nwh.mecaautomace.com.br/webhook/loja-criar-pedido";

export interface DadosComprador {
  nome: string;
  email: string;
  telefone: {
    ddi: string;
    numero: string;
  };
}

interface CriarPedidoResponse {
  url: string;
}

export class CheckoutError extends Error {}

export async function criarPedido(
  comprador: DadosComprador,
  itens: CartItem[]
): Promise<string> {
  const payload = {
    nome: comprador.nome,
    email: comprador.email,
    telefone: comprador.telefone,
    itens: itens.map((item) => ({ slug: item.slug, quantidade: 1 })),
  };

  let response: Response;
  try {
    response = await fetch(CRIAR_PEDIDO_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new CheckoutError(
      "Não foi possível conectar ao servidor de pagamento. Verifique sua conexão e tente novamente."
    );
  }

  if (!response.ok) {
    throw new CheckoutError(
      "Não foi possível criar o pedido. Tente novamente em instantes."
    );
  }

  const data = (await response.json()) as CriarPedidoResponse;
  if (!data.url) {
    throw new CheckoutError("Resposta inválida do servidor de pagamento.");
  }

  return data.url;
}
