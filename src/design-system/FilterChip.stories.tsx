import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { FilterChip } from "../components/ui/filter-chip";

const meta: Meta<typeof FilterChip> = {
  title: "Components/FilterChip",
  component: FilterChip,
  tags: ["autodocs"],
  argTypes: {
    selected: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof FilterChip>;

export const Default: Story = {
  args: { label: "Alta" },
};

export const Selected: Story = {
  args: { label: "Alta", selected: true },
};

/** Grupo de toggle multi-select — cada chip alterna seu próprio estado ao clicar, sem exclusividade entre eles. */
export const Group: Story = {
  render: () => {
    function Demo() {
      const [selected, setSelected] = React.useState<string[]>(["n1"]);
      const options = [
        { value: "n1", label: "N1" },
        { value: "n2", label: "N2" },
        { value: "n3", label: "N3" },
        { value: "external", label: "Consumidor.gov" },
      ];
      return (
        <div className="flex gap-4 p-6">
          {options.map((option) => (
            <FilterChip
              key={option.value}
              label={option.label}
              selected={selected.includes(option.value)}
              onClick={() =>
                setSelected((prev) =>
                  prev.includes(option.value) ? prev.filter((v) => v !== option.value) : [...prev, option.value]
                )
              }
            />
          ))}
        </div>
      );
    }
    return <Demo />;
  },
};
