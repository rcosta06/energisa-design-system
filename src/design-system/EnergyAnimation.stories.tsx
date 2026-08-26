import type { Meta, StoryObj } from "@storybook/react";
import { EnergyAnimation } from "../components/ui/energy-animation";
import loginLandscape from "../assets/login-landscape.png";

/**
 * EnergyAnimation isolada sobre a foto real do Login (Figma: node
 * "Energy Animation", 2896:1901, e os 6 frames "Login Page - Anim 01..06")
 * — ver comentário completo em `energy-animation.tsx` sobre como a
 * trajetória/escala/cores foram extraídas do Figma.
 */
const meta: Meta<typeof EnergyAnimation> = {
  title: "Components/EnergyAnimation",
  component: EnergyAnimation,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  argTypes: {
    enabled: { control: "boolean" },
    paused: { control: "boolean" },
    duration: { control: { type: "number", min: 500, max: 8000, step: 100 } },
    loop: { control: "boolean" },
    loopDelay: { control: { type: "number", min: 0, max: 5000, step: 100 } },
    beamCount: { control: "select", options: [1, 2] },
    secondaryDelay: { control: { type: "number", min: 0, max: 5000, step: 100 } },
    glowIntensity: { control: { type: "number", min: 0, max: 2, step: 0.1 } },
    towerGlow: { control: "boolean" },
  },
  decorators: [
    (Story) => (
      <div className="relative h-[900px] w-full overflow-hidden">
        <img src={loginLandscape} alt="" className="absolute inset-0 size-full object-cover object-center" />
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof EnergyAnimation>;

/** Controls completos — ajuste qualquer prop ao vivo. */
export const Default: Story = {
  args: {
    enabled: true,
    paused: false,
    duration: 3200,
    loop: true,
    loopDelay: 1500,
    beamCount: 2,
    secondaryDelay: 900,
    glowIntensity: 1,
    towerGlow: true,
  },
};

/** `paused` — a animação para exatamente onde está, sem resetar. */
export const Paused: Story = {
  args: { ...Default.args, paused: true },
};

/** `beamCount=1` — só o Energy Path 01, sem o pulso secundário. */
export const SingleBeam: Story = {
  args: { ...Default.args, beamCount: 1 },
};

/** `towerGlow=false` — sem a reação nas torres. */
export const NoTowerGlow: Story = {
  args: { ...Default.args, towerGlow: false },
};

/** `glowIntensity` reduzido — pulso mais discreto. */
export const SubtleGlow: Story = {
  args: { ...Default.args, glowIntensity: 0.4 },
};

/** `enabled=false` — camada totalmente desligada (nada renderizado). */
export const Disabled: Story = {
  args: { ...Default.args, enabled: false },
};

/**
 * `duration`/`loopDelay` bem mais lentos — útil pra inspecionar a
 * trajetória/escala quadro a quadro.
 */
export const SlowMotion: Story = {
  args: { ...Default.args, duration: 9000, secondaryDelay: 2500, loopDelay: 2000 },
};
