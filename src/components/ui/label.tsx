import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "@/lib/utils";

/**
 * Label — Energisa Design System
 *
 * Baseado em @radix-ui/react-label para acessibilidade nativa.
 * Suporta indicador de campo obrigatório via prop `required`.
 * Suporta estado desabilitado via prop `disabled` (opacity reduzida).
 */
export interface LabelProps
  extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> {
  /** Exibe um asterisco vermelho indicando campo obrigatório */
  required?: boolean;
  /** Reduz opacity quando o campo associado está desabilitado */
  disabled?: boolean;
}

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  LabelProps
>(({ className, required, disabled, children, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(
      "text-sm font-medium leading-none text-[var(--color-text-primary)]",
      "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
      disabled && "cursor-not-allowed opacity-50",
      className
    )}
    {...props}
  >
    {children}
    {required && (
      <span
        className="ml-1 text-[var(--color-danger-default)]"
        aria-hidden="true"
      >
        *
      </span>
    )}
  </LabelPrimitive.Root>
));
Label.displayName = "Label";

export { Label };
