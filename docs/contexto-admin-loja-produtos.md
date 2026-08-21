# Contexto técnico — Admin de Produtos da Loja de Fluxos n8n

Este documento é a referência técnica completa para construir, em projeto separado, um painel de administração que insere novos fluxos (produtos) diretamente no banco Postgres usado pela loja do site institucional Meca Automace. Use este arquivo como base ao montar o prompt de um novo projeto — ele descreve o contrato exato que o admin precisa respeitar para não quebrar o site e os workflows n8n existentes.

## 1. Visão geral do ecossistema

```
┌─────────────────────┐      GET /webhook/loja-listar-produtos      ┌──────────────┐
│  Site institucional  │ ───────────────────────────────────────►   │     n8n      │
│  (React + Vite,      │                                             │ (workflows)  │
│  hospedado Hostinger,│      POST /webhook/loja-criar-pedido        │              │
│  estático, sem back) │ ───────────────────────────────────────►   │              │
└─────────────────────┘                                             └──────┬───────┘
                                                                             │
        ┌────────────────────────────────────────────────────────────────┘
        │  lê/escreve
        ▼
┌───────────────┐        escreve produtos direto        ┌─────────────────────────┐
│   Postgres     │ ◄────────────────────────────────────│   Admin de Produtos      │
│ (tabelas:      │                                       │  (projeto novo, separado,│
│  produtos,     │                                       │   ex: Next.js na Vercel) │
│  pedidos,      │                                       └─────────────────────────┘
│  pedido_itens) │
└───────────────┘
```

- O **site institucional** é 100% estático (build Vite, upload manual do `dist/` via FTP para a Hostinger). Ele nunca fala direto com o Postgres — sempre via webhooks do n8n.
- O **n8n** (`https://nwh.mecaautomace.com.br`) é o único backend real hoje. Guarda a credencial do Postgres e expõe endpoints HTTP (webhooks) que o site e, futuramente, o admin podem chamar.
- O **admin de produtos** (a ser criado) é um projeto à parte, com backend próprio (ex: Next.js API routes na Vercel), que escreve direto no mesmo Postgres — não precisa passar pelo n8n, já que ele mesmo terá um servidor capaz de guardar a credencial do banco com segurança.

**Regra inegociável:** a credencial de conexão com o Postgres (`DATABASE_URL` ou equivalente) só pode existir em ambiente server-side (variável de ambiente de uma API route/servidor Node, nunca em uma env var `VITE_`/`NEXT_PUBLIC_`/`REACT_APP_` ou qualquer coisa que vá parar no bundle JS enviado ao navegador). Isso já foi validado como bloqueio de segurança numa iteração anterior deste projeto — não é opcional.

## 2. Schema Postgres — tabela `produtos` (fonte de verdade do catálogo)

```sql
CREATE TABLE IF NOT EXISTS produtos (
  slug TEXT PRIMARY KEY,
  titulo TEXT NOT NULL,
  descricao_curta TEXT NOT NULL,
  descricao_completa TEXT NOT NULL,
  categoria TEXT NOT NULL CHECK (categoria IN ('Vendas', 'Atendimento', 'Financeiro', 'Marketing', 'Produtividade')),
  preco_centavos INTEGER NOT NULL CHECK (preco_centavos > 0),
  imagens TEXT[] NOT NULL DEFAULT '{}',
  video_url TEXT, -- opcional: card de vídeo só aparece no site quando preenchido
  ativo BOOLEAN NOT NULL DEFAULT true,
  -- Nunca retornados pelo endpoint público de listagem — só o n8n lê essas colunas na entrega
  arquivo_json_url TEXT NOT NULL,
  arquivo_pdf_url TEXT NOT NULL,
  criado_em TIMESTAMPTZ NOT NULL DEFAULT now(),
  atualizado_em TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_produtos_ativo ON produtos (ativo);
CREATE INDEX IF NOT EXISTS idx_produtos_categoria ON produtos (categoria);
```

Campos que o admin precisa preencher ao criar um produto:

| Campo | Tipo | Obrigatório | Observação |
|---|---|---|---|
| `slug` | texto | sim | Chave primária. Único, sem espaços/acentos/maiúsculas (usado na URL `/loja/:slug` do site). Sugestão: gerar automaticamente a partir do título (slugify), com opção de edição manual. |
| `titulo` | texto | sim | Nome do fluxo exibido no card e na página de produto. |
| `descricao_curta` | texto | sim | Aparece no card do catálogo. |
| `descricao_completa` | texto | sim | Aparece na página do produto. |
| `categoria` | enum texto | sim | Um dos 5 valores fixos: `Vendas`, `Atendimento`, `Financeiro`, `Marketing`, `Produtividade`. O `CHECK` da tabela rejeita qualquer outro valor. |
| `preco_centavos` | inteiro | sim | **Sempre em centavos**, nunca float (ex: R$ 49,90 → `4990`). É o valor que o workflow n8n `loja-criar-pedido` usa para validar o pedido — nunca confiar em preço vindo do site. |
| `imagens` | array de texto | sim (mín. 1) | Caminhos/URLs públicas das imagens do produto, na ordem de exibição no carrossel. Ver seção 4 sobre onde essas imagens ficam hospedadas. |
| `video_url` | texto | **não** | Opcional, por decisão de agilidade do MVP: cadastro roda só com imagens por enquanto. Quando preenchido, deve ser uma URL de vídeo YouTube não-listado (o site converte automaticamente para embed a partir de `watch?v=` ou `youtu.be/`). O card de vídeo na página do produto só aparece quando essa coluna não está vazia — deixe `NULL`/vazio se ainda não tiver o vídeo, e edite depois (`UPDATE produtos SET video_url = '...' WHERE slug = '...'`) sem precisar de redeploy do site. |
| `ativo` | booleano | sim | `true` = aparece na loja. `false` = escondido, mas o histórico de pedidos antigos que venderam esse produto continua íntegro (nunca deletar um produto que já teve venda — só desativar). |
| `arquivo_json_url` | texto | sim | Link direto (não-adivinhável) para o `.json` do fluxo n8n exportado. **Nunca deve ser servido publicamente nem aparecer em nenhuma resposta HTTP consumida pelo navegador do cliente antes da compra.** |
| `arquivo_pdf_url` | texto | sim | Link direto (não-adivinhável) do PDF explicativo (pré-requisitos, credenciais, nodes necessários). Mesma regra de sigilo do item acima. |

## 3. Schema Postgres — tabelas de pedido (o admin NÃO escreve aqui, é só contexto)

```sql
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
```

Essas tabelas são preenchidas pelos workflows n8n (`loja-criar-pedido` e `loja-confirmar-pagamento`), não pelo admin de produtos. Só estão aqui para o admin entender o ecossistema completo e, se algum dia fizer um dashboard de pedidos, saber onde ler.

## 4. Onde ficam os arquivos (imagens, vídeo, json, pdf)

Hoje (antes do admin existir), o processo manual é:

- **Imagens**: sobem para `public/loja/` do repositório do site (Vite/React), servidas como arquivo estático pela Hostinger. Caminho salvo no banco: `/loja/nome-do-arquivo.png`.
- **Vídeo**: hospedado no YouTube (não-listado), sem upload de arquivo — só a URL vai para `video_url`.
- **`.json`/`.pdf`**: hospedados em um storage externo com link não-adivinhável (hoje varia por caso — Google Drive, S3, etc.), nunca dentro de `public/`.

**Decisão a tomar no projeto do admin:** como ele vai rodar em servidor próprio (ex: Vercel), a forma mais direta de resolver upload de imagem/vídeo/json/pdf sem depender de FTP manual é usar um storage de objetos com URL pública/assinada — ex: **Vercel Blob**, S3, ou Cloudinary. O admin faz o upload no momento do cadastro e grava a URL retornada direto nas colunas correspondentes (`imagens[]`, `arquivo_json_url`, `arquivo_pdf_url`). Isso elimina o passo manual de FTP/`public/loja/` para produtos cadastrados a partir do admin. Produtos cadastrados antes do admin existir continuam com caminho `/loja/...` (servido pelo site), o que é compatível — o site não faz distinção entre um caminho relativo e uma URL absoluta em `imagens`/`video_url`, ambos funcionam como `src` de `<img>`/link.

Se optar por manter compatibilidade com `public/loja/` também a partir do admin, seria necessário o admin ter acesso de escrita ao mesmo repositório/hospedagem do site — mais complexo, não recomendado como primeira versão.

## 5. Contrato dos endpoints n8n que o site consome (não confundir com o que o admin precisa)

O admin **não precisa implementar nem chamar esses endpoints** — eles já existem e continuam sendo consumidos pelo site institucional. Documentados aqui só para o admin nunca gerar dados incompatíveis com o que esses workflows esperam ler da tabela `produtos`.

### `GET /webhook/loja-listar-produtos`
Query executada pelo n8n:
```sql
SELECT slug, titulo, descricao_curta, descricao_completa, categoria,
       preco_centavos, imagens, video_url, ativo
FROM produtos
WHERE ativo = true
ORDER BY criado_em DESC;
```
Retorna array de produtos (sem `arquivo_json_url`/`arquivo_pdf_url` — essas colunas nunca aparecem na resposta pública). O site espera as chaves em `snake_case` exatamente como o `SELECT` acima (ele faz o mapeamento para `camelCase` no frontend).

### `POST /webhook/loja-criar-pedido`
Recebe do site: `{ nome, email, telefone: { ddi, numero }, itens: [{ slug, quantidade }] }`.
O workflow busca `preco_centavos`/`titulo` na tabela `produtos` pelo `slug` recebido (nunca confia em preço vindo do body), grava `pedidos` + `pedido_itens`, chama a API da InfinitePay e retorna `{ "url": "..." }`.

**Implicação direta para o admin**: se um produto for cadastrado com `preco_centavos` errado, ou `slug` que colida com outro já existente, ou `ativo = true` antes dos arquivos de entrega (`arquivo_json_url`/`arquivo_pdf_url`) estarem prontos, isso gera venda incorreta ou cliente pagando por algo que ainda não pode ser entregue. O admin deveria, no mínimo:
- Impedir salvar com `ativo = true` se `arquivo_json_url` ou `arquivo_pdf_url` estiverem vazios.
- Impedir `slug` duplicado (a constraint `PRIMARY KEY` do Postgres já barra isso a nível de banco, mas o ideal é validar antes e mostrar erro amigável).
- Validar `preco_centavos > 0` e todos os campos `NOT NULL` da tabela antes do insert.

### `POST /webhook/loja-confirmar-pagamento`
Recebe confirmação da InfinitePay, atualiza `pedidos.status = 'pago'`, busca `arquivo_json_url`/`arquivo_pdf_url` dos produtos comprados (via `pedido_itens.produto_slug` → `produtos`) e envia e-mail de entrega. Também fora do escopo do admin, mas reforça por que essas duas colunas do produto precisam estar sempre corretas e acessíveis quando `ativo = true`.

## 6. Convenções que o admin deve seguir

- **Idioma**: todo texto de interface, nomes de campos, mensagens de erro — em Português do Brasil, é regra permanente do projeto.
- **Preço**: sempre inteiro em centavos no banco e na UI de entrada (ex: campo de input formatado como moeda, convertido para centavos antes do insert — nunca salvar float).
- **Slug**: minúsculas, sem acento, hífen como separador, sem caracteres especiais. Regex sugerida: `^[a-z0-9]+(-[a-z0-9]+)*$`.
- **Categoria**: input deve ser um select fechado com as 5 opções da tabela 2 — nunca um campo de texto livre (o `CHECK` do banco rejeitaria, mas a UI deveria impedir antes de tentar).
- **Nunca expor** `arquivo_json_url`/`arquivo_pdf_url` em nenhuma tela pública do admin sem autenticação — o próprio admin deveria ter login (usuário/senha simples já resolve, dado o baixo volume de uso).
- **Nunca editar/deletar um `slug`** de um produto que já tem `pedido_itens` referenciando ele (a FK não impede porque `pedido_itens.produto_slug` é só `TEXT`, não tem `REFERENCES` — é intencional, pedidos guardam uma cópia congelada do título/preço da época da compra — mas trocar o slug de um produto vendido quebra a rastreabilidade de "quem comprou o quê").

## 7. Variáveis de ambiente esperadas (server-side apenas)

Ao montar o projeto do admin, a lista mínima de env vars server-side é:

```
DATABASE_URL=postgres://usuario:senha@host:5432/banco   # mesmo banco do site/n8n
```

Mais o que for necessário para o storage de arquivos escolhido (ex: `BLOB_READ_WRITE_TOKEN` se usar Vercel Blob, ou `AWS_ACCESS_KEY_ID`/`AWS_SECRET_ACCESS_KEY`/`AWS_BUCKET` se usar S3).

Nenhuma dessas variáveis pode ter prefixo que o framework escolhido injeta no bundle do cliente (`VITE_`, `NEXT_PUBLIC_`, `REACT_APP_`, etc.) — todas devem ser lidas exclusivamente em código server-side (API route, server action, etc.).

## 8. Resumo do que o admin precisa fazer, na prática

1. Formulário de cadastro com os campos da seção 2 (exceto `criado_em`/`atualizado_em`, que o banco preenche sozinho).
2. Upload de imagens (1 a N) e, opcionalmente, dos arquivos `.json`/`.pdf`, gravando as URLs resultantes nos campos certos.
3. Validações da seção 6 antes de fazer o `INSERT`.
4. `INSERT INTO produtos (...) VALUES (...)` — server-side, usando a `DATABASE_URL`.
5. (Opcional, fase 2) Listagem/edição dos produtos já cadastrados, com botão para alternar `ativo`.
6. (Opcional, fase 2) Autenticação simples para não deixar o formulário de cadastro público.

Assim que um produto for inserido com `ativo = true` e todos os campos obrigatórios preenchidos, ele aparece automaticamente na loja do site na próxima vez que alguém acessar `/loja` (o site busca ao vivo via `loja-listar-produtos`, não tem cache de build) — não é necessário nenhum redeploy do site institucional.
