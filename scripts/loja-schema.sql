-- Loja de Fluxos n8n — schema de pedidos
-- Requer a extensão pgcrypto para gen_random_uuid() (padrão no Postgres 13+ / Supabase)
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS pedidos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_nsu UUID UNIQUE NOT NULL,
  nome_comprador TEXT NOT NULL,
  email_comprador TEXT NOT NULL,
  telefone_comprador TEXT,
  total_centavos INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pendente', -- pendente | pago | expirado | cancelado
  transaction_nsu TEXT,
  paid_amount_centavos INTEGER,
  receipt_url TEXT,
  criado_em TIMESTAMPTZ NOT NULL DEFAULT now(),
  pago_em TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS pedido_itens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pedido_id UUID NOT NULL REFERENCES pedidos(id) ON DELETE CASCADE,
  produto_slug TEXT NOT NULL,
  titulo_produto TEXT NOT NULL,
  preco_unitario_centavos INTEGER NOT NULL,
  quantidade INTEGER NOT NULL DEFAULT 1
);

CREATE INDEX IF NOT EXISTS idx_pedidos_status ON pedidos (status, criado_em);
CREATE INDEX IF NOT EXISTS idx_pedidos_email ON pedidos (email_comprador);
