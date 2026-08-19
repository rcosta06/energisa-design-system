import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Button — Energisa Design System
 *
 * Consome exclusivamente tokens semantic/component definidos em src/styles/tokens.css.
 * Nenhuma cor, espaçamento ou radius é hardcoded aqui — qualquer ajuste visual
 * deve ser feito no Figma e propagado via tokens.css, nunca direto neste arquivo.
 *
 * Variantes (Figma "Button", 2576:1691): primary, secondary, tertiary, ghost,
 * destructive. Tamanhos: sm, md, lg — lg usa radius-md (12px), sm/md usam
 * radius-sm (8px), exatamente como o Figma define (não são um erro de digitação).
 *
 * Tertiary não tem um hover próprio no Figma (a variável usada resolve pro
 * mesmo valor do fundo em repouso — mesma classe de bug já corrigida em outros
 * componentes desta sessão) — usamos opacity-80 no lugar, sempre visível
 * independente do tema.
 *
 * Loading é tratado via prop `isLoading` (não é uma variant — é um estado independente
 * que qualquer variant pode assumir).
 */
const radiusMap = {
  none: "rounded-none",
  xs: "rounded-[var(--radius-xs)]",
  sm: "rounded-[var(--radius-sm)]",
  md: "rounded-[var(--radius-md)]",
  lg: "rounded-[var(--radius-lg)]",
  xl: "rounded-[var(--radius-xl)]",
  "2xl": "rounded-[var(--radius-2xl)]",
  full: "rounded-[var(--radius-full)]",
} as const;

export type ButtonRadius = keyof typeof radiusMap;

const buttonVariants = cva(
  // Base — aplicada a todas as variantes
  "inline-flex items-center justify-center whitespace-nowrap font-medium " +
    "transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50 " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 " +
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 " +
    "[&:is(a)]:no-underline",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--color-action-primary)] text-[var(--color-icon-on-action)] " +
          "hover:bg-[var(--color-action-primary-hover)] " +
          "active:bg-[var(--color-action-primary-hover)] " +
          "focus-visible:ring-[var(--color-action-primary)]",
        secondary:
          "border border-[var(--color-border-strong)] bg-transparent text-[var(--color-text-primary)] " +
          "hover:bg-[var(--color-surface-secondary)] " +
          "active:bg-[var(--color-surface-secondary)] " +
          "focus-visible:ring-[var(--color-action-primary)]",
        tertiary:
          "bg-[var(--color-surface-secondary)] text-[var(--color-text-primary)] " +
          "hover:opacity-80 active:opacity-70 " +
          "focus-visible:ring-[var(--color-action-primary)]",
        ghost:
          "bg-transparent text-[var(--color-text-primary)] " +
          "hover:bg-[var(--color-surface-secondary)] " +
          "active:bg-[var(--color-surface-secondary)] " +
          "focus-visible:ring-[var(--color-action-primary)]",
        destructive:
          "bg-[var(--color-danger-default)] text-[var(--color-icon-on-action)] " +
          "hover:bg-[var(--color-danger-hover)] " +
          "active:bg-[var(--color-danger-hover)] " +
          "focus-visible:ring-[var(--color-danger-default)]",
      },
      size: {
        sm: "gap-1 px-4 py-2 text-xs leading-4",
        md: "gap-2 px-4 py-3 text-xs leading-4",
        lg: "gap-2 p-4 text-sm leading-5",
        icon: "size-10 p-0",
        "icon-sm": "size-8 p-0",
        "icon-lg": "size-12 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

const defaultRadiusForSize = {
  sm: "sm",
  md: "sm",
  lg: "md",
  icon: "full",
  "icon-sm": "full",
  "icon-lg": "full",
} as const satisfies Record<string, ButtonRadius>;

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Renderiza o componente filho em vez de um <button> (Radix Slot pattern) */
  asChild?: boolean;
  /** Estado de carregamento — desabilita o botão e mostra um spinner no lugar do conteúdo */
  isLoading?: boolean;
  /** Ícone exibido antes do texto (16px, conforme Figma) */
  leftIcon?: React.ReactNode;
  /** Ícone exibido após o texto (16px, conforme Figma) */
  rightIcon?: React.ReactNode;
  /** Border radius — padrão: sm/md=radius-sm, lg=radius-md (conforme Figma) */
  radius?: ButtonRadius;
}

function Spinner() {
  return (
    <svg
      className="size-4 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size = "md",
      radius,
      asChild = false,
      isLoading = false,
      disabled,
      leftIcon,
      rightIcon,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = (asChild ? Slot : "button") as React.ElementType;
    const effectiveRadius = radius ?? defaultRadiusForSize[size ?? "md"];
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }), radiusMap[effectiveRadius])}
        disabled={disabled || isLoading}
        aria-busy={isLoading || undefined}
        data-loading={isLoading || undefined}
        {...props}
      >
        {isLoading ? (
          <>
            <Spinner />
            <span className="sr-only">Carregando</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="flex size-4 shrink-0 items-center justify-center">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="flex size-4 shrink-0 items-center justify-center">{rightIcon}</span>}
          </>
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
