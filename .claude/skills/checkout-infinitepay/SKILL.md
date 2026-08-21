---
name: checkout-infinitepay
description: Contrato técnico exato da integração com o Checkout Integrado da InfinitePay — criação de link de pagamento e validação do webhook de confirmação. Use sempre que for implementar ou revisar código que crie pedidos, gere links de pagamento ou receba confirmações de pagamento da InfinitePay.
---

# Checkout InfinitePay — Skill de Integração

## Quando usar esta skill

- Ao implementar o endpoint que cria o link de pagamento
- Ao implementar o endpoint/workflow que recebe o webhook de confirmação de pagamento
- Ao debugar um pedido que não confirmou pagamento
- Ao decidir onde armazenar o handle (InfiniteTag) e a URL de webhook

## Como usar

### 1. Pré-requisito na conta InfinitePay

O Checkout Integrado precisa estar habilitado manualmente: App InfinitePay → Vendas → Checkout → Configurações → Habilitar Checkout Integrado (ou pelo painel web equivalente). Sem isso, a API não gera links.

### 2. Criar o link de pagamento

```
POST https://api.checkout.infinitepay.io/links
Content-Type: application/json

{
  "handle": "<sua_infinite_tag_sem_o_$>",
  "redirect_url": "https://mecaautomace.com.br/loja/obrigado?pedido={order_nsu}",
  "webhook_url": "<endpoint que recebe a confirmação — ver seção 4>",
  "order_nsu": "<uuid gerado pelo seu sistema>",
  "items": [
    { "quantity": 1, "price": 4990, "description": "Fluxo: Qualificação de Leads no WhatsApp" }
  ]
}
```

Resposta:

```json
{ "url": "https://checkout.infinitepay.com.br/..." }
```

Pontos que não podem ser ignorados:

- `price` é sempre em **centavos** (4990 = R$ 49,90)
- `order_nsu` deve ser gerado pelo seu próprio sistema (nunca deixar a InfinitePay gerar) — é a chave que liga o pedido salvo no Postgres à confirmação recebida no webhook
- Redirecionar o navegador do cliente para a `url` retornada assim que a resposta chegar

### 3. Nunca fazer essa chamada a partir do frontend

Essa chamada é sempre feita a partir de um endpoint próprio (serverless function ou node HTTP Request do n8n), nunca do navegador do cliente — evita manipulação do preço ou dos itens pelo comprador antes do pagamento.

### 4. Receber a confirmação (webhook)

A InfinitePay faz `POST` no `webhook_url` informado na criação do link, já com o pagamento processado:

```json
{
  "invoice_slug": "abc123",
  "amount": 4990,
  "paid_amount": 4990,
  "installments": 1,
  "capture_method": "pix",
  "transaction_nsu": "uuid-da-transacao",
  "order_nsu": "uuid-do-pedido-que-voce-gerou",
  "receipt_url": "https://comprovante...",
  "items": [{ "quantity": 1, "price": 4990, "description": "..." }]
}
```

**Validações obrigatórias antes de liberar a entrega:**

- [ ] `order_nsu` existe no Postgres e está com status `pendente` (nunca confiar em um `order_nsu` desconhecido)
- [ ] `paid_amount` é igual ou maior que o total esperado do pedido
- [ ] O pedido ainda não foi processado antes (idempotência — ver seção 5)

**Resposta obrigatória:**

- Responder **200 OK em menos de 1 segundo**. No n8n, ativar "Respond Immediately" no node de Webhook e processar o envio do e-mail nos steps seguintes, fora do caminho crítico da resposta
- Se a resposta vier com erro (ex: 400), a InfinitePay tenta reenviar o webhook — isso é comportamento esperado de retry, não um bug a corrigir

### 5. Idempotência — o webhook pode chegar mais de uma vez

Antes de processar qualquer confirmação, checar se o pedido já está `pago`. Se já estiver, responder 200 OK e não reenviar o e-mail — evita duplicar a entrega em caso de reenvio do webhook pela InfinitePay.

### 6. Fallback de consulta manual

Além do webhook, a InfinitePay expõe consulta de status de transação por API — use como plano B (ex: um job periódico no n8n que verifica pedidos `pendente` há mais de X minutos e confirma manualmente), nunca como caminho principal de confirmação.

## Checklist antes de subir a integração

- [ ] O Checkout Integrado está habilitado na conta InfinitePay?
- [ ] `order_nsu` é gerado pelo seu sistema, não pela InfinitePay?
- [ ] O preço enviado está em centavos?
- [ ] O endpoint de criação do link nunca é chamado direto do navegador?
- [ ] O webhook responde 200 OK rapidamente e processa o e-mail de forma assíncrona?
- [ ] Existe checagem de idempotência (pedido já pago não reprocessa)?
- [ ] Existe validação de `paid_amount` contra o valor esperado do pedido?
