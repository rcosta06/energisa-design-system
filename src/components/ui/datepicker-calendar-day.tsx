import * as React from "react";
import { cn } from "@/lib/utils";

export type DatePickerCalendarDayVariant =
  | "default"
  | "today"
  | "selected"
  | "todaySelected"
  | "rangeStart"
  | "rangeMiddle"
  | "rangeEnd"
  | "outsideMonth"
  | "disabled";

export interface DatePickerCalendarDayProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  day: number | string;
  variant?: DatePickerCalendarDayVariant;
}

/**
 * DatePickerCalendarDay — Energisa Design System (Figma: DatePicker/CalendarDay,
 * component set node 3019:23675). 10 estados confirmados via MCP: Default,
 * Hover (real, `:hover` nativo), Today, Selected, Disabled, OutsideMonth,
 * RangeStart, RangeMiddle, RangeEnd, "Today + Selected".
 *
 * `<button>` real (não `<div>` como o export bruto do Figma) — mesma decisão
 * já tomada em PaginationItem, célula clicável precisa ser navegável por
 * teclado. OutsideMonth não é interativo no Figma (não há spec de clique
 * pra navegar de mês) — tratado como `disabled` visualmente diferente de
 * `disabled` puro (cor igual, mas não é o dia "desabilitado" do calendário).
 */
const DatePickerCalendarDay = React.forwardRef<HTMLButtonElement, DatePickerCalendarDayProps>(function DatePickerCalendarDay(
  { className, day, variant = "default", disabled, ...props },
  ref
) {
  const isNonInteractive = variant === "outsideMonth" || variant === "disabled" || disabled;

  return (
    <button
      ref={ref}
      type="button"
      disabled={isNonInteractive}
      className={cn(
        "flex size-9 shrink-0 items-center justify-center text-sm disabled:cursor-not-allowed",
        variant === "default" && "rounded-[var(--radius-sm)] text-[var(--color-text-primary)] hover:bg-[var(--color-surface-secondary)]",
        variant === "today" &&
          "rounded-[var(--radius-sm)] border border-[var(--color-action-primary)] font-medium text-[var(--color-text-primary)]",
        variant === "selected" &&
          "rounded-[var(--radius-sm)] bg-[var(--color-action-primary)] font-medium text-[var(--color-icon-on-action)]",
        variant === "todaySelected" &&
          "rounded-[var(--radius-sm)] bg-[var(--color-action-primary)] font-semibold text-[var(--color-icon-on-action)]",
        variant === "rangeStart" &&
          "rounded-l-[var(--radius-sm)] bg-[var(--color-action-primary)] font-medium text-[var(--color-icon-on-action)]",
        variant === "rangeMiddle" && "bg-[var(--color-surface-secondary)] text-[var(--color-text-primary)]",
        variant === "rangeEnd" &&
          "rounded-r-[var(--radius-sm)] bg-[var(--color-action-primary)] font-medium text-[var(--color-icon-on-action)]",
        variant === "outsideMonth" && "rounded-[var(--radius-sm)] text-[var(--color-text-muted)]",
        variant === "disabled" && "rounded-[var(--radius-sm)] text-[var(--color-text-muted)]",
        className
      )}
      {...props}
    >
      {day}
    </button>
  );
});

export { DatePickerCalendarDay };
