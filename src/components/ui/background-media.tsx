import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * BackgroundMedia — Energisa Design System (Figma: "Login Page - Anim 01..06",
 * node "Background Media" — idêntico em todos os 6 frames).
 *
 * Camada de mídia isolada da `LoginPage`, `type="image"` ou `type="video"`
 * — o resto da página (`LoginOverlay`/`LoginPanel`) não sabe qual dos dois
 * está em uso, só compartilha o mesmo container `relative` absolutamente
 * preenchido por esta camada.
 *
 * `object-fit: cover` + `object-position: center` (via `object-cover
 * object-center`) é o enquadramento usado no Figma. `mediaClassName` existe
 * pra corrigir crop de um asset específico sem afetar o padrão do
 * componente — ex: `energia-cabos-login.mp4`/`login-background.mp4` têm
 * letterboxing (faixas pretas) **embutido nos próprios pixels** (confirmado
 * extraindo um frame de cada um e medindo: 12,5% de barra preta em cada
 * lado, conteúdo real só nos 75% centrais — não é um bug de CSS/container).
 * `object-fit: cover` sozinho não remove isso porque ele enquadra o
 * *frame inteiro* (barras incluídas); por isso `login-page.tsx` passa
 * `mediaClassName="scale-[1.34]"` — zoom calculado (1/0,75 ≈ 1,333, com
 * pequena margem) pra empurrar exatamente as barras pra fora da área
 * visível, sem alterar o arquivo de vídeo.
 */

export interface BackgroundMediaProps {
  type?: "image" | "video";
  src: string;
  /** Obrigatório para `type="image"` (decorativo → `alt=""` é aceitável se a imagem for puramente ambiental). */
  alt?: string;
  /** Poster exibido enquanto o vídeo carrega — só relevante para `type="video"`. */
  poster?: string;
  className?: string;
  /**
   * Classes extras aplicadas no elemento de mídia em si (`<img>`/`<video>`),
   * depois de `object-cover object-center` — pensado para correções de crop
   * específicas de um asset (ex: um vídeo com letterboxing já embutido nos
   * pixels), sem forçar esse ajuste em todo consumidor do componente.
   */
  mediaClassName?: string;
}

function BackgroundMedia({ type = "image", src, alt = "", poster, className, mediaClassName }: BackgroundMediaProps) {
  return (
    <div className={cn("absolute inset-0 size-full overflow-hidden", className)}>
      {type === "video" ? (
        <video
          src={src}
          poster={poster}
          autoPlay
          muted
          playsInline
          aria-hidden="true"
          className={cn("absolute inset-0 size-full object-cover object-center", mediaClassName)}
        />
      ) : (
        <img
          src={src}
          alt={alt}
          className={cn("absolute inset-0 size-full object-cover object-center", mediaClassName)}
        />
      )}
    </div>
  );
}

export { BackgroundMedia };
