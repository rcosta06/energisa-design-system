import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { LoadingBattery } from "../components/ui/loading-battery";
import { Button } from "../components/ui/button";

const meta: Meta<typeof LoadingBattery> = {
  title: "Components/LoadingBattery",
  component: LoadingBattery,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    state: { control: "select", options: ["indeterminate", "determinate"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    value: { control: { type: "range", min: 0, max: 100, step: 1 } },
    label: { control: "text" },
    showLabel: { control: "boolean" },
    showProgressBar: { control: "boolean" },
    showProgressValue: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof LoadingBattery>;

// ─── DOCS PAGE ────────────────────────────────────────────────────────────────

/** Instância interativa — altere qualquer prop no painel de Controls. */
export const Playground: Story = {
  args: { state: "indeterminate", size: "md", value: 60, label: "A carregar dados..." },
};

/**
 * Sequência acumulativa 1→2→3→4: bateria 1 enche de baixo pra cima, permanece
 * cheia, bateria 2 enche, e assim sucessivamente até as 4 ficarem cheias — aí
 * o ciclo reinicia. Loop contínuo, sem interação.
 */
export const AllSizesIndeterminate: Story = {
  render: () => (
    <div className="flex flex-wrap items-end gap-10">
      <LoadingBattery size="sm" state="indeterminate" />
      <LoadingBattery size="md" state="indeterminate" />
      <LoadingBattery size="lg" state="indeterminate" />
    </div>
  ),
};

/** As 3 combinações Size × Determinate lado a lado — value real preenche as baterias. */
export const AllSizesDeterminate: Story = {
  render: () => (
    <div className="flex flex-wrap items-end gap-10">
      <LoadingBattery size="sm" state="determinate" value={60} />
      <LoadingBattery size="md" state="determinate" value={60} />
      <LoadingBattery size="lg" state="determinate" value={60} />
    </div>
  ),
};

/**
 * `showProgressBar` liga/desliga a barra inferior nos dois states — quando
 * `false` ela some por inteiro (não é `visibility:hidden`), o Auto Layout
 * recolhe o espaço. `showProgressValue` é independente: mesmo sem barra, o
 * percentual pode continuar visível (última coluna).
 */
export const ProgressBarVisibility: Story = {
  render: () => (
    <div className="flex flex-wrap items-end gap-10">
      <LoadingBattery size="md" state="indeterminate" showProgressBar />
      <LoadingBattery size="md" state="indeterminate" showProgressBar={false} />
      <LoadingBattery size="md" state="determinate" value={60} showProgressBar />
      <LoadingBattery size="md" state="determinate" value={60} showProgressBar={false} />
      <LoadingBattery size="md" state="determinate" value={60} showProgressBar={false} showProgressValue />
    </div>
  ),
};

/**
 * Determinate não fica em loop — ele só anima quando o `value` muda. Clique no
 * botão para alternar entre 25% (bateria 1 cheia) e 60% (baterias 1–2 cheias,
 * bateria 3 subindo até 40%) e ver o preenchimento animar de baixo pra cima,
 * sem reiniciar as baterias já cheias.
 */
export const ValueTransition: Story = {
  render: () => {
    function Demo() {
      const [value, setValue] = React.useState(25);
      return (
        <div className="flex flex-col items-center gap-4">
          <LoadingBattery size="lg" state="determinate" value={value} />
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

/**
 * 0/25/50/60/75/100% — cada múltiplo de 25% completa exatamente uma bateria;
 * valores intermediários (60%) preenchem a próxima parcialmente, de baixo pra
 * cima (ex: 60% = baterias 1–2 cheias, bateria 3 a 40%, bateria 4 vazia).
 */
export const DeterminateValues: Story = {
  tags: ["!autodocs"],
  render: () => (
    <div className="flex flex-wrap items-end gap-10">
      {[0, 25, 50, 60, 75, 100].map((v) => (
        <LoadingBattery key={v} size="sm" state="determinate" value={v} showLabel={false} />
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
  args: { state: "determinate", size: "md", value: 60, showProgressBar: false, showProgressValue: false },
};
export const Determinate60WithoutBarWithValue: Story = {
  tags: ["!autodocs"],
  args: { state: "determinate", size: "md", value: 60, showProgressBar: false, showProgressValue: true },
};

/** Sem label e sem barra/valor — só as baterias. */
export const BatteriesOnly: Story = {
  tags: ["!autodocs"],
  args: { state: "indeterminate", size: "lg", showLabel: false, showProgressBar: false, showProgressValue: false },
};

/** Label customizado. */
export const CustomLabel: Story = {
  tags: ["!autodocs"],
  args: { state: "indeterminate", size: "md", label: "Enviando arquivo..." },
};
