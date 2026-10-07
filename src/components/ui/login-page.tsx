import * as React from "react";
import { BackgroundMedia } from "@/components/ui/background-media";
import { LoginOverlay } from "@/components/ui/login-overlay";
import { LoginPanel, type LoginPanelValues } from "@/components/ui/login-panel";
import loginBackground from "@/assets/login-background-7.mp4";

/**
 * LoginPage — composição existente com vídeo, overlay e LoginPanel.
 * O painel SSO (Figma 3364:2340) tem altura de conteúdo e fica centralizado
 * verticalmente, à direita em desktop e ao centro em mobile, com respiro de 32px.
 * onSubmit mantém o fluxo demonstrativo da aplicação, sem autenticação real.
 */

export interface LoginPageProps {
  onSubmit?: (values: LoginPanelValues) => void;
  className?: string;
}

function LoginPage({ onSubmit, className }: LoginPageProps) {
  return (
    <div className={`relative size-full min-h-screen overflow-hidden ${className ?? ""}`}>
      <BackgroundMedia type="video" src={loginBackground} mediaClassName="opacity-80" />
      <LoginOverlay />
      <div className="absolute inset-0 flex items-center justify-center p-8 sm:justify-end">
        <LoginPanel onSubmit={onSubmit} />
      </div>
    </div>
  );
}

export { LoginPage };
