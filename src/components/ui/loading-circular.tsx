import * as React from "react";
import { cn } from "@/lib/utils";
import { BoltIcon } from "./icons/bolt-icon";

export type LoadingSize = "sm" | "md" | "lg";
export type LoadingState = "indeterminate" | "determinate";

type CircularSizeConfig = {
  box: number;
  ring: number;
  bolt: { width: number; height: number };
  barHeight: number;
  barWidth: number;
  text: string;
};

// Dimensões exatas do Figma (node 2775:23642, Component Set "Loading / Circular").
const SIZE_CONFIG: Record<LoadingSize, CircularSizeConfig> = {
  sm: { box: 96, ring: 4.32, bolt: { width: 32, height: 53.85 }, barHeight: 6, barWidth: 96, text: "text-xs" },
  md: { box: 144, ring: 5.76, bolt: { width: 42, height: 70.68 }, barHeight: 8, barWidth: 144, text: "text-sm" },
  lg: { box: 192, ring: 6.72, bolt: { width: 50, height: 84.14 }, barHeight: 10, barWidth: 192, text: "text-base" },
};

// Arco visível e bloco do indicador indeterminate cobrem a mesma fração (30%) —
// ver comentário em tokens.css sobre a medição via endpoints do Figma.
const VISIBLE_FRACTION = 0.3;

export interface LoadingCircularProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  size?: LoadingSize;
  state?: LoadingState;
  /** 0–100, usado apenas quando state="determinate". */
  value?: number;
  label?: string;
  showLabel?: boolean;
  showProgressBar?: boolean;
}

function LoadingCircular({
  className,
  size = "md",
  state = "indeterminate",
  value = 0,
  label = "Processando...",
  showLabel = true,
  showProgressBar = true,
  ...props
}: LoadingCircularProps) {
  const labelId = React.useId();
  const config = SIZE_CONFIG[size];
  const clampedValue = Math.min(100, Math.max(0, value));
  const center = config.box / 2;
  const radius = center - config.ring / 2;
  const circumference = 2 * Math.PI * radius;
  const arcLength = circumference * VISIBLE_FRACTION;
  const barFillWidth = config.barWidth * VISIBLE_FRACTION;
  const determinateOffset = circumference * (1 - clampedValue / 100);

  return (
    <div
      className={cn("flex flex-col items-center justify-center gap-4 p-4", className)}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={state === "determinate" ? clampedValue : undefined}
      aria-labelledby={showLabel ? labelId : undefined}
      aria-label={showLabel ? undefined : label}
      {...props}
    >
      <div className="relative shrink-0" style={{ width: config.box, height: config.box }} aria-hidden="true">
        <svg width={config.box} height={config.box} viewBox={`0 0 ${config.box} ${config.box}`} className="absolute inset-0">
          <circle cx={center} cy={center} r={radius} fill="none" strokeWidth={config.ring} stroke="var(--color-surface-secondary)" />
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            strokeWidth={config.ring}
            strokeLinecap="butt"
            stroke="var(--color-action-primary)"
            strokeDasharray={state === "determinate" ? circumference : `${arcLength} ${circumference - arcLength}`}
            strokeDashoffset={state === "determinate" ? determinateOffset : undefined}
            className={cn(
              "loading-ring-arc",
              state === "indeterminate" && "animate-loading-ring",
              state === "determinate" && "loading-value-transition"
            )}
          />
        </svg>
        <BoltIcon
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[var(--color-action-primary)]"
          style={{ width: config.bolt.width, height: config.bolt.height }}
        />
      </div>

      {showProgressBar && (
        <div
          className="relative shrink-0 overflow-hidden rounded-[var(--radius-full)]"
          style={{ width: config.barWidth, height: config.barHeight }}
          aria-hidden="true"
        >
          <div className="absolute inset-0 rounded-[var(--radius-full)] bg-[var(--color-surface-secondary)]" />
          {state === "determinate" ? (
            <div
              className="loading-value-transition absolute inset-y-0 left-0 rounded-[var(--radius-full)] bg-[var(--color-action-primary)]"
              style={{ width: `${clampedValue}%` }}
            />
          ) : (
            <div
              className="animate-loading-bar absolute inset-y-0 left-0 rounded-[var(--radius-full)] bg-[var(--color-action-primary)]"
              style={{ width: barFillWidth }}
            />
          )}
        </div>
      )}

      {showLabel && (
        <p id={labelId} className={cn("text-center font-normal whitespace-nowrap text-[var(--color-text-secondary)]", config.text)}>
          {label}
        </p>
      )}
    </div>
  );
}

export { LoadingCircular };
