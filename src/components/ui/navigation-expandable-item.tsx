import * as React from "react";
import { Bell } from "lucide-react";
import { cn } from "@/lib/utils";

export interface NavigationSubmenuItem {
  key: string;
  label: string;
  onClick?: () => void;
  /** Seleção persistente do item de submenu — marcado com bg-action-primary em opacidade. */
  selected?: boolean;
  disabled?: boolean;
}

export interface NavigationExpandableItemProps {
  className?: string;
  icon?: React.ReactNode;
  label: string;
  /**
   * "active" = seleção sólida do item pai (Figma, sem submenu selecionado).
   * "submenu-active" = um item do submenu está selecionado — marca o pai com a
   * mesma cor em opacidade usada no submenu, em vez do preenchimento sólido.
   */
  parent?: "default" | "active" | "submenu-active";
  items: NavigationSubmenuItem[];
  /** Estado inicial quando não controlado. */
  defaultOpen?: boolean;
  /** Estado controlado — quando omitido, o componente gerencia a própria abertura. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

function NavigationExpandableItem({
  className,
  icon = <Bell className="size-5" />,
  label,
  parent = "default",
  items,
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
}: NavigationExpandableItemProps) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const open = controlledOpen ?? internalOpen;
  const isActive = parent === "active";
  const isSubmenuActive = parent === "submenu-active";

  const toggle = () => {
    const next = !open;
    if (controlledOpen === undefined) setInternalOpen(next);
    onOpenChange?.(next);
  };

  return (
    <div className={cn("flex w-full flex-col items-start", className)}>
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        className={cn(
          "flex h-11 w-full items-center gap-3 rounded-[var(--radius-md)] px-3 py-2.5 transition-colors duration-200",
          isActive
            ? "bg-[var(--color-action-primary)] text-[var(--color-icon-on-action)]"
            : isSubmenuActive
              ? "bg-[var(--color-action-primary)]/12 text-[var(--color-action-primary)]"
              : "text-[var(--color-text-primary)] hover:bg-[var(--color-action-primary)]/12"
        )}
      >
        <span className="flex size-5 shrink-0 items-center justify-center">{icon}</span>
        <span className="flex-1 text-left text-sm font-medium">{label}</span>
        <span
          className={cn(
            "flex size-5 shrink-0 items-center justify-center text-base transition-transform duration-200",
            isActive ? "text-[var(--color-icon-on-action)]" : isSubmenuActive ? "text-[var(--color-action-primary)]" : "text-[var(--color-text-muted)]",
            open && "rotate-90"
          )}
        >
          ›
        </span>
      </button>

      <div
        className="grid w-full transition-[grid-template-rows] duration-200"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div
            className={cn(
              "flex w-full flex-col items-start gap-1 pt-1 transition-opacity duration-200",
              open ? "opacity-100" : "opacity-0"
            )}
          >
            {items.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={item.onClick}
                disabled={item.disabled}
                aria-current={item.selected || undefined}
                className={cn(
                  "w-full rounded-[var(--radius-sm)] py-2 pl-11 pr-3 text-left text-xs font-medium transition-colors",
                  item.selected
                    ? "bg-[var(--color-action-primary)]/12 text-[var(--color-action-primary)]"
                    : item.disabled
                      ? "text-[var(--color-text-muted)]"
                      : "text-[var(--color-text-secondary)] hover:bg-[var(--color-action-primary)]/12 hover:text-[var(--color-text-primary)]"
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export { NavigationExpandableItem };
