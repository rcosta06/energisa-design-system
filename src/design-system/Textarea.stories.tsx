import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "../components/ui/textarea";

const meta: Meta<typeof Textarea> = {
  title: "Components/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    placeholder: { control: "text" },
    error: { control: "boolean" },
    errorMessage: { control: "text" },
    helperText: { control: "text" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

/** Interativo — altere placeholder/error/helperText/disabled no painel de Controls. */
export const Default: Story = {
  args: { placeholder: "Placeholder", helperText: "Helper text" },
  render: (args) => <Textarea {...args} className="w-[280px]" />,
};

/** Os 6 estados do Figma (node 3020:25938): Default/Hover/Focus/Filled/Disabled/Error — tamanho único (sem SM/MD/LG). */
export const AllStates: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <div className="flex flex-col items-center gap-2">
        <Textarea placeholder="Placeholder" helperText="Helper text" className="w-[280px]" />
        <span className="text-xs text-[var(--color-text-secondary)]">Default</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Textarea defaultValue="Value" helperText="Helper text" className="w-[280px]" />
        <span className="text-xs text-[var(--color-text-secondary)]">Filled</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Textarea placeholder="Placeholder" disabled helperText="Helper text" className="w-[280px]" />
        <span className="text-xs text-[var(--color-text-secondary)]">Disabled</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Textarea placeholder="Placeholder" error errorMessage="Error message" className="w-[280px]" />
        <span className="text-xs text-[var(--color-text-secondary)]">Error</span>
      </div>
    </div>
  ),
};
