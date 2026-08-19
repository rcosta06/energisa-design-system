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
 * Estados cobertos: default, hover, active, focus-visible, disabled.
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
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium " +
    "transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50 " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 " +
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 " +
    "[&:is(a)]:no-underline",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--color-action-primary)] text-white " +
          "hover:bg-[var(--color-action-primary-hover)] " +
          "active:bg-[var(--color-action-primary-active)] " +
          "focus-visible:ring-[var(--color-action-primary)]",
        secondary:
          "bg-[var(--color-action-secondary)] text-white " +
          "hover:opacity-90 active:opacity-80 " +
          "focus-visible:ring-[var(--color-action-secondary)]",
        outline:
          "border border-[var(--color-border-strong)] bg-transparent text-[var(--color-text-primary)] " +
          "hover:bg-[var(--color-surface-secondary)] " +
          "active:bg-[var(--color-surface-secondary)] " +
          "focus-visible:ring-[var(--color-action-primary)]",
        ghost:
          "bg-transparent text-[var(--color-text-primary)] " +
          "hover:bg-[var(--color-surface-secondary)] " +
          "active:bg-[var(--color-surface-secondary)] " +
          "focus-visible:ring-[var(--color-action-primary)]",
        danger:
          "bg-[var(--color-danger-default)] text-white " +
          "hover:opacity-90 active:opacity-80 " +
          "focus-visible:ring-[var(--color-danger-default)]",
        link:
          "text-[var(--color-action-primary)] " +
          "underline-offset-4 hover:underline " +
          "focus-visible:ring-[var(--color-action-primary)]",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4",
        lg: "h-12 px-6 text-base",
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

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Renderiza o componente filho em vez de um <button> (Radix Slot pattern) */
  asChild?: boolean;
  /** Estado de carregamento — desabilita o botão e mostra um spinner no lugar do conteúdo */
  isLoading?: boolean;
  /** Ícone exibido antes do texto */
  leftIcon?: React.ReactNode;
  /** Ícone exibido após o texto */
  rightIcon?: React.ReactNode;
  /** Border radius — padrão: "sm" (via token --radius-sm) */
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
      size,
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
    const effectiveRadius = radius ?? (size?.startsWith("icon") ? "full" : "sm");
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
            {leftIcon}
            {children}
            {rightIcon}
          </>
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
