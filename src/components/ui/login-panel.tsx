import * as React from "react";
import loginBrand from "@/assets/login-brand.svg";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * LoginPanel — Figma "Authentication Panel" (3364:2340), 480 × 408px.
 * Composição SSO com Button oficial e SVG exato da marca exportado do Figma.
 * Glass/Soft (surface-primary 80%, blur 3px e sombra) é um Effect Style do
 * Figma sem token correspondente; mantém os valores confirmados do efeito.
 * onSubmit preserva o contrato do fluxo demonstrativo existente. Não há
 * integração com provedor SSO nem credenciais digitadas neste painel.
 */

export interface LoginPanelValues {
  username: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginPanelProps {
  onSubmit?: (values: LoginPanelValues) => void;
  className?: string;
}

function LoginPanel({ onSubmit, className }: LoginPanelProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({ username: "", password: "", rememberMe: false });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "flex w-[480px] max-w-full max-h-full flex-col items-start justify-center gap-8 overflow-y-auto rounded-[var(--radius-md)] ring-1 ring-inset ring-[var(--color-border-strong)] bg-[var(--color-surface-primary)]/80 px-6 py-16 backdrop-blur-[3px] shadow-[0px_4px_16px_0px_rgba(0,0,0,0.12)]",
        className
      )}
    >
      <div className="flex w-full shrink-0 items-center gap-[10.667px] p-4">
        <div className="relative flex size-[37.333px] shrink-0 items-center justify-center rounded-[10.667px] bg-[var(--color-action-primary)]">
          <img src={loginBrand} alt="" className="absolute left-[4px] top-0 h-[37.333px] w-[28px]" />
        </div>
        <div className="flex min-w-0 items-center gap-[6.667px] leading-[normal] text-[var(--color-text-primary)]">
          <p className="text-2xl font-bold tracking-[3.12px]">SCR</p>
          <p className="text-[10.667px] font-light tracking-[3.4133px]">|</p>
          <p className="text-base font-light sm:whitespace-nowrap">Sistema Central de Reclamações</p>
        </div>
      </div>

      <div className="flex w-full shrink-0 flex-col gap-2">
        <h1 className="w-full text-2xl font-semibold leading-9 text-[var(--color-text-primary)]">Bem-vindo</h1>
        <p className="w-full text-sm leading-5 text-[var(--color-text-secondary)]">
          Entre com seus dados para acessar o sistema.
        </p>
      </div>

      <div className="h-px w-full shrink-0 bg-[var(--color-border-default)] opacity-30" />

      <div className="w-full shrink-0 pt-2">
        <Button type="submit" size="lg" className="h-[42px] w-full">
          Entrar via SSO
        </Button>
      </div>
    </form>
  );
}

export { LoginPanel };
