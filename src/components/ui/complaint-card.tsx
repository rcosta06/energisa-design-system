import * as React from "react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FilePdfIcon } from "@/components/ui/icons/file-pdf";
import {
  levelConfig,
  statusTone,
  priorityConfig,
  type ComplaintLevel,
  type ComplaintStatus,
  type ComplaintPriority,
} from "@/components/ui/complaint-shared";
import { cn } from "@/lib/utils";

export interface ComplaintCardProps extends React.HTMLAttributes<HTMLDivElement> {
  number: string;
  typology: string;
  description: string;
  level: ComplaintLevel;
  status: ComplaintStatus;
  priority: ComplaintPriority;
  segment: string;
  metadata: string;
  responsible: string;
  responsibleInitials: string;
  sla: string;
  showAvatar?: boolean;
  onGenerateClick?: () => void;
  /** Variante visual — "hover" força a aparência de hover (uso em Storybook/regressão). */
  state?: "default" | "hover";
}

function ComplaintCard({
  className,
  number,
  typology,
  description,
  level,
  status,
  priority,
  segment,
  metadata,
  responsible,
  responsibleInitials,
  sla,
  showAvatar = true,
  onGenerateClick,
  state = "default",
  ...props
}: ComplaintCardProps) {
  const isHover = state === "hover";

  return (
    <div
      className={cn(
        "flex w-[340px] shrink-0 items-start overflow-hidden rounded-[var(--radius-sm)]",
        "border bg-[var(--color-surface-primary)]",
        isHover
          ? "border-[var(--color-border-strong)] shadow-[0px_0px_2px_0px_rgba(0,0,0,0.04),0px_2px_8px_0px_rgba(0,0,0,0.08)]"
          : "border-[var(--color-border-default)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)] hover:border-[var(--color-border-strong)] hover:shadow-[0px_0px_2px_0px_rgba(0,0,0,0.04),0px_2px_8px_0px_rgba(0,0,0,0.08)]",
        className
      )}
      {...props}
    >
      <div className={cn("w-[3px] shrink-0 self-stretch opacity-70", levelConfig[level].accent)} />
      <div className="flex flex-1 flex-col gap-2 px-4 py-3.5">
        <div className="flex w-full items-center justify-between">
          <p className="text-[13px] font-semibold text-[var(--color-text-primary)]">{number}</p>
          <div className="flex shrink-0 items-center gap-2">
            <Badge tone={priorityConfig[priority].tone}>{priorityConfig[priority].label}</Badge>
            <p className="text-xs font-medium text-[var(--color-danger-default)]">{sla}</p>
          </div>
        </div>
        <p className="w-full text-[11px] text-[var(--color-text-muted)]">{metadata}</p>
        <div className="h-px w-full bg-[var(--color-border-default)] opacity-50" />
        <p className="text-sm font-medium text-[var(--color-text-primary)]">{typology}</p>
        <p className="text-xs text-[var(--color-text-secondary)]">{description}</p>
        <div className="flex w-full flex-wrap items-start gap-1.5">
          <Badge tone={levelConfig[level].tone} shape="rounded">{levelConfig[level].label}</Badge>
          <Badge tone="solid" shape="rounded">{segment}</Badge>
          <Badge tone={statusTone[status]} bgOpacity={8}>{status}</Badge>
        </div>
        <div className="h-px w-full bg-[var(--color-border-default)] opacity-50" />
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-1.5">
            {showAvatar && <Avatar size="xs" initials={responsibleInitials} />}
            <p className="text-xs font-medium text-[var(--color-text-secondary)]">{responsible}</p>
          </div>
          <Button type="button" variant="ghost" size="md" rightIcon={<FilePdfIcon />} onClick={onGenerateClick}>
            Gerar
          </Button>
        </div>
      </div>
    </div>
  );
}

export { ComplaintCard };
