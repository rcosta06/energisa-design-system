import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Input — Energisa Design System
 *
 * Consome exclusivamente tokens semantic definidos em src/styles/tokens.css.
 *
 * Estados cobertos: default, hover, focus, disabled, error, readonly.
 * Suporta ícones internos à esquerda e/ou direita.
 * Tipo "password" ganha botão de mostrar/ocultar automaticamente.
 *
 * Uso básico:
 *   <Input placeholder="Digite aqui" />
 *
 * Com ícone:
 *   <Input leftIcon={<Search />} placeholder="Buscar..." />
 *
 * Com erro:
 *   <Input error errorMessage="Campo obrigatório" />
 *
 * Senha (olho automático):
 *   <Input type="password" placeholder="Sua senha" />
 */
export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** Ícone renderizado dentro do campo, à esquerda do texto */
  leftIcon?: React.ReactNode;
  /** Ícone renderizado dentro do campo, à direita do texto */
  rightIcon?: React.ReactNode;
  /** Ativa o estado de erro (borda vermelha) */
  error?: boolean;
  /** Mensagem de erro exibida abaixo do campo */
  errorMessage?: string;
  /** Texto auxiliar exibido abaixo do campo (substituído por errorMessage quando error=true) */
  helperText?: string;
  /** Tamanho do campo */
  size?: "sm" | "md" | "lg";
  /** Remove qualquer caractere não-numérico em tempo real (desktop e mobile, inclusive ao colar) */
  numericOnly?: boolean;
}

// Altura/padding/tipografia exatos do Figma (Form/Input, node 3020:25887) —
// confirmado via MCP: SM=32px/8px/14px, MD=40px/12px/14px, LG=52px/16px/16px.
//
// Helper/Error usam `leading-[normal]` (não um px fixo) — o Figma define
// `lineHeight: {unit: "AUTO"}` no texto (confirmado via Plugin API), e
// `line-height: normal` reproduz esse "AUTO" exato pro Inter Regular 12px
// (15px de altura, mesma técnica já usada em datepicker-field.tsx). O
// `text-xs` puro do Tailwind usa 16px (escala tipográfica do Tailwind, não
// do Figma/fonte).
const sizeStyles = {
  sm: "h-[32px] px-[8px] text-sm",
  md: "h-[40px] px-[12px] text-sm",
  lg: "h-[52px] px-[16px] text-base",
};

// Ícone é sempre 16px no Figma, independente do size do Input — não escala.
const iconSizeClass = {
  sm: "size-4",
  md: "size-4",
  lg: "size-4",
};

// padding-com-ícone = padding do size + 16px (ícone) + 8px (gap), como no Figma.
const iconPaddingLeft = {
  sm: "pl-[32px]",
  md: "pl-[36px]",
  lg: "pl-[40px]",
};

const iconPaddingRight = {
  sm: "pr-[32px]",
  md: "pr-[36px]",
  lg: "pr-[40px]",
};

const iconLeftPosition = {
  sm: "left-[8px]",
  md: "left-[12px]",
  lg: "left-[16px]",
};

const iconRightPosition = {
  sm: "right-[8px]",
  md: "right-[12px]",
  lg: "right-[16px]",
};

function PasswordToggle({
  show,
  onToggle,
  sizeKey,
}: {
  show: boolean;
  onToggle: () => void;
  sizeKey: "sm" | "md" | "lg";
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        "absolute top-1/2 -translate-y-1/2 flex items-center justify-center",
        "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)]",
        "rounded-[var(--radius-xs)] transition-colors",
        iconRightPosition[sizeKey]
      )}
      aria-label={show ? "Ocultar senha" : "Mostrar senha"}
    >
      {show ? (
        <EyeOff className={iconSizeClass[sizeKey]} />
      ) : (
        <Eye className={iconSizeClass[sizeKey]} />
      )}
    </button>
  );
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      size = "md",
      leftIcon,
      rightIcon,
      error = false,
      errorMessage,
      helperText,
      disabled,
      id,
      numericOnly,
      onChange,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (numericOnly) {
        e.target.value = e.target.value.replace(/\D/g, "");
      }
      onChange?.(e);
    };
    const isPassword = type === "password";
    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

    const hasLeftIcon = !!leftIcon;
    const hasRightIcon = !!rightIcon || isPassword;

    const inputId = id ?? React.useId();
    const helperId = `${inputId}-helper`;
    const errorId = `${inputId}-error`;

    return (
      <div className="flex flex-col gap-1 w-full">
        {/* Campo */}
        <div className="relative flex items-center w-full">
          {/* Ícone esquerdo */}
          {hasLeftIcon && (
            <span
              className={cn(
                "absolute top-1/2 -translate-y-1/2 flex items-center",
                "pointer-events-none",
                disabled ? "text-[var(--color-text-muted)]" : "text-[var(--color-text-secondary)]",
                iconLeftPosition[size],
                iconSizeClass[size]
              )}
            >
              {leftIcon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            type={inputType}
            disabled={disabled}
            onChange={handleChange}
            aria-invalid={error || undefined}
            aria-describedby={
              error && errorMessage
                ? errorId
                : helperText
                ? helperId
                : undefined
            }
            className={cn(
              // Base
              "w-full rounded-[var(--radius-sm)] border bg-[var(--color-surface-primary)]",
              "text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]",
              "transition-colors duration-150 outline-none",
              // Tamanho
              sizeStyles[size],
              // Padding com ícones
              hasLeftIcon && iconPaddingLeft[size],
              hasRightIcon && iconPaddingRight[size],
              // Borda default — Figma: 1px border-strong, 1px action-primary no hover,
              // 2px action-primary no focus (sem ring/glow adicional, node 3020:25887).
              !error &&
                "border-[var(--color-border-strong)] hover:border-[var(--color-action-primary)]",
              // Focus
              !error && "focus:border-2 focus:border-[var(--color-action-primary)]",
              // Erro
              error &&
                "border-[var(--color-danger-default)] hover:border-[var(--color-danger-default)]",
              error && "focus:border-2 focus:border-[var(--color-danger-default)]",
              // Disabled
              "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[var(--color-surface-secondary)]",
              className
            )}
            {...props}
          />

          {/* Ícone direito ou toggle de senha */}
          {isPassword ? (
            <PasswordToggle
              show={showPassword}
              onToggle={() => setShowPassword((v) => !v)}
              sizeKey={size}
            />
          ) : (
            hasRightIcon && (
              <span
                className={cn(
                  "absolute top-1/2 -translate-y-1/2 flex items-center",
                  "pointer-events-none",
                  disabled ? "text-[var(--color-text-muted)]" : "text-[var(--color-text-secondary)]",
                  iconRightPosition[size],
                  iconSizeClass[size]
                )}
              >
                {rightIcon}
              </span>
            )
          )}
        </div>

        {/* Helper text ou mensagem de erro */}
        {error && errorMessage && (
          <p
            id={errorId}
            className="text-xs leading-[normal] text-[var(--color-danger-default)] flex items-center gap-1"
            role="alert"
          >
            {errorMessage}
          </p>
        )}
        {!error && helperText && (
          <p
            id={helperId}
            className="text-xs leading-[normal] text-[var(--color-text-secondary)]"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
