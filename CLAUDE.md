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

## Regra: ícones do Figma têm prioridade sobre a lucide-react

A biblioteca de ícones do projeto é lucide-react — mas quando um componente do Figma usa um
ícone (geralmente Phosphor, via o componente "Icones" do arquivo) que **não existe** na
lucide-react com a mesma geometria, nunca substituir por um ícone "parecido":

1. Baixar o SVG exato exportado pelo Figma MCP (path/viewBox originais).
2. Criar um componente em `src/components/ui/icons/<nome-do-asset>.tsx` (nome igual ao do
   Figma), `fill="currentColor"` para poder ser recolorido como qualquer ícone lucide.
3. Confirmar a cor real via `get_variable_defs` e, se vazio, via leitura direta do fill no
   Plugin API (`use_figma`) — nunca assumir um token semântico "parecido" (ex: warning/danger)
   sem confirmação. **Cheque mais de uma instância/variante do mesmo ícone antes de concluir** —
   já aconteceu de uma variante ter a variável vinculada e outra (mesmo ícone, outro
   level/state) não ter, por inconsistência de quem editou o Figma; nesse caso a variante COM
   variável é a fonte de verdade. Se nenhuma instância tiver variável (fill cru mesmo), aí sim
   usar o valor literal no local de uso, não no componente do ícone.
4. Só então usar esse ícone no componente que precisa dele.

Antes de criar, sempre conferir se o mesmo asset já não foi incorporado por outro componente.
