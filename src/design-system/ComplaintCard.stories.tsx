import type { Meta, StoryObj } from "@storybook/react";
import { ComplaintCard } from "../components/ui/complaint-card";

const meta: Meta<typeof ComplaintCard> = {
  title: "Components/ComplaintCard",
  component: ComplaintCard,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    level: { control: "select", options: ["N1", "N2", "N3", "External"] },
    priority: { control: "select", options: ["high", "medium", "low"] },
    status: {
      control: "select",
      options: [
        "Não Atribuído",
        "Em Tratativa",
        "Em Subsídio",
        "Em Resposta",
        "Respondida",
        "Análise de Causa",
        "Finalizado",
      ],
    },
    state: { control: "select", options: ["default", "hover"] },
  },
};

export default meta;
type Story = StoryObj<typeof ComplaintCard>;

const baseArgs = {
  number: "SIATT-2026-004821",
  typology: "Pagamento / Inadimplência",
  description: "Religação não realizada após pagamento",
  level: "N1" as const,
  status: "Em Tratativa" as const,
  state: "default" as const,
  priority: "high" as const,
  segment: "Residencial",
  metadata: "Energisa Acre · aberta em 12/08/2026",
  responsible: "Ana Ribeiro",
  responsibleInitials: "AR",
  sla: "vence hoje",
};

/** Card interativo — altere qualquer prop no painel de Controls. */
export const Default: Story = { args: baseArgs };

/** Um card por nível — a barra de destaque e o badge de nível mudam de cor. */
export const AllLevels: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <ComplaintCard {...baseArgs} level="N1" />
      <ComplaintCard {...baseArgs} level="N2" />
      <ComplaintCard {...baseArgs} level="N3" />
      <ComplaintCard {...baseArgs} level="External" />
    </div>
  ),
};

/** Todos os 7 status — cada um com seu próprio tom de badge. */
export const AllStatuses: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <ComplaintCard {...baseArgs} status="Não Atribuído" />
      <ComplaintCard {...baseArgs} status="Em Tratativa" />
      <ComplaintCard {...baseArgs} status="Em Subsídio" />
      <ComplaintCard {...baseArgs} status="Em Resposta" />
      <ComplaintCard {...baseArgs} status="Respondida" />
      <ComplaintCard {...baseArgs} status="Análise de Causa" />
      <ComplaintCard {...baseArgs} status="Finalizado" />
    </div>
  ),
};

/** Estado hover forçado — borda mais forte e sombra elevada. */
export const Hover: Story = {
  args: { ...baseArgs, state: "hover" },
};

/** Grid de cards — como aparece na listagem de reclamações do site. */
export const Grid: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <ComplaintCard {...baseArgs} />
      <ComplaintCard {...baseArgs} priority="medium" level="N2" status="Em Subsídio" />
      <ComplaintCard {...baseArgs} priority="low" level="N3" status="Respondida" sla="3 dias restantes" />
      <ComplaintCard {...baseArgs} level="External" status="Finalizado" priority="low" sla="concluído" />
    </div>
  ),
};
