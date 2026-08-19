import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { List, LayoutGrid, Table } from "lucide-react";
import { SegmentedControl } from "../components/ui/segmented-control";

const meta: Meta<typeof SegmentedControl> = {
  title: "Components/SegmentedControl",
  component: SegmentedControl,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof SegmentedControl>;

const items = [
  { value: "lista", icon: <List className="size-6" />, label: "Lista" },
  { value: "cards", icon: <LayoutGrid className="size-6" />, label: "Cards" },
  { value: "tabela", icon: <Table className="size-6" />, label: "Tabela" },
];

/** Controle segmentado interativo — clique para alternar a seleção. */
export const Default: Story = {
  render: () => {
    const [value, setValue] = useState("lista");
    return <SegmentedControl items={items} value={value} onValueChange={setValue} />;
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
