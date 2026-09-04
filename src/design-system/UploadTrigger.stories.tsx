import type { Meta, StoryObj } from "@storybook/react";
import { UploadTrigger } from "../components/ui/upload-trigger";

const meta: Meta<typeof UploadTrigger> = {
  title: "Components/UploadTrigger",
  component: UploadTrigger,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    title: { control: "text" },
    disabled: { control: "boolean" },
    error: { control: "boolean" },
    errorMessage: { control: "text" },
    forceState: { control: "select", options: [undefined, "hover", "focus", "dragOver"] },
  },
};

export default meta;
type Story = StoryObj<typeof UploadTrigger>;

/** Interativo — arraste um arquivo de verdade ou clique em "Selecionar arquivo". */
export const Default: Story = {
  args: {},
  render: (args) => <UploadTrigger {...args} className="w-[440px]" onFilesSelected={(files) => alert(`${files.length} arquivo(s) selecionado(s)`)} />,
};

/**
 * Os 6 estados do Figma (node 3021:24209): Default, Hover, Focus, DragOver,
 * Disabled, Error — Hover/DragOver reais via `forceState`, borda sempre
 * presente no Light (nunca "sem borda").
 */
export const AllStates: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <div className="flex flex-col items-center gap-2">
        <UploadTrigger className="w-[300px]" />
        <span className="text-xs text-[var(--color-text-secondary)]">Default</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <UploadTrigger className="w-[300px]" forceState="hover" />
        <span className="text-xs text-[var(--color-text-secondary)]">Hover</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <UploadTrigger className="w-[300px]" forceState="focus" />
        <span className="text-xs text-[var(--color-text-secondary)]">Focus</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <UploadTrigger className="w-[300px]" forceState="dragOver" />
        <span className="text-xs text-[var(--color-text-secondary)]">DragOver</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <UploadTrigger className="w-[300px]" disabled />
        <span className="text-xs text-[var(--color-text-secondary)]">Disabled</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <UploadTrigger className="w-[300px]" error errorMessage="Formato de arquivo não suportado" />
        <span className="text-xs text-[var(--color-text-secondary)]">Error</span>
      </div>
    </div>
  ),
};

/** Arraste um arquivo de verdade sobre a área — DragOver é real, não simulado. */
export const RealDragAndDrop: Story = {
  tags: ["!autodocs"],
  render: () => <UploadTrigger className="w-[440px]" onFilesSelected={(files) => alert(`Solto: ${files[0]?.name}`)} />,
};
