import * as React from "react";
import { createPortal } from "react-dom";
import { ChevronRight } from "lucide-react";
import { CheckIcon } from "@/components/ui/icons/check";
import { useFloatingDropdown } from "@/lib/use-floating-dropdown";
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
 *
 * `MenuSub` implementa o submenu que o chevron de `showRightIcon` só
 * sinalizava visualmente antes (sem comportamento nenhum por trás) — ver o
 * comentário na própria função para o porquê de não reusar
 * `useFloatingDropdown`/portal aqui.
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

const MenuItem = React.forwardRef<HTMLButtonElement, MenuItemProps>(function MenuItem(
  { className, label, leftIcon, showRightIcon = false, selected = false, intent = "default", state = "default", disabled, ...props },
  ref
) {
  const isDanger = intent === "danger";
  const forceHover = state === "hover";

  return (
    <button
      ref={ref}
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
});

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

export interface MenuSubProps {
  label: string;
  leftIcon?: React.ReactNode;
  disabled?: boolean;
  /** Conteúdo do submenu — `MenuItem`/`MenuDivider`, igual a qualquer outro menu. */
  children: React.ReactNode;
  /** Classes extras no painel flutuante do submenu (ex: `max-h-*` quando a lista é longa). */
  panelClassName?: string;
}

/**
 * MenuSub — item de `MenuItem` (com `showRightIcon` fixo, o chevron já
 * indicava "abre submenu" antes de existir comportamento real por trás) que
 * abre um segundo `ContextMenu` ancorado ao lado, em vez de navegar.
 *
 * Deliberadamente NÃO usa um segundo `createPortal`/`useFloatingDropdown`
 * como o `DropdownMenu` pai: o painel do submenu é um filho React comum
 * (`position: absolute` dentro de um wrapper `relative`), então continua
 * sendo um descendente real no DOM do `ContextMenu` pai — o listener de
 * "clique fora" do pai (`useFloatingDropdown`) já reconhece cliques dentro
 * dele como "dentro do menu". Um segundo portal quebraria essa detecção (o
 * painel do submenu ficaria fora da árvore DOM do pai, viraria "fora" aos
 * olhos do pai) e, pior, quando `align="end"` o wrapper portalado do pai
 * recebe `-translate-x-full` — um `transform` cria novo *containing block*
 * para `position: fixed` descendente, quebrando a matemática de
 * `getBoundingClientRect()` de um segundo portal. `position: absolute`
 * ancorado no próprio wrapper `relative` do `MenuSub` não sofre desse
 * problema (resolve contra o ancestral posicionado mais próximo, não contra
 * a viewport) e nem precisa de reposicionamento em scroll/resize.
 *
 * O único cálculo em JS é a decisão de abrir para a direita ou esquerda
 * (viewport-aware side-flip) — sempre alinhado ao topo do item (sem
 * flip vertical, mesmo nível de sofisticação do `DropdownMenu` pai, que
 * também não faz colisão vertical).
 */
function MenuSub({ label, leftIcon, disabled, children, panelClassName }: MenuSubProps) {
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const [open, setOpen] = React.useState(false);
  const [side, setSide] = React.useState<"right" | "left">("right");

  const updateSide = React.useCallback(() => {
    const rect = triggerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const panelWidth = 220;
    setSide(rect.right + panelWidth > window.innerWidth ? "left" : "right");
  }, []);

  React.useLayoutEffect(() => {
    if (open) updateSide();
  }, [open, updateSide]);

  React.useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("resize", updateSide);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("resize", updateSide);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, updateSide]);

  return (
    <div className="relative w-full" onMouseEnter={() => !disabled && setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <MenuItem
        ref={triggerRef}
        label={label}
        leftIcon={leftIcon}
        showRightIcon
        disabled={disabled}
        aria-haspopup="true"
        aria-expanded={open}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((prev) => !prev);
        }}
      />
      {open && (
        // Sem gap entre trigger e painel (`left-full`/`right-full` puro, sem margin) —
        // de propósito: qualquer espaço vazio aí seria uma "zona morta" que o mouse
        // atravessaria ao mover na diagonal do trigger pro painel, disparando
        // `onMouseLeave` do wrapper no meio do caminho e fechando o submenu antes do
        // usuário conseguir clicar numa opção (problema clássico de flyout menu).
        <div className={cn("absolute top-0 z-50", side === "right" ? "left-full" : "right-full")}>
          <ContextMenu className={cn("max-h-80 overflow-y-auto", panelClassName)}>{children}</ContextMenu>
        </div>
      )}
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
        "border-[var(--color-border-strong)] bg-[var(--color-surface-primary)]",
        "shadow-[0px_8px_16px_0px_rgba(0,0,0,0.32)]",
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
 * DropdownMenu — trigger + `ContextMenu` posicionado via portal. O
 * posicionamento/ciclo de abertura (`document.body` + `getBoundingClientRect`,
 * clique fora, Escape, reposicionamento em scroll/resize) vem do hook
 * compartilhado `useFloatingDropdown` (`src/lib/use-floating-dropdown.ts`) —
 * a mesma infraestrutura usada pelo `Select`. Necessário porque o trigger
 * normalmente vive dentro de um container com `overflow-x-auto`/
 * `overflow-hidden` que cortaria um painel posicionado via CSS absoluto.
 * Fecha ao clicar fora, ao pressionar Escape, ou ao clicar em qualquer item
 * dentro do menu.
 */
function DropdownMenu({ trigger, children, align = "start", className }: DropdownMenuProps) {
  const triggerRef = React.useRef<HTMLDivElement>(null);
  const panelRef = React.useRef<HTMLDivElement>(null);
  const [open, setOpen] = React.useState(false);

  const close = React.useCallback(() => setOpen(false), []);
  const toggle = () => setOpen((prev) => !prev);

  const position = useFloatingDropdown({ open, onClose: close, align, triggerRef, panelRef });

  return (
    <div ref={triggerRef} className="relative inline-flex" onClick={toggle}>
      {trigger}
      {position &&
        createPortal(
          <div
            ref={panelRef}
            className={cn("fixed z-50", align === "end" && "-translate-x-full")}
            style={{ top: position.top, left: position.left }}
          >
            <ContextMenu className={className} onClick={close}>
              {children}
            </ContextMenu>
          </div>,
          document.body
        )}
    </div>
  );
}

export { MenuItem, MenuDivider, MenuGroup, MenuSub, ContextMenu, DropdownMenu };
