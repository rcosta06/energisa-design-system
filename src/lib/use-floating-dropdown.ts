import * as React from "react";

export type FloatingAlign = "start" | "end";

export interface FloatingPosition {
  top: number;
  left: number;
  minWidth: number;
}

export interface UseFloatingDropdownOptions {
  open: boolean;
  onClose: () => void;
  align?: FloatingAlign;
  /** Elemento que aciona o floating layer — usado para medir posição/largura e para o outside-click ignorar cliques nele. */
  triggerRef: React.RefObject<HTMLElement | null>;
  /** Elemento portalado (o próprio painel) — cliques dentro dele também não contam como "fora". */
  panelRef: React.RefObject<HTMLElement | null>;
  offset?: number;
}

/**
 * Infraestrutura de floating layer compartilhada entre `DropdownMenu`
 * (Menu) e `Select` — cálculo de posição via `getBoundingClientRect`,
 * fechamento por clique fora/Escape, e reposicionamento em resize/scroll de
 * qualquer ancestral rolável (necessário para funcionar dentro de
 * containers com `overflow-x-auto`/`overflow-hidden`, já que o painel é
 * renderizado via portal em `document.body` e se desprenderia do fluxo do
 * container ao rolar). Cada consumidor decide seu próprio conteúdo/visual —
 * este hook só resolve posicionamento e ciclo de vida de abertura/fechamento.
 */
export function useFloatingDropdown({
  open,
  onClose,
  align = "start",
  triggerRef,
  panelRef,
  offset = 4,
}: UseFloatingDropdownOptions): FloatingPosition | null {
  const [position, setPosition] = React.useState<FloatingPosition | null>(null);

  const updatePosition = React.useCallback(() => {
    const rect = triggerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPosition({
      top: rect.bottom + offset,
      left: align === "end" ? rect.right : rect.left,
      minWidth: rect.width,
    });
  }, [triggerRef, align, offset]);

  React.useLayoutEffect(() => {
    if (!open) {
      setPosition(null);
      return;
    }
    updatePosition();
  }, [open, updatePosition]);

  React.useEffect(() => {
    if (!open) return;

    const handlePointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (triggerRef.current?.contains(target)) return;
      if (panelRef.current?.contains(target)) return;
      onClose();
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const handleReposition = () => updatePosition();

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleReposition);
    // capture:true pega scroll de qualquer ancestral rolável, não só da window.
    document.addEventListener("scroll", handleReposition, true);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleReposition);
      document.removeEventListener("scroll", handleReposition, true);
    };
  }, [open, onClose, triggerRef, panelRef, updatePosition]);

  return position;
}
