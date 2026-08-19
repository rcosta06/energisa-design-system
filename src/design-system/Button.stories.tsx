import type { Meta, StoryObj } from "@storybook/react";
import type { ButtonRadius } from "../components/ui/button";
import {
  Save, Trash2, ChevronRight, ArrowLeft,
  Download, Plus, Edit, Settings,
} from "lucide-react";
import { Button } from "../components/ui/button";

const iconMap = {
  "(nenhum)": undefined,
  Save: <Save />,
  Trash2: <Trash2 />,
  ChevronRight: <ChevronRight />,
  ArrowLeft: <ArrowLeft />,
  Download: <Download />,
  Plus: <Plus />,
  Edit: <Edit />,
  Settings: <Settings />,
};

type IconKey = keyof typeof iconMap;

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "tertiary", "ghost", "destructive"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    isLoading: { control: "boolean" },
    disabled: { control: "boolean" },
    asChild: { control: false },
    radius: {
      control: "select",
      options: ["none", "xs", "sm", "md", "lg", "xl", "2xl", "full"] as ButtonRadius[],
    },
    leftIcon: {
      control: "select",
      options: Object.keys(iconMap) as IconKey[],
      mapping: iconMap,
    },
    rightIcon: {
      control: "select",
      options: Object.keys(iconMap) as IconKey[],
      mapping: iconMap,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// ─── DOCS PAGE ────────────────────────────────────────────────────────────────

/** Variante principal interativa — altere qualquer prop no painel de Controls. */
export const Primary: Story = {
  args: { variant: "primary", children: "Salvar alterações" },
};

/** As 5 variantes do Figma (Primary/Secondary/Tertiary/Ghost/Destructive) lado a lado. */
export const AllVariants: Story = {
  parameters: {
    docs: {
      source: {
        code: `<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="tertiary">Tertiary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>`,
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="tertiary">Tertiary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  ),
};

/**
 * Os 3 tamanhos (Figma): sm/md usam padding menor e radius-sm (8px), lg usa
 * mais padding e radius-md (12px) — não é erro, é assim que o Figma define.
 */
export const AllSizes: Story = {
  parameters: {
    docs: {
      source: {
        code: `<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`,
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

/** Os 8 valores de border-radius disponíveis (sobrescreve o padrão por tamanho). */
export const AllRadius: Story = {
  parameters: {
    docs: {
      source: {
        code: `<Button variant="primary" radius="none">none</Button>
<Button variant="primary" radius="xs">xs</Button>
<Button variant="primary" radius="sm">sm</Button>
<Button variant="primary" radius="md">md</Button>
<Button variant="primary" radius="lg">lg</Button>
<Button variant="primary" radius="xl">xl</Button>
<Button variant="primary" radius="2xl">2xl</Button>
<Button variant="primary" radius="full">full</Button>`,
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      {(["none", "xs", "sm", "md", "lg", "xl", "2xl", "full"] as ButtonRadius[]).map((r) => (
        <Button key={r} variant="primary" radius={r}>{r}</Button>
      ))}
    </div>
  ),
};

/** Estados especiais reunidos: loading, disabled e composições com ícones (16px, conforme Figma). */
export const States: Story = {
  parameters: {
    docs: {
      source: {
        code: `<Button isLoading>Salvando...</Button>
<Button disabled>Indisponível</Button>
<Button leftIcon={<Save />}>Salvar</Button>
<Button rightIcon={<ChevronRight />}>Próximo</Button>
<Button leftIcon={<Download />} rightIcon={<ChevronRight />}>Baixar</Button>`,
      },
    },
  },
  render: () => (
    <div className="grid grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-3">
      <div className="flex flex-col items-start gap-1">
        <span className="text-xs text-[var(--color-text-secondary)]">Loading</span>
        <Button isLoading>Salvando...</Button>
      </div>
      <div className="flex flex-col items-start gap-1">
        <span className="text-xs text-[var(--color-text-secondary)]">Disabled</span>
        <Button disabled>Indisponível</Button>
      </div>
      <div className="flex flex-col items-start gap-1">
        <span className="text-xs text-[var(--color-text-secondary)]">Left Icon</span>
        <Button leftIcon={<Save />}>Salvar</Button>
      </div>
      <div className="flex flex-col items-start gap-1">
        <span className="text-xs text-[var(--color-text-secondary)]">Right Icon</span>
        <Button rightIcon={<ChevronRight />}>Próximo</Button>
      </div>
      <div className="flex flex-col items-start gap-1">
        <span className="text-xs text-[var(--color-text-secondary)]">Both Icons</span>
        <Button leftIcon={<Download />} rightIcon={<ChevronRight />}>Baixar</Button>
      </div>
    </div>
  ),
};

/** Uso do padrão asChild (Radix Slot) — renderiza um `<a>` com estilo de botão ghost. */
export const AsChild: Story = {
  parameters: {
    docs: {
      source: {
        code: `<Button asChild variant="ghost">
  <a href="#">Link com estilo de botão</a>
</Button>`,
      },
    },
  },
  render: () => (
    <Button asChild variant="ghost">
      <a href="#">Link com estilo de botão</a>
    </Button>
  ),
};

// ─── REGRESSION / CHROMATIC ───────────────────────────────────────────────────

/** Variante secondary isolada (borda, sem preenchimento). */
export const Secondary: Story = {
  tags: ["!autodocs"],
  args: { variant: "secondary", children: "Ação secundária" },
};

/** Variante tertiary isolada (preenchimento neutro). */
export const Tertiary: Story = {
  tags: ["!autodocs"],
  args: { variant: "tertiary", children: "Ação terciária" },
};

/** Variante ghost isolada. */
export const Ghost: Story = {
  tags: ["!autodocs"],
  args: { variant: "ghost", children: "Ver detalhes" },
};

/** Variante destructive isolada. */
export const Destructive: Story = {
  tags: ["!autodocs"],
  args: { variant: "destructive", children: "Excluir conta" },
};

/** Estado loading isolado. */
export const Loading: Story = {
  tags: ["!autodocs"],
  args: { variant: "primary", isLoading: true, children: "Salvando..." },
};

/** Estado disabled isolado. */
export const Disabled: Story = {
  tags: ["!autodocs"],
  args: { variant: "primary", disabled: true, children: "Indisponível" },
};

/** Ícone à esquerda — troca de ícone via Controls. */
export const WithLeftIcon: Story = {
  tags: ["!autodocs"],
  args: { variant: "primary", children: "Salvar", leftIcon: "Save" as unknown as IconKey },
  render: (args) => (
    <Button {...args} leftIcon={iconMap[(args.leftIcon as unknown as IconKey) ?? "(nenhum)"]}>
      {args.children}
    </Button>
  ),
};

/** Ícone à direita — troca de ícone via Controls. */
export const WithRightIcon: Story = {
  tags: ["!autodocs"],
  args: { variant: "secondary", children: "Próximo", rightIcon: "ChevronRight" as unknown as IconKey },
  render: (args) => (
    <Button {...args} rightIcon={iconMap[(args.rightIcon as unknown as IconKey) ?? "(nenhum)"]}>
      {args.children}
    </Button>
  ),
};

/** Ícones em ambos os lados — troca de ícones via Controls. */
export const WithBothIcons: Story = {
  tags: ["!autodocs"],
  args: {
    variant: "tertiary",
    children: "Baixar relatório",
    leftIcon: "Download" as unknown as IconKey,
    rightIcon: "ChevronRight" as unknown as IconKey,
  },
  render: (args) => (
    <Button
      {...args}
      leftIcon={iconMap[(args.leftIcon as unknown as IconKey) ?? "(nenhum)"]}
      rightIcon={iconMap[(args.rightIcon as unknown as IconKey) ?? "(nenhum)"]}
    >
      {args.children}
    </Button>
  ),
};

/** Todas as variantes com ícones — referência de composição. */
export const AllVariantsWithIcons: Story = {
  tags: ["!autodocs"],
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="primary" leftIcon={<Save />}>Salvar</Button>
      <Button variant="secondary" leftIcon={<Download />} rightIcon={<ChevronRight />}>Baixar</Button>
      <Button variant="tertiary" leftIcon={<ArrowLeft />}>Voltar</Button>
      <Button variant="ghost" rightIcon={<ChevronRight />}>Ver mais</Button>
      <Button variant="destructive" leftIcon={<Trash2 />}>Excluir</Button>
    </div>
  ),
};
