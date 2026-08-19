import type { Meta, StoryObj } from "@storybook/react";
import { NavigationSearch } from "../components/ui/navigation-search";

const meta: Meta<typeof NavigationSearch> = {
  title: "Components/NavigationSearch",
  component: NavigationSearch,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    mode: { control: "select", options: ["expanded", "collapsed"] },
  },
};

export default meta;
type Story = StoryObj<typeof NavigationSearch>;

/** Campo interativo — altere mode/placeholder no painel de Controls. */
export const Default: Story = {
  args: { mode: "expanded", placeholder: "Buscar..." },
};

/** Expanded (campo completo) vs. Collapsed (apenas ícone). */
export const AllModes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <NavigationSearch mode="expanded" />
      <NavigationSearch mode="collapsed" />
    </div>
  ),
};
