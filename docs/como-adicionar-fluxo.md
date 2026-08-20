# Como adicionar um novo fluxo na loja

> **Atualizado:** o catálogo não vive mais em código (`src/data/produtos.ts` foi removido). A fonte única agora é a tabela `produtos` no Postgres — o site lê de lá via o webhook n8n `loja-listar-produtos`, e o mesmo checkout (`loja-criar-pedido`) usa essa tabela para validar preço/existência do item. Ver [`scripts/loja-produtos-schema.sql`](../scripts/loja-produtos-schema.sql) para o schema.

Tudo o que você precisa mexer fica em dois lugares: a pasta `public/loja/` (imagens) e a tabela `produtos` no Postgres (os dados do produto). Não existe painel admin — é um `INSERT` direto, do jeito que já está definido para o MVP.

## Passo 1 — Preparar as imagens

1. Separe de 1 a 4 imagens do fluxo (prints do fluxo rodando no n8n, ou do resultado gerado por ele).
2. Formato recomendado: `.png` ou `.jpg`, proporção 16:9 (fica melhor no card e no carrossel), até ~500 KB cada — comprima antes de subir (ex: [squoosh.app](https://squoosh.app)) para o site não ficar pesado.
3. Nomeie os arquivos de forma previsível, prefixados pelo slug do produto, exemplo:
   - `qualificacao-leads-1.png`
   - `qualificacao-leads-2.png`
4. Coloque os arquivos dentro de `public/loja/`.

## Passo 2 — Preparar o vídeo

- Suba o vídeo demonstrativo no YouTube como **não-listado** (não precisa ser público na busca, só precisa do link).
- Copie a URL normal do vídeo (`https://www.youtube.com/watch?v=XXXXXXXXXXX`) — o site converte sozinho para o formato de embed, não precisa mexer em nada além de colar essa URL.
- Alternativa: se preferir hospedar um `.mp4` direto, salve o arquivo em `public/loja/` também e use esse caminho no lugar da URL do YouTube (nesse caso me avise, porque a página de produto hoje só sabe embutir YouTube — precisaria de um ajuste pequeno no código para tocar `.mp4` direto).

## Passo 3 — Preparar o `.json` do fluxo e o PDF explicativo

Esses dois arquivos **nunca vão para `public/`** (public é uma pasta pública, qualquer um acessa por URL direta). Eles ficam em um storage separado (ex: Google Drive, S3, ou onde vocês já hospedam esse tipo de arquivo) com um link não-adivinhável, e só são usados pelo workflow n8n `loja-confirmar-pagamento` na hora de montar o e-mail de entrega.

1. Exporte o fluxo do n8n: Workflows → abrir o fluxo → menu (⋮) → Download (gera o `.json`).
2. Escreva o PDF explicativo: como importar no n8n, quais credenciais e nodes são necessários, pré-requisitos.
3. Suba os dois arquivos no storage combinado e copie os links diretos de download de cada um.

## Passo 4 — Adicionar o produto na tabela `produtos`

Rode este `INSERT` no Postgres (via psql, DBeaver, ou pelo node Postgres do próprio n8n), preenchendo com os dados reais do fluxo:

```sql
INSERT INTO produtos (
  slug, titulo, descricao_curta, descricao_completa, categoria,
  preco_centavos, imagens, video_url, ativo, arquivo_json_url, arquivo_pdf_url
) VALUES (
  'nome-curto-unico-do-fluxo',              -- vira a URL: /loja/nome-curto-unico-do-fluxo
  'Título do Fluxo',
  'Uma frase que aparece no card do catálogo — o que o fluxo resolve.',
  'Parágrafo mais completo que aparece na página do produto: o que faz, como funciona, para quem serve.',
  'Vendas',                                  -- Vendas | Atendimento | Financeiro | Marketing | Produtividade
  4990,                                      -- preço em CENTAVOS — 4990 = R$ 49,90
  ARRAY['/loja/nome-curto-unico-do-fluxo-1.png', '/loja/nome-curto-unico-do-fluxo-2.png'],
  'https://www.youtube.com/watch?v=XXXXXXXXXXX',
  true,                                       -- false esconde o produto da loja sem apagar os dados
  'https://link-do-storage.com/.../fluxo.json',
  'https://link-do-storage.com/.../instrucoes.pdf'
);
```

Pontos de atenção:

- `slug` é a chave primária da tabela — precisa ser único, sem espaços/acentos.
- `preco_centavos` é sempre inteiro em centavos, e é esse valor que o `loja-criar-pedido` usa para validar o pedido (o preço nunca vem do navegador do cliente).
- `imagens` são os caminhos que você subiu no Passo 1, começando com `/loja/`.
- `arquivo_json_url` e `arquivo_pdf_url` são os links do Passo 3 — **nunca** apontar para dentro de `public/`. O endpoint `loja-listar-produtos` não deve devolver essas duas colunas para o site (só o workflow `loja-confirmar-pagamento` as lê, na hora de montar o e-mail de entrega).
- Para tirar um produto da loja sem apagar (ex: fora de estoque, promoção encerrada): `UPDATE produtos SET ativo = false WHERE slug = 'nome-curto-unico-do-fluxo';` — ele some do catálogo mas o histórico de pedidos antigos continua intacto.

## Passo 5 — Testar localmente antes de publicar

```
npm run dev
```

Acesse `http://localhost:5173/loja` e confira:

- [ ] O card do novo fluxo aparece no catálogo, na categoria certa
- [ ] O filtro por categoria funciona com o novo produto
- [ ] `http://localhost:5173/loja/seu-slug` mostra as imagens no carrossel, o vídeo tocando e a descrição completa
- [ ] "Adicionar ao carrinho" funciona e o preço no carrinho está certo
- [ ] "Finalizar Compra" → preencher nome/e-mail → o botão tenta redirecionar (vai falhar se o webhook n8n não estiver rodando localmente, mas não deve travar a página)

## Passo 6 — Publicar

Depois de validado localmente:

```
npm run build
```

Suba o conteúdo da pasta `dist/` (incluindo o `.htaccess`) via FTP/File Manager para a Hostinger, do mesmo jeito que já é feito hoje. Veja `docs/como-adicionar-fluxo.md` (este arquivo) sempre que precisar repetir o processo para um novo fluxo.
