import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  ComplaintKanbanCard,
  ComplaintKanbanColumn,
  ComplaintKanbanBoard,
  type ComplaintKanbanBoardProps,
} from "../components/ui/complaint-kanban";
import type { ComplaintLevel, ComplaintPriority } from "../components/ui/complaint-shared";

const meta: Meta = {
  title: "Components/ComplaintKanban",
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj;

const cardBase: {
  numberText: string;
  typologyText: string;
  companyText: string;
  responsibleText: string;
  slaText: string;
  level: ComplaintLevel;
  priority: ComplaintPriority;
} = {
  numberText: "SIATT-2026-004821",
  typologyText: "Pagamento / Inadimplência",
  companyText: "Energisa Acre",
  responsibleText: "Ana Ribeiro",
  slaText: "vence hoje",
  level: "N1",
  priority: "high",
};

let cardIdCounter = 0;
function makeCards(count: number, overrides: Partial<typeof cardBase> = {}) {
  return Array.from({ length: count }).map(() => ({
    id: `card-${cardIdCounter++}`,
    ...cardBase,
    ...overrides,
  }));
}

function moveCard(
  columns: ComplaintKanbanBoardProps["columns"],
  cardId: string,
  fromColumnId: string,
  toColumnId: string
) {
  const fromColumn = columns.find((c) => c.id === fromColumnId);
  const card = fromColumn?.cards.find((c) => c.id === cardId);
  if (!card) return columns;
  return columns.map((col) => {
    if (col.id === fromColumnId) return { ...col, cards: col.cards.filter((c) => c.id !== cardId) };
    if (col.id === toColumnId) return { ...col, cards: [...col.cards, card] };
    return col;
  });
}

/** Card isolado — altere level/priority/state via composição. */
export const Card: Story = {
  render: () => (
    <div className="w-[260px]">
      <ComplaintKanbanCard {...cardBase} />
    </div>
  ),
};

/** Card nos 3 estados: default, hover e dragging. */
export const CardStates: Story = {
  render: () => (
    <div className="flex w-[260px] flex-col gap-3">
      <ComplaintKanbanCard {...cardBase} state="default" />
      <ComplaintKanbanCard {...cardBase} state="hover" />
      <ComplaintKanbanCard {...cardBase} state="dragging" />
    </div>
  ),
};

/** Uma coluna isolada, com 3 cards. */
export const Column: Story = {
  render: () => (
    <ComplaintKanbanColumn title="Em Tratativa" cards={makeCards(3)} />
  ),
};

const initialBoardColumns: ComplaintKanbanBoardProps["columns"] = [
  { id: "aberta", title: "Aberta", count: 15, cards: makeCards(3, { level: "N1" }) },
  { id: "analise", title: "Em Análise", count: 8, cards: makeCards(3, { level: "N2" }) },
  { id: "tratativa", title: "Em Tratativa", cards: makeCards(3, { level: "N3" }) },
  { id: "aguardando", title: "Aguardando", count: 5, cards: makeCards(3, { level: "External" }) },
  { id: "respondida", title: "Respondida", count: 3, cards: makeCards(3, { priority: "medium" }) },
  { id: "reaberta", title: "Reaberta", count: 2, cards: makeCards(3, { priority: "low" }) },
  { id: "encerrada", title: "Encerrada", count: 24, cards: makeCards(3) },
];

/**
 * Board completo — as 7 colunas do fluxo de reclamações. Arraste um card para
 * outra coluna para movê-lo (drag-and-drop nativo — a coluna-alvo destaca
 * enquanto o card está sobre ela). `count` é um total independente de
 * `cards.length` quando informado (simula paginação); nas colunas sem `count`
 * o número exibido acompanha a quantidade real de cards.
 */
export const Board: Story = {
  render: () => {
    const [columns, setColumns] = useState(initialBoardColumns);
    return (
      <ComplaintKanbanBoard
        columns={columns}
        onCardMove={(cardId, fromColumnId, toColumnId) =>
          setColumns((prev) => moveCard(prev, cardId, fromColumnId, toColumnId))
        }
      />
    );
  },
};
