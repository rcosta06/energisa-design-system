/**
 * Utilitários de data puros para o DatePicker — sem dependência nova (o
 * projeto não tem date-fns/day.js), só `Date` nativo. Semana começa no
 * Domingo (Figma: cabeçalho "Do Se Te Qu Qu Se Sá", node 3019:23879).
 */

export function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

export function startOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function isBeforeDay(a: Date, b: Date): boolean {
  return startOfDay(a).getTime() < startOfDay(b).getTime();
}

export function isAfterDay(a: Date, b: Date): boolean {
  return startOfDay(a).getTime() > startOfDay(b).getTime();
}

export function addMonths(date: Date, amount: number): Date {
  const d = new Date(date);
  d.setDate(1);
  d.setMonth(d.getMonth() + amount);
  return d;
}

/**
 * Título "Setembro 2026" (Figma: node 3019:23683 — sem o conector "de" que
 * o Intl pt-BR usa por padrão em `{month:'long',year:'numeric'}`
 * ("setembro DE 2026"); monta a partir de `formatToParts` pra remover só o
 * literal "de", preservando a formatação nativa do mês/ano).
 */
export function formatMonthYear(date: Date): string {
  const parts = new Intl.DateTimeFormat("pt-BR", { month: "long", year: "numeric" }).formatToParts(date);
  const month = parts.find((p) => p.type === "month")?.value ?? "";
  const year = parts.find((p) => p.type === "year")?.value ?? "";
  return `${month.charAt(0).toUpperCase()}${month.slice(1)} ${year}`;
}

export const WEEKDAY_LABELS = ["Do", "Se", "Te", "Qu", "Qu", "Se", "Sá"];

/**
 * Grade completa do mês (semanas inteiras, domingo a sábado, incluindo dias
 * do mês anterior/seguinte pra preencher a semana — `outsideMonth: true`).
 */
export interface CalendarGridDay {
  date: Date;
  outsideMonth: boolean;
}

export function getMonthGrid(month: Date): CalendarGridDay[][] {
  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const firstOfMonth = new Date(year, monthIndex, 1);
  const startOffset = firstOfMonth.getDay(); // 0 = domingo
  const gridStart = new Date(year, monthIndex, 1 - startOffset);

  const totalCells = 42; // 6 semanas fixas — cobre qualquer mês sem recalcular altura
  const days: CalendarGridDay[] = [];
  for (let i = 0; i < totalCells; i++) {
    const date = new Date(gridStart);
    date.setDate(gridStart.getDate() + i);
    days.push({ date, outsideMonth: date.getMonth() !== monthIndex });
  }

  const weeks: CalendarGridDay[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }
  return weeks;
}
