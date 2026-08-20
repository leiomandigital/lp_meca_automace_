/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_LOJA_CRIAR_PEDIDO_WEBHOOK_URL?: string;
  readonly VITE_LOJA_LISTAR_PRODUTOS_WEBHOOK_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
