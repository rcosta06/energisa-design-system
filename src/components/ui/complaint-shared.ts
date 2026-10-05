import type { BadgeTone } from "@/components/ui/badge";

export type ComplaintLevel = "N1" | "N2" | "N3" | "External";
export type ComplaintStatus =
  | "Não Atribuído"
  | "Em Tratativa"
  | "Em Subsídio"
  | "Em Resposta"
  | "Respondida"
  | "Análise de Causa"
  | "Finalizado";
export type ComplaintPriority = "high" | "medium" | "low";

export const levelConfig: Record<ComplaintLevel, { label: string; tone: BadgeTone; accent: string }> = {
  N1: { label: "N1", tone: "info", accent: "bg-[var(--color-info-default)]" },
  N2: { label: "N2", tone: "warning", accent: "bg-[var(--color-warning-default)]" },
  N3: { label: "N3", tone: "danger", accent: "bg-[var(--color-danger-default)]" },
  External: { label: "Consumidor.gov", tone: "purple", accent: "bg-[var(--color-brand-purple)]" },
};

export const statusTone: Record<ComplaintStatus, BadgeTone> = {
  "Não Atribuído": "neutral",
  "Em Tratativa": "info",
  "Em Subsídio": "warning",
  "Em Resposta": "orange",
  "Respondida": "success",
  "Análise de Causa": "purple",
  "Finalizado": "success",
};

export const priorityConfig: Record<ComplaintPriority, { label: string; tone: BadgeTone }> = {
  high: { label: "Alta", tone: "danger" },
  medium: { label: "Média", tone: "warning" },
  low: { label: "Baixa", tone: "success" },
};

/**
 * Shape real da Lista (`ComplaintListRowProps` sem os campos de
 * apresentação/callbacks) — único dataset com estrutura suficiente
 * (empresa/status/data em campos próprios) para ser filtrado/paginado de
 * verdade. A view Cards também consome esses mesmos registros reais para
 * a Pagination (App.tsx, `filteredListRows` fatiado por página — nunca uma
 * segunda lista fake), mapeando os poucos campos com nome diferente
 * (`typologySub` → `description`, `companyText`+`openDateText` → `metadata`)
 * e omitindo `segment` (sem correspondente aqui, badge opcional no Card).
 * Kanban (`kanbanCardBase`) continua com mock próprio — não tem `status`
 * nenhum (usa a coluna como proxy). Ver Introduction.mdx para o plano de
 * unificação total — não executado nesta tarefa.
 */
export interface ComplaintListItem {
  idText: string;
  numberText: string;
  companyText: string;
  level: ComplaintLevel;
  typologyText: string;
  typologySub: string;
  status: ComplaintStatus;
  priority: ComplaintPriority;
  responsibleText: string;
  responsibleInitials: string;
  /** Identificador estável do responsável — resolve o Avatar pela preferência salva (ver `useUserAvatar`). */
  responsibleId?: string;
  openDateText: string;
  slaText: string;
  /**
   * Valor monetário da reclamação em BRL (formatado por `formatBRL`). Ausente
   * (`undefined`/`null`) = não exibido, sem placeholder. `0` é valor válido.
   */
  amount?: number | null;
  inconsistent?: boolean;
}

/** `""` = sem ordenação explícita (mantém a ordem original dos dados). */
export type ComplaintSort = "" | "recent" | "oldest";

/**
 * Estado central do `ComplaintFilterDrawer` — uma única fonte de verdade em
 * vez de estados espalhados pelo `App.tsx`. `onlyMine` fica de fora
 * propositalmente de `filterComplaints`: não existe no projeto nenhum
 * conceito real de usuário logado cujo valor bata com `responsibleText`
 * (o único candidato, `NavigationAvatar`'s `userName="Eren"`, é só um
 * default de prop decorativo — nunca aparece em nenhum `responsibleText`
 * dos dados mock). O checkbox continua controlado (liga/desliga de
 * verdade), só não filtra nada — ver Introduction.mdx.
 */
export interface ComplaintFilters {
  /** `""` = todas as empresas. */
  company: string;
  sort: ComplaintSort;
  onlyInconsistent: boolean;
  priorities: ComplaintPriority[];
  levels: ComplaintLevel[];
  statuses: ComplaintStatus[];
}

export const defaultComplaintFilters: ComplaintFilters = {
  company: "",
  sort: "",
  onlyInconsistent: false,
  priorities: [],
  levels: [],
  statuses: [],
};

/**
 * OR dentro de cada grupo (Empresa é single-select, então é só igualdade),
 * AND entre grupos — regra central de filtragem, para não espalhar
 * predicates independentes por Card/Lista/Kanban. Usada pela Lista e por
 * Cards (App.tsx pagina o mesmo `filteredListRows`) — única fonte cujo mock
 * tem os campos necessários (ver `ComplaintListItem`); Kanban continua fora.
 */
export function filterComplaints(rows: ComplaintListItem[], filters: ComplaintFilters): ComplaintListItem[] {
  return rows.filter(
    (row) =>
      (filters.company === "" || row.companyText === filters.company) &&
      (filters.priorities.length === 0 || filters.priorities.includes(row.priority)) &&
      (filters.levels.length === 0 || filters.levels.includes(row.level)) &&
      (filters.statuses.length === 0 || filters.statuses.includes(row.status)) &&
      (!filters.onlyInconsistent || row.inconsistent === true)
  );
}

/**
 * `openDateText` é sempre "DD/MM/AAAA" nos dados atuais — formato único e
 * consistente em todas as linhas, então o parse abaixo não é dado
 * inventado, só uma leitura estrutural de um texto já bem formado. `slaText`
 * não entra aqui: é texto livre com formatos incompatíveis entre linhas
 * ("vence hoje" / "N dias restantes" / "concluído"), sem ordem numérica
 * confiável — "Prazo de SLA" fica de fora da Ordenação até existir um campo
 * estruturado (`slaDays`/`dueDate` — ver Introduction.mdx).
 */
function parseBRDate(text: string): number {
  const [day, month, year] = text.split("/").map(Number);
  return new Date(year, month - 1, day).getTime();
}

export function sortComplaints(rows: ComplaintListItem[], sort: ComplaintSort): ComplaintListItem[] {
  if (sort === "") return rows;
  const sorted = [...rows].sort((a, b) => parseBRDate(a.openDateText) - parseBRDate(b.openDateText));
  if (sort === "recent") sorted.reverse();
  return sorted;
}
