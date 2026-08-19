import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "../components/ui/avatar";

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    size: {
      control: "select",
      options: ["lg", "sm", "xs"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

/** Avatar interativo — altere size/initials no painel de Controls. */
export const Default: Story = {
  args: { size: "sm", initials: "ER" },
};

const placeholderPhoto =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="72" height="72"><rect width="72" height="72" fill="#b3b3b3"/></svg>'
  );

/** Os 3 tamanhos (LG 36px, SM 30px, XS 24px), tipo Initials. */
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar size="lg" initials="ER" />
      <Avatar size="sm" initials="ER" />
      <Avatar size="xs" initials="ER" />
    </div>
  ),
};

/** Variante Photo vs. Initials, no tamanho LG. */
export const PhotoVsInitials: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar size="lg" src={placeholderPhoto} alt="Foto de perfil" />
      <Avatar size="lg" initials="ER" />
    </div>
  ),
};
