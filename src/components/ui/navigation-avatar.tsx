import * as React from "react";
import { ChevronDown } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export interface NavigationAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  mode?: "expanded" | "collapsed";
  /** Variante visual — "hover" força a aparência de hover (uso em Storybook/regressão). */
  state?: "default" | "hover";
  userName?: string;
  role?: string;
  avatarInitials?: string;
  avatarSrc?: string;
  /** Mostra o bloco de nome/cargo/seta (apenas relevante quando mode="expanded"). */
  showUserInfo?: boolean;
}

function NavigationAvatar({
  className,
  mode = "expanded",
  state = "default",
  userName = "Eren",
  role = "Designer",
  avatarInitials = "ER",
  avatarSrc,
  showUserInfo = true,
  ...props
}: NavigationAvatarProps) {
  const isCollapsed = mode === "collapsed";
  const forceHover = state === "hover";

  return (
    <div
      className={cn(
        "flex items-center rounded-[var(--radius-sm)]",
        "transition-[width,padding,gap,background-color] duration-200",
        isCollapsed ? "size-[52px] justify-center gap-0 p-4" : "h-[52px] w-[216px] gap-3 py-4 pl-2 pr-4",
        forceHover ? "bg-[var(--color-hover-highlight)]" : "hover:bg-[var(--color-hover-highlight)]",
        className
      )}
      {...props}
    >
      <Avatar size="lg" initials={avatarInitials} src={avatarSrc} alt={userName} />
      {showUserInfo && (
        <div
          className={cn(
            "flex min-w-0 items-center gap-3 overflow-hidden transition-[max-width,opacity] duration-200",
            isCollapsed ? "max-w-0 opacity-0" : "max-w-[160px] flex-1 opacity-100"
          )}
        >
          <div className="flex min-w-0 flex-1 flex-col gap-0.5 overflow-hidden">
            <p className="truncate text-sm font-semibold text-[var(--color-text-primary)]">{userName}</p>
            <p className="truncate text-xs text-[var(--color-text-secondary)]">{role}</p>
          </div>
          <ChevronDown className="size-6 shrink-0 text-[var(--color-text-secondary)]" />
        </div>
      )}
    </div>
  );
}

export { NavigationAvatar };
