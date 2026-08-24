import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Drawer } from "../components/ui/drawer";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";

const meta: Meta<typeof Drawer> = {
  title: "Components/Drawer",
  component: Drawer,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  argTypes: {
    side: { control: "select", options: ["left", "right"] },
    size: { control: "select", options: ["sm", "md", "lg", "xl"] },
  },
};

export default meta;
type Story = StoryObj<typeof Drawer>;

/** Wrapper padrão para as stories — controla `open` localmente e mostra o botão que dispara o Drawer. */
function DrawerDemo({
  children,
  buttonLabel = "Abrir Drawer",
  ...props
}: Omit<React.ComponentProps<typeof Drawer>, "open" | "onOpenChange" | "children"> & {
  children: React.ReactNode;
  buttonLabel?: string;
}) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="flex min-h-[480px] items-start p-6">
      <Button onClick={() => setOpen(true)}>{buttonLabel}</Button>
      <Drawer {...props} open={open} onOpenChange={setOpen}>
        {children}
      </Drawer>
    </div>
  );
}

/**
 * Drawer interativo — começa com `side="left"`. Abra, feche, troque `side`
 * para "right" no painel de Controls e abra de novo: o Drawer passa a
 * entrar pela direita imediatamente (o valor de `side` é lido a cada
 * render, não fica preso ao lado da primeira abertura).
 */
export const Default: Story = {
  args: { side: "left" },
  render: (args) => (
    <DrawerDemo {...args} title={args.title ?? "Título"}>
      <p className="text-sm text-[var(--color-text-secondary)]">Conteúdo do Drawer — qualquer composição pode ser passada aqui.</p>
    </DrawerDemo>
  ),
};

/** `side="left"` — fechado fora da viewport à esquerda, entra da esquerda para a direita. */
export const Left: Story = {
  render: () => (
    <DrawerDemo side="left" title="Filtrar por">
      <p className="text-sm text-[var(--color-text-secondary)]">Painel entrando pela esquerda.</p>
    </DrawerDemo>
  ),
};

/** `side="right"` — comportamento espelhado do left. */
export const Right: Story = {
  render: () => (
    <DrawerDemo side="right" title="Detalhes">
      <p className="text-sm text-[var(--color-text-secondary)]">Painel entrando pela direita.</p>
    </DrawerDemo>
  ),
};

/** Content longo — rola internamente (`overflow-y-auto`), Header e Footer permanecem fixos. `side="right"` para diversificar a demonstração (ver Introduction). */
export const WithLongContent: Story = {
  render: () => (
    <DrawerDemo side="right" title="Lista longa" footer={<Button className="w-full">Ação</Button>}>
      <div className="flex flex-col gap-3">
        {Array.from({ length: 30 }, (_, i) => (
          <p key={i} className="text-sm text-[var(--color-text-primary)]">
            Item {i + 1}
          </p>
        ))}
      </div>
    </DrawerDemo>
  ),
};

/** Com Footer — slot fixo no final do painel, útil para ações persistentes (ex: futuramente "Limpar filtro"). `side="right"`. */
export const WithFooter: Story = {
  render: () => (
    <DrawerDemo
      side="right"
      title="Com rodapé"
      footer={
        <div className="flex items-center justify-between gap-3">
          <Button variant="ghost">Ação secundária</Button>
          <Button>Ação principal</Button>
        </div>
      }
    >
      <p className="text-sm text-[var(--color-text-secondary)]">Conteúdo com rodapé fixo abaixo.</p>
    </DrawerDemo>
  ),
};

/** Sem Footer — `Content` ocupa o restante do painel, sem faixa extra no final. `side="left"`. */
export const WithoutFooter: Story = {
  render: () => (
    <DrawerDemo side="left" title="Sem rodapé">
      <p className="text-sm text-[var(--color-text-secondary)]">Sem rodapé — Content vai até o final do painel.</p>
    </DrawerDemo>
  ),
};

/** `showClose={false}` — sem botão X; ainda fecha por overlay/Escape. `side="right"`. */
export const WithoutCloseButton: Story = {
  render: () => (
    <DrawerDemo side="right" title="Sem botão de fechar" showClose={false}>
      <p className="text-sm text-[var(--color-text-secondary)]">
        Sem X no header — feche clicando no overlay ou pressionando Escape.
      </p>
    </DrawerDemo>
  ),
};

/** Alterne o tema no toolbar do Storybook (Light/Dark) — todas as cores usam tokens semantic. `side`/`size` controláveis via Controls. */
export const LightDark: Story = {
  args: { side: "left" },
  render: (args) => (
    <DrawerDemo {...args} title={args.title ?? "Light / Dark"} footer={<Button className="w-full">Ação</Button>}>
      <div className="flex flex-col gap-2">
        <p className="text-sm text-[var(--color-text-primary)]">Texto primário</p>
        <p className="text-sm text-[var(--color-text-secondary)]">Texto secundário</p>
        <Badge tone="info">Badge de exemplo</Badge>
      </div>
    </DrawerDemo>
  ),
};

/**
 * Viewport estreita/mobile — o painel usa `max-w-full`, nunca ultrapassa a
 * largura disponível nem gera overflow horizontal (redimensione a janela do
 * Storybook para conferir). `side` controlável via Controls; `size` fica
 * fixo em "lg" (480px) de propósito — é o cenário que prova que mesmo o
 * maior tamanho não estoura o container de 360px.
 */
export const Responsive: Story = {
  args: { side: "left" },
  render: (args) => (
    <div style={{ maxWidth: 360 }} className="border border-dashed border-[var(--color-border-strong)]">
      <DrawerDemo {...args} size="lg" title="Viewport estreita (360px)">
        <p className="text-sm text-[var(--color-text-secondary)]">
          Mesmo com `size="lg"` (480px), o painel não ultrapassa a largura do container/viewport.
        </p>
      </DrawerDemo>
    </div>
  ),
};

/**
 * Demonstra as 4 formas de fechar: botão "Abrir Drawer" abre; dentro dele, o
 * X fecha, clicar no overlay (fora do painel) fecha, e a tecla Escape fecha.
 * Clique DENTRO do painel não fecha. `side`/`size` controláveis via Controls
 * — útil para validar abrir→fechar→trocar lado→reabrir (ver seção 12 da
 * auditoria).
 */
export const Interaction: Story = {
  args: { side: "left" },
  render: (args) => (
    <DrawerDemo {...args} buttonLabel="Abrir Drawer" title={args.title ?? "Teste de interação"}>
      <p className="text-sm text-[var(--color-text-secondary)]">
        Teste: clique no X, clique fora (no overlay escurecido) ou pressione Escape — todos fecham. Clicar aqui dentro não fecha.
      </p>
    </DrawerDemo>
  ),
};

// Exemplo de composição de filtro real — ver Patterns/ComplaintFilterDrawer
// (`src/components/ui/complaint-filter-drawer.tsx`), que reaproveita este
// Drawer genérico para o filtro de reclamações fiel ao Figma (node
// 2676:3644). O Drawer em si continua sem conhecer conteúdo de domínio.
