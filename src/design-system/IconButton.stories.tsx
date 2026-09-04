import type { Meta, StoryObj } from "@storybook/react";
import { IconButton } from "../components/ui/icon-button";

const meta: Meta<typeof IconButton> = {
  title: "Components/IconButton",
  component: IconButton,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    variant: { control: "select", options: ["ghost", "destructive"] },
    size: { control: "select", options: ["md", "sm"] },
    state: { control: "select", options: ["default", "hover", "focus", "active", "disabled"] },
    notificationCount: { control: "number" },
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

/** Botão interativo — altere variant/state/notificationCount no painel de Controls. */
export const Default: Story = {
  args: { variant: "ghost", state: "default" },
};

/** Com tooltip — passe o mouse para ver o label aparecer abaixo do botão. */
export const WithTooltip: Story = {
  args: { notificationCount: 3, tooltip: "Notificações" },
};

/**
 * Os 5 estados do Figma (node 3027:24448): Default, Hover, Focus, Active,
 * Disabled — Active usa `:active` real (clique e segure), não é só uma
 * variante de Storybook.
 */
export const AllStates: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <IconButton state="default" />
      <IconButton state="hover" />
      <IconButton state="focus" />
      <IconButton state="active" />
      <IconButton state="disabled" />
    </div>
  ),
};

/** Type=Destructive (node 3027:24448) — mesmos 5 estados, cor danger-default/danger-hover. */
export const Destructive: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <IconButton variant="destructive" state="default" />
      <IconButton variant="destructive" state="hover" />
      <IconButton variant="destructive" state="focus" />
      <IconButton variant="destructive" state="active" />
      <IconButton variant="destructive" state="disabled" />
    </div>
  ),
};

/**
 * md (44px, default — header/notificação) vs sm (32px — exatamente o
 * "A. IconButton" do Figma, node 3027:24448, dependência do Form/AttachmentItem).
 */
export const Sizes: Story = {
  tags: ["!autodocs"],
  render: () => (
    <div className="flex items-center gap-4">
      <IconButton size="md" />
      <IconButton size="sm" />
    </div>
  ),
};

/**
 * Com badge de notificação — o ícone balança em loop (rotate keyframes extraídos
 * via Figma MCP/get_motion_context: 2s, infinito). Respeita prefers-reduced-motion.
 */
export const WithNotification: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <IconButton state="default" notificationCount={3} />
      <IconButton state="hover" notificationCount={3} />
    </div>
  ),
};
