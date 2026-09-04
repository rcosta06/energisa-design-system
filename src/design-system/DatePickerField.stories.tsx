import type { Meta, StoryObj } from "@storybook/react";
import { DatePickerField } from "../components/ui/datepicker-field";

const meta: Meta<typeof DatePickerField> = {
  title: "Components/DatePickerField",
  component: DatePickerField,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    mode: { control: "select", options: ["single", "range"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    label: { control: "text" },
    helperText: { control: "text" },
    required: { control: "boolean" },
    disabled: { control: "boolean" },
    error: { control: "boolean" },
    errorMessage: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof DatePickerField>;

/** Interativo — altere mode/size/estado no painel de Controls. */
export const Default: Story = {
  args: { label: "Data da Resposta", helperText: "Selecione uma data" },
};

/**
 * 30 variantes do Figma (node 3019:24051): Mode=Single|Range × Size=SM|MD|LG
 * × estados (Single: 7 — Default/Hover/Focus/Open/Filled/Disabled/Error;
 * Range: 3 — Default/Open/Filled, sem Disabled/Error no Figma).
 */
export const SingleAllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {(["sm", "md", "lg"] as const).map((size) => (
        <div key={size} className="flex flex-col gap-2">
          <span className="text-xs font-semibold text-[var(--color-text-secondary)]">Size={size.toUpperCase()}</span>
          <div className="flex flex-wrap gap-4">
            <DatePickerField size={size} label="Data" helperText="Selecione uma data" />
            <DatePickerField size={size} label="Data" open helperText="Selecione uma data" />
            <DatePickerField size={size} label="Data" value="03/09/2026" helperText="Selecione uma data" />
            <DatePickerField size={size} label="Data" disabled helperText="Selecione uma data" />
            <DatePickerField size={size} label="Data" error errorMessage="Campo obrigatório" />
          </div>
        </div>
      ))}
    </div>
  ),
};

/** Mode="range" — largura 480px, duas caixas ligadas por "→". */
export const Range: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <DatePickerField mode="range" label="Período" helperText="Selecione uma data" />
      <DatePickerField mode="range" label="Período" open helperText="Selecione uma data" />
      <DatePickerField mode="range" label="Período" startValue="03/09/2026" endValue="18/09/2026" helperText="Selecione uma data" />
    </div>
  ),
};
