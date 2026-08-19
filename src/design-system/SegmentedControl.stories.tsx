import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { List, LayoutGrid, Table } from "lucide-react";
import { SegmentedControl } from "../components/ui/segmented-control";

const meta: Meta<typeof SegmentedControl> = {
  title: "Components/SegmentedControl",
  component: SegmentedControl,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    size: { control: "select", options: ["lg", "md", "sm"] },
  },
};

export default meta;
type Story = StoryObj<typeof SegmentedControl>;

const items = [
  { value: "lista", icon: <List className="size-full" />, label: "Lista" },
  { value: "cards", icon: <LayoutGrid className="size-full" />, label: "Cards" },
  { value: "tabela", icon: <Table className="size-full" />, label: "Tabela" },
];

/** Controle segmentado interativo — clique para alternar a seleção. Altere `size` no painel de Controls. */
export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState("lista");
    return <SegmentedControl {...args} items={items} value={value} onValueChange={setValue} />;
  },
  args: { size: "lg" },
};

/** Os 3 tamanhos do Figma (LG 44px / MD 36px / SM 28px) — texto sempre 14px, só padding/altura/ícone mudam. */
export const AllSizes: Story = {
  render: () => {
    const [value, setValue] = useState("lista");
    return (
      <div className="flex flex-col items-start gap-4">
        <SegmentedControl items={items} value={value} onValueChange={setValue} size="lg" />
        <SegmentedControl items={items} value={value} onValueChange={setValue} size="md" />
        <SegmentedControl items={items} value={value} onValueChange={setValue} size="sm" />
      </div>
    );
  },
};

/** Item desabilitado — não responde a clique/hover. */
export const WithDisabledItem: Story = {
  render: () => {
    const [value, setValue] = useState("lista");
    return (
      <SegmentedControl
        items={[items[0], { ...items[1], disabled: true }, items[2]]}
        value={value}
        onValueChange={setValue}
      />
    );
  },
};
