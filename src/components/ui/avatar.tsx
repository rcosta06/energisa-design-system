import * as React from "react";
import { cn } from "@/lib/utils";
import { avatarPresets, type AvatarPresetId } from "./avatar-presets";

/**
 * `lg`/`xs` são geometria REAL do Figma, confirmada via MCP (`get_design_context`
 * nos nodes `2220:237` "Size=LG, Type=Photo" e `2520:1894` "Size=XS, Type=Initials"):
 * 36×36 e 24×24, ambos `border-radius: var(--sm, 8px)` — o wrapper `rounded-[999px]`
 * que aparece no código gerado pelo Figma para o LG não tem bg/border/overflow
 * próprios, então não recorta nada; a forma visível de verdade vem da camada
 * interna com `rounded-[var(--sm,8px)]`, por isso `--radius-sm` é o valor certo
 * pros dois tamanhos (não "totalmente redondo"). Tipografia das iniciais em XS
 * também confirmada: 10px/semibold/branco centralizado — bate exato com
 * `text-[10px]` + `font-semibold text-white` já usados aqui.
 *
 * `sm` (30px) NÃO tem variante correspondente no Figma — procurado via
 * `get_metadata` recursivo nas 2 páginas do arquivo, `search_design_system`
 * (geral e restrito à library "shadcn/ui...(Copy)" de fato adicionada a este
 * arquivo) e sondagem de nodes vizinhos aos 2 confirmados acima: nenhum
 * `Size=SM`/`Size=MD` de Avatar existe. Mantido só porque já fazia parte da API
 * e não é usado em nenhum lugar real do site hoje (só em stories) — sinalizado
 * aqui em vez de removido "no achismo" sem confirmação com quem decide o design.
 */
const sizeStyles = {
  lg: "size-9 text-sm",
  sm: "size-[30px] text-xs",
  xs: "size-6 text-[10px]",
} as const;

export type AvatarType = "initials" | "image" | "preset";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** LG = 36px (Figma confirmado), XS = 24px (Figma confirmado), SM = 30px (sem variante no Figma, não usado no site) */
  size?: keyof typeof sizeStyles;
  /**
   * Forma de representação. Quando omitido, é inferido pela primeira prop
   * presente na ordem `preset` → `src` → `initials` — o mesmo comportamento
   * implícito que o componente já tinha antes desta prop existir, então
   * nenhum uso atual (`<Avatar src={...} />`, `<Avatar initials={...} />`)
   * precisa mudar.
   */
  type?: AvatarType;
  /**
   * Avatar ilustrado — assets do Figma ("Funkos", node 2954:28872, ver
   * `avatarPresets`), mas o componente `Avatar` do Figma em si não tem um
   * `Type=Preset` (só `Photo`/`Initials`, confirmado via MCP) — os Funkos nunca
   * foram ligados como variante do Avatar lá, são só ilustrações soltas que
   * este código reaproveita como uma terceira forma de representação.
   */
  preset?: AvatarPresetId;
  /** URL da foto — quando ausente ou indisponível (erro de carregamento), cai para iniciais */
  src?: string;
  /** Iniciais exibidas quando não há foto/preset (ex: "ER") — também o fallback seguro de erro */
  initials?: string;
  alt?: string;
}

function Avatar({ className, size = "sm", type, preset, src, initials = "", alt = "", ...props }: AvatarProps) {
  const [imageError, setImageError] = React.useState(false);

  const resolvedType: AvatarType = type ?? (preset ? "preset" : src ? "image" : "initials");
  const imageSrc = resolvedType === "preset" ? (preset ? avatarPresets[preset] : undefined) : resolvedType === "image" ? src : undefined;
  const showImage = Boolean(imageSrc) && !imageError;

  React.useEffect(() => {
    setImageError(false);
  }, [imageSrc]);

  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden rounded-[var(--radius-sm)]",
        sizeStyles[size],
        !showImage && "bg-[var(--color-action-primary)]",
        className
      )}
      {...props}
    >
      {showImage ? (
        // `preset` e `image` usam exatamente as mesmas classes — o componente Avatar
        // do Figma (node 2220:237 "Size=LG, Type=Photo" / 2520:1894 "Size=XS,
        // Type=Initials", confirmado via MCP) só define `Photo` e `Initials`; não
        // existe `Type=Preset` em lugar nenhum do arquivo. Sem variante de referência
        // no Figma pra "preset", não há como derivar um zoom/crop específico pra ele
        // — por isso nenhum `scale-[...]` é aplicado (já tentamos 1.16/1.18/1.45/1.06
        // "no olho" nas rodadas anteriores; todos foram removidos). O preset renderiza
        // com a mesma folga que o próprio SVG "Funkos" já trouxer, igual a como uma
        // foto real de proporção diferente do container já é tratada.
        <img
          src={imageSrc}
          alt={alt}
          onError={() => setImageError(true)}
          className="size-full border border-[var(--color-border-default)]/50 object-cover"
        />
      ) : (
        <span className="flex size-full items-center justify-center font-semibold text-white">
          {initials}
        </span>
      )}
    </div>
  );
}

export { Avatar };
