import * as React from "react";
import { Badge } from "@/components/ui/badge";
import {
  levelConfig,
  priorityConfig,
  type ComplaintLevel,
  type ComplaintPriority,
} from "@/components/ui/complaint-shared";
import { cn } from "@/lib/utils";

export interface ComplaintKanbanCardProps extends React.HTMLAttributes<HTMLDivElement> {
  numberText: string;
  typologyText: string;
  companyText: string;
  responsibleText: string;
  slaText: string;
  level: ComplaintLevel;
  priority: ComplaintPriority;
  /** Variante visual — Storybook/regressão; "dragging" aplica a sombra elevada. */
  state?: "default" | "hover" | "dragging";
}

function ComplaintKanbanCard({
  className,
  numberText,
  typologyText,
  companyText,
  responsibleText,
  slaText,
  level,
  priority,
  state = "default",
  ...props
}: ComplaintKanbanCardProps) {
  return (
    <div
      className={cn(
        "flex w-full shrink-0 items-start overflow-hidden rounded-[var(--radius-sm)] border bg-[var(--color-surface-primary)]",
        props.draggable && "cursor-grab active:cursor-grabbing",
        state === "dragging"
          ? "border-[var(--color-border-strong)] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.15)]"
          : state === "hover"
            ? "border-[var(--color-border-strong)] shadow-[0px_0px_2px_0px_rgba(0,0,0,0.04),0px_2px_8px_0px_rgba(0,0,0,0.08)]"
            : "border-[var(--color-border-default)] hover:border-[var(--color-border-strong)] hover:shadow-[0px_0px_2px_0px_rgba(0,0,0,0.04),0px_2px_8px_0px_rgba(0,0,0,0.08)]",
        className
      )}
      {...props}
    >
      <div className={cn("w-[3px] shrink-0 self-stretch opacity-70", levelConfig[level].accent)} />
      <div className="flex flex-1 flex-col gap-1.5 px-2.5 py-2">
        <div className="flex w-full items-center justify-between">
          <p className="text-xs font-semibold text-[var(--color-text-primary)]">{numberText}</p>
          <Badge tone={priorityConfig[priority].tone}>{priorityConfig[priority].label}</Badge>
        </div>
        <p className="truncate text-[11px] text-[var(--color-text-secondary)]">{typologyText}</p>
        <div className="flex w-full items-center gap-1.5">
          <Badge tone={levelConfig[level].tone} shape="rounded">{levelConfig[level].label}</Badge>
          <p className="truncate text-[11px] text-[var(--color-text-muted)]">{companyText}</p>
        </div>
        <div className="h-px w-full bg-[var(--color-border-default)] opacity-50" />
        <div className="flex w-full items-center justify-between text-[11px]">
          <p className="text-[var(--color-text-muted)]">{responsibleText}</p>
          <p className="font-medium text-[var(--color-danger-default)]">{slaText}</p>
        </div>
      </div>
    </div>
  );
}

export interface ComplaintKanbanColumnProps {
  className?: string;
  title: string;
  /** Contador exibido no header — padrão: quantidade de cards. */
  count?: number;
  cards: (Omit<ComplaintKanbanCardProps, "className"> & { id: string })[];
  /** Id do card sendo arrastado (se pertencer a esta coluna) — aplica state="dragging" nele. */
  draggingCardId?: string;
  /** Destaca a coluna como alvo válido durante um arraste. */
  isDragOver?: boolean;
  onCardDragStart?: (cardId: string) => void;
  onCardDragEnd?: () => void;
  onColumnDragOver?: React.DragEventHandler<HTMLDivElement>;
  onColumnDragLeave?: React.DragEventHandler<HTMLDivElement>;
  onColumnDrop?: React.DragEventHandler<HTMLDivElement>;
}

function ComplaintKanbanColumn({
  className,
  title,
  count,
  cards,
  draggingCardId,
  isDragOver,
  onCardDragStart,
  onCardDragEnd,
  onColumnDragOver,
  onColumnDragLeave,
  onColumnDrop,
}: ComplaintKanbanColumnProps) {
  return (
    <div
      onDragOver={onColumnDragOver}
      onDragLeave={onColumnDragLeave}
      onDrop={onColumnDrop}
      className={cn(
        "flex h-[500px] w-[280px] shrink-0 flex-col overflow-hidden rounded-[var(--radius-sm)] transition-colors",
        isDragOver
          ? "bg-[var(--color-action-primary)]/10 ring-2 ring-inset ring-[var(--color-action-primary)]"
          : "bg-[var(--color-surface-primary)]/50",
        className
      )}
    >
      <div className="flex shrink-0 items-center gap-2 px-3 py-2.5">
        <p className="text-[13px] font-semibold text-[var(--color-text-primary)]">{title}</p>
        <span className="inline-flex items-center rounded-[var(--radius-full)] bg-[var(--color-text-muted)]/15 px-[7px] py-px text-[11px] font-medium text-[var(--color-text-secondary)]">
          {count ?? cards.length}
        </span>
      </div>
      <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto px-2 pb-2 pt-1">
        {cards.map(({ id, ...card }) => (
          <ComplaintKanbanCard
            key={id}
            {...card}
            state={draggingCardId === id ? "dragging" : card.state}
            draggable
            onDragStart={(e) => {
              e.dataTransfer.effectAllowed = "move";
              e.dataTransfer.setData("text/plain", id);
              onCardDragStart?.(id);
            }}
            onDragEnd={onCardDragEnd}
          />
        ))}
      </div>
    </div>
  );
}

export interface ComplaintKanbanBoardProps {
  className?: string;
  columns: (Omit<ComplaintKanbanColumnProps, "className"> & { id: string })[];
  /** Chamado ao soltar um card em outra coluna — o board não muta `columns`, quem consome decide como atualizar o estado. */
  onCardMove?: (cardId: string, fromColumnId: string, toColumnId: string) => void;
}

function ComplaintKanbanBoard({ className, columns, onCardMove }: ComplaintKanbanBoardProps) {
  const [dragging, setDragging] = React.useState<{ cardId: string; fromColumnId: string } | null>(null);
  const [dragOverColumnId, setDragOverColumnId] = React.useState<string | null>(null);

  const endDrag = () => {
    setDragging(null);
    setDragOverColumnId(null);
  };

  return (
    <div className={cn("flex items-start gap-3 overflow-x-auto px-4 py-3", className)}>
      {columns.map(({ id, ...col }) => (
        <ComplaintKanbanColumn
          key={id}
          {...col}
          draggingCardId={dragging?.fromColumnId === id ? dragging.cardId : undefined}
          isDragOver={dragOverColumnId === id}
          onCardDragStart={(cardId) => setDragging({ cardId, fromColumnId: id })}
          onCardDragEnd={endDrag}
          onColumnDragOver={(e) => {
            if (!dragging) return;
            e.preventDefault();
            e.dataTransfer.dropEffect = "move";
            if (dragOverColumnId !== id) setDragOverColumnId(id);
          }}
          onColumnDragLeave={() => setDragOverColumnId((prev) => (prev === id ? null : prev))}
          onColumnDrop={(e) => {
            e.preventDefault();
            if (dragging && dragging.fromColumnId !== id) {
              onCardMove?.(dragging.cardId, dragging.fromColumnId, id);
            }
            endDrag();
          }}
        />
      ))}
    </div>
  );
}

export { ComplaintKanbanCard, ComplaintKanbanColumn, ComplaintKanbanBoard };
