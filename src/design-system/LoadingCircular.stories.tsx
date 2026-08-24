import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { LoadingCircular } from "../components/ui/loading-circular";
import { Button } from "../components/ui/button";

const meta: Meta<typeof LoadingCircular> = {
  title: "Components/LoadingCircular",
  component: LoadingCircular,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    state: { control: "select", options: ["indeterminate", "determinate"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    value: { control: { type: "range", min: 0, max: 100, step: 1 } },
    label: { control: "text" },
    showLabel: { control: "boolean" },
    showProgressBar: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof LoadingCircular>;

// ─── DOCS PAGE ────────────────────────────────────────────────────────────────

/** Instância interativa — altere qualquer prop no painel de Controls. */
export const Playground: Story = {
  args: { state: "indeterminate", size: "md", value: 60, label: "Processando..." },
};

/** As 3 combinações Size × Indeterminate lado a lado — ring gira 360° contínuo. */
export const AllSizesIndeterminate: Story = {
  render: () => (
    <div className="flex flex-wrap items-end gap-10">
      <LoadingCircular size="sm" state="indeterminate" />
      <LoadingCircular size="md" state="indeterminate" />
      <LoadingCircular size="lg" state="indeterminate" />
    </div>
  ),
};

/** As 3 combinações Size × Determinate lado a lado — barra reflete o value real. */
export const AllSizesDeterminate: Story = {
  render: () => (
    <div className="flex flex-wrap items-end gap-10">
      <LoadingCircular size="sm" state="determinate" value={60} />
      <LoadingCircular size="md" state="determinate" value={60} />
      <LoadingCircular size="lg" state="determinate" value={60} />
    </div>
  ),
};

/**
 * `showProgressBar` liga/desliga a barra inferior nos dois states — quando
 * `false` ela some por inteiro (não é `visibility:hidden`), o Auto Layout
 * recolhe o espaço e o label sobe para logo abaixo do ring.
 */
export const ProgressBarVisibility: Story = {
  render: () => (
    <div className="flex flex-wrap items-end gap-10">
      <LoadingCircular size="md" state="indeterminate" showProgressBar />
      <LoadingCircular size="md" state="indeterminate" showProgressBar={false} />
      <LoadingCircular size="md" state="determinate" value={60} showProgressBar />
      <LoadingCircular size="md" state="determinate" value={60} showProgressBar={false} />
    </div>
  ),
};

/**
 * Determinate não fica em loop — ele só anima quando o `value` muda. Clique no
 * botão para alternar entre 25% e 60% e ver a transição suave do ring
 * (`stroke-dashoffset`) e da barra, sem saltos instantâneos.
 */
export const ValueTransition: Story = {
  render: () => {
    function Demo() {
      const [value, setValue] = React.useState(25);
      return (
        <div className="flex flex-col items-center gap-4">
          <LoadingCircular size="lg" state="determinate" value={value} />
          <Button size="sm" onClick={() => setValue((v) => (v === 25 ? 60 : 25))}>
            Alternar {value === 25 ? "para 60%" : "para 25%"}
          </Button>
        </div>
      );
    }
    return <Demo />;
  },
};

// ─── REGRESSION / CHROMATIC ───────────────────────────────────────────────────

export const IndeterminateSm: Story = {
  tags: ["!autodocs"],
  args: { state: "indeterminate", size: "sm" },
};
export const IndeterminateMd: Story = {
  tags: ["!autodocs"],
  args: { state: "indeterminate", size: "md" },
};
export const IndeterminateLg: Story = {
  tags: ["!autodocs"],
  args: { state: "indeterminate", size: "lg" },
};

export const DeterminateSm: Story = {
  tags: ["!autodocs"],
  args: { state: "determinate", size: "sm", value: 60 },
};
export const DeterminateMd: Story = {
  tags: ["!autodocs"],
  args: { state: "determinate", size: "md", value: 60 },
};
export const DeterminateLg: Story = {
  tags: ["!autodocs"],
  args: { state: "determinate", size: "lg", value: 60 },
};

/** Valores extremos e intermediários do Determinate. */
export const DeterminateValues: Story = {
  tags: ["!autodocs"],
  render: () => (
    <div className="flex flex-wrap items-end gap-10">
      {[0, 25, 50, 60, 75, 100].map((v) => (
        <div key={v} className="flex flex-col items-center gap-2">
          <LoadingCircular size="sm" state="determinate" value={v} showLabel={false} />
          <span className="text-xs text-[var(--color-text-secondary)]">{v}%</span>
        </div>
      ))}
    </div>
  ),
};

export const IndeterminateWithBar: Story = {
  tags: ["!autodocs"],
  args: { state: "indeterminate", size: "md", showProgressBar: true },
};
export const IndeterminateWithoutBar: Story = {
  tags: ["!autodocs"],
  args: { state: "indeterminate", size: "md", showProgressBar: false },
};
export const Determinate60WithBar: Story = {
  tags: ["!autodocs"],
  args: { state: "determinate", size: "md", value: 60, showProgressBar: true },
};
export const Determinate60WithoutBar: Story = {
  tags: ["!autodocs"],
  args: { state: "determinate", size: "md", value: 60, showProgressBar: false },
};

/** Sem label e sem barra de progresso — só o spinner. */
export const IconOnly: Story = {
  tags: ["!autodocs"],
  args: { state: "indeterminate", size: "lg", showLabel: false, showProgressBar: false },
};

/** Label customizado. */
export const CustomLabel: Story = {
  tags: ["!autodocs"],
  args: { state: "indeterminate", size: "md", label: "Sincronizando dados..." },
};
