import type { Meta, StoryObj } from "@storybook/react";
import { LoginPage } from "../components/ui/login-page";

/**
 * LoginPage completa (Figma: "Login Page - Anim 01..06", 1440×900) —
 * BackgroundMedia (vídeo)/LoginOverlay/LoginPanel juntos. Sem autenticação
 * real: `onSubmit` só recebe os valores digitados.
 */
const meta: Meta<typeof LoginPage> = {
  title: "Templates/LoginPage",
  component: LoginPage,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof LoginPage>;

export const Default: Story = {
  args: {
    onSubmit: (values) => {
      // eslint-disable-next-line no-console
      console.log("LoginPanel submit (sem autenticação real):", values);
    },
  },
};
