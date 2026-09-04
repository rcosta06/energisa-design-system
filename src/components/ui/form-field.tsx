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
      <div className={cn("flex flex-col gap-1 w-full", containerClassName)}>
        {/*
          Gap de 4px (gap-1) entre Label/Input/Helper — confirmado via Plugin
          API no Figma (Form/Input, node 3020:25887): Label termina em y=17,
          Input começa em y=21 (SM/MD/LG, mesma proporção). Era gap-1.5 (6px),
          divergência pré-existente e independente da correção de line-height.

          `leading-[normal]` sobrescreve o `leading-none` da base de `label.tsx`
          (14px, propositalmente compacto pra outros usos do Label) — o Figma
          do campo (Form/Input, node 3020:25887) define lineHeight AUTO no
          Label, que pro Inter Medium 14px renderiza 17px (confirmado via
          Plugin API). `label.tsx` é compartilhado (só FormField e a story
          LabelVariants o usam — nenhum outro componente), mas mudar sua base
          afetaria a demonstração isolada do Label; a correção fica só aqui,
          na composição de FormField, via a prop `className` que `label.tsx`
          já expõe pra isso.
        */}
        <Label htmlFor={fieldId} required={required} disabled={disabled} className="leading-[normal]">
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
