import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * BackgroundMedia — Energisa Design System (Figma: "Login Page - Anim 01..06",
 * node "Background Media" — idêntico em todos os 6 frames).
 *
 * Camada de mídia isolada da `LoginPage` — hoje só `type="image"` (a
 * fotografia é temporária, ver Figma), mas a API já reserva `type="video"`
 * para quando o asset trocar, sem exigir mudança em `EnergyAnimation`,
 * `LoginPanel` ou na estrutura da página: ambos são camadas absolutamente
 * posicionadas irmãs desta, cobrindo o mesmo container.
 *
 * `object-fit: cover` + `object-position: center` (via `object-cover`) é o
 * enquadramento usado no Figma — `EnergyAnimation` usa `preserveAspectRatio="xMidYMid slice"`
 * no SVG, o equivalente exato em viewBox, para os cabos permanecerem
 * alinhados à foto em qualquer viewport.
 */

export interface BackgroundMediaProps {
  type?: "image" | "video";
  src: string;
  /** Obrigatório para `type="image"` (decorativo → `alt=""` é aceitável se a imagem for puramente ambiental). */
  alt?: string;
  /** Poster exibido enquanto o vídeo carrega — só relevante para `type="video"`. */
  poster?: string;
  className?: string;
}

function BackgroundMedia({ type = "image", src, alt = "", poster, className }: BackgroundMediaProps) {
  return (
    <div className={cn("absolute inset-0 size-full overflow-hidden", className)}>
      {type === "video" ? (
        <video
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          className="absolute inset-0 size-full object-cover object-center"
        />
      ) : (
        <img src={src} alt={alt} className="absolute inset-0 size-full object-cover object-center" />
      )}
    </div>
  );
}

export { BackgroundMedia };
