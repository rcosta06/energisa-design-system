import type { Meta, StoryObj } from "@storybook/react";
import { NavigationTooltip } from "../components/ui/navigation-tooltip";

const meta: Meta<typeof NavigationTooltip> = {
  title: "Components/NavigationTooltip",
  component: NavigationTooltip,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof NavigationTooltip>;

/** Tooltip interativo — altere o label no painel de Controls. */
export const Default: Story = {
  args: { label: "Dashboard" },
};
