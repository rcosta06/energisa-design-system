import * as React from "react";
import { cn } from "@/lib/utils";

export interface NavigationTooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
}

function NavigationTooltip({ className, label, ...props }: NavigationTooltipProps) {
  return (
    <div
      className={cn(
        "flex items-start whitespace-nowrap rounded-[6px] border border-[var(--color-tooltip-border)]",
        "bg-[var(--color-tooltip-background)] px-2 py-1.5 drop-shadow-[0px_2px_2px_rgba(0,0,0,0.12)]",
        className
      )}
      {...props}
    >
      <p className="text-xs font-medium leading-4 text-[var(--color-tooltip-text)]">{label}</p>
    </div>
  );
}

export { NavigationTooltip };
