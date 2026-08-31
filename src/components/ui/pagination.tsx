import * as React from "react";
import { cn } from "@/lib/utils";
import { PaginationItem } from "./pagination-item";
import { getEllipsisJumpAmount, getPaginationRange } from "./pagination-range";

export interface PaginationProps {
  /** Fonte da verdade da página atual — controlado, a UI nunca guarda estado próprio. */
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  /** Páginas exibidas de cada lado da atual (Figma: exemplo validado com 1). */
  siblingCount?: number;
  /** Páginas fixas no início/fim (Figma: exemplo validado com 1). */
  boundaryCount?: number;
  className?: string;
}

/**
 * Pagination — Energisa Design System (Figma: "Process / Paginação", node
 * 2969:23332 → composição "Pagination", node 2971:140).
 *
 * Componente controlado: `currentPage` é a única fonte de verdade — clicar
 * em qualquer controle chama `onPageChange(novaPagina)`, e a UI só reflete o
 * novo valor quando o consumidor atualiza a prop (nenhum estado interno).
 *
 * O range visível (números + ellipsis) vem de `getPaginationRange`
 * (pagination-range.ts) — função pura e isolada, não espalhada pelo JSX.
 *
 * Ellipsis é interativa (não decorativa): a esquerda volta um "range" de
 * páginas, a direita avança — ambas pulam `getEllipsisJumpAmount(siblingCount)`
 * páginas (o tamanho da janela de siblings que elas substituem), clampado
 * em [1, totalPages].
 *
 * totalPages <= 1 → não renderiza nada (aprovado no Figma — paginação de uma
 * página só não faz sentido existir).
 */
function Pagination({ currentPage, totalPages, onPageChange, siblingCount = 1, boundaryCount = 1, className }: PaginationProps) {
  if (totalPages <= 1) return null;

  const items = getPaginationRange({ currentPage, totalPages, siblingCount, boundaryCount });
  const jumpAmount = getEllipsisJumpAmount(siblingCount);

  const goTo = (page: number) => {
    const clamped = Math.min(Math.max(page, 1), totalPages);
    if (clamped !== currentPage) onPageChange(clamped);
  };

  return (
    <nav aria-label="Paginação" className={cn("flex items-center gap-1", className)}>
      <PaginationItem itemType="previous" disabled={currentPage === 1} onClick={() => goTo(currentPage - 1)} />

      {items.map((item, index) => {
        if (item.type === "start-ellipsis") {
          return (
            <PaginationItem
              key={`start-ellipsis-${index}`}
              itemType="ellipsis"
              aria-label="Mostrar páginas anteriores"
              onClick={() => goTo(currentPage - jumpAmount)}
            />
          );
        }
        if (item.type === "end-ellipsis") {
          return (
            <PaginationItem
              key={`end-ellipsis-${index}`}
              itemType="ellipsis"
              aria-label="Mostrar próximas páginas"
              onClick={() => goTo(currentPage + jumpAmount)}
            />
          );
        }
        return (
          <PaginationItem
            key={item.page}
            itemType="page"
            label={item.page}
            selected={item.page === currentPage}
            onClick={() => goTo(item.page)}
          />
        );
      })}

      <PaginationItem itemType="next" disabled={currentPage === totalPages} onClick={() => goTo(currentPage + 1)} />
    </nav>
  );
}

export { Pagination };
