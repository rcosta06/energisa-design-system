import type { Meta, StoryObj } from "@storybook/react";
import { ThemeToggle } from "../components/ui/theme-toggle";

const meta: Meta<typeof ThemeToggle> = {
  title: "Components/ThemeToggle",
  component: ThemeToggle,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    theme: { control: "select", options: ["light", "dark"] },
    state: { control: "select", options: ["default", "hover"] },
  },
};

export default meta;
type Story = StoryObj<typeof ThemeToggle>;

/** Toggle interativo — altere theme/state no painel de Controls. */
export const Default: Story = {
  args: { theme: "light", state: "default" },
};

/** Com tooltip — passe o mouse para ver o label aparecer abaixo do botão. */
export const WithTooltip: Story = {
  args: { theme: "light", tooltip: "Ativar modo escuro" },
};

/** Light × Dark, Default × Hover — as 4 combinações do Figma. */
export const AllVariants: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <ThemeToggle theme="light" state="default" />
      <ThemeToggle theme="light" state="hover" />
      <ThemeToggle theme="dark" state="default" />
      <ThemeToggle theme="dark" state="hover" />
    </div>
  ),
};
