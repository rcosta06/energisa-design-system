import * as React from "react";
import { cn } from "@/lib/utils";
import { DatePickerCalendarDay, type DatePickerCalendarDayVariant } from "@/components/ui/datepicker-calendar-day";
import { formatMonthYear, getMonthGrid, isAfterDay, isBeforeDay, isSameDay, WEEKDAY_LABELS } from "@/components/ui/datepicker-utils";

export type DatePickerCalendarMode = "single" | "range";

export interface DatePickerCalendarProps {
  className?: string;
  mode?: DatePickerCalendarMode;
  /** Mês exibido (dia é ignorado, sempre normalizado pro dia 1). */
  month: Date;
  onMonthChange: (month: Date) => void;
  /** Mode="single" */
  selected?: Date;
  onSelect?: (date: Date) => void;
  /** Mode="range" */
  rangeStart?: Date;
  rangeEnd?: Date;
  onRangeChange?: (range: { start: Date | undefined; end: Date | undefined }) => void;
  minDate?: Date;
  maxDate?: Date;
  today?: Date;
}

/**
 * DatePickerCalendar — Energisa Design System (Figma: DatePicker/Calendar,
 * node 3019:23683, `Mode=Single`). Header com navegação de mês + grade de
 * `DatePickerCalendarDay`.
 *
 * Setas de navegação: Figma usa os glifos tipográficos literais "‹"/"›"
 * (18px, variável Figma "icon-secondary" — sem token dedicado no código,
 * reaproveita `--color-text-secondary` como o Input já faz pros ícones)
 * dentro de um botão 28×28 — não é uma
 * instância do componente "Icones", é texto puro. Reproduzido fielmente
 * como caractere, não substituído por CaretLeftIcon/CaretRightIcon (que
 * são SVGs de geometria diferente, usados no Pagination).
 *
 * `Mode=Range`: layout da grade não foi buscado separadamente no Figma —
 * os 10 estados de DatePickerCalendarDay (incluindo RangeStart/Middle/End)
 * já definem completamente a aparência, então a grade reaproveita a MESMA
 * estrutura só trocando qual variant cada dia recebe. Seleção de range é
 * comportamento real necessário pro Storybook (não decorativo): primeiro
 * clique define o início, segundo define o fim (invertendo se for antes do
 * início), terceiro clique reinicia o range.
 */
function DatePickerCalendar({
  className,
  mode = "single",
  month,
  onMonthChange,
  selected,
  onSelect,
  rangeStart,
  rangeEnd,
  onRangeChange,
  minDate,
  maxDate,
  today = new Date(),
}: DatePickerCalendarProps) {
  const weeks = React.useMemo(() => getMonthGrid(month), [month]);

  const isDisabled = (date: Date) => (minDate && isBeforeDay(date, minDate)) || (maxDate && isAfterDay(date, maxDate));

  const handleDayClick = (date: Date) => {
    if (isDisabled(date)) return;

    if (mode === "single") {
      onSelect?.(date);
      return;
    }

    if (!rangeStart || (rangeStart && rangeEnd)) {
      onRangeChange?.({ start: date, end: undefined });
      return;
    }
    if (isBeforeDay(date, rangeStart)) {
      onRangeChange?.({ start: date, end: rangeStart });
    } else {
      onRangeChange?.({ start: rangeStart, end: date });
    }
  };

  const getVariant = (date: Date, outsideMonth: boolean): DatePickerCalendarDayVariant => {
    if (outsideMonth) return "outsideMonth";
    if (isDisabled(date)) return "disabled";

    const isToday = isSameDay(date, today);

    if (mode === "single") {
      const isSelected = selected ? isSameDay(date, selected) : false;
      if (isSelected && isToday) return "todaySelected";
      if (isSelected) return "selected";
      if (isToday) return "today";
      return "default";
    }

    const isStart = rangeStart ? isSameDay(date, rangeStart) : false;
    const isEnd = rangeEnd ? isSameDay(date, rangeEnd) : false;
    const isMiddle = rangeStart && rangeEnd && isAfterDay(date, rangeStart) && isBeforeDay(date, rangeEnd);

    if (isStart && isEnd) return isToday ? "todaySelected" : "selected";
    if (isStart) return "rangeStart";
    if (isEnd) return "rangeEnd";
    if (isMiddle) return "rangeMiddle";
    if (isToday) return "today";
    return "default";
  };

  return (
    <div
      className={cn(
        "flex w-fit flex-col gap-1 rounded-[var(--radius-md)] border border-[var(--color-border-strong)] bg-[var(--color-surface-primary)] p-3 drop-shadow-[0px_4px_6px_rgba(0,0,0,0.08)]",
        className
      )}
    >
      <div className="flex items-center gap-1">
        <button
          type="button"
          aria-label="Mês anterior"
          onClick={() => onMonthChange(new Date(month.getFullYear(), month.getMonth() - 1, 1))}
          className="flex size-7 shrink-0 items-center justify-center rounded-[var(--radius-sm)] text-[18px] leading-none text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-secondary)]"
        >
          ‹
        </button>
        <span className="flex-1 text-center text-sm font-medium text-[var(--color-text-primary)]">{formatMonthYear(month)}</span>
        <button
          type="button"
          aria-label="Próximo mês"
          onClick={() => onMonthChange(new Date(month.getFullYear(), month.getMonth() + 1, 1))}
          className="flex size-7 shrink-0 items-center justify-center rounded-[var(--radius-sm)] text-[18px] leading-none text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-secondary)]"
        >
          ›
        </button>
      </div>

      <div className="flex">
        {WEEKDAY_LABELS.map((label, index) => (
          <span
            key={index}
            className="flex size-9 shrink-0 items-center justify-center text-xs font-medium text-[var(--color-text-muted)]"
          >
            {label}
          </span>
        ))}
      </div>

      {weeks.map((week, weekIndex) => (
        <div key={weekIndex} className="flex">
          {week.map(({ date, outsideMonth }) => (
            <DatePickerCalendarDay
              key={date.toISOString()}
              day={date.getDate()}
              variant={getVariant(date, outsideMonth)}
              onClick={() => handleDayClick(date)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export { DatePickerCalendar };
