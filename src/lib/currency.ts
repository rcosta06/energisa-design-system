const brlFormatter = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

/**
 * Formata um valor monetário em BRL ("R$ 21.000,00"). Ponto único de formatação
 * do domínio de reclamações — Card, Lista e Kanban consomem esta função em vez
 * de montar a string por conta própria.
 *
 * `null`/`undefined` = valor ausente → retorna `null`, e quem renderiza não
 * mostra nada (nem "R$ 0,00", nem placeholder). Zero é um valor válido e é
 * formatado normalmente.
 */
export function formatBRL(value: number | null | undefined): string | null {
  if (value == null) return null;
  return brlFormatter.format(value);
}
