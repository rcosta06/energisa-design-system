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

const sizeStyles = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-4 text-base",
};

const iconPaddingLeft = {
  sm: "pl-8",
  md: "pl-10",
  lg: "pl-11",
};

const iconPaddingRight = {
  sm: "pr-8",
  md: "pr-10",
  lg: "pr-11",
};

const iconSizeClass = {
  sm: "size-3.5",
  md: "size-4",
  lg: "size-5",
};

const iconLeftPosition = {
  sm: "left-2.5",
  md: "left-3",
  lg: "left-3.5",
};

const iconRightPosition = {
  sm: "right-2.5",
  md: "right-3",
  lg: "right-3.5",
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
      <div className="flex flex-col gap-1.5 w-full">
        {/* Campo */}
        <div className="relative flex items-center w-full">
          {/* Ícone esquerdo */}
          {hasLeftIcon && (
            <span
              className={cn(
                "absolute top-1/2 -translate-y-1/2 flex items-center",
                "text-[var(--color-text-secondary)] pointer-events-none",
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
              // Borda default
              !error &&
                "border-[var(--color-border-strong)] hover:border-[var(--color-action-primary)]",
              // Focus
              !error &&
                "focus:border-[var(--color-action-primary)] focus:ring-2 focus:ring-[var(--color-action-primary)]/20",
              // Erro
              error &&
                "border-[var(--color-danger-default)] hover:border-[var(--color-danger-default)]",
              error &&
                "focus:border-[var(--color-danger-default)] focus:ring-2 focus:ring-[var(--color-danger-default)]/20",
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
                  "text-[var(--color-text-secondary)] pointer-events-none",
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
            className="text-xs text-[var(--color-danger-default)] flex items-center gap-1"
            role="alert"
          >
            {errorMessage}
          </p>
        )}
        {!error && helperText && (
          <p
            id={helperId}
            className="text-xs text-[var(--color-text-secondary)]"
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
