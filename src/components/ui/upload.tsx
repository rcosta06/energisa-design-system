import * as React from "react";
import { cn } from "@/lib/utils";
import { UploadTrigger } from "@/components/ui/upload-trigger";
import { AttachmentItem, type AttachmentItemState } from "@/components/ui/attachment-item";

/**
 * Upload — Energisa Design System (Figma: Form/Upload, node 3021:24303,
 * composto: Label + UploadTrigger + [AttachmentItem lista] + HelperText,
 * `Mode=Editable|ReadOnly`). Reaproveita `UploadTrigger`/`AttachmentItem`
 * de verdade — nenhum markup duplicado.
 *
 * Composição confirmada via MCP só pro state Empty (Label+Trigger+Helper,
 * sem anexos). Os states Uploading/Uploaded/Error do Figma têm altura
 * compacta (114px) incompatível com Trigger+Lista juntos — inferi que o
 * Trigger só aparece quando `files` está vazio, e vira lista de
 * `AttachmentItem` assim que existe pelo menos 1 arquivo (não confirmei
 * essa transição estado-a-estado via MCP, é a composição mais coerente com
 * as alturas observadas — reportado, não inventado às cegas).
 */
export interface UploadFile {
  id: string;
  fileName: string;
  metadata?: string;
  state: AttachmentItemState;
  progress?: number;
  fileIcon?: React.ReactNode;
}

export interface UploadProps {
  className?: string;
  mode?: "editable" | "readonly";
  label?: string;
  showLabel?: boolean;
  helperText?: string;
  showHelper?: boolean;
  files?: UploadFile[];
  triggerTitle?: string;
  accept?: string;
  multiple?: boolean;
  onFilesSelected?: (files: FileList) => void;
  onCancel?: (id: string) => void;
  onRetry?: (id: string) => void;
  onDelete?: (id: string) => void;
  onRemove?: (id: string) => void;
  onPreview?: (id: string) => void;
  onDownload?: (id: string) => void;
}

function Upload({
  className,
  mode = "editable",
  label = "Anexo da Análise",
  showLabel = true,
  helperText = "PDF, JPG, PNG até 10 MB",
  showHelper = true,
  files = [],
  triggerTitle,
  accept,
  multiple,
  onFilesSelected,
  onCancel,
  onRetry,
  onDelete,
  onRemove,
  onPreview,
  onDownload,
}: UploadProps) {
  const hasFiles = files.length > 0;

  return (
    <div className={cn("flex w-full flex-col items-start gap-2", className)}>
      {showLabel && <p className="text-sm font-medium text-[var(--color-text-primary)]">{label}</p>}

      {!hasFiles && (
        <UploadTrigger title={triggerTitle} disabled={mode === "readonly"} accept={accept} multiple={multiple} onFilesSelected={onFilesSelected} />
      )}

      {hasFiles && (
        <div className="flex w-full flex-col gap-2">
          {files.map((file) => (
            <AttachmentItem
              key={file.id}
              mode={mode}
              state={file.state}
              fileName={file.fileName}
              metadata={file.metadata}
              progress={file.progress}
              fileIcon={file.fileIcon}
              onCancel={() => onCancel?.(file.id)}
              onRetry={() => onRetry?.(file.id)}
              onDelete={() => onDelete?.(file.id)}
              onRemove={() => onRemove?.(file.id)}
              onPreview={() => onPreview?.(file.id)}
              onDownload={() => onDownload?.(file.id)}
            />
          ))}
        </div>
      )}

      {showHelper && <p className="text-xs text-[var(--color-text-muted)]">{helperText}</p>}
    </div>
  );
}

export { Upload };
