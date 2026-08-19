import * as React from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export interface NavigationSearchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  mode?: "expanded" | "collapsed";
}

const NavigationSearch = React.forwardRef<HTMLInputElement, NavigationSearchProps>(
  ({ className, mode = "expanded", placeholder = "Buscar...", ...props }, ref) => {
    const isCollapsed = mode === "collapsed";

    return (
      <div
        className={cn(
          "flex h-10 shrink-0 items-center gap-2 overflow-hidden rounded-[var(--radius-md)] border",
          "transition-[width,padding,background-color,border-color] duration-200",
          isCollapsed
            ? "w-11 justify-center border-transparent bg-transparent px-0"
            : "w-[216px] border-[var(--color-border-default)] bg-[var(--color-surface-primary)] px-3",
          className
        )}
      >
        <Search className="size-6 shrink-0 text-[var(--color-text-muted)]" />
        <input
          ref={ref}
          type="search"
          placeholder={placeholder}
          tabIndex={isCollapsed ? -1 : 0}
          aria-hidden={isCollapsed || undefined}
          className={cn(
            "min-w-0 bg-transparent text-sm text-[var(--color-text-primary)] outline-none",
            "placeholder:text-[var(--color-text-muted)] transition-[max-width,opacity] duration-200",
            isCollapsed ? "max-w-0 opacity-0" : "max-w-full flex-1 opacity-100"
          )}
          {...props}
        />
      </div>
    );
  }
);
NavigationSearch.displayName = "NavigationSearch";

export { NavigationSearch };
