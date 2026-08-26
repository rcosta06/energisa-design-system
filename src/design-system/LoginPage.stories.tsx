import type { Meta, StoryObj } from "@storybook/react";
import { LoginPage } from "../components/ui/login-page";

/**
 * LoginPage completa (Figma: "Login Page - Anim 01..06", 1440×900) — as 4
 * camadas (BackgroundMedia/EnergyAnimation/LoginOverlay/LoginPanel) juntas.
 * Sem autenticação real: `onSubmit` só recebe os valores digitados.
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

/** Mesma tela com `prefers-reduced-motion` — verifique no toolbar do navegador/SO; o feixe some, só o glow ambiente das torres fica. */
export const ReducedMotion: Story = {
  ...Default,
};

/** Animação desligada por completo via prop. */
export const AnimationDisabled: Story = {
  args: { ...Default.args, energyAnimation: { enabled: false } },
};
