import * as React from "react";
import { cn } from "@/lib/utils";
import { CalendarDotsIcon } from "@/components/ui/icons/calendar-dots";

export type DatePickerFieldSize = "sm" | "md" | "lg";
export type DatePickerFieldMode = "single" | "range";

export interface DatePickerFieldProps {
  className?: string;
  mode?: DatePickerFieldMode;
  size?: DatePickerFieldSize;
  label?: string;
  showLabel?: boolean;
  required?: boolean;
  helperText?: string;
  showHelper?: boolean;
  disabled?: boolean;
  /** Só se aplica a `mode="single"` — Figma não define Disabled/Error para Range. */
  error?: boolean;
  errorMessage?: string;
  /** Visual de Open (border-2 action-primary), igual ao Focus — controlado pelo consumidor (calendário aberto). */
  open?: boolean;
  /** `mode="single"` */
  value?: string;
  onTriggerClick?: () => void;
  /** `mode="range"` */
  startValue?: string;
  endValue?: string;
  onStartTriggerClick?: () => void;
  onEndTriggerClick?: () => void;
  placeholder?: string;
}

// Figma: Form/DatePicker Field, node 3019:24051 — SM=32px/8px/14px,
// MD=40px/12px/14px, LG=52px/16px/16px (mesma escala do Input, exceto o LG
// que aqui usa 16px de texto — confirmado, Input LG também usa text-base).
const sizeBoxClass: Record<DatePickerFieldSize, string> = {
  sm: "h-[32px] px-[8px]",
  md: "h-[40px] px-[12px]",
  lg: "h-[52px] px-[16px]",
};
const sizeTextClass: Record<DatePickerFieldSize, string> = {
  sm: "text-sm",
  md: "text-sm",
  lg: "text-base",
};

interface TriggerBoxProps {
  size: DatePickerFieldSize;
  value?: string;
  placeholder: string;
  open: boolean;
  disabled?: boolean;
  error?: boolean;
  onClick?: () => void;
  className?: string;
}

function TriggerBox({ size, value, placeholder, open, disabled, error, onClick, className }: TriggerBoxProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      aria-haspopup="dialog"
      aria-expanded={open}
      className={cn(
        "flex min-w-0 flex-1 items-center gap-2 rounded-[var(--radius-sm)] text-left outline-none",
        sizeBoxClass[size],
        sizeTextClass[size],
        "disabled:cursor-not-allowed disabled:bg-[var(--color-surface-secondary)] disabled:border-[var(--color-border-strong)]",
        !disabled && !error && "bg-[var(--color-surface-primary)] border border-[var(--color-border-strong)]",
        !disabled &&
          !error &&
          (open
            ? "border-2 border-[var(--color-action-primary)]"
            : "focus-visible:border-2 focus-visible:border-[var(--color-action-primary)]"),
        !disabled && error && "bg-[var(--color-surface-primary)] border border-[var(--color-danger-default)]",
        className
      )}
    >
      <span className={cn("flex-1 truncate", value ? "text-[var(--color-text-primary)]" : "text-[var(--color-text-muted)]")}>
        {value || placeholder}
      </span>
      <CalendarDotsIcon className="size-4 shrink-0 text-[var(--color-text-secondary)]" />
    </button>
  );
}

/**
 * DatePickerField — Energisa Design System (Figma: Form/DatePicker Field,
 * node 3019:24051, `Mode=Single|Range` × `Size=SM|MD|LG` × 7 estados em
 * Single / 3 em Range = 30 variantes, re-verificado fresco via MCP nesta
 * implementação).
 *
 * O trigger interno é reimplementado aqui (não reaproveita o componente
 * `DatePickerTrigger` exportado) porque o Figma não instancia esse
 * componente dentro do Field — define sua própria caixa inline, com
 * largura/tamanho diferentes (SM/MD/LG em vez de 240px fixo). Fidelidade
 * literal ao Figma teve prioridade sobre reduzir duplicação entre os dois
 * arquivos.
 *
 * Larguras do container: Single = 280px, Range = 480px (valores literais
 * do Figma) — `className` pode sobrescrever via `cn`/twMerge se o
 * consumidor precisar de largura diferente.
 *
 * Range: Disabled/Error não existem no Figma pra esse modo — `disabled`/
 * `error` só têm efeito visual em `mode="single"`.
 */
function DatePickerField({
  className,
  mode = "single",
  size = "md",
  label = "Data",
  showLabel = true,
  required = false,
  helperText,
  showHelper = true,
  disabled = false,
  error = false,
  errorMessage,
  open = false,
  value,
  onTriggerClick,
  startValue,
  endValue,
  onStartTriggerClick,
  onEndTriggerClick,
  placeholder = "dd/mm/aaaa",
}: DatePickerFieldProps) {
  const showErrorMessage = mode === "single" && error && errorMessage;
  const labelMuted = mode === "single" && disabled;

  return (
    <div className={cn("flex flex-col items-start gap-1", mode === "single" ? "w-[280px]" : "w-[480px]", className)}>
      {showLabel && (
        <div className="flex items-start gap-0.5 text-sm font-medium">
          <span className={labelMuted ? "text-[var(--color-text-muted)]" : "text-[var(--color-text-primary)]"}>{label}</span>
          {required && <span className="text-[var(--color-danger-default)]">*</span>}
        </div>
      )}

      {mode === "single" ? (
        <TriggerBox
          size={size}
          value={value}
          placeholder={placeholder}
          open={open}
          disabled={disabled}
          error={error}
          onClick={onTriggerClick}
          className="w-full"
        />
      ) : (
        <div className="flex w-full items-center gap-2">
          <TriggerBox size={size} value={startValue} placeholder={placeholder} open={open} onClick={onStartTriggerClick} />
          <span className="shrink-0 text-sm text-[var(--color-text-secondary)]">→</span>
          <TriggerBox size={size} value={endValue} placeholder={placeholder} open={open} onClick={onEndTriggerClick} />
        </div>
      )}

      {showHelper && (showErrorMessage ? (
        <p className="text-xs text-[var(--color-danger-default)]" role="alert">
          {errorMessage}
        </p>
      ) : (
        helperText && <p className="text-xs text-[var(--color-text-secondary)]">{helperText}</p>
      ))}
    </div>
  );
}

export { DatePickerField };
