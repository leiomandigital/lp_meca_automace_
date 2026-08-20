export type CategoriaProduto =
  | "Vendas"
  | "Atendimento"
  | "Financeiro"
  | "Marketing"
  | "Produtividade";

/**
 * Formato retornado pelo endpoint público de listagem (n8n → Postgres).
 * Nunca inclui arquivo_json_url / arquivo_pdf_url — esses ficam só no backend.
 */
export interface ProdutoPublico {
  slug: string;
  titulo: string;
  descricaoCurta: string;
  descricaoCompleta: string;
  categoria: CategoriaProduto;
  precoCentavos: number;
  imagens: string[];
  videoUrl: string;
  ativo: boolean;
}

export function formatarPreco(centavos: number): string {
  return (centavos / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
