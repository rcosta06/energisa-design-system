import type { Meta, StoryObj } from "@storybook/react";
import { Select, type SelectOption } from "../components/ui/select";
import { Badge } from "../components/ui/badge";
import { Avatar } from "../components/ui/avatar";

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    state: { control: "select", options: ["default", "hover"] },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
    searchable: { control: "boolean" },
    multiSelect: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

// ─── Dados de exemplo (não hardcoded no componente — vêm da story) ─────────

const companyOptions: SelectOption[] = [
  { value: "acre", label: "Energisa Acre" },
  { value: "mt", label: "Energisa Mato Grosso" },
  { value: "ro", label: "Energisa Rondônia" },
  { value: "to", label: "Energisa Tocantins" },
  { value: "ss", label: "Energisa Sul-Sudeste" },
];

const statusOptions: SelectOption[] = [
  { value: "nao-atribuido", label: "Não Atribuído" },
  { value: "em-tratativa", label: "Em Tratativa" },
  { value: "em-subsidio", label: "Em Subsídio" },
  { value: "em-resposta", label: "Em Resposta" },
  { value: "respondida", label: "Respondida" },
  { value: "analise-causa", label: "Análise de Causa" },
  { value: "finalizado", label: "Finalizado" },
];

const priorityOptions: SelectOption[] = [
  { value: "alta", label: "Alta", rightElement: <Badge tone="danger" bgOpacity={15}>Alta</Badge> },
  { value: "media", label: "Média", rightElement: <Badge tone="warning" bgOpacity={15}>Média</Badge> },
  { value: "baixa", label: "Baixa", rightElement: <Badge tone="success" bgOpacity={15}>Baixa</Badge> },
];

const responsibleOptions: SelectOption[] = [
  {
    value: "ana",
    label: "Ana Ribeiro",
    description: "Atendente",
    leftElement: <Avatar size="xs" initials="AR" />,
  },
  {
    value: "carlos",
    label: "Carlos Souza",
    description: "Atendente líder",
    leftElement: <Avatar size="xs" initials="CS" />,
  },
  {
    value: "bruna",
    label: "Bruna Lima",
    description: "Supervisora",
    leftElement: <Avatar size="xs" initials="BL" />,
  },
];

const groupedCompanyOptions: SelectOption[] = [
  { value: "acre", label: "Energisa Acre", group: "Empresa" },
  { value: "ro", label: "Energisa Rondônia", group: "Empresa" },
  { value: "to", label: "Energisa Tocantins", group: "Empresa" },
  { value: "consumidor-gov", label: "Consumidor.gov", group: "Origem" },
  { value: "procon", label: "Procon – Linha Direta", group: "Origem" },
];

const withDisabledOptions: SelectOption[] = [
  { value: "acre", label: "Energisa Acre" },
  { value: "mt", label: "Energisa Mato Grosso", disabled: true },
  { value: "ro", label: "Energisa Rondônia" },
  { value: "to", label: "Energisa Tocantins", disabled: true },
];

const longListOptions: SelectOption[] = Array.from({ length: 30 }, (_, i) => ({
  value: `item-${i + 1}`,
  label: `Tipologia ${String(i + 1).padStart(2, "0")}`,
}));

// ─── Field básico ───────────────────────────────────────────────────────────

/** Select interativo — altere qualquer prop no painel de Controls. */
export const Default: Story = {
  args: { options: companyOptions, placeholder: "Selecione uma opção" },
};

/** Com label acima do campo. */
export const WithLabel: Story = {
  args: { options: companyOptions, label: "Empresa" },
};

/** Com asterisco de obrigatório ao lado do label. */
export const Required: Story = {
  args: { options: companyOptions, label: "Empresa", required: true },
};

/** Com valor pré-selecionado — texto em `text-primary` em vez de `text-muted`. */
export const Filled: Story = {
  args: { options: companyOptions, label: "Empresa", defaultValue: "acre" },
};

/** Desabilitado — sem interação, `surface-secondary` + opacidade 50%. */
export const Disabled: Story = {
  args: { options: companyOptions, label: "Empresa", disabled: true, defaultValue: "acre" },
};

/** Estado de erro — borda e mensagem em `danger-default`. */
export const Error: Story = {
  args: { options: companyOptions, label: "Empresa", errorMessage: "Selecione uma empresa" },
};

/** Os 3 tamanhos reais do Figma — SM/MD (radius-sm) e LG (radius-md, padding uniforme 16px). */
export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <Select options={companyOptions} size="sm" label="Small" placeholder="SM" />
      <Select options={companyOptions} size="md" label="Medium" placeholder="MD" />
      <Select options={companyOptions} size="lg" label="Large" placeholder="LG" />
    </div>
  ),
};

/**
 * Todos os estados do Figma lado a lado. Hover é forçado via `state="hover"`
 * (só para preview); Focus usa `autoFocus` real; Open usa `defaultOpen` real
 * — nenhum dos dois é uma prop "fake" de estado, ambos disparam o
 * comportamento de verdade do componente.
 */
export const States: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-6">
      <Select options={companyOptions} label="Default" />
      <Select options={companyOptions} label="Hover" state="hover" />
      <Select options={companyOptions} label="Focus" autoFocus />
      <Select options={companyOptions} label="Open" defaultOpen />
      <Select options={companyOptions} label="Filled" defaultValue="acre" />
      <Select options={companyOptions} label="Disabled" disabled />
      <Select options={companyOptions} label="Error" errorMessage="Campo obrigatório" />
    </div>
  ),
};

/** Item selecionado mostra o checkmark (`Select / Check Icon`) à direita. */
export const Selected: Story = {
  args: { options: companyOptions, label: "Empresa", defaultValue: "ro", defaultOpen: true },
};

/** Itens desabilitados (`disabled` por opção) — sem interação, `opacity-50`. */
export const WithDisabledItem: Story = {
  args: { options: withDisabledOptions, label: "Empresa", defaultOpen: true },
};

// ─── Composição do Item ─────────────────────────────────────────────────────

/** `leftElement` com ícone qualquer — aqui, badges de prioridade como `rightElement` puro (sem ícone à esquerda). */
export const WithIcons: Story = {
  args: { options: priorityOptions, label: "Prioridade", defaultOpen: true },
};

/** `leftElement` com Avatar — reaproveita o componente `Avatar` já existente. */
export const WithAvatar: Story = {
  args: { options: responsibleOptions.map(({ description, ...o }) => o), label: "Responsável", defaultOpen: true },
};

/** Avatar + label + descrição — todos os slots da composição juntos. */
export const WithDescription: Story = {
  args: { options: responsibleOptions, label: "Responsável", defaultOpen: true },
};

/** `rightElement` com `Badge` (componente já existente) — não substitui o checkmark de seleção. */
export const WithBadge: Story = {
  args: { options: priorityOptions, label: "Prioridade", defaultOpen: true },
};

/** `rightElement` (Badge) + checkmark de seleção ao mesmo tempo — um não substitui o outro. */
export const WithBadgeAndSelected: Story = {
  args: { options: priorityOptions, label: "Prioridade", defaultValue: "media", defaultOpen: true },
};

// ─── Dropdown types ─────────────────────────────────────────────────────────

/** Agrupado por `group` nos dados (não hardcoded) — "Empresa" e "Origem", com `Select / Separator` entre grupos. */
export const Grouped: Story = {
  args: { options: groupedCompanyOptions, label: "Origem da reclamação", defaultOpen: true },
};

/** Busca funcional de verdade — digite para filtrar os itens em tempo real. */
export const Searchable: Story = {
  args: { options: companyOptions, label: "Empresa", searchable: true, defaultOpen: true },
};

/**
 * `Select / Empty` — sem opções correspondentes. Digite qualquer coisa no
 * campo de busca para reproduzir o mesmo estado com a lista completa.
 */
export const SearchableEmpty: Story = {
  args: { options: [], label: "Empresa", searchable: true, defaultOpen: true },
};

/** Busca + grupos — filtra os itens e some com grupos que ficaram vazios. */
export const SearchableGrouped: Story = {
  args: { options: groupedCompanyOptions, label: "Origem da reclamação", searchable: true, defaultOpen: true },
};

/**
 * "Internal Filter" — chips de filtro rápido acima da lista (`filters`,
 * filtragem client-side pelos dados via `group`), combinado com busca.
 */
export const InternalFilter: Story = {
  args: {
    options: [
      { value: "ana", label: "Ana Ribeiro", group: "todos" },
      { value: "carlos", label: "Carlos Souza", group: "equipe-a" },
      { value: "bruna", label: "Bruna Lima", group: "equipe-a" },
      { value: "diego", label: "Diego Prado", group: "equipe-b" },
      { value: "elisa", label: "Elisa Nunes", group: "equipe-b" },
    ],
    label: "Responsável",
    searchable: true,
    searchPlaceholder: "Pesquisar responsável...",
    filters: [
      { value: "todos", label: "Todos" },
      { value: "equipe-a", label: "Equipe A" },
      { value: "equipe-b", label: "Equipe B" },
    ],
    defaultOpen: true,
  },
};

// ─── MultiSelect ────────────────────────────────────────────────────────────

/** Seleção múltipla real — clique para marcar/desmarcar, tags aparecem no campo. */
export const MultiSelect: Story = {
  args: {
    options: companyOptions,
    label: "Empresas",
    multiSelect: true,
    defaultValues: ["acre", "ro"],
    defaultOpen: true,
  },
};

/** MultiSelect + busca combinados. */
export const MultiSelectSearchable: Story = {
  args: {
    options: companyOptions,
    label: "Empresas",
    multiSelect: true,
    searchable: true,
    defaultValues: ["acre", "mt"],
    defaultOpen: true,
  },
};

/**
 * Overflow "+N" dinâmico — calculado em tempo real medindo a largura real
 * das tags (não configurado manualmente). Redimensione a janela/painel para
 * ver o número mudar sozinho; nenhuma tag fica cortada pela metade.
 */
export const MultiSelectOverflow: Story = {
  render: () => (
    <div className="w-[260px]">
      <Select
        options={companyOptions}
        label="Empresas"
        multiSelect
        defaultValues={["acre", "mt", "ro", "to", "ss"]}
      />
    </div>
  ),
};

// ─── Responsividade ─────────────────────────────────────────────────────────

/** 280px / 360px / 480px / 100% — chevron e tags sempre visíveis, nenhuma tag cortada. */
export const ResponsiveWidths: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {[280, 360, 480].map((w) => (
        <div key={w} style={{ width: w }}>
          <Select
            options={companyOptions}
            label={`${w}px`}
            multiSelect
            defaultValues={["acre", "mt", "ro", "to", "ss"]}
          />
        </div>
      ))}
      <div className="w-full">
        <Select options={companyOptions} label="100%" multiSelect defaultValues={["acre", "mt", "ro", "to", "ss"]} />
      </div>
    </div>
  ),
};

/** Lista longa (30 itens) — o painel tem `max-h-72` com scroll interno, não cresce indefinidamente. */
export const LongList: Story = {
  args: { options: longListOptions, label: "Tipologia", searchable: true, defaultOpen: true },
};

/** Alterne o tema no toolbar do Storybook (Light/Dark) — todas as cores usam tokens semantic. */
export const LightDark: Story = {
  args: { options: priorityOptions, label: "Prioridade", defaultValue: "alta", defaultOpen: true },
};

/**
 * Navegação por teclado real — clique no campo e use ArrowDown/ArrowUp para
 * mover o destaque, Enter para selecionar, Escape para fechar.
 */
export const KeyboardNavigation: Story = {
  args: { options: statusOptions, label: "Status (use as setas + Enter)" },
};
