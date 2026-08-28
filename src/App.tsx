import * as React from "react";
import { LayoutGrid, Headphones, Kanban, IdCard, List, Plus, ListFilter } from "lucide-react";
import { NavigationSidebar } from "@/components/ui/navigation-sidebar";
import { NavigationAvatar } from "@/components/ui/navigation-avatar";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { IconButton } from "@/components/ui/icon-button";
import { Button } from "@/components/ui/button";
import { PageHeading } from "@/components/ui/page-heading";
import { SegmentedControl, type SegmentedControlItem } from "@/components/ui/segmented-control";
import { ComplaintCard } from "@/components/ui/complaint-card";
import { ComplaintKanbanBoard, type ComplaintKanbanBoardProps } from "@/components/ui/complaint-kanban";
import { ComplaintListHeader, ComplaintListRow } from "@/components/ui/complaint-list";
import { DropdownMenu, MenuItem, MenuDivider, MenuSub } from "@/components/ui/menu";
import { Avatar } from "@/components/ui/avatar";
import { avatarPresets } from "@/components/ui/avatar-presets";
import { FilePdfIcon } from "@/components/ui/icons/file-pdf";
import { ComplaintFilterDrawer } from "@/components/ui/complaint-filter-drawer";
import { LoginPage } from "@/components/ui/login-page";
import { CurrentUserProvider, useCurrentUser } from "@/lib/use-current-user";
import type { SelectOption } from "@/components/ui/select";
import {
  defaultComplaintFilters,
  filterComplaints,
  sortComplaints,
  type ComplaintFilters,
  type ComplaintLevel,
  type ComplaintPriority,
} from "@/components/ui/complaint-shared";

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
            { key: "cadastrar-respostas", label: "Cadastrar respostas" },
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
  // Mesmo id em toda mock data que representa esta pessoa (aqui e em `listRows`) — é o que
  // faz uma preferência de avatar salva para "ana-ribeiro" refletir em todo lugar que a
  // representa, sem precisar repetir lógica por card/lista.
  responsibleId: "ana-ribeiro",
  sla: "vence hoje",
};

const kanbanCardBase: {
  numberText: string;
  typologyText: string;
  companyText: string;
  responsibleText: string;
  responsibleInitials: string;
  responsibleId: string;
  slaText: string;
  level: ComplaintLevel;
  priority: ComplaintPriority;
} = {
  numberText: "SIATT-2026-004821",
  typologyText: "Pagamento / Inadimplência",
  companyText: "Energisa Acre",
  responsibleText: "Ana Ribeiro",
  responsibleInitials: "AR",
  responsibleId: "ana-ribeiro",
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
    responsibleId: "ana-ribeiro",
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
    responsibleId: "carlos-souza",
    openDateText: "10/08/2026",
    slaText: "2 dias restantes",
    inconsistent: true,
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
    responsibleId: "bruna-lima",
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
    responsibleId: "ana-ribeiro",
    openDateText: "01/08/2026",
    slaText: "concluído",
  },
];

function listRowActionsMenu() {
  return <MenuItem label="Gerar PDF" leftIcon={<FilePdfIcon />} />;
}

// Derivado dos valores reais de `listRows.companyText` — não uma lista digitada à parte
// (as únicas empresas que de fato existem nos dados são Acre/MT/RO; "Todas as empresas"
// é a única entrada sintética, representando "sem filtro de empresa").
const filterCompanyOptions: SelectOption[] = [
  { value: "", label: "Todas as empresas" },
  ...Array.from(new Set(listRows.map((row) => row.companyText))).map((company) => ({
    value: company,
    label: company,
  })),
];

// "Prazo de SLA" fica de fora: `slaText` é texto livre ("vence hoje" / "N dias restantes" /
// "concluído") sem estrutura numérica confiável para ordenar — ver `complaint-shared.ts`.
const filterSortOptions: SelectOption[] = [
  { value: "", label: "Padrão" },
  { value: "recent", label: "Mais recentes primeiro" },
  { value: "oldest", label: "Mais antigas primeiro" },
];

function Home({ onLogout }: { onLogout: () => void }) {
  const { user, avatar, setAvatarPreset, setAvatarInitials } = useCurrentUser();

  const [theme, setTheme] = React.useState<"light" | "dark">("light");
  const [view, setView] = React.useState("cards");
  const [kanbanColumns, setKanbanColumns] = React.useState(initialKanbanColumns);

  const [filterOpen, setFilterOpen] = React.useState(false);
  // Único controlado à parte de `filters`: não filtra nada de verdade (sem conceito real
  // de usuário logado no projeto), então fica fora da fonte central de filtragem — ver
  // `ComplaintFilters` em `complaint-shared.ts`.
  const [onlyMine, setOnlyMine] = React.useState(false);
  const [filters, setFilters] = React.useState<ComplaintFilters>(defaultComplaintFilters);

  const clearFilters = () => {
    setOnlyMine(false);
    setFilters(defaultComplaintFilters);
  };

  const filteredListRows = sortComplaints(filterComplaints(listRows, filters), filters.sort);

  // `sort` não conta (só reordena, nunca restringe resultados) e `onlyMine` não conta
  // (não filtra nada de verdade — ver acima) — só os campos que de fato removem linhas.
  const hasActiveFilters =
    filters.company !== "" ||
    filters.onlyInconsistent ||
    filters.priorities.length > 0 ||
    filters.levels.length > 0 ||
    filters.statuses.length > 0;

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
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 size-full"
          style={{
            backgroundImage:
              "linear-gradient(123.11201221736448deg, rgba(0, 111, 171, 0.25) 23.204%, rgba(55, 140, 123, 0.25) 62.825%, rgba(216, 224, 227, 0.25) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)",
          }}
        />
      )}

      <div className="relative z-10 flex w-full items-start gap-4">
        <NavigationSidebar
          defaultState="collapsed"
          defaultSelectedKey="fila-atendimento"
          groups={sidebarGroups}
        />

        <div className="flex min-w-0 flex-1 flex-col gap-8">
          <header className="flex w-full items-center justify-end gap-6">
            <div className="flex shrink-0 items-center gap-6">
              <ThemeToggle
                theme={theme}
                onClick={toggleTheme}
                tooltip={theme === "light" ? "Ativar modo escuro" : "Ativar modo claro"}
              />
              <IconButton notificationCount={3} tooltip="Notificações" />
              <DropdownMenu
                trigger={
                  <NavigationAvatar
                    userName={user.name}
                    role={user.role}
                    avatarInitials={avatar.initials}
                    avatarType={avatar.type}
                    avatarPreset={avatar.preset}
                  />
                }
                align="end"
              >
                <MenuItem label="Atendente" />
                <MenuItem label="Atendente líder" />
                <MenuItem label="Supervisor" />
                <MenuItem label="Subsídio" />
                <MenuItem label="Ger/Cord" />
                <MenuItem label="Adm suporte" />
                <MenuDivider />
                <MenuSub label="Selecionar avatar">
                  {Object.keys(avatarPresets).map((presetId) => (
                    <MenuItem
                      key={presetId}
                      label={presetId}
                      leftIcon={<Avatar size="xs" type="preset" preset={presetId as keyof typeof avatarPresets} alt={presetId} />}
                      selected={avatar.type === "preset" && avatar.preset === presetId}
                      onClick={() => setAvatarPreset(presetId as keyof typeof avatarPresets)}
                    />
                  ))}
                  <MenuDivider />
                  <MenuItem
                    label="Usar iniciais"
                    leftIcon={<Avatar size="xs" type="initials" initials={user.initials} />}
                    selected={avatar.type === "initials"}
                    onClick={() => setAvatarInitials()}
                  />
                </MenuSub>
                <MenuDivider />
                <MenuItem label="Sair" onClick={onLogout} />
              </DropdownMenu>
            </div>
          </header>

          <div className="flex w-full flex-col items-start gap-4 px-4">
            <div className="flex w-full items-center gap-4">
              <PageHeading text="Atendimentos" divider={false} className="flex-1" />
              <Button
                variant="ghost"
                size="sm"
                leftIcon={<Plus />}
                className="hover:bg-[var(--color-hover-highlight)] active:bg-[var(--color-hover-highlight)]"
              >
                Abrir reclamação
              </Button>
              <SegmentedControl items={viewItems} value={view} onValueChange={setView} size="md" />
              <IconButton
                icon={<ListFilter className="size-6" />}
                tooltip="Filtrar"
                onClick={() => setFilterOpen(true)}
              />
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="hover:bg-[var(--color-hover-highlight)] active:bg-[var(--color-hover-highlight)]"
                >
                  Limpar filtro
                </Button>
              )}
            </div>

            {view === "cards" && (
              <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(min(340px,100%),1fr))] items-start gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <ComplaintCard key={i} {...complaintBaseArgs} className="w-full" />
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
                  {filteredListRows.map((row) => (
                    <ComplaintListRow key={row.idText} {...row} actionsMenu={listRowActionsMenu()} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <ComplaintFilterDrawer
        open={filterOpen}
        onOpenChange={setFilterOpen}
        companyOptions={filterCompanyOptions}
        company={filters.company}
        onCompanyChange={(company) => setFilters((f) => ({ ...f, company }))}
        sortOptions={filterSortOptions}
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
        onClear={clearFilters}
      />
    </main>
  );
}

/**
 * Gate cliente-side entre `LoginPage` e `Home` — sem backend/rota real no
 * projeto (auditado antes de implementar a Login, nada encontrado pra
 * integrar). `LoginPanel.onSubmit` não valida credencial nenhuma (não é
 * autenticação fake) — só avança pra `Home`, que é o que já existia. "Sair"
 * no menu do avatar volta pra `LoginPage`, fechando o ciclo pra teste manual.
 */
function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  return (
    <CurrentUserProvider>
      {isAuthenticated ? (
        <Home onLogout={() => setIsAuthenticated(false)} />
      ) : (
        <LoginPage onSubmit={() => setIsAuthenticated(true)} />
      )}
    </CurrentUserProvider>
  );
}

export default App;
