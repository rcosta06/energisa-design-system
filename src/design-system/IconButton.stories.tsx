import type { Meta, StoryObj } from "@storybook/react";
import { IconButton } from "../components/ui/icon-button";

const meta: Meta<typeof IconButton> = {
  title: "Components/IconButton",
  component: IconButton,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    state: { control: "select", options: ["default", "hover", "focus", "disabled"] },
    notificationCount: { control: "number" },
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

/** Botão interativo — altere state/notificationCount no painel de Controls. */
export const Default: Story = {
  args: { state: "default" },
};

/** Com tooltip — passe o mouse para ver o label aparecer abaixo do botão. */
export const WithTooltip: Story = {
  args: { notificationCount: 3, tooltip: "Notificações" },
};

/** Os 4 estados de interação: Default, Hover, Focus, Disabled. */
export const AllStates: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <IconButton state="default" />
      <IconButton state="hover" />
      <IconButton state="focus" />
      <IconButton state="disabled" />
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
