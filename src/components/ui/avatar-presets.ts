import avatarAm1 from "@/assets/avatars/avatar-am1.svg";
import avatarAm2 from "@/assets/avatars/avatar-am2.svg";
import avatarAm3 from "@/assets/avatars/avatar-am3.svg";
import avatarAm4 from "@/assets/avatars/avatar-am4.svg";
import avatarAm5 from "@/assets/avatars/avatar-am5.svg";
import avatarAm6 from "@/assets/avatars/avatar-am6.svg";
import avatarAm7 from "@/assets/avatars/avatar-am7.svg";
import avatarAf8 from "@/assets/avatars/avatar-af8.svg";
import avatarAf9 from "@/assets/avatars/avatar-af9.svg";
import avatarAf10 from "@/assets/avatars/avatar-af10.svg";
import avatarAf11 from "@/assets/avatars/avatar-af11.svg";
import avatarAf12 from "@/assets/avatars/avatar-af12.svg";
import avatarAf13 from "@/assets/avatars/avatar-af13.svg";
import avatarAf14 from "@/assets/avatars/avatar-af14.svg";

/**
 * Avatares ilustrados do Avatar/Preset (Figma: seção "Funkos", node
 * 2954:28872) — cada chave é o nome exato da layer no Figma (`avatar-am1`
 * … `avatar-af14`, 14 no total). Exportados como asset flattened via Figma
 * MCP (`download_assets`, formato SVG) em vez de reconstruídos camada a
 * camada — cada ilustração tem 15–25 sub-layers internos, recriar isso a
 * mão geraria centenas de nós React sem ganho nenhum de fidelidade.
 *
 * Nomes propositalmente mantidos como estão no Figma: não representam
 * gênero, etnia ou personalidade de forma explícita no Design System, só
 * identificadores de asset.
 */
export const avatarPresets = {
  "avatar-am1": avatarAm1,
  "avatar-am2": avatarAm2,
  "avatar-am3": avatarAm3,
  "avatar-am4": avatarAm4,
  "avatar-am5": avatarAm5,
  "avatar-am6": avatarAm6,
  "avatar-am7": avatarAm7,
  "avatar-af8": avatarAf8,
  "avatar-af9": avatarAf9,
  "avatar-af10": avatarAf10,
  "avatar-af11": avatarAf11,
  "avatar-af12": avatarAf12,
  "avatar-af13": avatarAf13,
  "avatar-af14": avatarAf14,
} as const;

export type AvatarPresetId = keyof typeof avatarPresets;
