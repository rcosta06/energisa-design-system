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
 * Alert — Energisa Design System (Figma: "Alert", component set 3124:26756,
 * 5 variantes Type=Neutral/Success/Info/Warning/Error, 400×54 no exemplo do
 * Figma — largura NÃO é estrutural, ver `AlertProps.className`).
 *
 * Reaproveita `Button` (Ghost/SM — bate pixel a pixel com o Action do Figma:
 * `px-4 py-2 text-xs leading-4 rounded-sm`, sem nenhum override) e
 * `IconButton` (size="sm" — 32px, `rounded-sm`, ícone 24px centralizado =
 * exatamente o inset de 4px do Dismiss no Figma) para as duas ações — não
 * duplica estilo de botão. O ícone de status usa arquivos próprios em
 * `icons/` (ver mapeamento abaixo); o de dismiss reaproveita `XIcon`
 * (já existente, path idêntico ao exportado pelo Figma pra este componente).
 *
 * Estrutura (todas via `flex`, sem `position: absolute`): Root (row,
 * `gap-2`) → Icon (24px, opcional) → Content (`flex-1 min-w-0`, column,
 * `gap-1`: Title opcional + Description) → Action (opcional) → Dismiss
 * (opcional). Cada slot omitido simplesmente não renderiza — o `gap` do
 * flex nunca deixa espaço fantasma pro que falta.
 */

export type AlertType = "neutral" | "success" | "info" | "warning" | "error";

const typeConfig: Record<
  AlertType,
  { surfaceClass: string; iconColorClass: string; Icon: React.ComponentType<React.SVGProps<SVGSVGElement>> }
> = {
  neutral: {
    surfaceClass: "bg-[var(--color-surface-tertiary)]",
    // Ícone usa o token de ÍCONE (Figma: Variable "icon-secondary"), não o de texto —
    // mesmo valor hoje, mas semanticamente distinto (ver tokens.css). Description
    // continua em text-secondary, sem mudança.
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

export interface AlertAction {
  label: string;
  onClick: () => void;
}

export interface AlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title" | "action"> {
  /** Figma "Type" — define surface + cor do ícone de status. */
  type?: AlertType;
  /** Mostra o ícone de status (24px) à esquerda — default true, conforme Figma. */
  icon?: boolean;
  /** Presente = renderiza a linha de título; omitido = só a descrição (children), que "sobe" naturalmente (sem gap fantasma). */
  title?: string;
  /**
   * Ação secundária — renderizada como `Button` real (Ghost/SM, Figma
   * "Action"). Objeto `{label, onClick}` em vez de composição livre: é o
   * único slot do Alert com comportamento (clique), então encapsular o par
   * label/handler evita cada consumidor ter que lembrar de usar
   * `variant="ghost" size="sm"` por conta própria — mas o componente que
   * renderiza por baixo continua sendo o `Button` oficial, não um novo.
   */
  action?: AlertAction;
  /** Mostra o botão de fechar (IconButton size="sm", Figma "Dismiss") — default false, conforme Figma. */
  dismissible?: boolean;
  onDismiss?: () => void;
  children: React.ReactNode;
}

/**
 * Semântica de acessibilidade: `role="status"` (live region "polite" — não
 * usado indiscriminadamente como `role="alert"` em todo Alert, só onde faz
 * sentido) para neutral/success/info/warning, e `role="alert"` (assertive)
 * só para `type="error"` — o único caso em que uma mensagem CONTEXTUAL
 * (não um toast, que já é inerentemente transitório) precisa interromper o
 * usuário. Decisão interna ao componente, sem prop nova: não muda o visual,
 * só o que o leitor de tela anuncia.
 */
function Alert({ className, type = "neutral", icon = true, title, action, dismissible = false, onDismiss, children, ...props }: AlertProps) {
  const config = typeConfig[type];
  const StatusIcon = config.Icon;

  return (
    <div
      role={type === "error" ? "alert" : "status"}
      className={cn(
        "flex w-full items-center gap-[var(--spacing-2)] rounded-[var(--radius-sm)] px-[var(--spacing-3)] py-[var(--spacing-2)]",
        config.surfaceClass,
        className
      )}
      {...props}
    >
      {icon && <StatusIcon className={cn("size-6 shrink-0", config.iconColorClass)} aria-hidden="true" />}

      <div className="flex min-w-0 flex-1 flex-col gap-[var(--spacing-1)]">
        {/* 13px/18px (Figma): a escala de type do projeto pula de 12px (--text-xs) pra
            14px (--text-sm) — não existe token pra 13px, então é literal (mesmo padrão já
            usado no projeto pra valores do Figma sem token/Effect Style correspondente). */}
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

export { Alert };
