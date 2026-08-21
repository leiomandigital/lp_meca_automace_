import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type ReactNode,
} from "react";
import type { ProdutoPublico } from "@/types/produto";

export interface CartItem {
  slug: string;
  titulo: string;
  precoCentavos: number;
  imagem: string;
}

interface CartState {
  itens: CartItem[];
}

type CartAction =
  | { type: "ADICIONAR"; produto: ProdutoPublico }
  | { type: "REMOVER"; slug: string }
  | { type: "LIMPAR" }
  | { type: "HIDRATAR"; itens: CartItem[] };

const STORAGE_KEY = "meca-automace:carrinho";

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADICIONAR": {
      if (state.itens.some((item) => item.slug === action.produto.slug)) {
        return state;
      }
      const novoItem: CartItem = {
        slug: action.produto.slug,
        titulo: action.produto.titulo,
        precoCentavos: action.produto.precoCentavos,
        imagem: action.produto.imagens[0] ?? "",
      };
      return { itens: [...state.itens, novoItem] };
    }
    case "REMOVER":
      return { itens: state.itens.filter((item) => item.slug !== action.slug) };
    case "LIMPAR":
      return { itens: [] };
    case "HIDRATAR":
      return { itens: action.itens };
    default:
      return state;
  }
}

interface CartContextValue {
  itens: CartItem[];
  totalCentavos: number;
  adicionarItem: (produto: ProdutoPublico) => void;
  removerItem: (slug: string) => void;
  limparCarrinho: () => void;
  possuiItem: (slug: string) => boolean;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { itens: [] });

  useEffect(() => {
    try {
      const salvo = localStorage.getItem(STORAGE_KEY);
      if (salvo) {
        dispatch({ type: "HIDRATAR", itens: JSON.parse(salvo) as CartItem[] });
      }
    } catch {
      // localStorage indisponível ou dado corrompido — segue com carrinho vazio
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.itens));
  }, [state.itens]);

  const totalCentavos = state.itens.reduce((soma, item) => soma + item.precoCentavos, 0);

  const value: CartContextValue = {
    itens: state.itens,
    totalCentavos,
    adicionarItem: (produto) => dispatch({ type: "ADICIONAR", produto }),
    removerItem: (slug) => dispatch({ type: "REMOVER", slug }),
    limparCarrinho: () => dispatch({ type: "LIMPAR" }),
    possuiItem: (slug) => state.itens.some((item) => item.slug === slug),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart deve ser usado dentro de um CartProvider");
  }
  return context;
}
