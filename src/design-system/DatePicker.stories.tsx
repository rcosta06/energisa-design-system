import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DatePicker } from "../components/ui/datepicker";

const meta: Meta<typeof DatePicker> = {
  title: "Components/DatePicker",
  component: DatePicker,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

/**
 * Composto real — clique no campo pra abrir o calendário, navegue entre
 * meses, selecione um dia. Fecha ao selecionar ou ao clicar fora/Esc.
 */
export const Single: Story = {
  render: () => {
    function Demo() {
      const [value, setValue] = React.useState<Date | undefined>(new Date(2026, 8, 15));
      return <DatePicker label="Data da Resposta" helperText="Selecione uma data" value={value} onChange={setValue} />;
    }
    return <Demo />;
  },
};

/** Mode="range" — primeiro clique define o início, segundo define o fim e fecha. */
export const Range: Story = {
  render: () => {
    function Demo() {
      const [range, setRange] = React.useState<{ start: Date | undefined; end: Date | undefined }>({
        start: undefined,
        end: undefined,
      });
      return (
        <DatePicker
          mode="range"
          label="Período de Análise"
          helperText="Selecione o período"
          rangeStart={range.start}
          rangeEnd={range.end}
          onRangeChange={setRange}
        />
      );
    }
    return <Demo />;
  },
};

/** Com erro — borda vermelha, sem abrir popover enquanto desabilitado seria o caso de uso comum. */
export const WithError: Story = {
  render: () => <DatePicker label="Data da Resposta" error errorMessage="Campo obrigatório" />,
};

/** Tamanhos SM/MD/LG lado a lado. */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-end gap-4">
      <DatePicker size="sm" label="SM" />
      <DatePicker size="md" label="MD" />
      <DatePicker size="lg" label="LG" />
    </div>
  ),
};
