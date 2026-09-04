import type { Meta, StoryObj } from "@storybook/react";
import { AttachmentItem } from "../components/ui/attachment-item";

const meta: Meta<typeof AttachmentItem> = {
  title: "Components/AttachmentItem",
  component: AttachmentItem,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    mode: { control: "select", options: ["editable", "readonly"] },
    state: { control: "select", options: ["uploading", "uploaded", "error"] },
    fileName: { control: "text" },
    metadata: { control: "text" },
    progress: { control: { type: "range", min: 0, max: 100 } },
  },
};

export default meta;
type Story = StoryObj<typeof AttachmentItem>;

/** Interativo — altere mode/state/progress no painel de Controls. */
export const Default: Story = {
  args: { mode: "editable", state: "uploading", progress: 45 },
  render: (args) => <AttachmentItem {...args} className="w-[min(calc(100vw-32px),440px)]" />,
};

/**
 * As 6 variantes do Figma (node 3021:24157): Editable/ReadOnly ×
 * Uploading/Uploaded/Error. ReadOnly nunca mostra Delete/Remove, mas
 * mostra Cancel (Uploading) e Retry (Error) — não é Disabled.
 */
export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold text-[var(--color-text-secondary)]">Editable</span>
        <AttachmentItem className="w-[min(calc(100vw-32px),440px)]" mode="editable" state="uploading" progress={45} />
        <AttachmentItem className="w-[min(calc(100vw-32px),440px)]" mode="editable" state="uploaded" />
        <AttachmentItem className="w-[min(calc(100vw-32px),440px)]" mode="editable" state="error" metadata="Falha no envio" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold text-[var(--color-text-secondary)]">ReadOnly</span>
        <AttachmentItem className="w-[min(calc(100vw-32px),440px)]" mode="readonly" state="uploading" progress={70} />
        <AttachmentItem className="w-[min(calc(100vw-32px),440px)]" mode="readonly" state="uploaded" />
        <AttachmentItem className="w-[min(calc(100vw-32px),440px)]" mode="readonly" state="error" metadata="Falha no envio" />
      </div>
    </div>
  ),
};

/** showPreview/showDownload desligados — só o essencial. */
export const WithoutOptionalActions: Story = {
  tags: ["!autodocs"],
  args: { mode: "editable", state: "uploaded", showPreview: false, showDownload: false },
  render: (args) => <AttachmentItem {...args} className="w-[min(calc(100vw-32px),440px)]" />,
};
