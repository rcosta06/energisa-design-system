import * as React from "react";
import { cn } from "@/lib/utils";

export type BadgeTone = "info" | "danger" | "success" | "warning" | "neutral" | "purple" | "orange" | "solid";
export type BadgeShape = "pill" | "rounded";
export type BadgeBgOpacity = 8 | 10 | 12 | 15;

// Cor de texto de maior contraste por tom (Complaint/Badge/Level/Priority/Status,
// node 2505:1523/1533/1555) — mais forte que a cor do bg/borda (ex: danger usa
// danger-strong no texto, não danger-default), conforme Figma.
const textClass: Record<BadgeTone, string> = {
  info: "text-[var(--color-brand-blue)]",
  danger: "text-[var(--color-danger-strong)]",
  success: "text-[var(--color-success-strong)]",
  warning: "text-[var(--color-brand-orange)]",
  neutral: "text-[var(--color-text-secondary)]",
  purple: "text-[var(--color-brand-purple)]",
  orange: "text-[var(--color-brand-orange-dark)]",
  /** Ex: badge de segmento (Residencial) — bg opaco, não tinta. */
  solid: "text-[var(--color-text-secondary)]",
};

// Classes completas e estáticas (Tailwind precisa ver a string inteira para gerar o CSS).
const bgClass: Record<BadgeTone, Record<BadgeBgOpacity, string>> = {
  info: { 8: "bg-[var(--color-info-default)]/8", 10: "bg-[var(--color-info-default)]/10", 12: "bg-[var(--color-info-default)]/12", 15: "bg-[var(--color-info-default)]/15" },
  danger: { 8: "bg-[var(--color-danger-default)]/8", 10: "bg-[var(--color-danger-default)]/10", 12: "bg-[var(--color-danger-default)]/12", 15: "bg-[var(--color-danger-default)]/15" },
  success: { 8: "bg-[var(--color-success-default)]/8", 10: "bg-[var(--color-success-default)]/10", 12: "bg-[var(--color-success-default)]/12", 15: "bg-[var(--color-success-default)]/15" },
  warning: { 8: "bg-[var(--color-warning-default)]/8", 10: "bg-[var(--color-warning-default)]/10", 12: "bg-[var(--color-warning-default)]/12", 15: "bg-[var(--color-warning-default)]/15" },
  neutral: { 8: "bg-[var(--color-text-muted)]/8", 10: "bg-[var(--color-text-muted)]/10", 12: "bg-[var(--color-text-muted)]/12", 15: "bg-[var(--color-text-muted)]/15" },
  purple: { 8: "bg-[var(--color-brand-purple)]/8", 10: "bg-[var(--color-brand-purple)]/10", 12: "bg-[var(--color-brand-purple)]/12", 15: "bg-[var(--color-brand-purple)]/15" },
  orange: { 8: "bg-[var(--color-brand-orange)]/8", 10: "bg-[var(--color-brand-orange)]/10", 12: "bg-[var(--color-brand-orange)]/12", 15: "bg-[var(--color-brand-orange)]/15" },
  solid: { 8: "bg-[var(--color-surface-secondary)]", 10: "bg-[var(--color-surface-secondary)]", 12: "bg-[var(--color-surface-secondary)]", 15: "bg-[var(--color-surface-secondary)]" },
};

// Borda cromática sutil (1px, 30% de opacidade, mesmo tom do bg) — conforme Figma. "solid" não tem borda (bg opaco, não tinta).
const borderClass: Record<BadgeTone, string> = {
  info: "border border-[var(--color-info-default)]/30",
  danger: "border border-[var(--color-danger-default)]/30",
  success: "border border-[var(--color-success-default)]/30",
  warning: "border border-[var(--color-warning-default)]/30",
  neutral: "border border-[var(--color-text-muted)]/30",
  purple: "border border-[var(--color-brand-purple)]/30",
  orange: "border border-[var(--color-brand-orange)]/30",
  solid: "",
};

const shapeClass: Record<BadgeShape, string> = {
  pill: "rounded-[var(--radius-full)]",
  rounded: "rounded-[var(--radius-xs)]",
};

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
  shape?: BadgeShape;
  /** Opacidade do background — 15 (Level/Priority) ou 12 (Status), conforme Figma. */
  bgOpacity?: BadgeBgOpacity;
}

function Badge({
  className,
  tone = "neutral",
  shape = "pill",
  bgOpacity = 10,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex max-w-full items-center px-2 py-[3px] text-[11px] font-medium leading-4",
        textClass[tone],
        bgClass[tone][bgOpacity],
        borderClass[tone],
        shapeClass[shape],
        className
      )}
      {...props}
    >
      <span className="truncate">{children}</span>
    </span>
  );
}

export { Badge };
