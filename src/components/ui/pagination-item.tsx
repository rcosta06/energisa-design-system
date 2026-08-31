import * as React from "react";
import { MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { CaretLeftIcon } from "./icons/caret-left";
import { CaretRightIcon } from "./icons/caret-right";

export type PaginationItemType = "page" | "previous" | "next" | "ellipsis";

export interface PaginationItemProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  /** Page (número) / Previous / Next / Ellipsis — variantes do Figma (PaginationItem, node 2971:139). */
  itemType?: PaginationItemType;
  /** Rótulo da página — só usado quando itemType="page" (ex: 1, 10). */
  label?: React.ReactNode;
  /** state=Selected do Figma — currentPage === esta página (itemType="page" apenas). */
  selected?: boolean;
  /** Força a aparência de Hover/Pressed/Focus sem interação real (uso em Storybook/regressão — mesmo padrão do IconButton). */
  forceState?: "hover" | "pressed" | "focus";
}

/** Hover=surface-secondary · Pressed=surface-primary · Focus=action-primary 2px outside + surface-secondary — sempre o mesmo trio de tokens, real (pseudo-classe) ou forçado (Storybook). */
function getInteractiveClasses(disabled: boolean, forceState?: "hover" | "pressed" | "focus") {
  if (disabled) return "text-[var(--color-text-muted)]";
  if (forceState === "hover") return "cursor-pointer bg-[var(--color-surface-secondary)] text-[var(--color-text-primary)]";
  if (forceState === "pressed") return "cursor-pointer bg-[var(--color-surface-primary)] text-[var(--color-text-primary)]";
  if (forceState === "focus") return "cursor-pointer border-2 border-[var(--color-action-primary)] bg-[var(--color-surface-secondary)] text-[var(--color-text-primary)]";
  return cn(
    "cursor-pointer text-[var(--color-text-primary)] hover:bg-[var(--color-surface-secondary)] active:bg-[var(--color-surface-primary)]",
    "focus-visible:border-2 focus-visible:border-[var(--color-action-primary)] focus-visible:bg-[var(--color-surface-secondary)] focus-visible:text-[var(--color-text-primary)]"
  );
}

/**
 * PaginationItem — Energisa Design System (Figma: node 2971:139, 17
 * variantes: Page × Default/Hover/Pressed/Selected/Disabled/Focus,
 * Previous/Next × Default/Hover/Pressed/Disabled/Focus, Ellipsis × Default).
 *
 * Hover/Pressed/Focus usam pseudo-classes nativas (:hover/:active/
 * :focus-visible) em vez de estado React — nunca ficam "presas" depois do
 * clique/mouse sair, e Tab/Enter/Space funcionam de graça. `h-10` (altura) +
 * `min-w-[23px]` (Page) são fixos em todos os states — com
 * box-sizing:border-box (Preflight do Tailwind), a borda de Selected (1px)
 * e a de Focus (2px) nunca alteram a caixa renderizada, só a área de
 * conteúdo — dimensão idêntica em Default/Hover/Pressed/Selected/Disabled/
 * Focus, conforme validado no Figma (23×40px).
 *
 * Pressed usa `surface-primary` (branco) — a variável do Figma pra esse
 * fill chama "border-default" mas resolve pra #ffffff neste arquivo (um
 * artefato de boilerplate shadcn solto no Figma, não o nosso
 * `--color-border-default` real, que é #f1f1f1); `surface-primary` é o
 * token do DS que bate com o valor literal.
 *
 * Focus é aplicado incondicionalmente por cima de qualquer state (inclusive
 * Selected) — o Figma não define uma variante combinada, e remover o
 * indicador de foco ao tabular por um item selecionado não é opção
 * (acessibilidade).
 */
const PaginationItem = React.forwardRef<HTMLButtonElement, PaginationItemProps>(function PaginationItem(
  { className, itemType = "page", label, selected = false, disabled = false, forceState, "aria-label": ariaLabel, ...props },
  ref
) {
  const base = "inline-flex h-10 shrink-0 items-center justify-center rounded-[var(--radius-sm)] text-sm leading-5 font-medium transition-colors focus-visible:outline-none";

  if (itemType === "ellipsis") {
    return (
      <button
        ref={ref}
        type="button"
        aria-label={ariaLabel ?? "Mostrar mais páginas"}
        className={cn(base, "p-2", getInteractiveClasses(false, forceState), className)}
        {...props}
      >
        <MoreHorizontal className="size-4" aria-hidden="true" />
      </button>
    );
  }

  if (itemType === "previous" || itemType === "next") {
    const Icon = itemType === "previous" ? CaretLeftIcon : CaretRightIcon;
    const text = itemType === "previous" ? "Previous" : "Next";
    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        aria-label={ariaLabel ?? (itemType === "previous" ? "Página anterior" : "Próxima página")}
        className={cn(base, "gap-1 py-2", itemType === "previous" ? "pl-3 pr-4" : "pl-4 pr-3", getInteractiveClasses(disabled, forceState), className)}
        {...props}
      >
        {itemType === "previous" && <Icon className="size-4 shrink-0" aria-hidden="true" />}
        <span>{text}</span>
        {itemType === "next" && <Icon className="size-4 shrink-0" aria-hidden="true" />}
      </button>
    );
  }

  // itemType === "page"
  return (
    <button
      ref={ref}
      type="button"
      disabled={disabled}
      aria-current={selected ? "page" : undefined}
      aria-label={ariaLabel ?? `Página ${label}`}
      className={cn(
        base,
        "min-w-[23px] p-2",
        selected ? "border border-[var(--color-border-strong)] bg-[var(--color-text-primary)] text-[var(--color-surface-primary)]" : getInteractiveClasses(disabled, forceState),
        className
      )}
      {...props}
    >
      {label}
    </button>
  );
});

export { PaginationItem };
