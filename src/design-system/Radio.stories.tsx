import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Radio, RadioGroup, type RadioOption } from "../components/ui/radio";

const meta: Meta<typeof Radio> = {
  title: "Components/Radio",
  component: Radio,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    label: { control: "text" },
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

/** Radio isolado — altere label/checked/disabled no painel de Controls. */
export const Default: Story = {
  args: { label: "Option", checked: false, name: "playground" },
};

/** As 4 variantes do Figma (node 3020:26005): Unselected/Selected × Disabled. */
export const AllStates: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <Radio name="states-1" label="Unselected" checked={false} onChange={() => {}} />
      <Radio name="states-2" label="Selected" checked={true} onChange={() => {}} />
      <Radio name="states-3" label="Unselected" checked={false} disabled onChange={() => {}} />
      <Radio name="states-4" label="Selected" checked={true} disabled onChange={() => {}} />
    </div>
  ),
};

const options: RadioOption[] = [
  { value: "a", label: "Opção A" },
  { value: "b", label: "Opção B" },
  { value: "c", label: "Opção C" },
];

/** RadioGroup — Orientation=Vertical (node 3020:26030), estado React real. */
export const GroupVertical: Story = {
  render: () => {
    function Demo() {
      const [value, setValue] = React.useState("a");
      return <RadioGroup name="group-vertical" options={options} value={value} onValueChange={setValue} orientation="vertical" />;
    }
    return <Demo />;
  },
};

/** RadioGroup — Orientation=Horizontal (node 3020:26030), estado React real. */
export const GroupHorizontal: Story = {
  render: () => {
    function Demo() {
      const [value, setValue] = React.useState("a");
      return <RadioGroup name="group-horizontal" options={options} value={value} onValueChange={setValue} orientation="horizontal" />;
    }
    return <Demo />;
  },
};
