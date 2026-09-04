import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Radio / RadioGroup — Energisa Design System (Figma: Forms, node
 * 3020:26005 / 3020:26030).
 *
 * `Radio`: controle nativo `<input type="radio">` (`appearance-none`,
 * teclado/formulário de graça), o ponto interno é só CSS reagindo a
 * `:checked` (via `peer`) — nenhum JS de estado. Figma não define um
 * estado Focus aqui (só Selected/Unselected × Disabled) — reaproveitei o
 * mesmo anel `action-primary` já usado no Checkbox, sem inventar cor nova.
 *
 * `RadioGroup`: composição de `Radio`s com `name` compartilhado (agrupamento
 * nativo do browser). `Orientation=Vertical` (gap-2, coluna) `|Horizontal`
 * (gap-4, linha) — valores exatos do Figma. Segue o mesmo padrão
 * controlado/não-controlado já usado no `Select` (`value`/`defaultValue`/
 * `onValueChange`).
 */
export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  /** Texto exibido ao lado do controle — omitido = sem label (só o controle). */
  label?: string;
}

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { className, label, disabled, id, ...props },
  ref
) {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;

  return (
    <label
      htmlFor={inputId}
      className={cn("inline-flex items-center gap-2", disabled ? "cursor-not-allowed" : "cursor-pointer")}
    >
      <span className="relative inline-flex size-4 shrink-0 items-center justify-center">
        <input
          ref={ref}
          id={inputId}
          type="radio"
          disabled={disabled}
          className={cn(
            "peer size-4 shrink-0 appearance-none rounded-full border border-solid",
            "border-[var(--color-border-strong)] bg-[var(--color-surface-primary)]",
            "checked:border-[var(--color-action-primary)] checked:bg-[var(--color-action-primary)]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)] focus-visible:ring-offset-1",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          {...props}
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-icon-on-action)] opacity-0 peer-checked:opacity-100"
        />
      </span>
      {label && (
        <span className={cn("text-sm", disabled ? "text-[var(--color-text-muted)]" : "text-[var(--color-text-primary)]")}>
          {label}
        </span>
      )}
    </label>
  );
});

export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export type RadioGroupOrientation = "vertical" | "horizontal";

export interface RadioGroupProps {
  /** Compartilhado entre os radios do grupo — agrupamento nativo do browser. */
  name: string;
  options: RadioOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Vertical = gap-2/coluna (default) · Horizontal = gap-4/linha — valores exatos do Figma. */
  orientation?: RadioGroupOrientation;
  className?: string;
}

function RadioGroup({ name, options, value, defaultValue, onValueChange, orientation = "vertical", className }: RadioGroupProps) {
  const isControlled = value !== undefined;

  return (
    <div
      role="radiogroup"
      className={cn("inline-flex items-start", orientation === "horizontal" ? "flex-row gap-4" : "flex-col gap-2", className)}
    >
      {options.map((option) => (
        <Radio
          key={option.value}
          name={name}
          value={option.value}
          label={option.label}
          disabled={option.disabled}
          checked={isControlled ? value === option.value : undefined}
          defaultChecked={isControlled ? undefined : defaultValue === option.value}
          onChange={() => onValueChange?.(option.value)}
        />
      ))}
    </div>
  );
}

export { Radio, RadioGroup };
