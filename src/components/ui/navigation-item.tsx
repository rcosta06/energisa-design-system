import * as React from "react";
import { Bell } from "lucide-react";
import { NavigationTooltip } from "@/components/ui/navigation-tooltip";
import { cn } from "@/lib/utils";

export interface NavigationItemProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  icon?: React.ReactNode;
  label: string;
  mode?: "expanded" | "collapsed";
  hasSubmenu?: boolean;
  /** Variante visual — "hover" força a aparência de hover (uso em Storybook/regressão). "active" é a seleção persistente do item atual. */
  state?: "default" | "hover" | "active" | "disabled";
}

function NavigationItem({
  className,
  icon = <Bell className="size-5" />,
  label,
  mode = "expanded",
  hasSubmenu = false,
  state = "default",
  disabled,
  ...props
}: NavigationItemProps) {
  const isCollapsed = mode === "collapsed";
  const isActive = state === "active";
  const isDisabled = state === "disabled" || disabled;
  const forceHover = state === "hover";

  return (
    <div className="group relative w-full">
      <button
        type="button"
        disabled={isDisabled}
        className={cn(
          // Estrutura sempre a mesma (icon + label + chevron) — só max-width/opacity/gap
          // do label e do chevron mudam entre Expanded/Collapsed, nunca a árvore do DOM.
          "flex h-11 w-full items-center gap-3 rounded-[var(--radius-md)] px-3 py-2.5",
          "transition-[background-color,color,gap] duration-200",
          isCollapsed && "justify-center gap-0",
          isActive
            ? "bg-[var(--color-action-primary)] text-[var(--color-icon-on-action)]"
            : isDisabled
              ? "text-[var(--color-text-muted)] opacity-40"
              : cn(
                  "text-[var(--color-text-primary)]",
                  forceHover ? "bg-[var(--color-action-primary)]/12" : "hover:bg-[var(--color-action-primary)]/12"
                ),
          className
        )}
        {...props}
      >
        <span className="flex size-5 shrink-0 items-center justify-center">{icon}</span>
        <span
          className={cn(
            "overflow-hidden whitespace-nowrap text-left text-sm transition-[max-width,opacity] duration-200",
            isActive ? "font-semibold" : "font-medium",
            isCollapsed ? "max-w-0 opacity-0" : "max-w-[140px] flex-1 opacity-100"
          )}
        >
          {label}
        </span>
        {hasSubmenu && (
          <span
            className={cn(
              "shrink-0 overflow-hidden text-base transition-[max-width,opacity] duration-200",
              isActive ? "text-[var(--color-icon-on-action)]" : "text-[var(--color-text-muted)]",
              isCollapsed ? "max-w-0 opacity-0" : "max-w-[20px] opacity-100"
            )}
          >
            ›
          </span>
        )}
      </button>

      {isCollapsed && (
        <NavigationTooltip
          label={label}
          className={cn(
            "pointer-events-none absolute left-[52px] top-1/2 z-10 -translate-y-1/2 transition-opacity",
            forceHover ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          )}
        />
      )}
    </div>
  );
}

export { NavigationItem };
