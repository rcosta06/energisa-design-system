import * as React from "react";
import { cn } from "@/lib/utils";

export interface SegmentedControlItem {
  value: string;
  icon: React.ReactNode;
  label: string;
  disabled?: boolean;
}

export interface SegmentedControlProps {
  items: SegmentedControlItem[];
  value: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

function SegmentedControl({ items, value, onValueChange, className }: SegmentedControlProps) {
  return (
    <div
      role="tablist"
      className={cn(
        "inline-flex h-11 items-center overflow-hidden rounded-[var(--radius-sm)]",
        "border border-[var(--color-border-strong)] bg-[var(--color-surface-secondary)]",
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
                "flex h-full shrink-0 items-center gap-2 px-3 text-sm font-medium transition-colors",
                selected
                  ? "bg-[var(--color-action-primary)] text-[var(--color-icon-on-action)] hover:bg-[var(--color-action-primary-hover)]"
                  : item.disabled
                    ? "bg-[var(--color-surface-secondary)] text-[var(--color-text-muted)]"
                    : "bg-[var(--color-surface-secondary)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-primary)] hover:text-[var(--color-text-primary)]"
              )}
            >
              <span className="flex size-6 shrink-0 items-center justify-center">{item.icon}</span>
              <span className="whitespace-nowrap">{item.label}</span>
            </button>
          </React.Fragment>
        );
      })}
    </div>
  );
}

export { SegmentedControl };
