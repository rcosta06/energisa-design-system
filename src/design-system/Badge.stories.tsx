import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "../components/ui/badge";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    tone: {
      control: "select",
      options: ["info", "danger", "success", "warning", "neutral", "purple", "orange", "solid"],
    },
    shape: {
      control: "select",
      options: ["pill", "rounded"],
    },
    bgOpacity: {
      control: "select",
      options: [8, 10, 12, 15],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

/** Badge interativo — altere tone/shape/bgOpacity no painel de Controls. */
export const Default: Story = {
  args: { tone: "info", shape: "pill", bgOpacity: 10, children: "Em Tratativa" },
};

/** Todas as combinações de tone × shape lado a lado. */
export const AllTones: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        {(["info", "danger", "success", "warning", "neutral", "purple", "orange", "solid"] as const).map((tone) => (
          <Badge key={tone} tone={tone} shape="pill">{tone}</Badge>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        {(["info", "danger", "success", "warning", "neutral", "purple", "orange", "solid"] as const).map((tone) => (
          <Badge key={tone} tone={tone} shape="rounded">{tone}</Badge>
        ))}
      </div>
    </div>
  ),
};

/**
 * Uso real — badges de Level, Priority e Status como aparecem no ComplaintCard/
 * List/Kanban. Contraste atualizado conforme Figma (node 2505:1523/1533/1555):
 * bg a 15% (Level/Priority) ou 12% (Status), borda cromática de 1px a 30% no
 * mesmo tom, e texto em uma cor mais forte que o tom do bg/borda (ex: N3 usa
 * `danger-strong`, não `danger-default`).
 */
export const ComplaintUsage: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="w-20 text-xs text-[var(--color-text-secondary)]">Level</span>
        <Badge tone="info" shape="rounded" bgOpacity={15}>N1</Badge>
        <Badge tone="warning" shape="rounded" bgOpacity={15}>N2</Badge>
        <Badge tone="danger" shape="rounded" bgOpacity={15}>N3</Badge>
        <Badge tone="purple" shape="rounded" bgOpacity={15}>Consumidor.gov</Badge>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="w-20 text-xs text-[var(--color-text-secondary)]">Priority</span>
        <Badge tone="danger" bgOpacity={15}>Alta</Badge>
        <Badge tone="warning" bgOpacity={15}>Média</Badge>
        <Badge tone="success" bgOpacity={15}>Baixa</Badge>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="w-20 text-xs text-[var(--color-text-secondary)]">Status</span>
        <Badge tone="neutral" bgOpacity={12}>Não Atribuído</Badge>
        <Badge tone="info" bgOpacity={12}>Em Tratativa</Badge>
        <Badge tone="warning" bgOpacity={12}>Em Subsídio</Badge>
        <Badge tone="orange" bgOpacity={12}>Em Resposta</Badge>
        <Badge tone="success" bgOpacity={12}>Respondida</Badge>
        <Badge tone="purple" bgOpacity={12}>Análise de Causa</Badge>
        <Badge tone="success" bgOpacity={12}>Finalizado</Badge>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="w-20 text-xs text-[var(--color-text-secondary)]">Segmento</span>
        <Badge tone="solid" shape="rounded">Residencial</Badge>
      </div>
    </div>
  ),
};
