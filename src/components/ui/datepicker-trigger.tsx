import * as React from "react";
import { cn } from "@/lib/utils";
import { CalendarDotsIcon } from "@/components/ui/icons/calendar-dots";

export interface DatePickerTriggerProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "value"> {
  /** Valor já formatado (ex: "03/09/2026") — presente = estado Filled. */
  value?: string;
  placeholder?: string;
  /** Calendário associado está aberto — mesmo visual de Focus (border-2 action-primary). */
  open?: boolean;
  error?: boolean;
  errorMessage?: string;
}

/**
 * DatePickerTrigger — Energisa Design System (Figma: DatePicker/Trigger,
 * node 3019:23929, 7 estados: Default/Hover/Focus/Open/Filled/Disabled/Error
 * — re-verificado fresco via MCP nesta implementação, sem `Size` property,
 * largura fixa 240px).
 *
 * Fidelidade literal a duas inconsistências confirmadas no Figma (não
 * "corrigidas" para parecer com Input, propositalmente preservadas):
 * - Hover é visualmente IDÊNTICO a Default (sem feedback de hover), ao
 *   contrário do Input que destaca a borda no hover.
 * - Disabled usa `bg-surface-secondary` SEM `opacity-50` (Input/Textarea/
 *   Checkbox/Radio usam opacity-50 — aqui o Figma não tem essa camada).
 *
 * `<button>` (não input de texto) — Figma não expõe campo editável, é um
 * gatilho clicável que abre o Calendar. Foco nativo (`:focus-visible`)
 * cobre o estado Focus; `open` força visualmente o mesmo estilo (Open e
 * Focus são idênticos no Figma) para quando o calendário está aberto mas
 * o botão perdeu o foco do teclado (ex: clique dentro do popover).
 */
const DatePickerTrigger = React.forwardRef<HTMLButtonElement, DatePickerTriggerProps>(function DatePickerTrigger(
  { className, value, placeholder = "dd/mm/aaaa", open = false, error = false, errorMessage, disabled, ...props },
  ref
) {
  return (
    <div className="flex flex-col gap-1.5">
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-invalid={error || undefined}
        className={cn(
          "flex w-[240px] items-center gap-2 rounded-[var(--radius-sm)] px-3 py-2 text-left text-sm outline-none",
          "disabled:cursor-not-allowed disabled:bg-[var(--color-surface-secondary)] disabled:border-[var(--color-border-strong)]",
          !disabled && !error && "bg-[var(--color-surface-primary)] border border-[var(--color-border-strong)]",
          !disabled && !error && (open ? "border-2 border-[var(--color-action-primary)]" : "focus-visible:border-2 focus-visible:border-[var(--color-action-primary)]"),
          !disabled && error && "bg-[var(--color-surface-primary)] border border-[var(--color-danger-default)]",
          className
        )}
        {...props}
      >
        <span className={cn("flex-1 truncate", value ? "text-[var(--color-text-primary)]" : "text-[var(--color-text-muted)]")}>
          {value || placeholder}
        </span>
        <CalendarDotsIcon className="size-4 shrink-0 text-[var(--color-text-secondary)]" />
      </button>

      {error && errorMessage && (
        <p className="text-xs text-[var(--color-danger-default)]" role="alert">
          {errorMessage}
        </p>
      )}
    </div>
  );
});

export { DatePickerTrigger };
