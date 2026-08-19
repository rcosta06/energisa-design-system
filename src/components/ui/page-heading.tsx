import * as React from "react";
import { cn } from "@/lib/utils";

const levelClass = {
  xl: "text-xl font-semibold leading-8",
  lg: "text-lg font-semibold leading-7",
  md: "text-base font-medium leading-6",
} as const;

export interface PageHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  level?: keyof typeof levelClass;
  bullet?: boolean;
  divider?: boolean;
}

function PageHeading({ className, text, level = "xl", bullet = true, divider = true, ...props }: PageHeadingProps) {
  return (
    <div className={cn("flex w-full flex-col items-start gap-3", className)} {...props}>
      <div className="flex w-full items-center gap-2">
        {bullet && <div className="size-1 shrink-0 rounded-full bg-[var(--color-action-primary)]" />}
        <p className={cn("flex-1 text-[var(--color-text-primary)]", levelClass[level])}>{text}</p>
      </div>
      {divider && <div className="h-px w-full bg-[var(--color-border-strong)]" />}
    </div>
  );
}

export { PageHeading };
