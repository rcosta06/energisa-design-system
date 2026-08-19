# Energisa Design System

Design System enterprise-grade da Energisa — Figma + Tailwind v4 + shadcn/ui + Storybook.

## Stack

- **Componentes**: Tailwind v4 + padrões shadcn/ui (`cva`, `cn`, Radix primitives) em `src/components/ui/`
- **Storybook**: documentação viva dos componentes em `src/design-system/`
- **Site**: app Vite/React em `src/App.tsx` (entry: `index.html` → `src/main.tsx`), consumindo os componentes de `src/components/ui/`
- **Tokens**: `src/styles/tokens.css` — fonte única de cores/spacing/radius/type (ver regra de ouro no Introduction.mdx)

## Regra: Storybook é a base da verdade

O site nunca usa um componente que não esteja documentado no Storybook primeiro. Fluxo obrigatório
ao criar ou alterar qualquer componente:

1. Implementar/editar o componente em `src/components/ui/`, consumindo só tokens semantic
   (`var(--color-*)`, `var(--radius-*)`, etc. — nunca hex ou valor cru).
2. Criar/atualizar o `.stories.tsx` correspondente em `src/design-system/` cobrindo variantes,
   tamanhos e estados principais.
3. Atualizar `src/design-system/Introduction.mdx` — marcar o item no "Roadmap de componentes" e,
   se for um componente novo (não só uma variante), adicionar uma linha descrevendo-o.
4. Só então consumir o componente no site (`src/App.tsx` / futuras páginas).

Nunca pular os passos 2–3 "pra economizar tempo" — um componente sem story é considerado
não-existente para efeito de uso no site.
