import type { Meta, StoryObj } from "@storybook/react";
import { Building2 } from "lucide-react";
import { NavigationExpandableItem } from "../components/ui/navigation-expandable-item";

const meta: Meta<typeof NavigationExpandableItem> = {
  title: "Components/NavigationExpandableItem",
  component: NavigationExpandableItem,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  argTypes: {
    parent: { control: "select", options: ["default", "active", "submenu-active"] },
  },
};

export default meta;
type Story = StoryObj<typeof NavigationExpandableItem>;

const items = [
  { key: "1", label: "Submenu item 01" },
  { key: "2", label: "Submenu item 02" },
  { key: "3", label: "Submenu item 03" },
];

/** Item interativo — clique para expandir/recolher o submenu (chevron gira 90°). */
export const Default: Story = {
  args: { label: "Departments", icon: <Building2 className="size-5" />, parent: "default", items },
};

/**
 * Default × Active (pai selecionado sem submenu) × Submenu-active (um item do
 * submenu está selecionado — pai marcado com a cor primary em opacidade, não
 * sólido). Todos abertos.
 */
export const AllVariants: Story = {
  render: () => (
    <div className="flex w-[222px] flex-col gap-4">
      <NavigationExpandableItem label="Departments" icon={<Building2 className="size-5" />} parent="default" items={items} defaultOpen />
      <NavigationExpandableItem label="Departments" icon={<Building2 className="size-5" />} parent="active" items={items} defaultOpen />
      <NavigationExpandableItem
        label="Departments"
        icon={<Building2 className="size-5" />}
        parent="submenu-active"
        defaultOpen
        items={[
          { key: "1", label: "Submenu item 01" },
          { key: "2", label: "Submenu item 02", selected: true },
          { key: "3", label: "Submenu item 03" },
        ]}
      />
    </div>
  ),
};

/** States do item de submenu: Default, Selected (cor primary em opacidade) e Disabled. */
export const SubmenuItemStates: Story = {
  render: () => (
    <div className="w-[222px]">
      <NavigationExpandableItem
        label="Departments"
        icon={<Building2 className="size-5" />}
        parent="submenu-active"
        defaultOpen
        items={[
          { key: "1", label: "Default" },
          { key: "2", label: "Selected", selected: true },
          { key: "3", label: "Disabled", disabled: true },
        ]}
      />
    </div>
  ),
};

/**
 * Submenu com 2º nível — um item do submenu (`items`) vira expansível quando
 * recebe seu próprio `items` aninhado, recolhido por padrão (abre automaticamente
 * se um dos netos estiver `selected`).
 */
export const NestedSubmenu: Story = {
  render: () => (
    <div className="w-[222px]">
      <NavigationExpandableItem
        label="Departments"
        icon={<Building2 className="size-5" />}
        parent="submenu-active"
        defaultOpen
        items={[
          { key: "1", label: "Submenu item 01" },
          {
            key: "2",
            label: "Submenu com filhos",
            items: [
              { key: "2-1", label: "Filho 01" },
              { key: "2-2", label: "Filho 02", selected: true },
              { key: "2-3", label: "Filho 03" },
            ],
          },
          { key: "3", label: "Submenu item 03" },
        ]}
      />
    </div>
  ),
};
