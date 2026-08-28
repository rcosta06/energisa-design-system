import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "../components/ui/avatar";
import { avatarPresets, type AvatarPresetId } from "../components/ui/avatar-presets";

const presetIds = Object.keys(avatarPresets) as AvatarPresetId[];

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    type: {
      control: "select",
      options: ["preset", "image", "initials"],
      description: "Forma de representação. Se omitido, é inferido por preset → src → initials.",
    },
    preset: {
      control: "select",
      options: presetIds,
      description: "Avatar ilustrado (Figma: seção \"Funkos\", node 2954:28872) — usado quando type=\"preset\".",
      if: { arg: "type", eq: "preset" },
    },
    src: {
      control: "text",
      description: "URL da foto — usado quando type=\"image\".",
      if: { arg: "type", eq: "image" },
    },
    alt: { control: "text" },
    initials: {
      control: "text",
      description: "Iniciais — usado quando type=\"initials\", e também é o fallback se a foto/preset falhar.",
    },
    size: {
      control: "select",
      options: ["lg", "sm", "xs"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

// ─── DOCS PAGE ────────────────────────────────────────────────────────────────

/** Avatar interativo — altere type/preset/src/initials/size no painel de Controls. */
export const Playground: Story = {
  args: { type: "initials", size: "sm", initials: "ER" },
};

const placeholderPhoto =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="72" height="72"><rect width="72" height="72" fill="#b3b3b3"/></svg>'
  );

/** Os 3 tamanhos (LG 36px, SM 30px, XS 24px), tipo Initials. */
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar size="lg" initials="ER" />
      <Avatar size="sm" initials="ER" />
      <Avatar size="xs" initials="ER" />
    </div>
  ),
};

/**
 * Iniciais | Preset | Foto, para cada `size` — os 3 modos usam exatamente o
 * mesmo container (`sizeStyles[size]`/`radius-sm`/`overflow-hidden`, aplicado
 * incondicionalmente no `<div>` externo do `Avatar`, nunca por `type`), então
 * a área ocupada é sempre idêntica nos três. `lg` (36px) e `xs` (24px) +
 * `radius-sm` (8px) são a geometria REAL do componente Avatar do Figma
 * (confirmada via MCP: node `2220:237` "Size=LG, Type=Photo" e `2520:1894`
 * "Size=XS, Type=Initials") — o Figma não define `Type=Preset` (só
 * `Photo`/`Initials`), então `preset` recebe o mesmo `object-cover` que
 * `image`, sem nenhum `scale` — não há variante de referência no Figma pra
 * justificar um zoom específico (já tentamos vários valores "no olho" antes:
 * 1.16/1.18/1.45/1.06, todos removidos). `sm` (30px) não tem variante
 * correspondente no Figma nem uso real no site — mantido só por já existir na
 * API, não como tamanho validado.
 */
export const SizeComparison: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {(["lg", "sm", "xs"] as const).map((size) => (
        <div key={size} className="flex items-center gap-6">
          <span className="w-10 text-xs font-semibold text-[var(--color-text-secondary)]">{size.toUpperCase()}</span>
          <div className="flex flex-col items-center gap-2">
            <Avatar size={size} type="initials" initials="ER" />
            <span className="text-xs text-[var(--color-text-secondary)]">Iniciais</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Avatar size={size} type="preset" preset="avatar-am1" alt="Avatar ilustrado" />
            <span className="text-xs text-[var(--color-text-secondary)]">Preset</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Avatar size={size} type="image" src={placeholderPhoto} alt="Foto de perfil" />
            <span className="text-xs text-[var(--color-text-secondary)]">Foto</span>
          </div>
        </div>
      ))}
    </div>
  ),
};

/**
 * Todos os 14 avatares ilustrados do Figma ("Funkos", node 2954:28872),
 * lado a lado — construída só com `<Avatar type="preset" />`, sem montar os
 * assets fora do componente.
 */
export const Presets: Story = {
  render: () => (
    <div className="grid grid-cols-7 gap-4">
      {presetIds.map((id) => (
        <div key={id} className="flex flex-col items-center gap-2">
          <Avatar size="lg" type="preset" preset={id} alt={id} />
          <span className="text-[10px] text-[var(--color-text-secondary)]">{id}</span>
        </div>
      ))}
    </div>
  ),
};

// ─── REGRESSION / CHROMATIC ───────────────────────────────────────────────────

/** Variante Photo vs. Initials, no tamanho LG (compatibilidade com a API anterior — sem `type`). */
export const PhotoVsInitials: Story = {
  tags: ["!autodocs"],
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar size="lg" src={placeholderPhoto} alt="Foto de perfil" />
      <Avatar size="lg" initials="ER" />
    </div>
  ),
};

export const PresetSm: Story = {
  tags: ["!autodocs"],
  args: { type: "preset", preset: "avatar-af10", size: "sm" },
};
export const PresetXs: Story = {
  tags: ["!autodocs"],
  args: { type: "preset", preset: "avatar-af10", size: "xs" },
};

/** Foto com URL inválida — deve cair para iniciais automaticamente (fallback de erro). */
export const BrokenImageFallback: Story = {
  tags: ["!autodocs"],
  args: { type: "image", src: "https://example.invalid/404.jpg", initials: "ER", size: "lg" },
};
