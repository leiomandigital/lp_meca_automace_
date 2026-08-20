---
name: loja-fluxos-n8n
description: Define as regras de negócio e a arquitetura funcional da loja virtual de fluxos de automação n8n dentro do site institucional da Meca Automace. Use sempre que for implementar, revisar ou estender qualquer parte do catálogo, carrinho, checkout ou entrega digital pós-venda.
---

# Loja de Fluxos n8n — Skill de Domínio

## Quando usar esta skill

- Ao implementar qualquer página, componente, hook ou service relacionado à loja (`/loja`)
- Ao criar ou editar um produto (fluxo n8n) do catálogo
- Ao mexer no carrinho, no checkout ou na entrega pós-compra
- Ao planejar ou alterar o schema do banco Postgres de pedidos
- Sempre em conjunto com `senior-development-excellence` (camadas Services/Hooks/Components) e `component-sourcing` (fonte de UI)

## Como usar

### 1. O que é o "produto" desta loja

Cada item vendido é um **fluxo de automação n8n**. Um produto tem obrigatoriamente:

- Título e descrição curta (o que o fluxo resolve e para quem serve)
- Preço em centavos (nunca float — evita erro de arredondamento)
- 1 a N imagens (prints do fluxo funcionando no n8n / do resultado gerado)
- 1 vídeo demonstrativo (YouTube não-listado ou mp4 hospedado)
- Arquivo `.json` do fluxo (exportação nativa do n8n) — **entregue somente após pagamento aprovado**
- 1 PDF explicativo (como importar no n8n, pré-requisitos, credenciais e nodes necessários) — **entregue somente após pagamento aprovado**
- Categoria (ex: Vendas, Atendimento, Financeiro, Marketing, Produtividade)

O `.json` do fluxo e o PDF nunca podem ser acessíveis publicamente ou antes da confirmação de pagamento — eles são o produto. Se o link for previsível ou público, a venda perde o valor.

### 2. Catálogo — fonte dos dados

Para o MVP, o catálogo vive como dado versionado no próprio código (ex: `src/data/produtos.ts`), não em CRUD de admin. Justificativa: poucos produtos, cadência baixa de lançamento, e o time já edita tudo via GitHub web editor — um array tipado é mais simples que um painel admin agora. Um CMS/admin com upload próprio fica como evolução de fase 2, só se o catálogo crescer o suficiente para justificar.

Imagens e vídeos ficam em `/public/loja/` (imagens leves) ou em storage externo para arquivos maiores — o mesmo padrão de Google Drive já usado em outros projetos do portfólio pode ser reaproveitado se o volume de mídia crescer.

### 3. Carrinho

- Estado 100% client-side: Context + `useReducer`, persistido em `localStorage` para sobreviver a reload de página
- Cada fluxo é uma licença por unidade — no MVP, trave a quantidade em 1 por item no carrinho (evita ambiguidade sobre "licença múltipla"; revisitar só se surgir demanda real)
- O carrinho é acessível de qualquer página do site a partir de um ícone no `Header` (com contador de itens), abrindo um `Sheet` (drawer lateral) — reaproveitando o mesmo padrão já usado no menu mobile do `Header` atual

### 4. Checkout — regra de ouro

O checkout nunca fala diretamente com a InfinitePay a partir do navegador do cliente. O fluxo é sempre:

1. Frontend envia o carrinho (itens, e-mail e nome do comprador) para um endpoint próprio
2. Esse endpoint cria um pedido com status `pendente` no Postgres, com um `order_nsu` único
3. Esse endpoint chama a API da InfinitePay e recebe a URL de checkout
4. O frontend redireciona o navegador do cliente para essa URL

Consulte a skill `checkout-infinitepay` para o contrato técnico exato dessa integração.

### 5. Entrega digital pós-venda

A entrega só acontece depois que a InfinitePay confirma o pagamento via webhook — nunca no clique de "comprar", nunca na página de retorno (`redirect_url`). A página de retorno é só UX (confirma visualmente para o cliente), não é confirmação de pagamento.

Ao confirmar o pagamento:

1. Atualizar o pedido para `pago` no Postgres
2. Para cada item do pedido, montar um e-mail transacional para o e-mail do comprador contendo o(s) `.json` do(s) fluxo(s) comprado(s) e o(s) PDF(s) explicativo(s), em anexo
3. Responder 200 OK à InfinitePay o mais rápido possível — processar o envio do e-mail depois, sem bloquear a resposta do webhook

### 6. Pedidos pendentes são dado de remarketing

Todo pedido criado no passo 2 do checkout (mesmo sem pagamento confirmado ainda) deve ser salvo no Postgres com status `pendente`. Isso viabiliza:

- Campanhas de carrinho abandonado (pedido `pendente` há mais de X horas)
- Segmentação por fluxo comprado (quem comprou X pode ter interesse em Y)

Esse dado é uso interno do próprio negócio — nunca repassar ou vender para terceiros.

### 7. Fora de escopo do MVP

- Emissão automática de nota fiscal (NF-e/NFS-e) — usar apenas o comprovante gerado pela InfinitePay
- Painel administrativo de produtos (CRUD visual) — catálogo via código, ver seção 2
- Cupons de desconto, parcelamento customizado, múltiplas moedas
- Área logada de "minhas compras" — a entrega é só por e-mail no MVP

## Árvore de decisão

```
Nova tarefa na loja?
    │
É sobre catálogo/produto?
    ├─ SIM → seguir regra de "produto" (seção 1) + fonte de dados (seção 2)
    └─ NÃO →
É sobre carrinho?
    ├─ SIM → seguir regra de carrinho (seção 3): Context + useReducer + localStorage
    └─ NÃO →
É sobre pagamento/checkout?
    ├─ SIM → seguir "checkout — regra de ouro" (seção 4) + skill checkout-infinitepay
    └─ NÃO →
É sobre envio do fluxo comprado?
    ├─ SIM → seguir "entrega digital pós-venda" (seção 5), nunca antes da confirmação
    └─ NÃO → aplicar senior-development-excellence normalmente
```

## Checklist antes de finalizar qualquer entrega da loja

- [ ] O `.json` e o PDF do fluxo estão inacessíveis antes da confirmação de pagamento?
- [ ] O pedido foi salvo como `pendente` ANTES do redirecionamento para a InfinitePay?
- [ ] A confirmação de pagamento vem exclusivamente do webhook, nunca do `redirect_url`?
- [ ] O layout reaproveita os componentes e tokens do site institucional (ver `component-sourcing`)?
- [ ] Services, Hooks e Components estão separados conforme `senior-development-excellence`?
