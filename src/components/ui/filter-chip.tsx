import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * FilterChip — Energisa Design System (Figma: "Filtro Atendimento", node
 * 2676:3644 — Select / Filter Chip, node 2752:24541).
 *
 * O Figma só define o state "Default" (não-selecionado) para esse chip —
 * não há uma variante "Selected" no arquivo. O estado selecionado abaixo
 * reaproveita o mesmo padrão de toggle já usado no `SegmentedControl`
 * (`action-primary`/`icon-on-action`), não um valor inventado.
 */

export interface FilterChipProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

function FilterChip({ label, selected = false, onClick, className }: FilterChipProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        "whitespace-nowrap rounded-[var(--radius-xs)] px-[10px] py-1 text-xs font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-action-primary)]",
        selected
          ? "bg-[var(--color-action-primary)] text-[var(--color-icon-on-action)]"
          : "bg-[var(--color-surface-secondary)] text-[var(--color-text-secondary)] hover:opacity-80",
        className
      )}
    >
      {label}
    </button>
  );
}

export { FilterChip };
