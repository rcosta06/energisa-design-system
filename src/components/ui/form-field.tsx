import * as React from "react";
import { Label } from "@/components/ui/label";
import { Input, type InputProps } from "@/components/ui/input";
import { cn } from "@/lib/utils";

/**
 * FormField — Energisa Design System
 *
 * Combina Label + Input + helper/error text em um único componente
 * para o caso de uso mais comum (90% dos formulários).
 *
 * Uso:
 *   <FormField
 *     label="E-mail"
 *     required
 *     placeholder="seu@email.com"
 *     helperText="Nunca compartilharemos seu e-mail."
 *   />
 *
 *   <FormField
 *     label="Senha"
 *     type="password"
 *     error
 *     errorMessage="A senha deve ter pelo menos 8 caracteres."
 *   />
 *
 * Para casos avançados (validação com React Hook Form, layout customizado),
 * use Label + Input separados.
 */
export interface FormFieldProps extends InputProps {
  /** Texto do label acima do campo */
  label: string;
  /** Exibe asterisco de obrigatório no label e passa `required` pro input */
  required?: boolean;
  /** Classe aplicada ao container externo */
  containerClassName?: string;
}

const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
  (
    {
      label,
      required,
      id,
      disabled,
      containerClassName,
      error,
      errorMessage,
      helperText,
      ...inputProps
    },
    ref
  ) => {
    const fieldId = id ?? React.useId();

    return (
      <div className={cn("flex flex-col gap-1.5 w-full", containerClassName)}>
        <Label htmlFor={fieldId} required={required} disabled={disabled}>
          {label}
        </Label>
        <Input
          ref={ref}
          id={fieldId}
          required={required}
          disabled={disabled}
          error={error}
          errorMessage={errorMessage}
          helperText={helperText}
          {...inputProps}
        />
      </div>
    );
  }
);
FormField.displayName = "FormField";

export { FormField };
