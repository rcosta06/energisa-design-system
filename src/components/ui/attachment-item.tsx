import * as React from "react";
import { cn } from "@/lib/utils";
import { IconButton } from "@/components/ui/icon-button";
import { FilePdfIcon } from "@/components/ui/icons/file-pdf";
import { XIcon } from "@/components/ui/icons/x";
import { EyeIcon } from "@/components/ui/icons/eye";
import { DownloadSimpleIcon } from "@/components/ui/icons/download-simple";
import { TrashIcon } from "@/components/ui/icons/trash";
import { ArrowCounterClockwiseIcon } from "@/components/ui/icons/arrow-counter-clockwise";

/**
 * AttachmentItem — Energisa Design System (Figma: Form/AttachmentItem, node
 * 3021:24157, dependência: Form/Upload node 3021:24475).
 *
 * `Mode=Editable|ReadOnly` × `State=Uploading|Uploaded|Error` (6 variantes).
 * Ações via `IconButton` oficial (`size="sm"`, 32px — a dependência real
 * confirmada via Plugin API, node-ids das ações caem na mesma faixa
 * numérica do component set `A. IconButton`): Cancel/Preview/Download/Retry
 * usam `variant="ghost"`; Delete/Remove usam `variant="destructive"`
 * (confirmado comparando o parent instance de cada ícone contra os slots
 * Ghost/Destructive do IconButton — não é uma cor "óbvia" escolhida no
 * olho). ReadOnly nunca mostra Delete nem Remove (mas mostra Cancel durante
 * Uploading e Retry durante Error, exatamente como o Figma compõe — ReadOnly
 * não é Disabled).
 */
export type AttachmentItemMode = "editable" | "readonly";
export type AttachmentItemState = "uploading" | "uploaded" | "error";

export interface AttachmentItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  mode?: AttachmentItemMode;
  state?: AttachmentItemState;
  fileName?: string;
  /** Texto auxiliar — metadata do arquivo (Uploaded/Error) ou progresso (Uploading). */
  metadata?: string;
  /** Ícone do tipo de arquivo — default é `FilePdfIcon`, mas aceita qualquer ReactNode (instance-swap no Figma). */
  fileIcon?: React.ReactNode;
  /** 0–100, usado só quando state="uploading". */
  progress?: number;
  showPreview?: boolean;
  showDownload?: boolean;
  onCancel?: () => void;
  onPreview?: () => void;
  onDownload?: () => void;
  onDelete?: () => void;
  onRetry?: () => void;
  onRemove?: () => void;
}

function AttachmentItem({
  className,
  mode = "editable",
  state = "uploading",
  fileName = "relatorio-analise.pdf",
  metadata = "PDF · 2.4 MB",
  fileIcon,
  progress = 45,
  showPreview = true,
  showDownload = true,
  onCancel,
  onPreview,
  onDownload,
  onDelete,
  onRetry,
  onRemove,
  ...props
}: AttachmentItemProps) {
  const isEditable = mode === "editable";
  const isUploading = state === "uploading";
  const isUploaded = state === "uploaded";
  const isError = state === "error";
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div
      className={cn(
        "flex w-full items-center gap-3 rounded-[8px] border border-solid bg-[var(--color-surface-primary)] p-3",
        isError ? "border-[var(--color-danger-default)]" : "border-[var(--color-border-strong)]",
        className
      )}
      {...props}
    >
      <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-[var(--radius-sm)] bg-[var(--color-surface-secondary)]">
        {fileIcon ?? (
          <FilePdfIcon className={cn("size-6", isError ? "text-[var(--color-danger-default)]" : "text-[var(--color-text-secondary)]")} />
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <p className="truncate text-sm font-medium text-[var(--color-text-primary)]">{fileName}</p>
        {isUploading && (
          <>
            <p className="truncate text-xs text-[var(--color-text-muted)]">{metadata}</p>
            <div className="h-1 w-full overflow-hidden rounded-[var(--radius-full)] bg-[var(--color-surface-secondary)]">
              <div
                className="h-1 rounded-[var(--radius-full)] bg-[var(--color-action-primary)] transition-[width] duration-300"
                style={{ width: `${clampedProgress}%` }}
              />
            </div>
          </>
        )}
        {isUploaded && <p className="truncate text-xs text-[var(--color-text-muted)]">{metadata}</p>}
        {isError && <p className="truncate text-xs text-[var(--color-danger-default)]">{metadata}</p>}
      </div>

      <div className={cn("flex shrink-0 items-center", (isUploaded || isError) && "gap-1")}>
        {isUploading && <IconButton size="sm" icon={<XIcon className="size-6" />} onClick={onCancel} aria-label="Cancelar envio" />}
        {isUploaded && showPreview && <IconButton size="sm" icon={<EyeIcon className="size-6" />} onClick={onPreview} aria-label="Visualizar arquivo" />}
        {isUploaded && showDownload && <IconButton size="sm" icon={<DownloadSimpleIcon className="size-6" />} onClick={onDownload} aria-label="Baixar arquivo" />}
        {isError && <IconButton size="sm" icon={<ArrowCounterClockwiseIcon className="size-6" />} onClick={onRetry} aria-label="Tentar novamente" />}
        {isUploaded && isEditable && (
          <IconButton size="sm" variant="destructive" icon={<TrashIcon className="size-6" />} onClick={onDelete} aria-label="Excluir arquivo" />
        )}
        {isError && isEditable && (
          <IconButton size="sm" variant="destructive" icon={<XIcon className="size-6" />} onClick={onRemove} aria-label="Remover arquivo" />
        )}
      </div>
    </div>
  );
}

export { AttachmentItem };
