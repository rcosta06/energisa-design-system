export type PaginationRangeItem = { type: "page"; page: number } | { type: "start-ellipsis" } | { type: "end-ellipsis" };

export interface GetPaginationRangeParams {
  currentPage: number;
  totalPages: number;
  /** Páginas exibidas de cada lado da atual (Figma: exemplo validado com 1 — "1 … 4 5 6 … 10"). */
  siblingCount?: number;
  /** Páginas fixas no início/fim (Figma: exemplo validado com 1). */
  boundaryCount?: number;
}

function range(start: number, end: number): number[] {
  const length = Math.max(end - start + 1, 0);
  return Array.from({ length }, (_, i) => start + i);
}

/**
 * Calcula os itens visíveis da Pagination (números + ellipsis) a partir de
 * currentPage/totalPages/siblingCount/boundaryCount — função pura, isolada
 * de qualquer JSX, para poder ser chamada/testada sozinha em vez de
 * espalhar essa lógica pelo componente.
 *
 * Mesmo algoritmo consagrado do `usePagination` do MUI: já resolve os casos
 * de borda (totalPages pequeno, siblings sobrepondo o boundary, etc.) sem
 * duplicar página nem gerar range inconsistente.
 *
 * Exemplo validado no Figma (composição "Pagination", node 2971:140):
 * currentPage=5, totalPages=10, siblingCount=1, boundaryCount=1 →
 * [1, start-ellipsis, 4, 5, 6, end-ellipsis, 10].
 */
export function getPaginationRange({ currentPage, totalPages, siblingCount = 1, boundaryCount = 1 }: GetPaginationRangeParams): PaginationRangeItem[] {
  // Caso degenerado: a fórmula de siblings/boundary abaixo assume totalPages
  // "razoável" — com 0 ou 1 página ela pode sugerir uma página fantasma
  // (ex: "página 2" numa paginação de 1 página só). O componente `Pagination`
  // já não renderiza nada com totalPages<=1, mas esta função é exportada e
  // testável isoladamente, então precisa ser correta sozinha também.
  if (totalPages <= 0) return [];
  if (totalPages === 1) return [{ type: "page", page: 1 }];

  const startPages = range(1, Math.min(boundaryCount, totalPages));
  const endPages = range(Math.max(totalPages - boundaryCount + 1, boundaryCount + 1), totalPages);

  const siblingsStart = Math.max(Math.min(currentPage - siblingCount, totalPages - boundaryCount - siblingCount * 2 - 1), boundaryCount + 2);
  const siblingsEnd = Math.min(Math.max(currentPage + siblingCount, boundaryCount + siblingCount * 2 + 2), endPages.length > 0 ? endPages[0] - 2 : totalPages - 1);

  const items: PaginationRangeItem[] = [];

  for (const page of startPages) items.push({ type: "page", page });

  if (siblingsStart > boundaryCount + 2) {
    items.push({ type: "start-ellipsis" });
  } else if (boundaryCount + 1 < siblingsStart) {
    items.push({ type: "page", page: boundaryCount + 1 });
  }

  for (const page of range(siblingsStart, siblingsEnd)) items.push({ type: "page", page });

  if (siblingsEnd < totalPages - boundaryCount - 1) {
    items.push({ type: "end-ellipsis" });
  } else if (totalPages - boundaryCount > siblingsEnd) {
    items.push({ type: "page", page: totalPages - boundaryCount });
  }

  for (const page of endPages) items.push({ type: "page", page });

  // Defensivo: totalPages muito pequeno em relação a siblingCount/boundaryCount
  // pode gerar sobreposição entre os blocos acima (página duplicada) ou até
  // uma página fora do intervalo (ex: boundaryCount=2 com totalPages=2) —
  // nunca deve vazar pra fora de [1, totalPages] nem duplicar.
  const seenPages = new Set<number>();
  return items.filter((item) => {
    if (item.type !== "page") return true;
    if (item.page < 1 || item.page > totalPages) return false;
    if (seenPages.has(item.page)) return false;
    seenPages.add(item.page);
    return true;
  });
}

/**
 * Quantas páginas a Ellipsis avança/retrocede ao ser clicada — do tamanho da
 * janela de siblings que ela substitui visualmente (2 × siblingCount + 1),
 * então o próximo/anterior range fica matematicamente coerente com o atual
 * em vez de pular direto pro início/fim.
 */
export function getEllipsisJumpAmount(siblingCount: number): number {
  return siblingCount * 2 + 1;
}
