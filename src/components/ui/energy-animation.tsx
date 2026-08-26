import * as React from "react";

/**
 * EnergyAnimation — Energisa Design System.
 *
 * Figma (Login Page): 6 frames, mesmo arquivo fPO7o9NBbeKsEgQF5T0zRz —
 * node 2883:25270 ("Anim 01") + 2896:1711/1749/1787/1825/1863 ("Anim 02..06").
 * Esses 6 frames são keyframes de referência de UMA animação (confirmado
 * pelo usuário e pela geometria: as posições de "Energy Path 01/02 Core/Glow"
 * avançam de forma contínua e suave entre os 6 frames, extraídas via
 * `get_metadata` em cada node — não são 6 telas).
 *
 * TRAJETÓRIA: os 6 centros de "Energy Path 01 Core" por frame formam uma
 * curva suave (não uma reta) de (1294,725) [perto da torre próxima] até
 * (798,470) [perto da torre distante]. "Energy Path 02" percorre uma curva
 * própria e ligeiramente diferente (um cabo paralelo, não o mesmo cabo) —
 * confirmado porque intercalar os 12 pontos (6+6) produz uma curva
 * serrilhada, enquanto cada conjunto de 6 pontos isoladamente é suave. Os
 * dois `PATH0*_D` abaixo são splines Catmull-Rom→Bézier (tensão uniforme)
 * passando exatamente pelos 6 pontos reais de cada path — não uma diagonal
 * aproximada.
 *
 * ESCALA (perspectiva): a largura do "Core" encolhe de 53.7px (frame 1,
 * perto) para 34.0px (frame 6, longe) — proporção quase idêntica nos dois
 * paths (~0.63× no frame final). `SCALE_STOPS` reproduz essa razão real.
 *
 * CORES/FORMA do feixe: extraídas do SVG real exportado pelo node "Energy
 * Animation" (2896:1901) — Core é uma cápsula (rect rx=2, 65×4 no frame 1)
 * com gradiente branco→dourado(#FFD966)→branco; Glow é uma cápsula maior
 * (rect rx=8, 110×16) com gradiente laranja(#F58221)→dourado→laranja,
 * opacity 0.9. `#F58221`/`#FFD966` não são Variables do Figma (confirmado
 * via `get_variable_defs` — nenhuma delas aparece na lista) — `#F58221` é a
 * mesma cor de `--color-action-primary` (#f58220, 1 unidade de diferença,
 * mesma cor de marca) e por isso reaproveita o token; `#FFD966` não tem
 * token equivalente no projeto e é reproduzido literalmente (indispensável
 * pro "núcleo quente" do feixe — reportado no relatório da tarefa).
 *
 * TOWER GLOW: `Tower Glow Near`/`Distant` têm posição/tamanho estáticos nos
 * 6 frames (confirmado via `get_metadata` — bounding box idêntico em todas
 * as leituras). O SVG exportado confirma os valores de repouso reais:
 * Near = opacity 0.7 × fill-opacity 0.4 (~0.28), Distant = opacity 0.15 ×
 * fill-opacity 0.4 (~0.06) — "torre distante bem mais discreta" não é
 * suposição, é o valor exato do Figma. `get_metadata` não expõe opacidade
 * por frame, então a "reação" (pico sutil quando um feixe parte/chega) é
 * uma decisão de implementação sobre essa base real, não extraída
 * frame-a-frame do Figma.
 *
 * TIMING: `get_motion_context` foi chamado (recursivo) nos 3 nodes mais
 * prováveis de carregar reactions/Smart Animate (frame 01, frame 06, e o
 * grupo "Energy Animation") e retornou `{"nodes":[]}` nos 3 — o Figma não
 * tem prototype/motion anexado a esses frames via MCP. Os defaults abaixo
 * (duration/loopDelay/secondaryDelay) vêm da referência textual do pedido
 * (~0.4s/estado × 5 transições ≈ o `duration`, pausa final ~1.5s), não de
 * um valor confirmado no Figma — por isso são só defaults, 100% expostos
 * via props.
 *
 * IMPLEMENTAÇÃO: SVG + CSS Motion Path (`offset-path`/`offset-distance`/
 * `offset-rotate: auto` — este último já reproduz sozinho as rotações
 * manuais que o Figma tem por frame, 38°/35° etc., porque orienta o
 * elemento pela tangente real do path). Glow usa gradiente radial (sem
 * `filter: blur()`) — mais barato que um blur SVG recalculado a cada frame
 * de uma forma que se move. Só `transform`/`opacity`/`offset-distance` são
 * animados; nada de layout/repaint pesado, nada de `setState` por frame —
 * toda a timeline vive em um único `<style>` com `@keyframes` gerado uma
 * vez por mudança de props (`useMemo`), com nome escopado por `useId()`
 * pra permitir múltiplas instâncias (ex: Storybook) sem colidir.
 * `animation-play-state` é controlado por uma custom property (`--eb-play`)
 * no container, herdada por todo mundo — um único ponto pra pausar tudo.
 * Os dois feixes e os Tower Glows compartilham a MESMA `animation-duration`
 * (o ciclo total) — animações CSS com `infinite` no mesmo duration nunca
 * perdem sincronia entre si (relógio do compositor), ao contrário de vários
 * `setInterval` independentes.
 */

const PATH01_D =
  "M1294.34,724.59 C1277.80,715.10 1228.19,686.60 1195.09,667.62 C1162.00,648.64 1128.89,628.85 1095.77,610.73 C1062.66,592.61 1029.53,575.32 996.40,558.89 C963.27,542.46 930.15,526.87 897.00,512.13 C863.85,497.39 814.09,477.38 797.51,470.43";

const PATH02_D =
  "M1304.66,749.16 C1288.11,739.17 1238.48,708.52 1205.37,689.22 C1172.27,669.92 1139.15,651.30 1106.03,633.35 C1072.91,615.41 1039.77,597.97 1006.63,581.55 C973.49,565.13 940.34,549.55 907.18,534.82 C874.02,520.09 824.26,500.10 807.67,493.15";

/** Relativo à largura do Core no frame 1 (perto da torre) — mesma razão nos dois paths. */
const SCALE_STOPS = [1, 0.931, 0.86, 0.786, 0.711, 0.634];

const CORE_W = 65;
const CORE_H = 4;
const GLOW_W = 110;
const GLOW_H = 16;

const TOWER_NEAR = { cx: 1350, cy: 720, rx: 30, ry: 20, restOpacity: 0.28 };
const TOWER_DISTANT = { cx: 797.5, cy: 452.5, rx: 17.5, ry: 12.5, restOpacity: 0.06 };

function useReducedMotion() {
  const [reduced, setReduced] = React.useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  React.useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);
  return reduced;
}

function pct(n: number) {
  return Math.max(0, Math.min(100, n));
}

/** Gera os stops de opacidade de um "pulso" de torre (linha de base + picos sutis nos instantes informados). */
function buildTowerKeyframes(instantsPct: number[], restOpacity: number, glowIntensity: number) {
  const rest = Math.min(1, restOpacity * glowIntensity);
  const peak = Math.min(1, rest * 1.8 + 0.08);
  const stops = new Map<number, number>();
  stops.set(0, rest);
  stops.set(100, rest);
  for (const at of instantsPct) {
    stops.set(pct(at - 2.5), rest);
    stops.set(pct(at), peak);
    stops.set(pct(at + 2.5), rest);
  }
  return [...stops.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([p, o]) => `${p.toFixed(3)}% { opacity: ${o.toFixed(3)}; }`)
    .join("\n      ");
}

function buildBeamKeyframes(travelPct: number) {
  const f = [0, 0.05, 0.2, 0.4, 0.6, 0.8, 0.95, 1];
  const scaleAt = (frac: number) => {
    const idx = Math.min(5, Math.round(frac * 5));
    return SCALE_STOPS[idx];
  };
  const opacityAt = (frac: number) => (frac <= 0 || frac >= 1 ? 0 : 1);
  const lines = f.map((frac) => {
    const p = pct(frac * travelPct);
    const offsetDistance = pct(frac * 100);
    return `${p.toFixed(3)}% { offset-distance: ${offsetDistance.toFixed(3)}%; opacity: ${opacityAt(frac)}; transform: scale(${scaleAt(frac).toFixed(3)}); }`;
  });
  if (travelPct < 100) {
    lines.push(`100% { offset-distance: 0%; opacity: 0; transform: scale(${SCALE_STOPS[0]}); }`);
  }
  return lines.join("\n      ");
}

export interface EnergyAnimationProps {
  /** Liga/desliga a camada inteira — `false` não renderiza nada. */
  enabled?: boolean;
  /** Pausa a animação no lugar (mantém a última posição visível). */
  paused?: boolean;
  /** Duração de uma travessia completa (feixe 1), em ms. */
  duration?: number;
  /** Reinicia o ciclo automaticamente ao terminar. */
  loop?: boolean;
  /** Pausa entre o fim de um ciclo e o reinício, em ms — só relevante com `loop`. */
  loopDelay?: number;
  /** 1 (só Energy Path 01) ou 2 (Path 01 + Path 02). */
  beamCount?: 1 | 2;
  /** Atraso do feixe 2 em relação ao feixe 1, em ms. */
  secondaryDelay?: number;
  /** Multiplicador de opacidade do glow (feixe + torres). 1 = valores reais do Figma. */
  glowIntensity?: number;
  /** Mostra a reação sutil de Tower Glow Near/Distant quando um feixe parte/chega. */
  towerGlow?: boolean;
  className?: string;
}

export interface EnergyAnimationHandle {
  play: () => void;
  pause: () => void;
  restart: () => void;
}

const EnergyAnimation = React.forwardRef<EnergyAnimationHandle, EnergyAnimationProps>(function EnergyAnimation(
  {
    enabled = true,
    paused,
    duration = 3200,
    loop = true,
    loopDelay = 1500,
    beamCount = 2,
    secondaryDelay = 900,
    glowIntensity = 1,
    towerGlow = true,
    className,
  },
  ref
) {
  const reactId = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const reducedMotion = useReducedMotion();

  const [internalPaused, setInternalPaused] = React.useState(false);
  const isPaused = paused ?? internalPaused;
  const [restartNonce, setRestartNonce] = React.useState(0);

  React.useImperativeHandle(
    ref,
    () => ({
      play: () => setInternalPaused(false),
      pause: () => setInternalPaused(true),
      restart: () => setRestartNonce((n) => n + 1),
    }),
    []
  );

  const totalCycle = loop ? duration + loopDelay : duration;
  const travelPct = (duration / totalCycle) * 100;

  const style = React.useMemo(() => {
    const beamKeyframes = buildBeamKeyframes(travelPct);
    const nearInstants = beamCount === 2 ? [0, (secondaryDelay / totalCycle) * 100] : [0];
    const distantInstants =
      beamCount === 2
        ? [travelPct, (((secondaryDelay + duration) % totalCycle) / totalCycle) * 100]
        : [travelPct];
    return `
      @keyframes eb-beam-${reactId} {
        ${beamKeyframes}
      }
      @keyframes eb-tower-near-${reactId} {
        ${buildTowerKeyframes(nearInstants, TOWER_NEAR.restOpacity, glowIntensity)}
      }
      @keyframes eb-tower-distant-${reactId} {
        ${buildTowerKeyframes(distantInstants, TOWER_DISTANT.restOpacity, glowIntensity)}
      }
    `;
  }, [reactId, travelPct, totalCycle, beamCount, secondaryDelay, duration, glowIntensity]);

  if (!enabled) return null;

  const rootStyle: React.CSSProperties & Record<string, string> = {
    ["--eb-play" as string]: isPaused ? "paused" : "running",
  };

  if (reducedMotion) {
    // Estado estático e discreto: só o glow ambiente das torres, sem feixe em movimento.
    return (
      <div aria-hidden="true" className={className} style={{ position: "absolute", inset: 0 }}>
        <svg
          className="absolute inset-0 size-full"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          role="presentation"
        >
          {towerGlow && (
            <>
              <defs>
                <radialGradient id={`eb-tower-grad-${reactId}`}>
                  <stop offset="0%" stopColor="var(--color-action-primary)" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="var(--color-action-primary)" stopOpacity="0" />
                </radialGradient>
              </defs>
              <ellipse
                cx={TOWER_NEAR.cx}
                cy={TOWER_NEAR.cy}
                rx={TOWER_NEAR.rx}
                ry={TOWER_NEAR.ry}
                fill={`url(#eb-tower-grad-${reactId})`}
                opacity={TOWER_NEAR.restOpacity * glowIntensity}
              />
              <ellipse
                cx={TOWER_DISTANT.cx}
                cy={TOWER_DISTANT.cy}
                rx={TOWER_DISTANT.rx}
                ry={TOWER_DISTANT.ry}
                fill={`url(#eb-tower-grad-${reactId})`}
                opacity={TOWER_DISTANT.restOpacity * glowIntensity}
              />
            </>
          )}
        </svg>
      </div>
    );
  }

  const beamAnimation = (delayMs: number): React.CSSProperties => ({
    animationName: `eb-beam-${reactId}`,
    animationDuration: `${totalCycle}ms`,
    animationTimingFunction: "linear",
    animationIterationCount: loop ? "infinite" : 1,
    animationDelay: `${delayMs}ms`,
    animationFillMode: "both",
    animationPlayState: "var(--eb-play)" as React.CSSProperties["animationPlayState"],
    offsetRotate: "auto" as React.CSSProperties["offsetRotate"],
  });

  return (
    <div aria-hidden="true" className={className} style={{ position: "absolute", inset: 0, ...rootStyle }}>
      <style>{style}</style>
      <svg
        key={restartNonce}
        className="absolute inset-0 size-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        role="presentation"
      >
        <defs>
          <linearGradient id={`eb-glow-grad-${reactId}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--color-action-primary)" stopOpacity="0" />
            <stop offset="15%" stopColor="var(--color-action-primary)" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#FFD966" stopOpacity="0.85" />
            <stop offset="85%" stopColor="var(--color-action-primary)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="var(--color-action-primary)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={`eb-core-grad-${reactId}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="10%" stopColor="white" stopOpacity="0.5" />
            <stop offset="30%" stopColor="white" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#FFD966" stopOpacity="1" />
            <stop offset="70%" stopColor="white" stopOpacity="0.95" />
            <stop offset="90%" stopColor="white" stopOpacity="0.5" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <radialGradient id={`eb-tower-grad-${reactId}`}>
            <stop offset="0%" stopColor="var(--color-action-primary)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="var(--color-action-primary)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {towerGlow && (
          <>
            <ellipse
              cx={TOWER_NEAR.cx}
              cy={TOWER_NEAR.cy}
              rx={TOWER_NEAR.rx}
              ry={TOWER_NEAR.ry}
              fill={`url(#eb-tower-grad-${reactId})`}
              style={{
                animationName: `eb-tower-near-${reactId}`,
                animationDuration: `${totalCycle}ms`,
                animationIterationCount: "infinite",
                animationPlayState: "var(--eb-play)" as React.CSSProperties["animationPlayState"],
              }}
            />
            <ellipse
              cx={TOWER_DISTANT.cx}
              cy={TOWER_DISTANT.cy}
              rx={TOWER_DISTANT.rx}
              ry={TOWER_DISTANT.ry}
              fill={`url(#eb-tower-grad-${reactId})`}
              style={{
                animationName: `eb-tower-distant-${reactId}`,
                animationDuration: `${totalCycle}ms`,
                animationIterationCount: "infinite",
                animationPlayState: "var(--eb-play)" as React.CSSProperties["animationPlayState"],
              }}
            />
          </>
        )}

        {/* Path 01 */}
        <g
          style={{
            offsetPath: `path("${PATH01_D}")` as React.CSSProperties["offsetPath"],
            ...beamAnimation(0),
          }}
        >
          <rect
            x={-GLOW_W / 2}
            y={-GLOW_H / 2}
            width={GLOW_W}
            height={GLOW_H}
            rx={GLOW_H / 2}
            fill={`url(#eb-glow-grad-${reactId})`}
            opacity={0.9}
          />
          <rect
            x={-CORE_W / 2}
            y={-CORE_H / 2}
            width={CORE_W}
            height={CORE_H}
            rx={CORE_H / 2}
            fill={`url(#eb-core-grad-${reactId})`}
          />
        </g>

        {/* Path 02 — atraso via animation-delay, mesma duration/keyframes = mesmo relógio, nunca dessincroniza */}
        {beamCount === 2 && (
          <g
            style={{
              offsetPath: `path("${PATH02_D}")` as React.CSSProperties["offsetPath"],
              ...beamAnimation(secondaryDelay),
            }}
          >
            <rect
              x={-GLOW_W / 2}
              y={-GLOW_H / 2}
              width={GLOW_W}
              height={GLOW_H}
              rx={GLOW_H / 2}
              fill={`url(#eb-glow-grad-${reactId})`}
              opacity={0.9}
            />
            <rect
              x={-CORE_W / 2}
              y={-CORE_H / 2}
              width={CORE_W}
              height={CORE_H}
              rx={CORE_H / 2}
              fill={`url(#eb-core-grad-${reactId})`}
            />
          </g>
        )}
      </svg>
    </div>
  );
});

export { EnergyAnimation };
