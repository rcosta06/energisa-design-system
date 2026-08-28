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
  /**
   * Ponto exato (em segundos) onde o vídeo deve reiniciar o loop, em vez do
   * fim real do arquivo — um `requestAnimationFrame` (roda a cada quadro
   * renderizado, sem `setState`/sem re-render) fica de olho em
   * `currentTime` e zera assim que cruza esse ponto, antes do arquivo
   * terminar de verdade. Existe porque o `loop` nativo do `<video>` só
   * reinicia quando o arquivo acaba, e alguns navegadores prendem (soluçam)
   * um instante nesse reinício se sobrar qualquer folga entre o último
   * frame com conteúdo novo e o fim declarado do arquivo.
   *
   * O atributo `loop` nativo continua sempre ligado, como rede de
   * segurança — numa aba em segundo plano o navegador pode pausar o
   * `requestAnimationFrame`, e sem essa rede o vídeo simplesmente pararia
   * no fim em vez de continuar em loop (bug já visto e corrigido: a
   * primeira versão desligava o `loop` nativo achando que o `timeupdate`
   * sempre pegaria o ponto a tempo — `timeupdate` só dispara a cada ~250ms
   * nos navegadores, folga estreita demais pra garantir isso).
   */
  loopAt?: number;
}

function BackgroundMedia({
  type = "image",
  src,
  alt = "",
  poster,
  className,
  mediaClassName,
  loopAt,
}: BackgroundMediaProps) {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    if (type !== "video" || loopAt == null) return;
    const video = videoRef.current;
    if (!video) return;
    let rafId: number;
    const check = () => {
      if (video.currentTime >= loopAt) {
        video.currentTime = 0;
      }
      rafId = requestAnimationFrame(check);
    };
    rafId = requestAnimationFrame(check);
    return () => cancelAnimationFrame(rafId);
  }, [type, loopAt]);

  return (
    <div className={cn("absolute inset-0 size-full overflow-hidden", className)}>
      {type === "video" ? (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
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
