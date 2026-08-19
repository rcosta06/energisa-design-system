import * as React from "react";
import { NavigationItem, type NavigationItemProps } from "@/components/ui/navigation-item";
import { NavigationExpandableItem, type NavigationSubmenuItem } from "@/components/ui/navigation-expandable-item";
import { NavigationAvatar, type NavigationAvatarProps } from "@/components/ui/navigation-avatar";
import { cn } from "@/lib/utils";

type NavItemConfig = Omit<NavigationItemProps, "mode" | "state"> & {
  key: string;
  /** Quando presente (e o sidebar está Expanded), o item vira um NavigationExpandableItem — Figma "Navigation / Side Menu / Expandable Item". Ignorado no modo Collapsed. */
  submenuItems?: NavigationSubmenuItem[];
};
type SidebarState = "expanded" | "collapsed";

function hasSelectedDescendant(items: NavigationSubmenuItem[], selectedKey: string | undefined): boolean {
  return items.some((item) => item.key === selectedKey || (item.items && hasSelectedDescendant(item.items, selectedKey)));
}

function markSubmenuSelection(
  items: NavigationSubmenuItem[],
  selectedKey: string | undefined,
  selectKey: (key: string) => void
): NavigationSubmenuItem[] {
  return items.map((item) => ({
    ...item,
    selected: item.key === selectedKey,
    onClick: () => {
      item.onClick?.();
      selectKey(item.key);
    },
    items: item.items ? markSubmenuSelection(item.items, selectedKey, selectKey) : undefined,
  }));
}

function NavigationDivider({ className }: { className?: string }) {
  return (
    <div className={cn("w-full py-2", className)}>
      <div className="h-px w-full bg-[var(--color-border-default)]" />
    </div>
  );
}

export interface NavigationSidebarProps {
  className?: string;
  /** Estado controlado — quando omitido, o componente gerencia o próprio estado (clique no Brand alterna). */
  state?: SidebarState;
  /** Estado inicial quando não controlado. */
  defaultState?: SidebarState;
  onStateChange?: (state: SidebarState) => void;
  onBrandClick?: () => void;
  brandLabel?: string;
  /** Grupos de itens — cada grupo é separado por um divisor. */
  groups: NavItemConfig[][];
  /** Key do item marcado (ou de um submenuItem) — controlado. */
  selectedKey?: string;
  /** Key inicial marcada quando não controlado. */
  defaultSelectedKey?: string;
  onSelectedKeyChange?: (key: string) => void;
  showUserProfile?: boolean;
  userProfile?: Omit<NavigationAvatarProps, "mode" | "className">;
}

function NavigationSidebar({
  className,
  state: controlledState,
  defaultState = "expanded",
  onStateChange,
  onBrandClick,
  brandLabel = "SCR",
  groups,
  selectedKey: controlledSelectedKey,
  defaultSelectedKey,
  onSelectedKeyChange,
  showUserProfile = false,
  userProfile,
}: NavigationSidebarProps) {
  const [internalState, setInternalState] = React.useState<SidebarState>(defaultState);
  const state = controlledState ?? internalState;
  const isCollapsed = state === "collapsed";
  const itemMode = isCollapsed ? "collapsed" : "expanded";

  const [internalSelectedKey, setInternalSelectedKey] = React.useState<string | undefined>(defaultSelectedKey);
  const selectedKey = controlledSelectedKey ?? internalSelectedKey;

  const handleBrandClick = () => {
    onBrandClick?.();
    const next: SidebarState = state === "expanded" ? "collapsed" : "expanded";
    if (controlledState === undefined) setInternalState(next);
    onStateChange?.(next);
  };

  const selectKey = (key: string) => {
    if (controlledSelectedKey === undefined) setInternalSelectedKey(key);
    onSelectedKeyChange?.(key);
  };

  return (
    <div
      className={cn(
        "flex h-[800px] flex-col items-stretch rounded-[var(--radius-xl)] border border-[var(--color-border-default)]",
        "bg-[var(--color-surface-primary)] py-5 transition-[width,padding] duration-200",
        isCollapsed ? "w-[72px] px-3.5" : "w-64 px-4",
        className
      )}
    >
      <button
        type="button"
        onClick={handleBrandClick}
        aria-label={isCollapsed ? "Expandir menu" : "Recolher menu"}
        className={cn(
          "flex shrink-0 items-center gap-2 overflow-hidden pb-4 pt-2 transition-[gap] duration-200",
          isCollapsed ? "justify-center gap-0" : "w-full pl-3"
        )}
      >
        <div className="size-7 shrink-0 rounded-[var(--radius-xs)] bg-[var(--color-action-primary)]" />
        <p
          className={cn(
            "overflow-hidden whitespace-nowrap text-lg font-bold text-[var(--color-text-primary)]",
            "transition-[max-width,opacity] duration-200",
            isCollapsed ? "max-w-0 opacity-0" : "max-w-[160px] opacity-100"
          )}
        >
          {brandLabel}
        </p>
      </button>

      {groups.map((group, i) => (
        <React.Fragment key={i}>
          <NavigationDivider />
          <div className="flex w-full shrink-0 flex-col items-stretch gap-1 py-1">
            {group.map(({ key, submenuItems, onClick, ...item }) => {
              if (submenuItems && !isCollapsed) {
                const isSubmenuActive = hasSelectedDescendant(submenuItems, selectedKey);
                return (
                  <NavigationExpandableItem
                    key={key}
                    icon={item.icon}
                    label={item.label}
                    parent={isSubmenuActive ? "submenu-active" : "default"}
                    defaultOpen={isSubmenuActive}
                    items={markSubmenuSelection(submenuItems, selectedKey, selectKey)}
                  />
                );
              }
              return (
                <NavigationItem
                  key={key}
                  mode={itemMode}
                  hasSubmenu={!!submenuItems}
                  state={key === selectedKey ? "active" : undefined}
                  onClick={(e) => {
                    onClick?.(e);
                    selectKey(key);
                  }}
                  {...item}
                />
              );
            })}
          </div>
        </React.Fragment>
      ))}

      <div className="min-h-px w-full flex-1" />

      {showUserProfile && <NavigationAvatar mode={itemMode} {...userProfile} />}
    </div>
  );
}

export { NavigationSidebar };
