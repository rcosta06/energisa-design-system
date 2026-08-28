import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Pencil, Copy, Star, Trash2, Settings, LogOut, Users } from "lucide-react";
import { Button } from "../components/ui/button";
import { IconButton } from "../components/ui/icon-button";
import { NavigationAvatar } from "../components/ui/navigation-avatar";
import { Avatar } from "../components/ui/avatar";
import { avatarPresets } from "../components/ui/avatar-presets";
import { DotsThreeOutlineVerticalIcon } from "../components/ui/icons/dots-three-outline-vertical";
import { MenuItem, MenuDivider, MenuGroup, MenuSub, ContextMenu, DropdownMenu } from "../components/ui/menu";
import { CurrentUserProvider, useCurrentUser, useUserAvatar } from "../lib/use-current-user";

const meta: Meta<typeof MenuItem> = {
  title: "Components/Menu",
  component: MenuItem,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    intent: { control: "select", options: ["default", "danger"] },
    state: { control: "select", options: ["default", "hover"] },
  },
};

export default meta;
type Story = StoryObj<typeof MenuItem>;

// ─── Menu / Item ────────────────────────────────────────────────────────────

/** Item interativo — altere qualquer prop no painel de Controls. */
export const Default: Story = {
  args: { label: "Menu Item" },
  render: (args) => (
    <div className="w-[210px]">
      <MenuItem {...args} />
    </div>
  ),
};

/**
 * As 4 combinações de ícone do Figma (slots de 24px em ambos os lados,
 * `Show Left Icon`/`Show Right Icon` no component set): sem ícone, ícone à
 * esquerda, ícone à direita (chevron de submenu) e ícones nos dois lados.
 */
export const IconPlacement: Story = {
  render: () => (
    <div className="flex w-[210px] flex-col gap-1">
      <MenuItem label="Sem ícone" />
      <MenuItem label="Ícone à esquerda" leftIcon={<Settings className="size-6" />} />
      <MenuItem label="Ícone à direita" showRightIcon />
      <MenuItem label="Ícones nos dois lados" leftIcon={<Users className="size-6" />} showRightIcon />
    </div>
  ),
};

/**
 * Estados de interação, seleção e intenção. "Active" no Figma (State=Active)
 * está vinculado à variável `border-default`, mas resolve para o mesmo valor
 * de cor de `surface-secondary` (confirmado via Plugin API) — visualmente
 * idêntico a Hover, por isso reaproveita `state="hover"` em vez de precisar
 * de um valor próprio. "Selected" mostra o checkmark; "Disabled" some com a
 * interação e usa `text-muted`; "Danger" é usado para ações destrutivas.
 */
export const StatesAndIntents: Story = {
  render: () => (
    <div className="flex w-[210px] flex-col gap-1">
      <MenuItem label="Default" />
      <MenuItem label="Hover" state="hover" />
      <MenuItem label="Active" state="hover" />
      <MenuItem label="Selected" selected />
      <MenuItem label="Disabled" disabled />
      <MenuItem label="Danger — Default" intent="danger" />
      <MenuItem label="Danger — Hover" intent="danger" state="hover" />
      <MenuItem label="Danger — Disabled" intent="danger" disabled />
    </div>
  ),
};

// ─── Menu / Divider ─────────────────────────────────────────────────────────

/** Isolado — linha fina de 1px, `border-default`, dentro do padding padrão (`px-3 py-1`) do Figma. */
export const Divider: Story = {
  render: () => (
    <div className="w-[210px] rounded-[var(--radius-md)] border border-[var(--color-border-default)] p-1">
      <MenuDivider />
    </div>
  ),
};

/** Em contexto — separando um grupo de ações neutras de uma ação destrutiva. */
export const DividerInContext: Story = {
  render: () => (
    <div className="w-[210px] rounded-[var(--radius-md)] border border-[var(--color-border-default)] p-1">
      <MenuItem label="Editar" />
      <MenuItem label="Duplicar" />
      <MenuDivider />
      <MenuItem label="Excluir" intent="danger" />
    </div>
  ),
};

// ─── Menu / Group ───────────────────────────────────────────────────────────

/**
 * `MenuGroup` isolado — no Figma (node 2627:2698) é só um agrupador vertical
 * sem estilo próprio (sem header/label); a borda/padding abaixo é apenas o
 * container de demonstração, não faz parte do componente.
 */
export const Group: Story = {
  render: () => (
    <div className="w-[210px] rounded-[var(--radius-md)] border border-[var(--color-border-default)] p-1">
      <MenuGroup>
        <MenuItem label="Editar" leftIcon={<Pencil className="size-6" />} />
        <MenuItem label="Duplicar" leftIcon={<Copy className="size-6" />} />
        <MenuItem label="Favoritar" leftIcon={<Star className="size-6" />} />
      </MenuGroup>
    </div>
  ),
};

// ─── Menu / Context Menu ────────────────────────────────────────────────────

/**
 * `ContextMenu` — o painel flutuante completo (fundo, borda, sombra, radius-md),
 * réplica exata do exemplo do Figma (node 2627:2989): três ações neutras,
 * divisor, e uma ação destrutiva.
 */
export const ContextMenuPanel: StoryObj<typeof ContextMenu> = {
  render: () => (
    <ContextMenu>
      <MenuItem label="Editar" />
      <MenuItem label="Duplicar" />
      <MenuItem label="Favoritar" />
      <MenuDivider />
      <MenuItem label="Excluir" intent="danger" />
    </ContextMenu>
  ),
};

/** `ContextMenu` com ícones, `MenuGroup`, item selecionado, submenu (chevron) e ação destrutiva — todos os recursos juntos. */
export const ContextMenuWithIconsAndGroups: StoryObj<typeof ContextMenu> = {
  render: () => (
    <ContextMenu>
      <MenuGroup>
        <MenuItem label="Editar" leftIcon={<Pencil className="size-6" />} />
        <MenuItem label="Duplicar" leftIcon={<Copy className="size-6" />} />
        <MenuItem label="Favoritar" leftIcon={<Star className="size-6" />} selected />
      </MenuGroup>
      <MenuDivider />
      <MenuGroup>
        <MenuItem label="Compartilhar com" leftIcon={<Users className="size-6" />} showRightIcon />
        <MenuItem label="Sair" leftIcon={<LogOut className="size-6" />} />
      </MenuGroup>
      <MenuDivider />
      <MenuItem label="Excluir" leftIcon={<Trash2 className="size-6" />} intent="danger" />
    </ContextMenu>
  ),
};

/** "Menu com ícones" — mesmo conteúdo do `ContextMenuPanel`, com ícone à esquerda em cada item. */
export const ExampleWithIcons: StoryObj<typeof ContextMenu> = {
  render: () => (
    <ContextMenu>
      <MenuItem label="Editar" leftIcon={<Pencil className="size-6" />} />
      <MenuItem label="Duplicar" leftIcon={<Copy className="size-6" />} />
      <MenuItem label="Favoritar" leftIcon={<Star className="size-6" />} />
      <MenuDivider />
      <MenuItem label="Excluir" leftIcon={<Trash2 className="size-6" />} intent="danger" />
    </ContextMenu>
  ),
};

/**
 * "Menu de ações" — mesmo conteúdo usado de verdade em `ComplaintListRow`
 * (`ComplaintList.stories.tsx`, prop `actionsMenu`): Ver detalhes/Editar,
 * divisor, Excluir.
 */
export const ExampleActionsMenu: StoryObj<typeof ContextMenu> = {
  render: () => (
    <ContextMenu>
      <MenuItem label="Ver detalhes" />
      <MenuItem label="Editar" />
      <MenuDivider />
      <MenuItem label="Excluir" intent="danger" />
    </ContextMenu>
  ),
};

/**
 * "Menu de status" — lista de opções com uma marcada (`selected`, checkmark),
 * o padrão de um seletor de status/filtro dentro de um menu.
 */
export const ExampleStatusWithSelection: StoryObj<typeof ContextMenu> = {
  render: () => (
    <ContextMenu>
      <MenuItem label="Não Atribuído" />
      <MenuItem label="Em Tratativa" selected />
      <MenuItem label="Em Subsídio" />
      <MenuItem label="Finalizado" />
    </ContextMenu>
  ),
};

// ─── MenuSub ────────────────────────────────────────────────────────────────
// O chevron de `showRightIcon` só indicava visualmente "isto abre um
// submenu" (ver `StatesAndIntents`/`ContextMenuWithIconsAndGroups`) sem
// nenhum comportamento por trás — `MenuSub` é a implementação real: passe
// `MenuItem`/`MenuDivider` como `children`, o painel abre ao lado (hover ou
// clique), com viewport-aware side-flip automático.

/** `MenuSub` isolado — hover ou clique para abrir; o painel abre à direita por padrão. */
export const Sub: StoryObj<typeof MenuSub> = {
  render: () => (
    <ContextMenu>
      <MenuItem label="Editar" />
      <MenuSub label="Compartilhar com" leftIcon={<Users className="size-6" />}>
        <MenuItem label="Equipe" />
        <MenuItem label="Apenas eu" selected />
        <MenuItem label="Link público" />
      </MenuSub>
      <MenuDivider />
      <MenuItem label="Excluir" intent="danger" />
    </ContextMenu>
  ),
};

/**
 * Uso real: o menu do avatar do usuário (`App.tsx`, header) usa `MenuSub`
 * para "Selecionar avatar", listando os mesmos 14 presets de
 * `avatar-presets.ts` (nunca uma lista duplicada) — cada opção é um
 * `<Avatar type="preset" .../>` real como `leftIcon`, com `selected` no
 * preset atualmente escolhido. `Usar iniciais` volta ao fallback seguro. O
 * estado abaixo é só para esta story funcionar isolada — na aplicação real a
 * seleção vem de `useCurrentUser()` (`src/lib/use-current-user.tsx`), fonte
 * única compartilhada por header, `NavigationSidebar` e qualquer outro lugar
 * que renderize o avatar do usuário logado.
 */
export const AvatarPickerExample: StoryObj<typeof DropdownMenu> = {
  render: function AvatarPickerExampleRender() {
    const [selected, setSelected] = React.useState<{ type: "preset" | "initials"; preset?: keyof typeof avatarPresets }>({
      type: "initials",
    });

    return (
      <DropdownMenu
        align="end"
        trigger={
          <NavigationAvatar
            avatarType={selected.type}
            avatarPreset={selected.preset}
            avatarInitials="ER"
          />
        }
      >
        <MenuItem label="Atendente" />
        <MenuDivider />
        <MenuSub label="Selecionar avatar">
          {Object.keys(avatarPresets).map((presetId) => (
            <MenuItem
              key={presetId}
              label={presetId}
              leftIcon={<Avatar size="xs" type="preset" preset={presetId as keyof typeof avatarPresets} alt={presetId} />}
              selected={selected.type === "preset" && selected.preset === presetId}
              onClick={() => setSelected({ type: "preset", preset: presetId as keyof typeof avatarPresets })}
            />
          ))}
          <MenuDivider />
          <MenuItem
            label="Usar iniciais"
            leftIcon={<Avatar size="xs" type="initials" initials="ER" />}
            selected={selected.type === "initials"}
            onClick={() => setSelected({ type: "initials" })}
          />
        </MenuSub>
        <MenuDivider />
        <MenuItem label="Sair" />
      </DropdownMenu>
    );
  },
};

/**
 * Integração real (não isolada como a story acima): `CurrentUserProvider` +
 * `useCurrentUser`/`useUserAvatar` de verdade (`src/lib/use-current-user.tsx`)
 * — os mesmos que `App.tsx` usa. Selecionar um preset aqui chama o mesmo
 * `setAvatarPreset` que o menu real usa; o card "Ana Ribeiro" abaixo é
 * decorativo (outra pessoa, não muda) só pra provar que a troca é POR
 * PESSOA — cada `id` tem sua própria preferência, uma não afeta a outra. O
 * "Foto" é composto direto (mesmo padrão do `ModesComparison` em
 * `Avatar.stories.tsx`) — não há setter real de foto na feature (sem fonte
 * de foto real no projeto).
 */
export const AvatarPropagatesToOtherSurfaces: StoryObj<typeof DropdownMenu> = {
  render: function AvatarPropagatesToOtherSurfacesRender() {
    return (
      <CurrentUserProvider>
        <Demo />
      </CurrentUserProvider>
    );

    function Demo() {
      const { user, avatar, setAvatarPreset, setAvatarInitials } = useCurrentUser();
      return (
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <span className="w-24 text-xs text-[var(--color-text-secondary)]">Menu (header)</span>
            <DropdownMenu align="end" trigger={<NavigationAvatar userName={user.name} role={user.role} avatarInitials={user.initials} avatarType={avatar.type} avatarPreset={avatar.preset} />}>
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
            </DropdownMenu>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-24 text-xs text-[var(--color-text-secondary)]">Card "Eren"</span>
            <CardRow personId={user.id} name={user.name} initials={user.initials} />
          </div>
          <div className="flex items-center gap-3">
            <span className="w-24 text-xs text-[var(--color-text-secondary)]">Card "Ana"</span>
            <CardRow personId="ana-ribeiro" name="Ana Ribeiro" initials="AR" />
          </div>
        </div>
      );
    }

    function CardRow({ personId, name, initials }: { personId: string; name: string; initials: string }) {
      const cardAvatar = useUserAvatar({ id: personId, initials });
      return (
        <div className="flex items-center gap-1.5 rounded-[var(--radius-sm)] border border-[var(--color-border-default)] px-3 py-2">
          <Avatar size="xs" {...cardAvatar} />
          <span className="text-xs text-[var(--color-text-primary)]">{name}</span>
        </div>
      );
    }
  },
};

// ─── DropdownMenu ───────────────────────────────────────────────────────────

/**
 * `DropdownMenu` alinhado à esquerda (`align="start"`, padrão) — o painel
 * abre com a borda esquerda alinhada à borda esquerda do trigger. Clique no
 * botão para abrir; clique fora, em um item, ou Escape para fechar.
 */
export const DropdownMenuAlignStart: StoryObj<typeof DropdownMenu> = {
  render: () => (
    <DropdownMenu
      align="start"
      trigger={<Button variant="secondary">Opções</Button>}
    >
      <MenuItem label="Editar" />
      <MenuItem label="Duplicar" />
      <MenuDivider />
      <MenuItem label="Excluir" intent="danger" />
    </DropdownMenu>
  ),
};

/**
 * `DropdownMenu` alinhado à direita (`align="end"`) — o painel abre com a
 * borda direita alinhada à borda direita do trigger; usado quando o trigger
 * fica perto da borda direita do container (ex: botão "Mais ações" na
 * última coluna do `ComplaintList`).
 */
export const DropdownMenuAlignEnd: StoryObj<typeof DropdownMenu> = {
  render: () => (
    <div className="flex w-[280px] justify-end">
      <DropdownMenu
        align="end"
        trigger={
          <button
            type="button"
            aria-label="Mais ações"
            className="flex size-8 items-center justify-center rounded-[var(--radius-sm)] text-[var(--color-text-secondary)] hover:bg-[var(--color-hover-highlight)]"
          >
            <DotsThreeOutlineVerticalIcon className="size-6" />
          </button>
        }
      >
        <MenuItem label="Ver detalhes" />
        <MenuItem label="Editar" />
        <MenuDivider />
        <MenuItem label="Excluir" intent="danger" />
      </DropdownMenu>
    </div>
  ),
};

// ─── Composição em outros contextos ────────────────────────────────────────
// Estes exemplos NÃO são componentes novos — é o mesmo `DropdownMenu` +
// `MenuItem`/`MenuDivider` de sempre, só trocando o `trigger` por um
// componente já existente no Design System. Demonstram que o Menu é
// genérico e reutilizável, não algo específico do ComplaintList.

/**
 * `DropdownMenu` com o `IconButton` de notificações já existente como
 * trigger (mesmo componente usado no header do site, com o badge/ring de
 * `notificationCount`) — não recria um botão de notificações. Conteúdo é
 * só demonstração, sem sistema real de notificações por trás.
 */
export const NotificationExample: StoryObj<typeof DropdownMenu> = {
  render: () => (
    <DropdownMenu
      align="end"
      trigger={<IconButton notificationCount={2} tooltip="Notificações" />}
    >
      <MenuItem label="Nova reclamação atribuída" />
      <MenuItem label="Prazo próximo do vencimento" />
      <MenuDivider />
      <MenuItem label="Ver todas as notificações" />
    </DropdownMenu>
  ),
};

/**
 * `DropdownMenu` com o `NavigationAvatar` já existente como trigger (avatar
 * + nome + chevron) — não recria o Avatar. "Sair" usa `intent="danger"`.
 */
export const NavigationAvatarExample: StoryObj<typeof DropdownMenu> = {
  render: () => (
    <DropdownMenu align="end" trigger={<NavigationAvatar />}>
      <MenuItem label="Perfil" />
      <MenuItem label="Configurações" />
      <MenuDivider />
      <MenuItem label="Sair" intent="danger" />
    </DropdownMenu>
  ),
};
