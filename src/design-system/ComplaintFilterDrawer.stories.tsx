import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../components/ui/button";
import { ComplaintFilterDrawer } from "../components/ui/complaint-filter-drawer";
import type { SelectOption } from "../components/ui/select";
import { defaultComplaintFilters, type ComplaintFilters } from "../components/ui/complaint-shared";

const meta: Meta<typeof ComplaintFilterDrawer> = {
  title: "Patterns/ComplaintFilterDrawer",
  component: ComplaintFilterDrawer,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof ComplaintFilterDrawer>;

/** Mesmos valores reais usados em `App.tsx` (derivados de `listRows`, não uma lista à parte). */
const companyOptions: SelectOption[] = [
  { value: "", label: "Todas as empresas" },
  { value: "Energisa Acre", label: "Energisa Acre" },
  { value: "Energisa MT", label: "Energisa MT" },
  { value: "Energisa RO", label: "Energisa RO" },
];

/** "Prazo de SLA" fica de fora — `slaText` é texto livre sem estrutura suficiente para ordenar (ver `complaint-shared.ts`). */
const sortOptions: SelectOption[] = [
  { value: "", label: "Padrão" },
  { value: "recent", label: "Mais recentes primeiro" },
  { value: "oldest", label: "Mais antigas primeiro" },
];

/**
 * Réplica funcional do node "Filtro Atendimento" (2676:3644) do Figma —
 * mesma composição e mesma lógica central (`ComplaintFilters`/
 * `filterComplaints`/`sortComplaints`) usadas em `App.tsx` (view Lista).
 * "Procon - Linha Direta" não aparece no grupo Nível de reclamação porque
 * não existe em `ComplaintLevel` (ver comentário no componente).
 */
export const Default: Story = {
  render: () => {
    function Demo() {
      const [open, setOpen] = React.useState(false);
      const [onlyMine, setOnlyMine] = React.useState(false);
      const [filters, setFilters] = React.useState<ComplaintFilters>(defaultComplaintFilters);

      return (
        <div className="flex min-h-[480px] items-start p-6">
          <Button onClick={() => setOpen(true)}>Abrir filtro</Button>
          <ComplaintFilterDrawer
            open={open}
            onOpenChange={setOpen}
            companyOptions={companyOptions}
            company={filters.company}
            onCompanyChange={(company) => setFilters((f) => ({ ...f, company }))}
            sortOptions={sortOptions}
            sort={filters.sort}
            onSortChange={(sort) => setFilters((f) => ({ ...f, sort: sort as ComplaintFilters["sort"] }))}
            onlyMine={onlyMine}
            onOnlyMineChange={setOnlyMine}
            onlyInconsistent={filters.onlyInconsistent}
            onOnlyInconsistentChange={(onlyInconsistent) => setFilters((f) => ({ ...f, onlyInconsistent }))}
            selectedPriorities={filters.priorities}
            onPrioritiesChange={(priorities) => setFilters((f) => ({ ...f, priorities }))}
            selectedLevels={filters.levels}
            onLevelsChange={(levels) => setFilters((f) => ({ ...f, levels }))}
            selectedStatuses={filters.statuses}
            onStatusesChange={(statuses) => setFilters((f) => ({ ...f, statuses }))}
            onClear={() => {
              setOnlyMine(false);
              setFilters(defaultComplaintFilters);
            }}
          />
        </div>
      );
    }
    return <Demo />;
  },
};
