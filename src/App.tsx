import * as React from "react";
import { LayoutGrid, Headphones, Kanban, IdCard, List, Plus, ListFilter } from "lucide-react";
import { NavigationSidebar } from "@/components/ui/navigation-sidebar";
import { NavigationSearch } from "@/components/ui/navigation-search";
import { NavigationAvatar } from "@/components/ui/navigation-avatar";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { IconButton } from "@/components/ui/icon-button";
import { Button } from "@/components/ui/button";
import { PageHeading } from "@/components/ui/page-heading";
import { SegmentedControl, type SegmentedControlItem } from "@/components/ui/segmented-control";
import { ComplaintCard } from "@/components/ui/complaint-card";
import { ComplaintKanbanBoard, type ComplaintKanbanBoardProps } from "@/components/ui/complaint-kanban";
import { ComplaintListHeader, ComplaintListRow } from "@/components/ui/complaint-list";
import type { ComplaintLevel, ComplaintPriority } from "@/components/ui/complaint-shared";
import backgroundApp from "@/assets/background-app.png";

const sidebarGroups = [
  [
    {
      key: "administrativo",
      label: "Administrativo",
      icon: <LayoutGrid className="size-5" />,
      submenuItems: [
        { key: "dashboard", label: "Dashboard" },
        { key: "gestao-atendente", label: "Gestão de atendente" },
        { key: "grupos-tratativa", label: "Gestão de grupos de tratativa" },
        { key: "hierarquia-escalonamento", label: "Hierarquia e escalonamento" },
        {
          key: "parametros",
          label: "Parâmetros",
          items: [
            { key: "cadastrar-niveis", label: "Cadastrar níveis" },
            { key: "cadastrar-tipologia", label: "Cadastrar tipologia" },
            { key: "cadastrar-subtipologia", label: "Cadastrar subtipologia" },
            { key: "cadastrar-segmento", label: "Cadastrar segmento" },
          ],
        },
        { key: "gestao-contingencia", label: "Gestão de contingência" },
        { key: "monitor-redistribuicoes", label: "Monitor de redistribuições" },
      ],
    },
  ],
  [
    {
      key: "operacao",
      label: "Operação",
      icon: <Headphones className="size-5" />,
      submenuItems: [
        { key: "fila-atendimento", label: "Fila de atendimento" },
        { key: "disponibilidade-atendente", label: "Disponibilidade do atendente" },
        { key: "solicitar-subsidio", label: "Solicitar subsídio" },
        { key: "responder-subsidio", label: "Responder subsídio" },
        { key: "receber-analisar-subsidio", label: "Receber e analisar subsídio" },
      ],
    },
  ],
];

const viewItems: SegmentedControlItem[] = [
  { value: "kanban", icon: <Kanban className="size-6" />, label: "Kanban" },
  { value: "cards", icon: <IdCard className="size-6" />, label: "Cards" },
  { value: "list", icon: <List className="size-6" />, label: "Lista" },
];

const complaintBaseArgs = {
  number: "SIATT-2026-004821",
  typology: "Pagamento / Inadimplência",
  description: "Religação não realizada após pagamento",
  level: "N1" as const,
  status: "Em Tratativa" as const,
  priority: "high" as const,
  segment: "Residencial",
  metadata: "Energisa Acre · aberta em 12/08/2026",
  responsible: "Ana Ribeiro",
  responsibleInitials: "AR",
  sla: "vence hoje",
};

const kanbanCardBase: {
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

let kanbanCardIdCounter = 0;
function makeKanbanCards(count: number, overrides: Partial<typeof kanbanCardBase> = {}) {
  return Array.from({ length: count }).map(() => ({
    id: `card-${kanbanCardIdCounter++}`,
    ...kanbanCardBase,
    ...overrides,
  }));
}

function moveKanbanCard(
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

const initialKanbanColumns: ComplaintKanbanBoardProps["columns"] = [
  { id: "aberta", title: "Aberta", cards: makeKanbanCards(3, { level: "N1" as const }) },
  { id: "analise", title: "Em Análise", cards: makeKanbanCards(3, { level: "N2" as const }) },
  { id: "tratativa", title: "Em Tratativa", cards: makeKanbanCards(3, { level: "N3" as const }) },
  { id: "aguardando", title: "Aguardando", cards: makeKanbanCards(3, { level: "External" as const }) },
  { id: "respondida", title: "Respondida", cards: makeKanbanCards(3, { priority: "medium" as const }) },
  { id: "reaberta", title: "Reaberta", cards: makeKanbanCards(3, { priority: "low" as const }) },
  { id: "encerrada", title: "Encerrada", cards: makeKanbanCards(3) },
];

const listRows = [
  {
    idText: "4821",
    numberText: "SIATT-2026-004821",
    companyText: "Energisa Acre",
    level: "N1" as const,
    typologyText: "Pagamento / Inadimplência",
    typologySub: "Religação não realizada",
    status: "Em Tratativa" as const,
    priority: "high" as const,
    responsibleText: "Ana Ribeiro",
    responsibleInitials: "AR",
    openDateText: "12/08/2026",
    slaText: "vence hoje",
  },
  {
    idText: "4822",
    numberText: "SIATT-2026-004822",
    companyText: "Energisa MT",
    level: "N2" as const,
    typologyText: "Medição / Leitura",
    typologySub: "Consumo divergente",
    status: "Em Subsídio" as const,
    priority: "medium" as const,
    responsibleText: "Carlos Souza",
    responsibleInitials: "CS",
    openDateText: "10/08/2026",
    slaText: "2 dias restantes",
  },
  {
    idText: "4823",
    numberText: "SIATT-2026-004823",
    companyText: "Energisa RO",
    level: "N3" as const,
    typologyText: "Rede / Interrupção",
    typologySub: "Falta de energia prolongada",
    status: "Análise de Causa" as const,
    priority: "low" as const,
    responsibleText: "Bruna Lima",
    responsibleInitials: "BL",
    openDateText: "09/08/2026",
    slaText: "5 dias restantes",
  },
  {
    idText: "4824",
    numberText: "SIATT-2026-004824",
    companyText: "Energisa Acre",
    level: "External" as const,
    typologyText: "Atendimento / SAC",
    typologySub: "Reclamação Consumidor.gov",
    status: "Finalizado" as const,
    priority: "low" as const,
    responsibleText: "Ana Ribeiro",
    responsibleInitials: "AR",
    openDateText: "01/08/2026",
    slaText: "concluído",
  },
];

function App() {
  const [theme, setTheme] = React.useState<"light" | "dark">("light");
  const [view, setView] = React.useState("cards");
  const [kanbanColumns, setKanbanColumns] = React.useState(initialKanbanColumns);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "light" ? "dark" : "light";
      document.documentElement.classList.toggle("dark", next === "dark");
      return next;
    });
  };

  return (
    <main className="relative flex min-h-screen items-start gap-4 overflow-hidden bg-[var(--color-surface-secondary)] p-4">
      {theme === "light" && (
        <img
          src={backgroundApp}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 size-full object-cover opacity-60"
        />
      )}

      <div className="relative z-10 flex w-full items-start gap-4">
        <NavigationSidebar defaultState="collapsed" defaultSelectedKey="fila-atendimento" groups={sidebarGroups} />

        <div className="flex min-w-0 flex-1 flex-col gap-8">
          <header className="flex w-full items-center gap-6">
            <NavigationSearch className="flex-1" placeholder="Pesquisar por tipo, nome ou tipografia" />
            <div className="flex shrink-0 items-center gap-6">
              <ThemeToggle
                theme={theme}
                onClick={toggleTheme}
                tooltip={theme === "light" ? "Ativar modo escuro" : "Ativar modo claro"}
              />
              <IconButton notificationCount={3} tooltip="Notificações" />
              <NavigationAvatar />
            </div>
          </header>

          <div className="flex w-full flex-col items-start gap-4 px-4">
            <div className="flex w-full items-center gap-4">
              <PageHeading text="Atendimentos" divider={false} className="flex-1" />
              <Button variant="primary" size="sm" leftIcon={<Plus />}>
                Abrir reclamação
              </Button>
              <SegmentedControl items={viewItems} value={view} onValueChange={setView} />
              <IconButton icon={<ListFilter className="size-6" />} tooltip="Filtrar" />
            </div>

            {view === "cards" && (
              <div className="flex w-full flex-wrap items-start gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <ComplaintCard key={i} {...complaintBaseArgs} />
                ))}
              </div>
            )}

            {view === "kanban" && (
              <ComplaintKanbanBoard
                className="w-full"
                columns={kanbanColumns}
                onCardMove={(cardId, fromColumnId, toColumnId) =>
                  setKanbanColumns((prev) => moveKanbanCard(prev, cardId, fromColumnId, toColumnId))
                }
              />
            )}

            {view === "list" && (
              <div className="w-full overflow-x-auto">
                <div className="flex min-w-fit flex-col">
                  <ComplaintListHeader />
                  {listRows.map((row) => (
                    <ComplaintListRow key={row.idText} {...row} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
