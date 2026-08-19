import type { Meta, StoryObj } from "@storybook/react";
import { NavigationItem } from "../components/ui/navigation-item";

const meta: Meta<typeof NavigationItem> = {
  title: "Components/NavigationItem",
  component: NavigationItem,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  argTypes: {
    mode: { control: "select", options: ["expanded", "collapsed"] },
    state: { control: "select", options: ["default", "hover", "active", "disabled"] },
    hasSubmenu: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof NavigationItem>;

/** Item interativo — altere mode/state/hasSubmenu no painel de Controls. */
export const Default: Story = {
  args: { label: "Dashboard", mode: "expanded", state: "default" },
};

/** Os 4 estados (Default/Hover/Active/Disabled), modo Expanded. */
export const AllStates: Story = {
  render: () => (
    <div className="flex w-[216px] flex-col gap-2">
      <NavigationItem label="Default" state="default" />
      <NavigationItem label="Hover" state="hover" />
      <NavigationItem label="Active" state="active" />
      <NavigationItem label="Disabled" state="disabled" />
    </div>
  ),
};

/** Os mesmos 4 estados no modo Collapsed (ícone apenas). */
export const AllStatesCollapsed: Story = {
  render: () => (
    <div className="flex gap-2">
      <NavigationItem label="Default" mode="collapsed" state="default" />
      <NavigationItem label="Hover" mode="collapsed" state="hover" />
      <NavigationItem label="Active" mode="collapsed" state="active" />
      <NavigationItem label="Disabled" mode="collapsed" state="disabled" />
    </div>
  ),
};

/** Item com submenu (seta "›") — só aparece no modo Expanded. */
export const WithSubmenu: Story = {
  args: { label: "Departments", mode: "expanded", hasSubmenu: true },
};
