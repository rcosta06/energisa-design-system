import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { UploadSimpleIcon } from "@/components/ui/icons/upload-simple";

/**
 * UploadTrigger — Energisa Design System (Figma: Form/Upload Trigger, node
 * 3021:24209, dependência: Form/Upload node 3021:24475).
 *
 * Zona de drag-and-drop com botão "Selecionar arquivo" — reaproveita o
 * `Button` oficial (`variant="secondary" size="sm"`, confirmado via MCP que
 * a instância no Figma referencia o node real do Button, node 2576:1612).
 * NÃO usa IconButton (nem o botão nem o ícone do topo passam por ele) —
 * confirmado via Plugin API que esta dependência é só o `Button`.
 *
 * States: Default/Hover/Focus/DragOver/Disabled/Error — Hover e DragOver
 * são visualmente idênticos no Figma (mesmo bg/borda), Default e Hover só
 * diferem na borda (reaproveitam a mesma cor sólida — nenhuma parece
 * "sem borda", confirmado nos 6 estados via MCP). DragOver é real (eventos
 * nativos de drag), Focus é só demonstrável via `forceState` — o container
 * não tem um alvo focável próprio além do Button interno, que já é
 * acessível por teclado nativamente.
 */
export interface UploadTriggerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onDrop"> {
  title?: string;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  accept?: string;
  multiple?: boolean;
  onFilesSelected?: (files: FileList) => void;
  /** Força a aparência visual (uso em Storybook/regressão) — hover/dragOver reais funcionam sem essa prop. */
  forceState?: "hover" | "focus" | "dragOver";
}

const UploadTrigger = React.forwardRef<HTMLDivElement, UploadTriggerProps>(function UploadTrigger(
  {
    className,
    title = "Arraste um arquivo para cá",
    disabled = false,
    error = false,
    errorMessage = "Formato de arquivo não suportado",
    accept,
    multiple,
    onFilesSelected,
    forceState,
    ...props
  },
  ref
) {
  const [isDragOver, setIsDragOver] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const forceFocus = forceState === "focus";
  const showHoverLook = forceState === "hover" || forceState === "dragOver" || isDragOver;

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (disabled) return;
    if (e.dataTransfer.files.length > 0) onFilesSelected?.(e.dataTransfer.files);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) onFilesSelected?.(e.target.files);
    e.target.value = "";
  };

  return (
    <div
      ref={ref}
      onDragOver={(e) => {
        e.preventDefault();
        if (!disabled) setIsDragOver(true);
      }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={handleDrop}
      className={cn(
        "flex w-full flex-col items-center justify-center gap-3 rounded-[var(--radius-sm)] border-dashed p-6",
        error
          ? "border-[1.5px] border-[var(--color-danger-default)] bg-[var(--color-surface-primary)]"
          : forceFocus
            ? "border-2 border-[var(--color-action-primary)] bg-[var(--color-surface-primary)]"
            : showHoverLook
              ? "border-[1.5px] border-[var(--color-action-primary)] bg-[var(--color-surface-secondary)]"
              : "border-[1.5px] border-[var(--color-border-strong)] bg-[var(--color-surface-primary)]",
        disabled && "pointer-events-none opacity-50",
        className
      )}
      {...props}
    >
      <UploadSimpleIcon className={cn("size-6 shrink-0", error ? "text-[var(--color-danger-default)]" : "text-[var(--color-text-secondary)]")} />
      <div className="flex flex-col items-center justify-center gap-1">
        <p
          className={cn(
            "text-sm font-medium",
            error ? "text-[var(--color-danger-default)]" : showHoverLook ? "text-[var(--color-text-primary)]" : "text-[var(--color-text-secondary)]"
          )}
        >
          {title}
        </p>
        <p className="text-xs text-[var(--color-text-muted)]">ou</p>
      </div>
      <Button type="button" variant="secondary" size="sm" disabled={disabled} onClick={() => inputRef.current?.click()}>
        Selecionar arquivo
      </Button>
      <input ref={inputRef} type="file" className="hidden" accept={accept} multiple={multiple} disabled={disabled} onChange={handleInputChange} />
      {error && errorMessage && <p className="text-xs text-[var(--color-danger-default)]">{errorMessage}</p>}
    </div>
  );
});

export { UploadTrigger };
