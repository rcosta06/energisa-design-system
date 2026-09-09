import * as React from "react";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { BellSimpleRingingIcon } from "@/components/ui/icons/bell-simple-ringing";
import { AlertCheckIcon } from "@/components/ui/icons/alert-check";
import { InfoIcon } from "@/components/ui/icons/info";
import { WarningOctagonIcon } from "@/components/ui/icons/warning-octagon";
import { XCircleIcon } from "@/components/ui/icons/x-circle";
import { XIcon } from "@/components/ui/icons/x";
import { cn } from "@/lib/utils";

/**
 * Toast — Energisa Design System (Figma: "Toast", component set 3127:25038,
 * 5 variantes Type=Neutral/Success/Info/Warning/Error, 384×54 no exemplo).
 *
 * Mesma anatomia/tokens do `Alert` (ver esse arquivo para o raciocínio
 * completo de reuso de `Button`/`IconButton`/ícones — não repetido aqui).
 * Duas diferenças reais, ambas confirmadas via Figma MCP:
 *
 * 1. `dismissible` default `true` (Alert é `false`) — Toast é inerentemente
 *    transitório, então já nasce com a saída visível.
 * 2. `shadow/sm` (Effect Style do Figma: `0px 1px 3px rgba(0,0,0,0.18)`,
 *    single-layer) — via o token `--shadow-toast-sm` (tokens.css). NÃO é o
 *    `--shadow-sm` já existente ali (outro valor, `0 1px 3px rgb(0 0 0/0.1),
 *    0 1px 2px -1px rgb(0 0 0/0.1)`, double-layer, usado por outros
 *    componentes — não relacionado a este Effect Style do Figma apesar do
 *    nome parecido). Token isolado justamente pra não colidir com esse nem
 *    forçar uma migração de quem já usa `--shadow-sm`.
 *
 * Largura: `w-full max-w-[384px]` — 384px é o exemplo do Figma, não uma
 * medida estrutural fixa (confirmado no frame "Toast — Width Test",
 * 3127:26792, que testa 360/384/400px no mesmo componente); `max-w-[384px]`
 * trava em 384px em containers largos e encolhe sem overflow em viewports
 * estreitos.
 */

export type ToastType = "neutral" | "success" | "info" | "warning" | "error";

const typeConfig: Record<
  ToastType,
  { surfaceClass: string; iconColorClass: string; Icon: React.ComponentType<React.SVGProps<SVGSVGElement>> }
> = {
  neutral: {
    surfaceClass: "bg-[var(--color-surface-tertiary)]",
    // Ver comentário equivalente em alert.tsx — token de ícone, não de texto.
    iconColorClass: "text-[var(--color-icon-secondary)]",
    Icon: BellSimpleRingingIcon,
  },
  success: {
    surfaceClass: "bg-[var(--color-success-surface)]",
    iconColorClass: "text-[var(--color-success-strong)]",
    Icon: AlertCheckIcon,
  },
  info: {
    surfaceClass: "bg-[var(--color-info-surface)]",
    iconColorClass: "text-[var(--color-info-strong)]",
    Icon: InfoIcon,
  },
  warning: {
    surfaceClass: "bg-[var(--color-warning-surface)]",
    iconColorClass: "text-[var(--color-warning-strong)]",
    Icon: WarningOctagonIcon,
  },
  error: {
    surfaceClass: "bg-[var(--color-danger-surface)]",
    iconColorClass: "text-[var(--color-danger-strong)]",
    Icon: XCircleIcon,
  },
};

export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface ToastProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title" | "action"> {
  type?: ToastType;
  icon?: boolean;
  title?: string;
  /** Ver `AlertAction`/`AlertProps.action` em `alert.tsx` — mesma decisão de API, mesmo motivo. */
  action?: ToastAction;
  /** Default `true` (diferente do Alert) — ver doc do componente acima. */
  dismissible?: boolean;
  onDismiss?: () => void;
  children: React.ReactNode;
}

/**
 * Acessibilidade: `role="status"` + `aria-live="polite"` para
 * neutral/success/info/warning (anúncio não-interruptivo, apropriado pra
 * feedback transitório comum); `role="alert"` (que já implica live region
 * assertiva) só para `type="error"`. Mesmo critério do `Alert`, adaptado pra
 * um componente cujo propósito inteiro é anunciar mudanças dinâmicas — sem
 * inventar `ToastProvider`/fila/timer (fora do escopo desta etapa: só o
 * componente visual).
 */
function Toast({ className, type = "neutral", icon = true, title, action, dismissible = true, onDismiss, children, ...props }: ToastProps) {
  const config = typeConfig[type];
  const StatusIcon = config.Icon;
  const isError = type === "error";

  return (
    <div
      role={isError ? "alert" : "status"}
      aria-live={isError ? undefined : "polite"}
      className={cn(
        "flex w-full max-w-[384px] items-center gap-[var(--spacing-2)] rounded-[var(--radius-sm)] px-[var(--spacing-3)] py-[var(--spacing-2)] shadow-[var(--shadow-toast-sm)]",
        config.surfaceClass,
        className
      )}
      {...props}
    >
      {icon && <StatusIcon className={cn("size-6 shrink-0", config.iconColorClass)} aria-hidden="true" />}

      <div className="flex min-w-0 flex-1 flex-col gap-[var(--spacing-1)]">
        {/* Ver comentário equivalente em alert.tsx — 13px/18px sem token de type na escala do projeto. */}
        {title && <p className="w-full text-[13px] font-medium leading-[18px] text-[var(--color-text-primary)]">{title}</p>}
        <p className="w-full text-xs leading-4 text-[var(--color-text-secondary)]">{children}</p>
      </div>

      {action && (
        <Button type="button" variant="ghost" size="sm" onClick={action.onClick} className="shrink-0">
          {action.label}
        </Button>
      )}

      {dismissible && (
        <IconButton
          size="sm"
          variant="ghost"
          icon={<XIcon className="size-6 text-[var(--color-text-secondary)]" />}
          onClick={onDismiss}
          aria-label="Fechar"
          className="shrink-0"
        />
      )}
    </div>
  );
}

export { Toast };
