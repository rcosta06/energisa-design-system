import * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { DatePickerField, type DatePickerFieldSize } from "@/components/ui/datepicker-field";
import { DatePickerCalendar } from "@/components/ui/datepicker-calendar";
import { useFloatingDropdown } from "@/lib/use-floating-dropdown";

function formatDate(date: Date): string {
  return date.toLocaleDateString("pt-BR");
}

interface SharedProps {
  className?: string;
  size?: DatePickerFieldSize;
  label?: string;
  showLabel?: boolean;
  required?: boolean;
  helperText?: string;
  showHelper?: boolean;
  minDate?: Date;
  maxDate?: Date;
}

export interface DatePickerSingleProps extends SharedProps {
  mode?: "single";
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  value?: Date;
  onChange?: (date: Date | undefined) => void;
}

export interface DatePickerRangeProps extends SharedProps {
  mode: "range";
  rangeStart?: Date;
  rangeEnd?: Date;
  onRangeChange?: (range: { start: Date | undefined; end: Date | undefined }) => void;
}

export type DatePickerProps = DatePickerSingleProps | DatePickerRangeProps;

/** Estado de popover compartilhado — abrir/fechar, mês exibido, posicionamento via `useFloatingDropdown` (mesma infra do Select/Menu, sem alterá-los). */
function usePopover(anchorMonth: Date | undefined) {
  const [open, setOpen] = React.useState(false);
  const [month, setMonth] = React.useState<Date>(() =>
    anchorMonth ? new Date(anchorMonth.getFullYear(), anchorMonth.getMonth(), 1) : new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  );
  const triggerRef = React.useRef<HTMLDivElement>(null);
  const panelRef = React.useRef<HTMLDivElement>(null);
  const close = React.useCallback(() => setOpen(false), []);
  const position = useFloatingDropdown({ open, onClose: close, triggerRef, panelRef });

  return { open, setOpen, month, setMonth, triggerRef, panelRef, position };
}

function CalendarPortal({
  panelRef,
  position,
  children,
}: {
  panelRef: React.RefObject<HTMLDivElement | null>;
  position: { top: number; left: number } | null;
  children: React.ReactNode;
}) {
  if (!position) return null;
  return createPortal(
    <div ref={panelRef} style={{ position: "fixed", top: position.top, left: position.left }} className="z-50">
      {children}
    </div>,
    document.body
  );
}

function SingleDatePicker({
  className,
  size = "md",
  label,
  showLabel,
  required,
  helperText,
  showHelper,
  disabled,
  error,
  errorMessage,
  value,
  onChange,
  minDate,
  maxDate,
}: DatePickerSingleProps) {
  const { open, setOpen, month, setMonth, triggerRef, panelRef, position } = usePopover(value);

  return (
    <div ref={triggerRef} className={cn("inline-flex", className)}>
      <DatePickerField
        size={size}
        label={label}
        showLabel={showLabel}
        required={required}
        helperText={helperText}
        showHelper={showHelper}
        disabled={disabled}
        error={error}
        errorMessage={errorMessage}
        open={open}
        value={value ? formatDate(value) : undefined}
        onTriggerClick={() => !disabled && setOpen((v) => !v)}
      />
      {open && (
        <CalendarPortal panelRef={panelRef} position={position}>
          <DatePickerCalendar
            mode="single"
            month={month}
            onMonthChange={setMonth}
            selected={value}
            onSelect={(date) => {
              onChange?.(date);
              setOpen(false);
            }}
            minDate={minDate}
            maxDate={maxDate}
          />
        </CalendarPortal>
      )}
    </div>
  );
}

function RangeDatePicker({
  className,
  size = "md",
  label,
  showLabel,
  required,
  helperText,
  showHelper,
  rangeStart,
  rangeEnd,
  onRangeChange,
  minDate,
  maxDate,
}: DatePickerRangeProps) {
  const { open, setOpen, month, setMonth, triggerRef, panelRef, position } = usePopover(rangeStart);

  return (
    <div ref={triggerRef} className={cn("inline-flex", className)}>
      <DatePickerField
        mode="range"
        size={size}
        label={label}
        showLabel={showLabel}
        required={required}
        helperText={helperText}
        showHelper={showHelper}
        open={open}
        startValue={rangeStart ? formatDate(rangeStart) : undefined}
        endValue={rangeEnd ? formatDate(rangeEnd) : undefined}
        onStartTriggerClick={() => setOpen((v) => !v)}
        onEndTriggerClick={() => setOpen((v) => !v)}
      />
      {open && (
        <CalendarPortal panelRef={panelRef} position={position}>
          <DatePickerCalendar
            mode="range"
            month={month}
            onMonthChange={setMonth}
            rangeStart={rangeStart}
            rangeEnd={rangeEnd}
            onRangeChange={(range) => {
              onRangeChange?.(range);
              if (range.start && range.end) setOpen(false);
            }}
            minDate={minDate}
            maxDate={maxDate}
          />
        </CalendarPortal>
      )}
    </div>
  );
}

/**
 * DatePicker — Energisa Design System, composto real (Figma não define um
 * frame único "DatePicker completo"; abrir/fechar, navegar mês e
 * selecionar data é engenharia necessária pro Storybook, não um estado do
 * Figma). Junta `DatePickerField` (gatilho + label + helper) com
 * `DatePickerCalendar` (grade) num popover posicionado via
 * `useFloatingDropdown` — a mesma infraestrutura de posicionamento/
 * clique-fora/Escape já usada por `Select` e `DropdownMenu` (Menu), sem
 * alterar nenhum dos dois (ambos 🟢 congelados).
 *
 * `mode="single"`: `value`/`onChange` controlados, fecha ao selecionar um
 * dia. `mode="range"`: `rangeStart`/`rangeEnd`/`onRangeChange`, fecha só
 * quando as duas pontas do intervalo estão definidas.
 */
function DatePicker(props: DatePickerProps) {
  if (props.mode === "range") return <RangeDatePicker {...props} />;
  return <SingleDatePicker {...props} />;
}

export { DatePicker };
