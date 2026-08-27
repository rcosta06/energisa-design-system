import * as React from "react";
import { BackgroundMedia } from "@/components/ui/background-media";
import { LoginOverlay } from "@/components/ui/login-overlay";
import { LoginPanel, type LoginPanelValues } from "@/components/ui/login-panel";
import loginBackground from "@/assets/login-background-2.mp4";

/**
 * LoginPage — Energisa Design System (Figma: "Login Page - Anim 01..06",
 * frame 1440×900, mesmo arquivo/nós documentados em `energy-animation.tsx`
 * — layout de referência; posição do painel foi ajustada a pedido, ver
 * abaixo).
 *
 * Camadas empilhadas via `absolute inset-0` sobre um container `relative`:
 *
 *   LoginPage
 *   ├── BackgroundMedia  (`type="video"` — `login-background-2.mp4`, sem loop, sem crop extra:
 *   │                     ao contrário dos vídeos anteriores, este não tem letterboxing
 *   │                     embutido nos pixels — confirmado extraindo um frame e medindo, por
 *   │                     isso NÃO usa `mediaClassName`. `login-background.mp4`/
 *   │                     `energia-cabos-login.mp4`/`login-landscape.png` continuam no repo, sem uso)
 *   ├── LoginOverlay     (gradiente escurecedor)
 *   └── painel — `LoginPanel` posicionado à direita via wrapper flex
 *       (`absolute inset-0 flex justify-center p-8 sm:justify-end`):
 *       `p-8` = 32px (escala de spacing do Tailwind, `--spacing * 8`) nos 4
 *       lados — `sm:justify-end` empurra o painel pro lado direito a partir
 *       de 640px (desktop/tablet landscape), deixando 32px de respiro
 *       (top/right/bottom, do próprio `p-8`) e o resto da tela livre pro
 *       vídeo; abaixo de 640px (mobile) o painel fica centralizado
 *       (`justify-center`, o padrão), sem forçar coluna estreita colada na
 *       direita. Altura do painel = altura do wrapper (`h-full` em
 *       `login-panel.tsx`) via `align-items: stretch` (default do flex,
 *       nenhuma classe extra necessária) — sempre "viewport - 64px", nunca
 *       um valor fixo.
 *
 * `EnergyAnimation` (feixe SVG sobre os cabos) foi removida desta página —
 * o componente continua existindo em `energy-animation.tsx` com sua própria
 * story (`Components/EnergyAnimation`), só não é mais renderizada aqui.
 *
 * Sem autenticação real aqui — `LoginPanel` só chama `onSubmit` com os
 * valores digitados (nenhum backend/rota de auth foi encontrado no projeto
 * para integrar; reportado, não inventado).
 */

export interface LoginPageProps {
  onSubmit?: (values: LoginPanelValues) => void;
  className?: string;
}

function LoginPage({ onSubmit, className }: LoginPageProps) {
  return (
    <div className={`relative size-full min-h-screen overflow-hidden ${className ?? ""}`}>
      <BackgroundMedia type="video" src={loginBackground} />
      <LoginOverlay />
      <div className="absolute inset-0 flex justify-center p-8 sm:justify-end">
        <LoginPanel onSubmit={onSubmit} />
      </div>
    </div>
  );
}

export { LoginPage };
