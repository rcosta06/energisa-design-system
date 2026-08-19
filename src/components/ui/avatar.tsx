import * as React from "react";
import { cn } from "@/lib/utils";

const sizeStyles = {
  lg: "size-9 text-sm",
  sm: "size-[30px] text-xs",
  xs: "size-6 text-[10px]",
} as const;

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** LG = 36px, SM = 30px, XS = 24px */
  size?: keyof typeof sizeStyles;
  /** URL da foto — quando ausente, renderiza as iniciais */
  src?: string;
  /** Iniciais exibidas quando não há foto (ex: "ER") */
  initials?: string;
  alt?: string;
}

function Avatar({ className, size = "sm", src, initials = "", alt = "", ...props }: AvatarProps) {
  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden rounded-[var(--radius-sm)]",
        sizeStyles[size],
        !src && "bg-[var(--color-action-primary)]",
        className
      )}
      {...props}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="size-full border border-[var(--color-border-default)]/50 object-cover"
        />
      ) : (
        <span className="flex size-full items-center justify-center font-semibold text-white">
          {initials}
        </span>
      )}
    </div>
  );
}

export { Avatar };
