import * as React from "react";
import { MoonIcon } from "@/components/ui/icons/moon";
import { SunIcon } from "@/components/ui/icons/sun";
import { NavigationTooltip } from "@/components/ui/navigation-tooltip";
import { cn } from "@/lib/utils";

export interface ThemeToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: "light" | "dark";
  /** Variante visual — "hover" força a aparência de hover (uso em Storybook/regressão). */
  state?: "default" | "hover";
  /** Texto do tooltip exibido abaixo do botão ao passar o mouse — omitido = sem tooltip. */
  tooltip?: string;
}

function ThemeToggle({ className, theme = "light", state = "default", tooltip, ...props }: ThemeToggleProps) {
  const forceHover = state === "hover";

  return (
    <div className="group relative inline-flex">
      <button
        type="button"
        aria-label={theme === "light" ? "Ativar modo escuro" : "Ativar modo claro"}
        className={cn(
          "flex size-11 items-center justify-center rounded-[var(--radius-sm)] text-[var(--color-text-secondary)] transition-colors",
          forceHover ? "bg-[var(--color-hover-highlight)]" : "hover:bg-[var(--color-hover-highlight)]",
          className
        )}
        {...props}
      >
        {theme === "light" ? <MoonIcon className="size-6" /> : <SunIcon className="size-6" />}
      </button>
      {tooltip && (
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

export { ThemeToggle };
