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
