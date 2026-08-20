import type { CategoriaProduto, ProdutoPublico } from "@/types/produto";

const LISTAR_PRODUTOS_WEBHOOK_URL =
  import.meta.env.VITE_LOJA_LISTAR_PRODUTOS_WEBHOOK_URL ??
  "https://nwh.mecaautomace.com.br/webhook/loja-listar-produtos";

export class ProdutosError extends Error {}

// Shape bruto que costuma vir de um node Postgres do n8n (colunas snake_case,
// "imagens" como array já desserializado pelo driver).
interface ProdutoRow {
  slug: string;
  titulo: string;
  descricao_curta: string;
  descricao_completa: string;
  categoria: CategoriaProduto;
  preco_centavos: number;
  imagens: string[];
  video_url: string;
  ativo: boolean;
}

function mapearProduto(row: ProdutoRow): ProdutoPublico {
  return {
    slug: row.slug,
    titulo: row.titulo,
    descricaoCurta: row.descricao_curta,
    descricaoCompleta: row.descricao_completa,
    categoria: row.categoria,
    precoCentavos: row.preco_centavos,
    imagens: row.imagens ?? [],
    videoUrl: row.video_url,
    ativo: row.ativo,
  };
}

let cache: ProdutoPublico[] | null = null;
let promiseEmAndamento: Promise<ProdutoPublico[]> | null = null;

async function buscarTodos(): Promise<ProdutoPublico[]> {
  if (cache) return cache;
  if (promiseEmAndamento) return promiseEmAndamento;

  promiseEmAndamento = (async () => {
    let response: Response;
    try {
      response = await fetch(LISTAR_PRODUTOS_WEBHOOK_URL);
    } catch {
      throw new ProdutosError(
        "Não foi possível carregar o catálogo. Verifique sua conexão e tente novamente."
      );
    }

    if (!response.ok) {
      throw new ProdutosError("Não foi possível carregar o catálogo no momento.");
    }

    const rows = (await response.json()) as ProdutoRow[];
    const produtos = rows.map(mapearProduto).filter((produto) => produto.ativo);
    cache = produtos;
    return produtos;
  })();

  try {
    return await promiseEmAndamento;
  } finally {
    promiseEmAndamento = null;
  }
}

export async function listarProdutosAtivos(): Promise<ProdutoPublico[]> {
  return buscarTodos();
}

export async function buscarProdutoPorSlug(slug: string): Promise<ProdutoPublico | undefined> {
  const produtos = await buscarTodos();
  return produtos.find((produto) => produto.slug === slug);
}
