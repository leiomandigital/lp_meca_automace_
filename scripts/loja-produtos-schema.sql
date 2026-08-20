-- Loja de Fluxos n8n — catálogo em Postgres (fonte única, usada pelo site e pelo n8n)
CREATE TABLE IF NOT EXISTS produtos (
  slug TEXT PRIMARY KEY,
  titulo TEXT NOT NULL,
  descricao_curta TEXT NOT NULL,
  descricao_completa TEXT NOT NULL,
  categoria TEXT NOT NULL CHECK (categoria IN ('Vendas', 'Atendimento', 'Financeiro', 'Marketing', 'Produtividade')),
  preco_centavos INTEGER NOT NULL CHECK (preco_centavos > 0),
  imagens TEXT[] NOT NULL DEFAULT '{}',
  video_url TEXT NOT NULL,
  ativo BOOLEAN NOT NULL DEFAULT true,
  -- Nunca retornados pelo endpoint público de listagem — só o n8n lê essas colunas na entrega
  arquivo_json_url TEXT NOT NULL,
  arquivo_pdf_url TEXT NOT NULL,
  criado_em TIMESTAMPTZ NOT NULL DEFAULT now(),
  atualizado_em TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_produtos_ativo ON produtos (ativo);
CREATE INDEX IF NOT EXISTS idx_produtos_categoria ON produtos (categoria);

-- Seed com os 3 produtos de exemplo que estavam hardcoded no frontend (troque pelos reais)
INSERT INTO produtos (
  slug, titulo, descricao_curta, descricao_completa, categoria,
  preco_centavos, imagens, video_url, ativo, arquivo_json_url, arquivo_pdf_url
) VALUES
(
  'qualificacao-leads-whatsapp',
  'Qualificação de Leads no WhatsApp',
  'Fluxo que qualifica automaticamente novos leads recebidos no WhatsApp usando IA e organiza por prioridade de atendimento.',
  'Este fluxo n8n conecta-se ao WhatsApp Business API, recebe as mensagens de novos contatos, usa um agente de IA para identificar intenção de compra e nível de urgência, e distribui o lead qualificado para o time comercial certo. Inclui registro automático em planilha ou CRM e notificação instantânea para o vendedor responsável.',
  'Vendas',
  100,
  ARRAY['/loja/qualificacao-leads-1.png', '/loja/qualificacao-leads-2.png'],
  'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  true,
  'https://exemplo-storage.com/fluxos/qualificacao-leads-whatsapp.json',
  'https://exemplo-storage.com/fluxos/qualificacao-leads-whatsapp.pdf'
),
(
  'conciliacao-financeira-automatica',
  'Conciliação Financeira Automática',
  'Concilia extratos bancários com lançamentos do sistema financeiro e sinaliza divergências automaticamente.',
  'Fluxo que importa extratos bancários (OFX/CSV), compara com os lançamentos já registrados no seu sistema financeiro e gera um relatório de divergências. Reduz o tempo gasto em conciliação manual de horas para minutos, com alerta automático para o time financeiro quando algo não bate.',
  'Financeiro',
  6990,
  ARRAY['/loja/conciliacao-financeira-1.png'],
  'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  true,
  'https://exemplo-storage.com/fluxos/conciliacao-financeira-automatica.json',
  'https://exemplo-storage.com/fluxos/conciliacao-financeira-automatica.pdf'
),
(
  'atendimento-ia-primeiro-contato',
  'Atendimento com IA no Primeiro Contato',
  'Agente de IA responde as dúvidas mais comuns de novos clientes antes de transferir para um humano.',
  'Fluxo que integra um agente de IA conversacional ao canal de atendimento, respondendo perguntas frequentes, horário de funcionamento e status de pedido automaticamente. Só transfere para um atendente humano quando o assunto exige, reduzindo o volume de mensagens repetitivas.',
  'Atendimento',
  5990,
  ARRAY['/loja/atendimento-ia-1.png'],
  'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  true,
  'https://exemplo-storage.com/fluxos/atendimento-ia-primeiro-contato.json',
  'https://exemplo-storage.com/fluxos/atendimento-ia-primeiro-contato.pdf'
)
ON CONFLICT (slug) DO NOTHING;
