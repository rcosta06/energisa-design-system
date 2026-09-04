import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "../components/ui/checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    label: { control: "text" },
    checked: { control: "boolean" },
    indeterminate: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

/** Interativo — altere label/checked/indeterminate/disabled no painel de Controls. */
export const Default: Story = {
  args: { label: "Label", checked: false },
  render: (args) => {
    function Demo() {
      const [checked, setChecked] = React.useState(args.checked ?? false);
      return <Checkbox {...args} checked={checked} onChange={(e) => setChecked(e.target.checked)} />;
    }
    return <Demo />;
  },
};

/** As 6 variantes do Figma (node 3020:25988): Unchecked/Checked/Indeterminate × Disabled. */
export const AllStates: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-x-8 gap-y-4">
      <Checkbox label="Unchecked" checked={false} onChange={() => {}} />
      <Checkbox label="Checked" checked={true} onChange={() => {}} />
      <Checkbox label="Indeterminate" indeterminate onChange={() => {}} />
      <Checkbox label="Unchecked" checked={false} disabled onChange={() => {}} />
      <Checkbox label="Checked" checked={true} disabled onChange={() => {}} />
      <Checkbox label="Indeterminate" indeterminate disabled onChange={() => {}} />
    </div>
  ),
};

/** "Selecionar todos" clássico — indeterminate quando só parte dos itens está marcada. */
export const IndeterminateExample: Story = {
  render: () => {
    function Demo() {
      const [items, setItems] = React.useState([true, false, false]);
      const allChecked = items.every(Boolean);
      const someChecked = items.some(Boolean);
      return (
        <div className="flex flex-col gap-2">
          <Checkbox
            label="Selecionar todos"
            checked={allChecked}
            indeterminate={someChecked && !allChecked}
            onChange={(e) => setItems(items.map(() => e.target.checked))}
          />
          <div className="ml-6 flex flex-col gap-2">
            {items.map((checked, i) => (
              <Checkbox
                key={i}
                label={`Item ${i + 1}`}
                checked={checked}
                onChange={(e) =>
                  setItems(items.map((v, idx) => (idx === i ? e.target.checked : v)))
                }
              />
            ))}
          </div>
        </div>
      );
    }
    return <Demo />;
  },
};
