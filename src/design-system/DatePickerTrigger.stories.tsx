import type { Meta, StoryObj } from "@storybook/react";
import { DatePickerTrigger } from "../components/ui/datepicker-trigger";

const meta: Meta<typeof DatePickerTrigger> = {
  title: "Components/DatePickerTrigger",
  component: DatePickerTrigger,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    value: { control: "text" },
    placeholder: { control: "text" },
    open: { control: "boolean" },
    error: { control: "boolean" },
    errorMessage: { control: "text" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof DatePickerTrigger>;

/** Interativo — foco real via teclado/clique aciona o visual de Focus. */
export const Default: Story = {
  args: {},
};

/**
 * Os 7 estados do Figma (node 3019:23929): Default, Hover, Focus, Open,
 * Filled, Disabled, Error. Hover é visualmente idêntico a Default no
 * Figma (sem feedback de hover) — preservado literalmente, não
 * "melhorado". Disabled não usa opacity (diferente de Input/Textarea).
 */
export const AllStates: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <div className="flex flex-col items-center gap-2">
        <DatePickerTrigger />
        <span className="text-xs text-[var(--color-text-secondary)]">Default</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <DatePickerTrigger />
        <span className="text-xs text-[var(--color-text-secondary)]">Hover (= Default no Figma)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <DatePickerTrigger open />
        <span className="text-xs text-[var(--color-text-secondary)]">Focus / Open</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <DatePickerTrigger value="03/09/2026" />
        <span className="text-xs text-[var(--color-text-secondary)]">Filled</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <DatePickerTrigger disabled />
        <span className="text-xs text-[var(--color-text-secondary)]">Disabled</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <DatePickerTrigger error errorMessage="Campo obrigatório" />
        <span className="text-xs text-[var(--color-text-secondary)]">Error</span>
      </div>
    </div>
  ),
};
