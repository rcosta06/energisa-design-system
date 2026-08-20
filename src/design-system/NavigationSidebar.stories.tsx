import type { Meta, StoryObj } from "@storybook/react";
import { LayoutGrid, MessageSquare, Building2, FolderKanban, Receipt, Users, Truck, Compass } from "lucide-react";
import { NavigationSidebar } from "../components/ui/navigation-sidebar";
import { IconButton } from "../components/ui/icon-button";

const meta: Meta<typeof NavigationSidebar> = {
  title: "Components/NavigationSidebar",
  component: NavigationSidebar,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  argTypes: {
    defaultState: { control: "select", options: ["expanded", "collapsed"] },
  },
};

export default meta;
type Story = StoryObj<typeof NavigationSidebar>;

const groups = [
  [
    { key: "dashboard", label: "Dashboard", icon: <LayoutGrid className="size-5" /> },
    { key: "messages", label: "Messages", icon: <MessageSquare className="size-5" /> },
  ],
  [
    {
      key: "departments",
      label: "Departments",
      icon: <Building2 className="size-5" />,
      submenuItems: [
        { key: "d1", label: "Submenu item 01" },
        { key: "d2", label: "Submenu item 02" },
        { key: "d3", label: "Submenu item 03" },
      ],
    },
    { key: "projects", label: "Projects", icon: <FolderKanban className="size-5" /> },
    { key: "invoice", label: "Invoice", icon: <Receipt className="size-5" /> },
  ],
  [
    { key: "employees", label: "Employees", icon: <Users className="size-5" /> },
    { key: "shipment", label: "Shipment", icon: <Truck className="size-5" /> },
    {
      key: "explore",
      label: "Explore",
      icon: <Compass className="size-5" />,
      submenuItems: [
        { key: "e1", label: "Submenu item 01" },
        { key: "e2", label: "Submenu item 02" },
        { key: "e3", label: "Submenu item 03" },
      ],
    },
  ],
];

/**
 * Sidebar interativa e não-controlada. Clique no Brand (logo laranja + "SCR |
 * Sistema Central de Reclamações") para alternar Expanded/Collapsed
 * repetidamente. Clique em qualquer item (inclusive dentro do submenu de
 * "Departments"/"Explore") para marcá-lo como selecionado — o item marcado
 * troca em tempo real, sem mexer nos Controls. `showSearch` mostra o campo de
 * busca logo abaixo do Brand (ícone-only quando Collapsed).
 */
export const Default: Story = {
  args: { defaultState: "expanded", defaultSelectedKey: "dashboard", groups, showUserProfile: true, showSearch: true },
};

/** Expanded × Collapsed lado a lado — comparação estática, com busca visível nos dois modos. */
export const AllStates: Story = {
  render: () => (
    <div className="flex items-start gap-6">
      <NavigationSidebar state="expanded" defaultSelectedKey="dashboard" groups={groups} showUserProfile showSearch />
      <NavigationSidebar state="collapsed" defaultSelectedKey="dashboard" groups={groups} showUserProfile showSearch />
    </div>
  ),
};

/**
 * Demonstra a marcação de submenu: "Departments" já abre com o item "Submenu
 * item 02" selecionado — repare que o item PAI também fica marcado (cor
 * primary em opacidade), não sólido. Clique em outro item do submenu para ver
 * a marcação mudar.
 */
export const SubmenuSelection: Story = {
  args: { defaultState: "expanded", defaultSelectedKey: "d2", groups, showUserProfile: true },
};

/**
 * Contexto mínimo com o sino de notificação usado ao lado do Sidebar (como no
 * Site do Figma) — clique no Brand para testar a transição junto do IconButton.
 */
export const WithNotificationBell: Story = {
  render: () => (
    <div className="flex items-start gap-4">
      <NavigationSidebar defaultState="expanded" defaultSelectedKey="dashboard" groups={groups} showUserProfile />
      <IconButton notificationCount={3} />
    </div>
  ),
};
