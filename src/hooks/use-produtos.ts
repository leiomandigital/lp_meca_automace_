import { useEffect, useState } from "react";
import type { ProdutoPublico } from "@/types/produto";
import { listarProdutosAtivos, buscarProdutoPorSlug, ProdutosError } from "@/services/produtos-service";

interface EstadoAssincrono<T> {
  dados: T | undefined;
  carregando: boolean;
  erro: string | undefined;
}

export function useProdutos(): EstadoAssincrono<ProdutoPublico[]> {
  const [estado, setEstado] = useState<EstadoAssincrono<ProdutoPublico[]>>({
    dados: undefined,
    carregando: true,
    erro: undefined,
  });

  useEffect(() => {
    let cancelado = false;

    listarProdutosAtivos()
      .then((produtos) => {
        if (!cancelado) setEstado({ dados: produtos, carregando: false, erro: undefined });
      })
      .catch((error: unknown) => {
        if (cancelado) return;
        const mensagem =
          error instanceof ProdutosError ? error.message : "Erro inesperado ao carregar o catálogo.";
        setEstado({ dados: undefined, carregando: false, erro: mensagem });
      });

    return () => {
      cancelado = true;
    };
  }, []);

  return estado;
}

export function useProduto(slug: string | undefined): EstadoAssincrono<ProdutoPublico | undefined> {
  const [estado, setEstado] = useState<EstadoAssincrono<ProdutoPublico | undefined>>({
    dados: undefined,
    carregando: true,
    erro: undefined,
  });

  useEffect(() => {
    if (!slug) {
      setEstado({ dados: undefined, carregando: false, erro: undefined });
      return;
    }

    let cancelado = false;
    setEstado({ dados: undefined, carregando: true, erro: undefined });

    buscarProdutoPorSlug(slug)
      .then((produto) => {
        if (!cancelado) setEstado({ dados: produto, carregando: false, erro: undefined });
      })
      .catch((error: unknown) => {
        if (cancelado) return;
        const mensagem =
          error instanceof ProdutosError ? error.message : "Erro inesperado ao carregar o produto.";
        setEstado({ dados: undefined, carregando: false, erro: mensagem });
      });

    return () => {
      cancelado = true;
    };
  }, [slug]);

  return estado;
}
