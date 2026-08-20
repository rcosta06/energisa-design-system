import * as React from "react";
import { createPortal } from "react-dom";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { WarningOctagonIcon } from "@/components/ui/icons/warning-octagon";
import { DotsThreeOutlineVerticalIcon } from "@/components/ui/icons/dots-three-outline-vertical";
import { NavigationTooltip } from "@/components/ui/navigation-tooltip";
import { DropdownMenu } from "@/components/ui/menu";
import {
  levelConfig,
  statusTone,
  priorityConfig,
  type ComplaintLevel,
  type ComplaintStatus,
  type ComplaintPriority,
} from "@/components/ui/complaint-shared";
import { cn } from "@/lib/utils";

/**
 * A linha vive dentro de um container com scroll horizontal (`overflow-x-auto`),
 * que por especificação do CSS também recorta overflow vertical mesmo sem
 * `overflow-y` explícito — um tooltip posicionado via CSS (`absolute`/
 * `group-hover`) ficaria cortado. Por isso o tooltip é renderizado via portal
 * em `document.body`, posicionado a partir do bounding rect do trigger.
 *
 * Usado em toda célula que pode truncar (todas as colunas de texto/badge da
 * linha) — garante que o conteúdo completo continue legível ao passar o
 * mouse, mesmo quando a coluna corta o texto com reticências.
 */
function HoverTooltip({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  const triggerRef = React.useRef<HTMLDivElement>(null);
  const [pos, setPos] = React.useState<{ top: number; left: number } | null>(null);

  const show = () => {
    const rect = triggerRef.current?.getBoundingClientRect();
    if (rect) setPos({ top: rect.bottom + 8, left: rect.left + rect.width / 2 });
  };
  const hide = () => setPos(null);

  return (
    <div
      ref={triggerRef}
      className={cn("relative flex min-w-0 max-w-full", className)}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      {pos &&
        createPortal(
          <NavigationTooltip
            label={label}
            className="pointer-events-none fixed z-50 -translate-x-1/2"
            style={{ top: pos.top, left: pos.left }}
          />,
          document.body
        )}
    </div>
  );
}

function InconsistentIndicator() {
  return (
    <HoverTooltip label="Dado inconsistente" className="shrink-0">
      <WarningOctagonIcon
        className="size-4 text-[var(--color-danger-default)]"
        role="img"
        aria-label="Dado inconsistente"
        tabIndex={0}
      />
    </HoverTooltip>
  );
}

const columns = [
  { key: "id", label: "ID", width: "w-10 shrink-0" },
  { key: "number", label: "Número", width: "w-40 shrink-0" },
  { key: "company", label: "Empresa", width: "w-[108px] shrink-0" },
  { key: "level", label: "Nível", width: "w-[116px] shrink-0" },
  { key: "typology", label: "Tipologia", width: "flex-1 min-w-[176px] shrink" },
  { key: "status", label: "Status", width: "w-24 shrink-0" },
  { key: "priority", label: "Prioridade", width: "w-[84px] shrink-0" },
  { key: "responsible", label: "Responsável", width: "w-[100px] shrink-0" },
  { key: "openDate", label: "Abertura", width: "w-20 shrink-0" },
  { key: "sla", label: "SLA", width: "w-[76px] shrink-0" },
  { key: "actions", label: "Ações", width: "w-[52px] shrink-0" },
] as const;

function ComplaintListHeader({ className, showActions = true }: { className?: string; showActions?: boolean }) {
  return (
    <div
      className={cn(
        "flex h-10 w-full items-center border-b border-[var(--color-border-default)]",
        "bg-[var(--color-text-muted)]/10 pl-[3px]",
        className
      )}
    >
      {columns.filter((col) => showActions || col.key !== "actions").map((col) => (
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
  /** Mostra o ícone de alerta ao lado do número (dado inconsistente/pendente de revisão). */
  inconsistent?: boolean;
  /** Mostra a coluna de Ações (botão de mais opções). */
  showActions?: boolean;
  onActionsClick?: () => void;
  /**
   * Conteúdo do menu de ações (`MenuItem`/`MenuDivider`) — quando informado,
   * o botão "Mais ações" abre um `DropdownMenu` com esse conteúdo em vez de
   * só disparar `onActionsClick`.
   */
  actionsMenu?: React.ReactNode;
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
  inconsistent = false,
  showActions = true,
  onActionsClick,
  actionsMenu,
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
        <HoverTooltip label={idText} className="w-full">
          <p className="w-full truncate text-xs text-[var(--color-text-primary)]">{idText}</p>
        </HoverTooltip>
      </div>
      <div className={cn("flex h-full items-center gap-1 overflow-hidden pl-2 pr-1", columns[1].width)}>
        <HoverTooltip label={numberText} className="min-w-0 flex-1">
          <p className="w-full truncate text-xs font-medium text-[var(--color-text-primary)]">{numberText}</p>
        </HoverTooltip>
        {inconsistent && <InconsistentIndicator />}
      </div>
      <div className={cn("flex h-full flex-col items-start justify-center overflow-hidden pl-2 pr-1", columns[2].width)}>
        <HoverTooltip label={companyText} className="w-full">
          <p className="w-full truncate text-xs text-[var(--color-text-primary)]">{companyText}</p>
        </HoverTooltip>
      </div>
      <div className={cn("flex h-full flex-col items-start justify-center overflow-hidden pl-2 pr-1", columns[3].width)}>
        <HoverTooltip label={levelConfig[level].label}>
          <Badge tone={levelConfig[level].tone} shape="rounded">{levelConfig[level].label}</Badge>
        </HoverTooltip>
      </div>
      <div className={cn("flex h-full flex-col items-start justify-center gap-0.5 overflow-hidden pl-2 pr-1", columns[4].width)}>
        <HoverTooltip label={typologyText} className="w-full">
          <p className="w-full truncate text-xs text-[var(--color-text-primary)]">{typologyText}</p>
        </HoverTooltip>
        <HoverTooltip label={typologySub} className="w-full">
          <p className="w-full truncate text-[11px] text-[var(--color-text-muted)]">{typologySub}</p>
        </HoverTooltip>
      </div>
      <div className={cn("flex h-full flex-col items-start justify-center overflow-hidden pl-2 pr-1", columns[5].width)}>
        <HoverTooltip label={status}>
          <Badge tone={statusTone[status]} bgOpacity={8}>{status}</Badge>
        </HoverTooltip>
      </div>
      <div className={cn("flex h-full flex-col items-start justify-center overflow-hidden pl-2 pr-1", columns[6].width)}>
        <HoverTooltip label={priorityConfig[priority].label}>
          <Badge tone={priorityConfig[priority].tone}>{priorityConfig[priority].label}</Badge>
        </HoverTooltip>
      </div>
      <div className={cn("flex h-full flex-row items-center gap-1.5 overflow-hidden pl-2 pr-1", columns[7].width)}>
        <Avatar size="xs" initials={responsibleInitials} className="shrink-0" />
        <HoverTooltip label={responsibleText} className="min-w-0 flex-1">
          <p className="w-full truncate text-xs text-[var(--color-text-primary)]">{responsibleText}</p>
        </HoverTooltip>
      </div>
      <div className={cn("flex h-full flex-col items-start justify-center overflow-hidden pl-2 pr-1", columns[8].width)}>
        <HoverTooltip label={openDateText} className="w-full">
          <p className="w-full truncate text-xs text-[var(--color-text-primary)]">{openDateText}</p>
        </HoverTooltip>
      </div>
      <div className={cn("flex h-full flex-col items-start justify-center overflow-hidden pl-2 pr-1", columns[9].width)}>
        <HoverTooltip label={slaText} className="w-full">
          <p className="w-full truncate text-xs font-medium text-[var(--color-danger-default)]">{slaText}</p>
        </HoverTooltip>
      </div>
      {showActions && (
        <div className={cn("flex h-full shrink-0 items-center justify-center px-1", columns[10].width)}>
          {actionsMenu ? (
            <DropdownMenu
              align="end"
              trigger={
                <button
                  type="button"
                  aria-label="Mais ações"
                  className="flex size-8 items-center justify-center rounded-[var(--radius-sm)] text-[var(--color-text-secondary)] hover:bg-[var(--color-hover-highlight)]"
                >
                  <DotsThreeOutlineVerticalIcon className="size-6" />
                </button>
              }
            >
              {actionsMenu}
            </DropdownMenu>
          ) : (
            <button
              type="button"
              onClick={onActionsClick}
              aria-label="Mais ações"
              className="flex size-8 items-center justify-center rounded-[var(--radius-sm)] text-[var(--color-text-secondary)] hover:bg-[var(--color-hover-highlight)]"
            >
              <DotsThreeOutlineVerticalIcon className="size-6" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export { ComplaintListHeader, ComplaintListRow };
