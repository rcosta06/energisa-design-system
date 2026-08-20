import * as React from "react";
import { createPortal } from "react-dom";
import { ChevronRight } from "lucide-react";
import { CheckIcon } from "@/components/ui/icons/check";
import { cn } from "@/lib/utils";

/**
 * Menu — Energisa Design System (Figma: Menu / Item — node 2627:2690,
 * Menu / Context Menu — node 2627:2989).
 *
 * `MenuItem` monta a ordem exata do Figma: [leftIcon] label [check se
 * selected] [chevron se showRightIcon]. O chevron reaproveita o `ChevronRight`
 * da lucide-react porque o "CaretRight" do Figma é stroke-based (M9 6L15
 * 12L9 18, stroke-width 2, round) — geometria idêntica, só o sentido do
 * path é invertido, o que não muda o resultado visual. O check já não tem
 * equivalente exato (viewBox 14×11 próprio) — por isso o ícone dedicado em
 * `src/components/ui/icons/check.tsx`.
 */
export interface MenuItemProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onSelect"> {
  label: string;
  leftIcon?: React.ReactNode;
  /** Mostra o chevron à direita — indica que o item abre um submenu. */
  showRightIcon?: boolean;
  /** Mostra o checkmark ao lado do texto — item marcado/selecionado. */
  selected?: boolean;
  intent?: "default" | "danger";
  /** Variante visual — força hover (uso em Storybook/regressão). */
  state?: "default" | "hover";
}

function MenuItem({
  className,
  label,
  leftIcon,
  showRightIcon = false,
  selected = false,
  intent = "default",
  state = "default",
  disabled,
  ...props
}: MenuItemProps) {
  const isDanger = intent === "danger";
  const forceHover = state === "hover";

  return (
    <button
      type="button"
      disabled={disabled}
      className={cn(
        "flex w-full items-center gap-2 rounded-[var(--radius-sm)] px-3 py-2 text-left text-sm font-medium",
        "disabled:pointer-events-none disabled:text-[var(--color-text-muted)]",
        isDanger ? "text-[var(--color-danger-default)]" : "text-[var(--color-text-primary)]",
        !disabled &&
          (forceHover
            ? "bg-[var(--color-surface-secondary)]"
            : "hover:bg-[var(--color-surface-secondary)] active:bg-[var(--color-surface-secondary)]"),
        className
      )}
      {...props}
    >
      {leftIcon && <span className="flex size-6 shrink-0 items-center justify-center">{leftIcon}</span>}
      <span className="min-w-0 flex-1 truncate">{label}</span>
      {selected && <CheckIcon className="size-6 shrink-0" />}
      {showRightIcon && <ChevronRight className="size-6 shrink-0" />}
    </button>
  );
}

function MenuDivider({ className }: { className?: string }) {
  return (
    <div className={cn("w-full px-3 py-1", className)}>
      <div className="h-px w-full bg-[var(--color-border-default)]" />
    </div>
  );
}

function MenuGroup({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div role="group" className={cn("flex w-full flex-col items-start", className)} {...props}>
      {children}
    </div>
  );
}

export interface ContextMenuProps extends React.HTMLAttributes<HTMLDivElement> {}

function ContextMenu({ className, children, ...props }: ContextMenuProps) {
  return (
    <div
      role="menu"
      className={cn(
        "flex w-[210px] min-w-[200px] flex-col items-start gap-0 rounded-[var(--radius-md)] border p-1",
        "border-[var(--color-border-default)] bg-[var(--color-surface-primary)]",
        "shadow-[0px_4px_6px_0px_rgba(0,0,0,0.22)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export interface DropdownMenuProps {
  /** Elemento que abre o menu ao ser clicado (ex: um IconButton de "Mais ações"). */
  trigger: React.ReactNode;
  /** Conteúdo do menu — `MenuItem`/`MenuDivider`/`MenuGroup`. */
  children: React.ReactNode;
  /** Lado do trigger ao qual o painel se alinha. */
  align?: "start" | "end";
  className?: string;
}

/**
 * DropdownMenu — trigger + `ContextMenu` posicionado via portal, o mesmo
 * padrão já usado pelo tooltip do `ComplaintList` (`document.body` +
 * `getBoundingClientRect`, necessário porque o trigger normalmente vive
 * dentro de um container com `overflow-x-auto`/`overflow-hidden` que
 * cortaria um painel posicionado via CSS absoluto). Fecha ao clicar fora,
 * ao pressionar Escape, ou ao clicar em qualquer item dentro do menu.
 */
function DropdownMenu({ trigger, children, align = "start", className }: DropdownMenuProps) {
  const triggerRef = React.useRef<HTMLDivElement>(null);
  const [pos, setPos] = React.useState<{ top: number; left: number } | null>(null);

  const close = React.useCallback(() => setPos(null), []);

  const toggle = () => {
    if (pos) {
      close();
      return;
    }
    const rect = triggerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ top: rect.bottom + 4, left: align === "end" ? rect.right : rect.left });
  };

  React.useEffect(() => {
    if (!pos) return;
    const handlePointerDown = (e: PointerEvent) => {
      if (triggerRef.current?.contains(e.target as Node)) return;
      close();
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [pos, close]);

  return (
    <div ref={triggerRef} className="relative inline-flex" onClick={toggle}>
      {trigger}
      {pos &&
        createPortal(
          <ContextMenu
            className={cn("fixed z-50", align === "end" && "-translate-x-full", className)}
            style={{ top: pos.top, left: pos.left }}
            onClick={close}
          >
            {children}
          </ContextMenu>,
          document.body
        )}
    </div>
  );
}

export { MenuItem, MenuDivider, MenuGroup, ContextMenu, DropdownMenu };
