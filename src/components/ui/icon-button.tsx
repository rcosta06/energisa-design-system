import * as React from "react";
import { Bell } from "lucide-react";
import { NavigationTooltip } from "@/components/ui/navigation-tooltip";
import { cn } from "@/lib/utils";

export type IconButtonVariant = "ghost" | "destructive";
export type IconButtonSize = "md" | "sm";

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  /** Contador exibido como badge no canto superior direito — omitido = sem notificação. */
  notificationCount?: number;
  /** Type=Ghost/Destructive do Figma (node 3027:24448, dependência do Form/Upload) — ghost é o default (compatível com todo uso atual, sem precisar passar a prop). */
  variant?: IconButtonVariant;
  /**
   * md (44px) = default, comportamento já existente (header/notificação),
   * inalterado. sm (32px) = exatamente o "A. IconButton" do Figma (node
   * 3027:24448, único size documentado lá) — usado pelo Form/AttachmentItem.
   */
  size?: IconButtonSize;
  /** Variante visual — força a aparência de hover/focus/active (uso em Storybook/regressão). */
  state?: "default" | "hover" | "focus" | "active" | "disabled";
  /** Texto do tooltip exibido abaixo do botão ao passar o mouse — omitido = sem tooltip. */
  tooltip?: string;
}

/**
 * Cor do ícone por variant/state, confirmada pixel a pixel via download dos
 * assets do Figma (não pela cor "óbvia" do nome): Ghost é sempre
 * text-primary (Default/Hover/Focus/Active — só o bg muda); Destructive usa
 * danger-default em Default/Focus e danger-hover (mais escuro) em Hover/Active.
 */
function getIconColorClass(variant: IconButtonVariant, forceHover: boolean, forceActive: boolean) {
  if (variant === "ghost") return "text-[var(--color-text-primary)]";
  if (forceHover || forceActive) return "text-[var(--color-danger-hover)]";
  return "text-[var(--color-danger-default)] hover:text-[var(--color-danger-hover)] active:text-[var(--color-danger-hover)]";
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { className, icon = <Bell className="size-6" />, notificationCount, variant = "ghost", size = "md", state = "default", disabled, tooltip, ...props },
  ref
) {
  const isDisabled = state === "disabled" || disabled;
  const forceHover = state === "hover";
  const forceFocus = state === "focus";
  const forceActive = state === "active";
  // sm (Upload/AttachmentItem) usa exatamente o hover do Figma (surface-secondary);
  // md preserva o hover-highlight já validado pro contexto de header/notificação.
  // Classes completas e estáticas (Tailwind precisa ver a string inteira pra gerar o CSS —
  // mesmo motivo documentado em badge.tsx, não dá pra montar isso por interpolação).
  const hoverClass =
    size === "sm"
      ? forceHover
        ? "bg-[var(--color-surface-secondary)]"
        : "hover:bg-[var(--color-surface-secondary)]"
      : forceHover
        ? "bg-[var(--color-hover-highlight)]"
        : "hover:bg-[var(--color-hover-highlight)]";

  return (
    <div className="group relative inline-flex">
      <button
        ref={ref}
        type="button"
        disabled={isDisabled}
        className={cn(
          "relative flex items-center justify-center rounded-[var(--radius-sm)] transition-colors",
          size === "sm" ? "size-8" : "size-11",
          "focus-visible:outline-none",
          getIconColorClass(variant, forceHover, forceActive),
          // Focus (Figma): só borda, sem background adicional.
          forceFocus
            ? "border-2 border-[var(--color-action-primary)]"
            : "border-2 border-transparent focus-visible:border-[var(--color-action-primary)]",
          // Active (Figma): bg vinculado a border-default — token literal, não substituído
          // por surface-secondary só porque hoje resolve pra cor parecida.
          forceActive ? "bg-[var(--color-border-default)]" : "active:bg-[var(--color-border-default)]",
          hoverClass,
          isDisabled && "pointer-events-none opacity-40",
          className
        )}
        {...props}
      >
        <span className={cn("flex items-center justify-center", notificationCount !== undefined && "animate-icon-ring")}>
          {icon}
        </span>
        {notificationCount !== undefined && (
          <span className="absolute -top-0.5 right-px flex h-4 min-w-4 items-center justify-center rounded-[var(--radius-full)] bg-[var(--color-danger-default)] px-1 text-[10px] font-bold text-[var(--color-icon-on-action)]">
            {notificationCount}
          </span>
        )}
      </button>
      {tooltip && !isDisabled && (
        <NavigationTooltip
          label={tooltip}
          className={cn(
            "pointer-events-none absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2 transition-opacity",
            forceHover ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          )}
        />
      )}
    </div>
  );
});

export { IconButton };
