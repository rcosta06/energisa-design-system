import * as React from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Drawer — Energisa Design System.
 *
 * Componente estrutural genérico (painel deslizante lateral + overlay).
 * Não conhece conteúdo de domínio (filtros, reclamações, etc.) — `title`,
 * `children` e `footer` são slots livres para o consumidor.
 *
 * NOTA DE FIDELIDADE: o Figma MCP estava desconectado durante esta
 * implementação (node 2676:3644 não pôde ser lido). Medidas de largura
 * (`sm`/`md`/`lg`), radius (`none`, painel encostado na borda da viewport),
 * shadow (`--shadow-xl`, token já existente) e o ícone do botão fechar
 * (`X` da lucide-react, biblioteca padrão do projeto) foram escolhidos com
 * base em tokens/padrões já estabelecidos no Design System, não conferidos
 * pixel a pixel contra o Figma. Revisar contra o node assim que o MCP
 * reconectar.
 *
 * Portal em `document.body` — mesmo padrão de `DropdownMenu`/`Select`
 * (necessário para não ser cortado por overflow/scroll da página). Ao
 * contrário do floating layer do Menu/Select (posicionado relativo a um
 * trigger via `useFloatingDropdown`), o Drawer é ancorado na borda da
 * viewport, não a um elemento — por isso implementa seu próprio
 * listener de Escape em vez de reaproveitar aquele hook (cuja API
 * pressupõe um `triggerRef` que não existe aqui). O fechar-por-clique-fora
 * é resolvido pelo próprio overlay (`onClick`), sem necessidade de detectar
 * clique fora via listener no document.
 *
 * ANIMAÇÃO: abertura usa duplo `requestAnimationFrame` antes de trocar para
 * `visible=true` — necessário para garantir que o navegador pinte o estado
 * fechado (`closedTransform`) antes de iniciar a transição; um único rAF é
 * uma race condition conhecida (pode disparar antes do paint, colapsando os
 * dois estados no mesmo frame e fazendo a transição "sumir"). O fechamento
 * não precisa disso — parte de um estado já pintado/estável, então o
 * `useEffect` seta `visible=false` de forma síncrona.
 *
 * `motion-reduce:transition-none` no Panel e no Overlay é proposital — se o
 * usuário tiver `prefers-reduced-motion: reduce` ativo no SO/navegador, o
 * Drawer abre/fecha instantaneamente, sem slide. Isso é o comportamento de
 * acessibilidade correto, não um bug — não remover nem contornar.
 */

export type DrawerSide = "left" | "right";
export type DrawerSize = "sm" | "md" | "lg";

const sizeClass: Record<DrawerSize, string> = {
  sm: "w-[320px] max-w-full",
  md: "w-[400px] max-w-full",
  lg: "w-[480px] max-w-full",
};

const closedTransform: Record<DrawerSide, string> = {
  left: "-translate-x-full",
  right: "translate-x-full",
};

export interface DrawerProps {
  /** Estado controlado — aberto/fechado. */
  open: boolean;
  onOpenChange: (open: boolean) => void;
  side?: DrawerSide;
  size?: DrawerSize;
  title?: string;
  /** Mostra o botão de fechar (X) no Header — só relevante quando `title` está presente. */
  showClose?: boolean;
  /** Slot de rodapé — permanece fixo no final do painel enquanto o Content rola. */
  footer?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

function Drawer({
  open,
  onOpenChange,
  side = "left",
  size = "md",
  title,
  showClose = true,
  footer,
  children,
  className,
}: DrawerProps) {
  const [mounted, setMounted] = React.useState(open);
  const [visible, setVisible] = React.useState(false);
  const panelRef = React.useRef<HTMLDivElement>(null);
  const closeButtonRef = React.useRef<HTMLButtonElement>(null);
  const previousActiveElement = React.useRef<HTMLElement | null>(null);
  const reactId = React.useId();
  const headingId = `drawer-title-${reactId}`;

  const close = React.useCallback(() => onOpenChange(false), [onOpenChange]);

  // Monta antes de animar para dentro; some do DOM só depois da transição de saída terminar.
  React.useEffect(() => {
    if (open) {
      previousActiveElement.current = document.activeElement as HTMLElement | null;
      setMounted(true);
      // Duplo rAF: garante que o navegador pinte o estado fechado (closedTransform)
      // antes de trocar para `visible=true` — um único rAF pode disparar antes do
      // paint, fazendo o browser colapsar os dois estados num frame só (sem transição).
      let raf2 = 0;
      const raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => setVisible(true));
      });
      return () => {
        cancelAnimationFrame(raf1);
        cancelAnimationFrame(raf2);
      };
    }
    setVisible(false);
  }, [open]);

  // Foco inicial ao abrir; retorno de foco ao elemento que abriu o Drawer quando desmonta.
  React.useEffect(() => {
    if (open && visible) {
      (closeButtonRef.current ?? panelRef.current)?.focus();
    }
  }, [open, visible]);

  React.useEffect(() => {
    if (!mounted) {
      previousActiveElement.current?.focus();
    }
  }, [mounted]);

  // Escape fecha; scroll do body é travado enquanto o Drawer está montado (Content mantém scroll próprio).
  React.useEffect(() => {
    if (!mounted) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [mounted, close]);

  // Focus trap simples — Tab/Shift+Tab ciclam apenas entre os elementos focáveis do painel.
  const handlePanelKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "Tab" || !panelRef.current) return;
    const focusable = panelRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const handlePanelTransitionEnd = (e: React.TransitionEvent) => {
    if (e.target !== panelRef.current) return;
    if (!open) setMounted(false);
  };

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100]">
      <div
        aria-hidden="true"
        onClick={close}
        className={cn(
          "absolute inset-0 bg-black/50 motion-reduce:transition-none",
          "transition-opacity duration-300",
          visible ? "opacity-100 ease-out" : "opacity-0 ease-in"
        )}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? headingId : undefined}
        tabIndex={-1}
        onKeyDown={handlePanelKeyDown}
        onTransitionEnd={handlePanelTransitionEnd}
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "absolute inset-y-0 flex flex-col bg-[var(--color-surface-primary)] shadow-[var(--shadow-xl)]",
          "outline-none motion-reduce:transition-none",
          "transition-transform duration-300",
          side === "left" ? "left-0" : "right-0",
          sizeClass[size],
          visible ? "translate-x-0 ease-out" : cn(closedTransform[side], "ease-in"),
          className
        )}
      >
        {(title || showClose) && (
          <div className="flex shrink-0 items-center justify-between gap-4 border-b border-[var(--color-border-default)] px-5 py-4">
            {title && (
              <h2 id={headingId} className="text-base font-semibold text-[var(--color-text-primary)]">
                {title}
              </h2>
            )}
            {showClose && (
              <button
                ref={closeButtonRef}
                type="button"
                onClick={close}
                aria-label="Fechar"
                className="ml-auto flex size-8 shrink-0 items-center justify-center rounded-[var(--radius-sm)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-secondary)]"
              >
                <X className="size-5" />
              </button>
            )}
          </div>
        )}

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">{children}</div>

        {footer && (
          <div className="shrink-0 border-t border-[var(--color-border-default)] px-5 py-4">{footer}</div>
        )}
      </div>
    </div>,
    document.body
  );
}

export { Drawer };
