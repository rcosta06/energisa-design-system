import * as React from "react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  levelConfig,
  statusTone,
  priorityConfig,
  type ComplaintLevel,
  type ComplaintStatus,
  type ComplaintPriority,
} from "@/components/ui/complaint-shared";
import { cn } from "@/lib/utils";

const columns = [
  { key: "id", label: "ID", width: "w-[60px] shrink-0" },
  { key: "number", label: "Número", width: "w-[150px] shrink-0" },
  { key: "company", label: "Empresa", width: "w-[120px] shrink-0" },
  { key: "level", label: "Nível", width: "w-[130px] shrink-0" },
  { key: "typology", label: "Tipologia", width: "flex-1 min-w-[200px] shrink" },
  { key: "status", label: "Status", width: "w-[130px] shrink-0" },
  { key: "priority", label: "Prioridade", width: "w-[100px] shrink-0" },
  { key: "responsible", label: "Responsável", width: "w-[160px] shrink-0" },
  { key: "openDate", label: "Abertura", width: "w-[90px] shrink-0" },
  { key: "sla", label: "SLA", width: "w-[110px] shrink-0" },
] as const;

function ComplaintListHeader({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex h-10 w-full items-center border-b border-[var(--color-border-default)]",
        "bg-[var(--color-text-muted)]/10 pl-[19px]",
        className
      )}
    >
      {columns.map((col) => (
        <div key={col.key} className={cn("flex h-10 items-center overflow-hidden pl-2 pr-1", col.width)}>
          <p className="whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.5px] text-[var(--color-text-secondary)]">
            {col.label}
          </p>
        </div>
      ))}
    </div>
  );
}

export interface ComplaintListRowProps extends React.HTMLAttributes<HTMLDivElement> {
  idText: string;
  numberText: string;
  companyText: string;
  level: ComplaintLevel;
  typologyText: string;
  typologySub: string;
  status: ComplaintStatus;
  priority: ComplaintPriority;
  responsibleText: string;
  /** Iniciais do responsável — exibidas em um avatar ao lado do nome. */
  responsibleInitials: string;
  openDateText: string;
  slaText: string;
  /** Variante visual — "hover" força a aparência de hover (uso em Storybook/regressão). */
  state?: "default" | "hover";
}

function ComplaintListRow({
  className,
  idText,
  numberText,
  companyText,
  level,
  typologyText,
  typologySub,
  status,
  priority,
  responsibleText,
  responsibleInitials,
  openDateText,
  slaText,
  state = "default",
  ...props
}: ComplaintListRowProps) {
  const isHover = state === "hover";

  return (
    <div
      className={cn(
        "flex h-[52px] w-full items-center border-b border-[var(--color-border-default)]",
        isHover ? "bg-[var(--color-surface-secondary)]" : "bg-[var(--color-surface-primary)] hover:bg-[var(--color-surface-secondary)]",
        className
      )}
      {...props}
    >
      <div className={cn("h-full w-[3px] shrink-0 opacity-60", levelConfig[level].accent)} />

      <div className={cn("flex h-full flex-col items-start justify-center overflow-hidden pl-2 pr-1", columns[0].width)}>
        <p className="truncate text-xs text-[var(--color-text-primary)]">{idText}</p>
      </div>
      <div className={cn("flex h-full flex-col items-start justify-center overflow-hidden pl-2 pr-1", columns[1].width)}>
        <p className="truncate text-xs font-medium text-[var(--color-text-primary)]">{numberText}</p>
      </div>
      <div className={cn("flex h-full flex-col items-start justify-center overflow-hidden pl-2 pr-1", columns[2].width)}>
        <p className="truncate text-xs text-[var(--color-text-primary)]">{companyText}</p>
      </div>
      <div className={cn("flex h-full flex-col items-start justify-center overflow-hidden pl-2 pr-1", columns[3].width)}>
        <Badge tone={levelConfig[level].tone} shape="rounded">{levelConfig[level].label}</Badge>
      </div>
      <div className={cn("flex h-full flex-col items-start justify-center gap-0.5 overflow-hidden pl-2 pr-1", columns[4].width)}>
        <p className="truncate text-xs text-[var(--color-text-primary)]">{typologyText}</p>
        <p className="truncate text-[11px] text-[var(--color-text-muted)]">{typologySub}</p>
      </div>
      <div className={cn("flex h-full flex-col items-start justify-center overflow-hidden pl-2 pr-1", columns[5].width)}>
        <Badge tone={statusTone[status]} bgOpacity={8}>{status}</Badge>
      </div>
      <div className={cn("flex h-full flex-col items-start justify-center overflow-hidden pl-2 pr-1", columns[6].width)}>
        <Badge tone={priorityConfig[priority].tone}>{priorityConfig[priority].label}</Badge>
      </div>
      <div className={cn("flex h-full flex-row items-center gap-1.5 overflow-hidden pl-2 pr-1", columns[7].width)}>
        <Avatar size="xs" initials={responsibleInitials} />
        <p className="truncate text-xs text-[var(--color-text-primary)]">{responsibleText}</p>
      </div>
      <div className={cn("flex h-full flex-col items-start justify-center overflow-hidden pl-2 pr-1", columns[8].width)}>
        <p className="truncate text-xs text-[var(--color-text-primary)]">{openDateText}</p>
      </div>
      <div className={cn("flex h-full flex-col items-start justify-center overflow-hidden pl-2 pr-1", columns[9].width)}>
        <p className="truncate text-xs font-medium text-[var(--color-danger-default)]">{slaText}</p>
      </div>
    </div>
  );
}

export { ComplaintListHeader, ComplaintListRow };
