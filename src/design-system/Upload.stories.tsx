import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Upload, type UploadFile } from "../components/ui/upload";

const meta: Meta<typeof Upload> = {
  title: "Components/Upload",
  component: Upload,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    mode: { control: "select", options: ["editable", "readonly"] },
    label: { control: "text" },
    helperText: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Upload>;

/** Estado Empty (node 3021:24210) — Label + UploadTrigger + HelperText. Interativo, arraste um arquivo de verdade. */
export const Empty: Story = {
  args: {},
  render: (args) => <Upload {...args} className="w-[min(calc(100vw-32px),440px)]" />,
};

/**
 * Fluxo completo com estado React real — selecione/arraste um arquivo,
 * veja "Uploading" progredir, virar "Uploaded", e teste Delete.
 */
export const Interactive: Story = {
  render: () => {
    function Demo() {
      const [files, setFiles] = React.useState<UploadFile[]>([]);

      const handleFiles = (fileList: FileList) => {
        const file = fileList[0];
        if (!file) return;
        const id = `${Date.now()}`;
        setFiles((prev) => [...prev, { id, fileName: file.name, metadata: `${(file.size / 1024).toFixed(0)} KB`, state: "uploading", progress: 0 }]);
        let progress = 0;
        const interval = setInterval(() => {
          progress += 20;
          setFiles((prev) =>
            prev.map((f) => (f.id === id ? { ...f, progress: Math.min(progress, 100), state: progress >= 100 ? "uploaded" : "uploading" } : f))
          );
          if (progress >= 100) clearInterval(interval);
        }, 300);
      };

      return (
        <Upload
          files={files}
          onFilesSelected={handleFiles}
          onDelete={(id) => setFiles((prev) => prev.filter((f) => f.id !== id))}
          onRetry={(id) => setFiles((prev) => prev.map((f) => (f.id === id ? { ...f, state: "uploading", progress: 0 } : f)))}
        />
      );
    }
    return <Demo />;
  },
};

const sampleFiles: UploadFile[] = [
  { id: "1", fileName: "relatorio-analise.pdf", metadata: "PDF · 2.4 MB", state: "uploaded" },
  { id: "2", fileName: "planilha-custos.xlsx", metadata: "XLSX · 890 KB", state: "uploaded" },
];

/** Com anexos já enviados (Editable) — Trigger cede lugar à lista de AttachmentItem. */
export const WithFiles: Story = {
  tags: ["!autodocs"],
  args: { files: sampleFiles, mode: "editable" },
  render: (args) => <Upload {...args} className="w-[min(calc(100vw-32px),440px)]" />,
};

/** ReadOnly com anexos — sem Delete, ainda permite Preview/Download. */
export const ReadOnlyWithFiles: Story = {
  tags: ["!autodocs"],
  args: { files: sampleFiles, mode: "readonly" },
  render: (args) => <Upload {...args} className="w-[min(calc(100vw-32px),440px)]" />,
};
