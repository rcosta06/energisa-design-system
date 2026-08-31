import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Pagination, type PaginationProps } from "../components/ui/pagination";
import { PaginationItem } from "../components/ui/pagination-item";

/** Wrapper com estado React real — todas as stories abaixo são clicáveis de verdade, não um mock visual do Selected. */
function PaginationDemo({ initialPage, totalPages, siblingCount, boundaryCount }: { initialPage: number } & Pick<PaginationProps, "totalPages" | "siblingCount" | "boundaryCount">) {
  const [page, setPage] = React.useState(initialPage);
  return (
    <div className="flex flex-col items-center gap-3">
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} siblingCount={siblingCount} boundaryCount={boundaryCount} />
      <span className="text-xs text-[var(--color-text-secondary)]">
        currentPage = {page} / totalPages = {totalPages}
      </span>
    </div>
  );
}

const meta: Meta<typeof Pagination> = {
  title: "Components/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    currentPage: { control: { type: "number", min: 1 } },
    totalPages: { control: { type: "number", min: 1 } },
    siblingCount: { control: { type: "number", min: 0 } },
    boundaryCount: { control: { type: "number", min: 0 } },
    onPageChange: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

// ─── DOCS PAGE ────────────────────────────────────────────────────────────────

/** Controlado — altere currentPage/totalPages/siblingCount/boundaryCount no painel de Controls. */
export const Default: Story = {
  args: { currentPage: 1, totalPages: 10, siblingCount: 1, boundaryCount: 1 },
  render: (args) => (
    <PaginationDemo
      key={`${args.currentPage}-${args.totalPages}-${args.siblingCount}-${args.boundaryCount}`}
      initialPage={args.currentPage}
      totalPages={args.totalPages}
      siblingCount={args.siblingCount}
      boundaryCount={args.boundaryCount}
    />
  ),
};

/** Primeira página — Previous fica Disabled. */
export const FirstPage: Story = {
  render: () => <PaginationDemo initialPage={1} totalPages={10} />,
};

/**
 * Página do meio (Figma: composição "Pagination", node 2971:140) —
 * `Previous 1 … 4 [5] 6 … 10 Next`, o exemplo exato validado no Figma.
 */
export const MiddlePage: Story = {
  render: () => <PaginationDemo initialPage={5} totalPages={10} />,
};

/** Última página — Next fica Disabled. */
export const LastPage: Story = {
  render: () => <PaginationDemo initialPage={10} totalPages={10} />,
};

// ─── REGRESSION / CHROMATIC ───────────────────────────────────────────────────

/** Poucas páginas (≤ siblings+boundary combinados) — todos os números aparecem, sem Ellipsis. */
export const FewPages: Story = {
  tags: ["!autodocs"],
  render: () => <PaginationDemo initialPage={2} totalPages={4} />,
};

/** Muitas páginas — Ellipsis dos dois lados, números grandes sem quebrar layout. */
export const ManyPages: Story = {
  tags: ["!autodocs"],
  render: () => <PaginationDemo initialPage={50} totalPages={100} />,
};

/**
 * Estado React de verdade (`useState`) — clique nos controles e veja o
 * `currentPage` mudar abaixo. Nenhum mock visual: o Selected reflete
 * exatamente o que `onPageChange` recebeu.
 */
export const Interactive: Story = {
  tags: ["!autodocs"],
  render: () => <PaginationDemo initialPage={5} totalPages={10} />,
};

/** As 17 variantes do Figma (node 2971:139) lado a lado, via `forceState`/`selected`/`disabled` — referência visual estática, sem interação. */
export const AllStates: Story = {
  tags: ["!autodocs"],
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold text-[var(--color-text-secondary)]">Page</span>
        <div className="flex items-center gap-2">
          <PaginationItem itemType="page" label="1" />
          <PaginationItem itemType="page" label="1" forceState="hover" />
          <PaginationItem itemType="page" label="1" forceState="pressed" />
          <PaginationItem itemType="page" label="1" selected />
          <PaginationItem itemType="page" label="1" disabled />
          <PaginationItem itemType="page" label="1" forceState="focus" />
        </div>
        <div className="flex items-center gap-2 text-[10px] text-[var(--color-text-secondary)]">
          <span className="w-10">Default</span>
          <span className="w-10">Hover</span>
          <span className="w-10">Pressed</span>
          <span className="w-10">Selected</span>
          <span className="w-10">Disabled</span>
          <span className="w-10">Focus</span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold text-[var(--color-text-secondary)]">Previous</span>
        <div className="flex items-center gap-2">
          <PaginationItem itemType="previous" />
          <PaginationItem itemType="previous" forceState="hover" />
          <PaginationItem itemType="previous" forceState="pressed" />
          <PaginationItem itemType="previous" disabled />
          <PaginationItem itemType="previous" forceState="focus" />
        </div>
        <div className="flex items-center gap-2 text-[10px] text-[var(--color-text-secondary)]">
          <span className="w-[106px]">Default</span>
          <span className="w-[106px]">Hover</span>
          <span className="w-[106px]">Pressed</span>
          <span className="w-[106px]">Disabled</span>
          <span className="w-[106px]">Focus</span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold text-[var(--color-text-secondary)]">Next</span>
        <div className="flex items-center gap-2">
          <PaginationItem itemType="next" />
          <PaginationItem itemType="next" forceState="hover" />
          <PaginationItem itemType="next" forceState="pressed" />
          <PaginationItem itemType="next" disabled />
          <PaginationItem itemType="next" forceState="focus" />
        </div>
        <div className="flex items-center gap-2 text-[10px] text-[var(--color-text-secondary)]">
          <span className="w-20">Default</span>
          <span className="w-20">Hover</span>
          <span className="w-20">Pressed</span>
          <span className="w-20">Disabled</span>
          <span className="w-20">Focus</span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold text-[var(--color-text-secondary)]">Ellipsis</span>
        <div className="flex items-center gap-2">
          <PaginationItem itemType="ellipsis" aria-label="Mostrar mais páginas" />
          <PaginationItem itemType="ellipsis" aria-label="Mostrar mais páginas" forceState="hover" />
          <PaginationItem itemType="ellipsis" aria-label="Mostrar mais páginas" forceState="pressed" />
          <PaginationItem itemType="ellipsis" aria-label="Mostrar mais páginas" forceState="focus" />
        </div>
        <div className="flex items-center gap-2 text-[10px] text-[var(--color-text-secondary)]">
          <span className="w-10">Default</span>
          <span className="w-10">Hover</span>
          <span className="w-10">Pressed</span>
          <span className="w-10">Focus</span>
        </div>
      </div>
    </div>
  ),
};
