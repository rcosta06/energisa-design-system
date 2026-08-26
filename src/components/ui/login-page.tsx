import * as React from "react";
import { BackgroundMedia } from "@/components/ui/background-media";
import { EnergyAnimation, type EnergyAnimationProps } from "@/components/ui/energy-animation";
import { LoginOverlay } from "@/components/ui/login-overlay";
import { LoginPanel, type LoginPanelValues } from "@/components/ui/login-panel";
import loginLandscape from "@/assets/login-landscape.png";

/**
 * LoginPage — Energisa Design System (Figma: "Login Page - Anim 01..06",
 * frame 1440×900, mesmo arquivo/nós documentados em `energy-animation.tsx`).
 *
 * 4 camadas independentes, exatamente como pedido — cada uma um componente
 * próprio, empilhadas via `absolute inset-0` sobre um container `relative`:
 *
 *   LoginPage
 *   ├── BackgroundMedia  (foto hoje; `type="video"` no futuro, API já pronta)
 *   ├── EnergyAnimation  (SVG + CSS motion path, sobre a mídia)
 *   ├── LoginOverlay     (gradiente escurecedor)
 *   └── LoginPanel       (card de autenticação, por cima de tudo)
 *
 * `EnergyAnimation` não sabe nada sobre `BackgroundMedia` (nem o contrário)
 * — os dois só compartilham o mesmo container `relative` e o mesmo
 * `viewBox`/`object-fit: cover` (ver comentário em `background-media.tsx`),
 * então trocar a foto por vídeo no futuro não exige tocar em nenhum dos dois.
 *
 * Sem autenticação real aqui — `LoginPanel` só chama `onSubmit` com os
 * valores digitados (nenhum backend/rota de auth foi encontrado no projeto
 * para integrar; reportado, não inventado).
 */

export interface LoginPageProps {
  onSubmit?: (values: LoginPanelValues) => void;
  /** Repassado para o `EnergyAnimation` — permite ajustar/desligar a animação sem editar esta página. */
  energyAnimation?: EnergyAnimationProps;
  className?: string;
}

function LoginPage({ onSubmit, energyAnimation, className }: LoginPageProps) {
  return (
    <div className={`relative size-full min-h-screen overflow-hidden ${className ?? ""}`}>
      <BackgroundMedia type="image" src={loginLandscape} alt="" />
      <EnergyAnimation {...energyAnimation} />
      <LoginOverlay />
      <div className="relative flex size-full min-h-screen items-center pl-12">
        <LoginPanel onSubmit={onSubmit} />
      </div>
    </div>
  );
}

export { LoginPage };
