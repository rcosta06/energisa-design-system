import * as React from "react";
import { BrandMarkIcon } from "@/components/ui/icons/brand-mark";
import { FormField } from "@/components/ui/form-field";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * LoginPanel — Energisa Design System (Figma: "Login Page - Anim 01..06" →
 * "Login Content" → "Authentication Panel", idêntico nos 6 frames — a
 * animação não afeta o painel, só o `EnergyAnimation` atrás dele).
 *
 * Reaproveita `FormField` (Label+Input, com toggle de senha já embutido no
 * `Input` via `type="password"` — mesmos ícones `Eye`/`EyeOff` da
 * lucide-react já usados no resto do DS, sem novo ícone) e `Button`. Não
 * existe um `Checkbox` oficial no DS ainda (mesmo gap já documentado em
 * `Introduction.mdx`) — "Lembrar-me" usa `<input type="checkbox">` nativo
 * estilizado com tokens, mesmo padrão já usado em `complaint-filter-drawer.tsx`.
 * "Esqueci minha senha" não tem componente `Link` no DS — é texto simples
 * com a cor de ação, sem um componente novo só pra isso. Abaixo do "Entrar"
 * (`Button` padrão/primary, inalterado): separador "ou" composto com o
 * mesmo padrão de linha já usado acima (`h-px bg-border-default opacity-30`,
 * sem `Divider` formal no DS ainda) + `Button variant="ghost"` real (mesma
 * API do Storybook, `h-[42px] w-full text-sm font-semibold` igual ao
 * Entrar) — não é um `<button>` customizado. Label "Entrar via SSO", mas
 * sem `onClick`/navegação: não existe integração de SSO real no projeto
 * ainda, só a composição visual.
 *
 * `w-[480px]` (largura fixa do Figma) + `h-full` (altura passou a ser
 * consequência do posicionamento definido por `LoginPage` — `top`/`right`/
 * `bottom` de 32px lá fora — em vez do `h-[600px]` fixo original; o bloco de
 * conteúdo continua com `justify-center`, então ele recentraliza sozinho
 * dentro da nova altura, sem reorganização interna). `bg-white/80` +
 * `backdrop-blur-[6px]` + `shadow-[0px_4px_16px_0px_rgba(0,0,0,0.12)]` — o
 * efeito "Glass/Soft" do Figma é um Effect Style, não uma Variable
 * (`get_variable_defs` não retorna token pra ele); reproduzido literalmente,
 * inalterado. Padding fracionário do bloco "Brand" (10.667px/21.333px)
 * também vem direto do Figma — vem de um componente mestre escalado, sem
 * token exato equivalente no projeto.
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
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rememberMe, setRememberMe] = React.useState(false);
  const rememberId = React.useId();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({ username, password, rememberMe });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "flex h-full w-[480px] max-w-full flex-col items-start justify-center gap-5 overflow-y-auto rounded-[var(--radius-md)] border border-[var(--color-border-strong)] bg-white/80 p-6 backdrop-blur-[6px] shadow-[0px_4px_16px_0px_rgba(0,0,0,0.12)]",
        className
      )}
    >
      <div className="flex shrink-0 items-center gap-[10.667px] pb-[21.333px] pl-4 pt-[10.667px]">
        <div className="flex size-[37.333px] shrink-0 items-center justify-center rounded-[10.667px] bg-[var(--color-action-primary)]">
          <BrandMarkIcon className="size-[28px]" />
        </div>
        <div className="flex items-center gap-[6.667px] whitespace-nowrap text-[var(--color-text-primary)]">
          <p className="text-2xl font-bold tracking-[3.12px]">SCR</p>
          <p className="text-[10.667px] font-light tracking-[3.4133px]">|</p>
          <p className="text-base font-light">Sistema Central de Reclamações</p>
        </div>
      </div>

      <div className="flex w-full shrink-0 flex-col gap-2">
        <h1 className="w-full text-2xl font-semibold leading-9 text-[var(--color-text-primary)]">Bem-vindo</h1>
        <p className="w-full text-sm text-[var(--color-text-secondary)]">
          Entre com seus dados para acessar o sistema.
        </p>
      </div>

      <div className="h-px w-full shrink-0 bg-[var(--color-border-default)] opacity-30" />

      <div className="flex w-full shrink-0 flex-col gap-4">
        <FormField
          label="Username"
          placeholder="Digite seu usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
        />
        <FormField
          label="Password"
          type="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
      </div>

      <div className="flex w-full shrink-0 items-center justify-between">
        <label htmlFor={rememberId} className="flex items-center gap-2">
          <input
            id={rememberId}
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="size-3.5 rounded-[var(--radius-xs)] border-[1.5px] border-[var(--color-border-strong)] accent-[var(--color-action-primary)]"
          />
          <span className="text-xs text-[var(--color-text-secondary)]">Lembrar-me</span>
        </label>
        <button
          type="button"
          className="text-xs font-medium text-[var(--color-action-primary)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-primary)]"
        >
          Esqueci minha senha
        </button>
      </div>

      <div className="w-full shrink-0 pt-2">
        <Button type="submit" className="h-[42px] w-full text-sm font-semibold">
          Entrar
        </Button>
      </div>

      <div className="my-1 flex w-full shrink-0 items-center gap-3">
        <div className="h-px flex-1 bg-[var(--color-border-strong)]" />
        <span className="text-xs text-[var(--color-text-secondary)]">ou</span>
        <div className="h-px flex-1 bg-[var(--color-border-strong)]" />
      </div>

      {/*
        Ação secundária ainda não definida no fluxo do projeto — nenhuma
        integração/rota de SSO existe hoje. Label real definido pelo usuário
        ("Entrar via SSO"), mas sem onClick (não implementa navegação/SSO
        falso). Reportado como pendência: implementar o fluxo de SSO real
        antes de considerar este botão funcional.
      */}
      <div className="w-full shrink-0">
        <Button type="button" variant="ghost" className="h-[42px] w-full text-sm font-semibold">
          Entrar via SSO
        </Button>
      </div>
    </form>
  );
}

export { LoginPanel };
