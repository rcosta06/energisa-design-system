import * as React from "react";
import { cn } from "@/lib/utils";
import type { LoadingSize, LoadingState } from "./loading-circular";

type BatterySizeConfig = {
  batteryWidth: number;
  batteryHeight: number;
  terminalWidth: number;
  terminalHeight: number;
  bodyWidth: number;
  bodyHeight: number;
  bodyTop: number;
  connectorWidth: number;
  connectorHeight: number;
  barHeight: number;
  barWidth: number;
  text: string;
};

// Dimensões exatas do Figma (node 2775:23642, Component Set "Loading / Battery").
const SIZE_CONFIG: Record<LoadingSize, BatterySizeConfig> = {
  sm: { batteryWidth: 18, batteryHeight: 32, terminalWidth: 8, terminalHeight: 4, bodyWidth: 18, bodyHeight: 28, bodyTop: 4, connectorWidth: 8, connectorHeight: 2, barHeight: 6, barWidth: 120, text: "text-xs" },
  md: { batteryWidth: 24, batteryHeight: 43, terminalWidth: 12, terminalHeight: 5, bodyWidth: 24, bodyHeight: 38, bodyTop: 5, connectorWidth: 10, connectorHeight: 2, barHeight: 8, barWidth: 160, text: "text-sm" },
  lg: { batteryWidth: 32, batteryHeight: 56, terminalWidth: 16, terminalHeight: 6, bodyWidth: 32, bodyHeight: 50, bodyTop: 6, connectorWidth: 12, connectorHeight: 3, barHeight: 10, barWidth: 200, text: "text-base" },
};

// Evolução de energia baixa → completa, na ordem das 4 baterias — tokens
// semantic existentes do DS (confirmados via Figma Variables), não hex cru.
const CELL_COLORS = [
  "var(--color-danger-default)",
  "var(--color-warning-default)",
  "var(--color-info-default)",
  "var(--color-success-default)",
] as const;

const VISIBLE_FRACTION = 0.3;

function determinateFillPercent(value: number, index: number) {
  const pct = ((value - index * 25) / 25) * 100;
  return Math.min(100, Math.max(0, pct));
}

export interface LoadingBatteryProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  size?: LoadingSize;
  state?: LoadingState;
  /** 0–100, usado apenas quando state="determinate". 25% = bateria 1 cheia, 50% = 1+2, etc. */
  value?: number;
  label?: string;
  showLabel?: boolean;
  showProgressBar?: boolean;
  showProgressValue?: boolean;
}

function LoadingBattery({
  className,
  size = "md",
  state = "indeterminate",
  value = 0,
  label = "A carregar dados...",
  showLabel = true,
  showProgressBar = true,
  showProgressValue = true,
  ...props
}: LoadingBatteryProps) {
  const labelId = React.useId();
  const config = SIZE_CONFIG[size];
  const clampedValue = Math.min(100, Math.max(0, value));
  const barFillWidth = config.barWidth * VISIBLE_FRACTION;

  return (
    <div
      className={cn("flex flex-col items-center justify-center gap-3 p-4", className)}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={state === "determinate" ? clampedValue : undefined}
      aria-labelledby={showLabel ? labelId : undefined}
      aria-label={showLabel ? undefined : label}
      {...props}
    >
      <div className="flex shrink-0 items-center gap-1" aria-hidden="true">
        {CELL_COLORS.map((color, index) => (
          <React.Fragment key={index}>
            {index > 0 && (
              <div
                className="shrink-0 rounded-[1px] bg-[var(--color-border-default)]"
                style={{ width: config.connectorWidth, height: config.connectorHeight }}
              />
            )}
            <div className="relative shrink-0" style={{ width: config.batteryWidth, height: config.batteryHeight }}>
              <div
                className="absolute left-1/2 top-0 -translate-x-1/2 rounded-[2px] bg-[var(--color-border-default)]"
                style={{ width: config.terminalWidth, height: config.terminalHeight }}
              />
              <div
                className="absolute left-0 overflow-hidden rounded-[4px] border-[1.5px] border-[var(--color-border-strong)]"
                style={{ width: config.bodyWidth, height: config.bodyHeight, top: config.bodyTop }}
              >
                <div
                  className={cn(
                    "absolute inset-x-0 bottom-0 rounded-[2px]",
                    state === "indeterminate" && `animate-loading-battery-${index + 1}`,
                    state === "determinate" && "loading-value-transition"
                  )}
                  style={{
                    backgroundColor: color,
                    height: state === "determinate" ? `${determinateFillPercent(clampedValue, index)}%` : undefined,
                  }}
                />
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>

      {showLabel && (
        <p id={labelId} className={cn("text-center font-normal whitespace-nowrap text-[var(--color-text-secondary)]", config.text)}>
          {label}
        </p>
      )}

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

      {showProgressValue && (
        <p aria-hidden="true" className={cn("text-center font-medium whitespace-nowrap text-[var(--color-text-secondary)]", config.text)}>
          {state === "determinate" ? `${clampedValue}%` : "..."}
        </p>
      )}
    </div>
  );
}

export { LoadingBattery };
