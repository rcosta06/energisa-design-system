import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Textarea — Energisa Design System (Figma: Forms, node 3020:25938).
 *
 * Tamanho único (o Figma não define SM/MD/LG para este componente, ao
 * contrário do Input) — altura fixa 120px, padding 12px. Mesmo padrão de
 * borda/foco do Input já corrigido nesta rodada (2px `action-primary` no
 * focus, sem ring/glow). `error`/`errorMessage`/`helperText` seguem a
 * mesma API do Input — label continua sendo responsabilidade do FormField
 * (ou de quem consumir), não deste componente.
 */
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Ativa o estado de erro (borda vermelha) */
  error?: boolean;
  /** Mensagem de erro exibida abaixo do campo */
  errorMessage?: string;
  /** Texto auxiliar exibido abaixo do campo (substituído por errorMessage quando error=true) */
  helperText?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { className, error = false, errorMessage, helperText, disabled, id, ...props },
  ref
) {
  const inputId = id ?? React.useId();
  const helperId = `${inputId}-helper`;
  const errorId = `${inputId}-error`;

  return (
    <div className="flex w-full flex-col gap-1.5">
      <textarea
        ref={ref}
        id={inputId}
        disabled={disabled}
        aria-invalid={error || undefined}
        aria-describedby={error && errorMessage ? errorId : helperText ? helperId : undefined}
        className={cn(
          "h-[120px] w-full resize-none rounded-[var(--radius-sm)] border bg-[var(--color-surface-primary)] p-3",
          "text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]",
          "transition-colors duration-150 outline-none",
          !error && "border-[var(--color-border-strong)] hover:border-[var(--color-action-primary)]",
          !error && "focus:border-2 focus:border-[var(--color-action-primary)]",
          error && "border-[var(--color-danger-default)] hover:border-[var(--color-danger-default)]",
          error && "focus:border-2 focus:border-[var(--color-danger-default)]",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[var(--color-surface-secondary)]",
          className
        )}
        {...props}
      />
      {error && errorMessage && (
        <p id={errorId} className="text-xs text-[var(--color-danger-default)]" role="alert">
          {errorMessage}
        </p>
      )}
      {!error && helperText && (
        <p id={helperId} className="text-xs text-[var(--color-text-secondary)]">
          {helperText}
        </p>
      )}
    </div>
  );
});

export { Textarea };
