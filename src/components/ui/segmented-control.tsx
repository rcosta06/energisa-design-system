import * as React from "react";
import { cn } from "@/lib/utils";

export interface SegmentedControlItem {
  value: string;
  icon: React.ReactNode;
  label: string;
  disabled?: boolean;
}

const sizeStyles = {
  lg: { height: "h-11", padding: "px-3", gap: "gap-2", icon: "size-6" },
  md: { height: "h-9", padding: "px-2", gap: "gap-1", icon: "size-5" },
  sm: { height: "h-7", padding: "px-2", gap: "gap-1", icon: "size-4" },
} as const;

export interface SegmentedControlProps {
  items: SegmentedControlItem[];
  value: string;
  onValueChange?: (value: string) => void;
  /** LG (44px) / MD (36px) / SM (28px) — texto sempre 14px, só padding/altura/ícone mudam. */
  size?: keyof typeof sizeStyles;
  className?: string;
}

function SegmentedControl({ items, value, onValueChange, size = "lg", className }: SegmentedControlProps) {
  const s = sizeStyles[size];

  return (
    <div
      role="tablist"
      className={cn(
        "inline-flex items-center overflow-hidden rounded-[var(--radius-sm)]",
        "border border-[var(--color-border-strong)] bg-[var(--color-surface-secondary)]",
        s.height,
        className
      )}
    >
      {items.map((item, i) => {
        const selected = item.value === value;
        return (
          <React.Fragment key={item.value}>
            {i > 0 && <div className="h-full w-px shrink-0 bg-[var(--color-border-strong)]" />}
            <button
              type="button"
              role="tab"
              aria-selected={selected}
              disabled={item.disabled}
              onClick={() => onValueChange?.(item.value)}
              className={cn(
                "flex h-full shrink-0 items-center text-sm font-medium transition-colors",
                s.padding,
                s.gap,
                selected
                  ? "bg-[var(--color-action-primary)] text-[var(--color-icon-on-action)] hover:bg-[var(--color-action-primary-hover)]"
                  : item.disabled
                    ? "bg-[var(--color-surface-secondary)] text-[var(--color-text-muted)]"
                    : "bg-[var(--color-surface-secondary)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-primary)] hover:text-[var(--color-text-primary)]"
              )}
            >
              <span className={cn("flex shrink-0 items-center justify-center", s.icon)}>{item.icon}</span>
              <span className="whitespace-nowrap">{item.label}</span>
            </button>
          </React.Fragment>
        );
      })}
    </div>
  );
}

export { SegmentedControl };
