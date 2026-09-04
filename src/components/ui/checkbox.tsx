import * as React from "react";
import { cn } from "@/lib/utils";
import { CheckboxCheckIcon } from "@/components/ui/icons/checkbox-check";

/**
 * Checkbox — Energisa Design System (Figma: Forms, node 3020:25988).
 *
 * `State=Unchecked|Checked|Indeterminate` × `Disabled=true|false` (6
 * variantes). O controle real é um `<input type="checkbox">` nativo
 * (`appearance-none`, mantém teclado/leitor de tela/formulário de graça) —
 * o box/check/dash visíveis são só CSS reagindo a `:checked`/`:indeterminate`
 * (via `peer`), exceto o próprio `.indeterminate` do DOM, que o React não
 * expõe como prop e precisa ser setado via ref (`useEffect`).
 *
 * Figma não define um estado Focus para este componente — usei o mesmo
 * padrão de foco (anel `action-primary`) já usado nos outros form controls
 * do DS, sem inventar uma cor nova.
 */
export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  /** Texto exibido ao lado do controle — omitido = sem label (só o controle). */
  label?: string;
  /** Estado tri-state (não é `checked`) — setado via DOM property, não HTML attribute. */
  indeterminate?: boolean;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { className, label, indeterminate = false, disabled, id, ...props },
  forwardedRef
) {
  const internalRef = React.useRef<HTMLInputElement>(null);
  const generatedId = React.useId();
  const inputId = id ?? generatedId;

  React.useImperativeHandle(forwardedRef, () => internalRef.current as HTMLInputElement);

  React.useEffect(() => {
    if (internalRef.current) internalRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  return (
    <label
      htmlFor={inputId}
      className={cn("inline-flex items-center gap-2", disabled ? "cursor-not-allowed" : "cursor-pointer")}
    >
      <span className="relative inline-flex size-4 shrink-0 items-center justify-center">
        <input
          ref={internalRef}
          id={inputId}
          type="checkbox"
          disabled={disabled}
          className={cn(
            "peer size-4 shrink-0 appearance-none rounded-[var(--radius-xs)] border border-solid",
            "border-[var(--color-border-strong)] bg-[var(--color-surface-primary)]",
            "checked:border-[var(--color-action-primary)] checked:bg-[var(--color-action-primary)]",
            "indeterminate:border-[var(--color-action-primary)] indeterminate:bg-[var(--color-action-primary)]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)] focus-visible:ring-offset-1",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          {...props}
        />
        <CheckboxCheckIcon
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 size-4 text-[var(--color-icon-on-action)] opacity-0 peer-checked:opacity-100"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-[3px] top-[7px] h-[2px] w-[8px] rounded-[1px] bg-[var(--color-icon-on-action)] opacity-0 peer-indeterminate:opacity-100"
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

export { Checkbox };
