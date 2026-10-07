import type { Meta, StoryObj } from "@storybook/react";
import { LoginPage } from "../components/ui/login-page";

/**
 * LoginPage completa (Figma: "Authentication Panel", 3364:2340) —
 * BackgroundMedia (vídeo)/LoginOverlay/LoginPanel juntos. Sem autenticação
 * real: `onSubmit` recebe credenciais vazias no fluxo demonstrativo SSO.
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

export const Mobile: Story = {
  ...Default,
  parameters: { viewport: { defaultViewport: "mobile2" } },
};

export const Dark: Story = {
  ...Default,
  globals: { theme: "dark" },
};
