import * as React from "react";
import { Bell } from "lucide-react";
import { NavigationTooltip } from "@/components/ui/navigation-tooltip";
import { cn } from "@/lib/utils";

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  /** Contador exibido como badge no canto superior direito — omitido = sem notificação. */
  notificationCount?: number;
  /** Variante visual — força a aparência de hover/focus (uso em Storybook/regressão). */
  state?: "default" | "hover" | "focus" | "disabled";
  /** Texto do tooltip exibido abaixo do botão ao passar o mouse — omitido = sem tooltip. */
  tooltip?: string;
}

function IconButton({
  className,
  icon = <Bell className="size-6" />,
  notificationCount,
  state = "default",
  disabled,
  tooltip,
  ...props
}: IconButtonProps) {
  const isDisabled = state === "disabled" || disabled;
  const forceHover = state === "hover";
  const forceFocus = state === "focus";

  return (
    <div className="group relative inline-flex">
      <button
        type="button"
        disabled={isDisabled}
        className={cn(
          "relative flex size-11 items-center justify-center rounded-[var(--radius-sm)] text-[var(--color-text-secondary)] transition-colors",
          "focus-visible:outline-none",
          forceFocus
            ? "border-2 border-[var(--color-action-primary)] bg-[var(--color-surface-secondary)]"
            : "border-2 border-transparent focus-visible:border-[var(--color-action-primary)] focus-visible:bg-[var(--color-surface-secondary)]",
          forceHover
            ? "bg-[var(--color-hover-highlight)]"
            : "hover:bg-[var(--color-hover-highlight)]",
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
}

export { IconButton };
