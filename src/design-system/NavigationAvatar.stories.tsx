import type { Meta, StoryObj } from "@storybook/react";
import { NavigationAvatar } from "../components/ui/navigation-avatar";

const meta: Meta<typeof NavigationAvatar> = {
  title: "Components/NavigationAvatar",
  component: NavigationAvatar,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    mode: { control: "select", options: ["expanded", "collapsed"] },
    state: { control: "select", options: ["default", "hover"] },
  },
};

export default meta;
type Story = StoryObj<typeof NavigationAvatar>;

/** Bloco interativo — altere mode/state/userName/role no painel de Controls. */
export const Default: Story = {
  args: { mode: "expanded", state: "default", userName: "Eren", role: "Designer" },
};

/** Expanded × Collapsed, Default × Hover — as 4 combinações do Figma. */
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <NavigationAvatar mode="expanded" state="default" />
      <NavigationAvatar mode="expanded" state="hover" />
      <div className="flex gap-3">
        <NavigationAvatar mode="collapsed" state="default" />
        <NavigationAvatar mode="collapsed" state="hover" />
      </div>
    </div>
  ),
};
