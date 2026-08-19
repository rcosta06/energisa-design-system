import * as React from "react";
import { cn } from "@/lib/utils";

export type BadgeTone = "info" | "danger" | "success" | "warning" | "neutral" | "purple" | "orange" | "solid";
export type BadgeShape = "pill" | "rounded";
export type BadgeBgOpacity = 8 | 10;

const textClass: Record<BadgeTone, string> = {
  info: "text-[var(--color-info-default)]",
  danger: "text-[var(--color-danger-default)]",
  success: "text-[var(--color-success-default)]",
  warning: "text-[var(--color-warning-default)]",
  neutral: "text-[var(--color-text-muted)]",
  purple: "text-[var(--color-brand-purple)]",
  orange: "text-[var(--color-brand-orange)]",
  /** Ex: badge de segmento (Residencial) — bg opaco, não tinta. */
  solid: "text-[var(--color-text-secondary)]",
};

// Classes completas e estáticas (Tailwind precisa ver a string inteira para gerar o CSS).
const bgClass: Record<BadgeTone, Record<BadgeBgOpacity, string>> = {
  info: { 8: "bg-[var(--color-info-default)]/8", 10: "bg-[var(--color-info-default)]/10" },
  danger: { 8: "bg-[var(--color-danger-default)]/8", 10: "bg-[var(--color-danger-default)]/10" },
  success: { 8: "bg-[var(--color-success-default)]/8", 10: "bg-[var(--color-success-default)]/10" },
  warning: { 8: "bg-[var(--color-warning-default)]/8", 10: "bg-[var(--color-warning-default)]/10" },
  neutral: { 8: "bg-[var(--color-text-muted)]/8", 10: "bg-[var(--color-text-muted)]/10" },
  purple: { 8: "bg-[var(--color-brand-purple)]/8", 10: "bg-[var(--color-brand-purple)]/10" },
  orange: { 8: "bg-[var(--color-brand-orange)]/8", 10: "bg-[var(--color-brand-orange)]/10" },
  solid: { 8: "bg-[var(--color-surface-secondary)]", 10: "bg-[var(--color-surface-secondary)]" },
};

const shapeClass: Record<BadgeShape, string> = {
  pill: "rounded-[var(--radius-full)]",
  rounded: "rounded-[var(--radius-xs)]",
};

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
  shape?: BadgeShape;
  /** Opacidade do background — 10 (Level/Priority) ou 8 (Status), conforme Figma. */
  bgOpacity?: BadgeBgOpacity;
}

function Badge({
  className,
  tone = "neutral",
  shape = "pill",
  bgOpacity = 10,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center whitespace-nowrap px-2 py-[3px] text-[11px] font-medium leading-4",
        textClass[tone],
        bgClass[tone][bgOpacity],
        shapeClass[shape],
        className
      )}
      {...props}
    />
  );
}

export { Badge };
