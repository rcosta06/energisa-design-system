import type { Meta, StoryObj } from "@storybook/react";
import { PageHeading } from "../components/ui/page-heading";

const meta: Meta<typeof PageHeading> = {
  title: "Components/PageHeading",
  component: PageHeading,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  argTypes: {
    level: { control: "select", options: ["xl", "lg", "md"] },
    bullet: { control: "boolean" },
    divider: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof PageHeading>;

/** Heading interativo — altere level/bullet/divider/text no painel de Controls. */
export const Default: Story = {
  args: { text: "Título", level: "xl", bullet: true, divider: true },
};

/** Os 3 níveis de heading (XL/LG/MD) lado a lado. */
export const AllLevels: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <PageHeading text="Título XL" level="xl" />
      <PageHeading text="Título LG" level="lg" />
      <PageHeading text="Título MD" level="md" />
    </div>
  ),
};
