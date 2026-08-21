---
name: component-sourcing
description: Define a fonte obrigatória de componentes de UI para qualquer tela nova do projeto Meca Automace. Use sempre que for necessário criar, escolher ou implementar um componente visual (formulário, card, modal, drawer, tabela, carrossel, etc).
---

# Component Sourcing Skill

## Quando usar esta skill

- Sempre que uma nova tela, seção ou componente visual precisar ser criado
- Antes de escrever HTML/JSX de um componente do zero
- Ao decidir como implementar um padrão de UI (carrinho, modal, carrossel, tabs, drawer, etc)
- Como guardrail permanente em qualquer tarefa de frontend deste projeto

## Como usar

### 1. Ordem de busca obrigatória

Antes de codificar qualquer componente do zero, consulte nesta ordem:

1. **https://ui.shadcn.com/** — buscar o componente base (ex: "sheet", "dialog", "form", "carousel")
2. **https://21st.dev/** — buscar variações e composições mais elaboradas do mesmo padrão (ex: "cart drawer", "product card", "pricing card", "checkout form")
3. **`src/components/ui/` já existente no projeto** — reaproveitar antes de duplicar (o projeto já tem: accordion, alert-dialog, avatar, badge, button, card, carousel, checkbox, collapsible, dialog, dropdown-menu, form, input, label, popover, progress, radio-group, scroll-area, select, separator, sheet, skeleton, slider, switch, table, tabs, textarea, toast, tooltip)

Só escrever um componente 100% do zero se nenhuma das três fontes acima resolver o caso.

### 2. Regra de instalação — ambiente mobile, sem terminal

Nunca usar `npx shadcn add` ou qualquer CLI. O ambiente de desenvolvimento é mobile-only (GitHub web editor / vscode.dev), sem acesso a terminal. O fluxo correto é:

1. Copiar o código-fonte do componente diretamente do site (shadcn/ui ou 21st.dev)
2. Colar em `src/components/ui/[nome-do-componente].tsx`
3. Ajustar os imports para o alias `@/` (ex: `@/lib/utils`, `@/components/ui/button`)
4. Instalar qualquer dependência nova do componente via `package.json` (o `npm install` roda no deploy da Vercel, não localmente)

### 3. Compatibilidade obrigatória com o design system existente

Todo componente copiado de shadcn/ui ou 21st.dev deve, antes de ser considerado pronto:

- Usar exclusivamente os tokens de tema já definidos em `globals.css` (`--primary`, `--accent`, `--background`, `--muted`, `--border`, etc) — nunca cores hardcoded tipo `#D97757` ou `bg-orange-500`
- Respeitar `--radius` (0.5rem) já configurado
- Usar `font-headline` (Space Grotesk) para títulos e `font-body` (Inter) para texto corrido — nunca outra fonte
- Ser baseado em Radix UI quando o componente original do shadcn usar Radix, mantendo consistência com os demais componentes do projeto (que já seguem esse padrão: Radix + `class-variance-authority` + `tailwind-merge`)

### 4. Quando NÃO seguir esse fluxo

- Componentes puramente decorativos ou de animação (partículas, gradientes, keyframes customizados como os já existentes em `globals.css`) podem ser escritos à mão
- Ícones sempre via `lucide-react` (já é dependência do projeto) — nunca SVG solto ou emoji

## Checklist antes de finalizar um componente

- [ ] Consultei shadcn/ui e/ou 21st.dev antes de escrever do zero?
- [ ] Reaproveitei um componente já existente em `src/components/ui/` em vez de duplicar?
- [ ] Usei os tokens de tema (`hsl(var(--...))`) em vez de cores fixas?
- [ ] O componente funciona em light e dark mode (as variáveis `.dark` já existem no projeto, mesmo que o toggle ainda não esteja em uso)?
- [ ] Testei responsividade mobile (breakpoints `sm`/`md`), já que boa parte do tráfego do site acessa pelo celular?
