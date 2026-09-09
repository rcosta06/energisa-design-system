import type { Meta, StoryObj } from "@storybook/react";
import { Toast } from "../components/ui/toast";

const meta: Meta<typeof Toast> = {
  title: "Components/Toast",
  component: Toast,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  argTypes: {
    type: {
      control: "select",
      options: ["neutral", "success", "info", "warning", "error"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

/** Toast interativo — altere type/icon/title/dismissible no painel de Controls. Light/Dark: toolbar do Storybook. */
export const Default: Story = {
  args: {
    type: "neutral",
    icon: true,
    title: "Informação importante",
    dismissible: true,
    children: "Informação relevante para o usuário.",
  },
};

/** Os 5 types (Figma: "Toast", node 3127:25038) — mesmos tokens do Alert. Dark: toolbar de tema. */
export const Types: Story = {
  render: () => (
    <div className="flex w-[384px] flex-col gap-3">
      <Toast type="neutral" title="Informação importante">Informação relevante para o usuário.</Toast>
      <Toast type="success" title="Informação importante">Informação relevante para o usuário.</Toast>
      <Toast type="info" title="Informação importante">Informação relevante para o usuário.</Toast>
      <Toast type="warning" title="Informação importante">Informação relevante para o usuário.</Toast>
      <Toast type="error" title="Informação importante">Informação relevante para o usuário.</Toast>
    </div>
  ),
};

/**
 * Comportamento booleano de cada slot (Figma: "Toast — Documentação", node
 * 3127:26871, seção "02 — Composições"). Diferente do Alert: `dismissible`
 * já nasce `true` por padrão — `NoDismiss` mostra o caso oposto explícito.
 */
export const Compositions: Story = {
  tags: ["!autodocs"],
  render: () => (
    <div className="flex w-[384px] flex-col gap-3">
      <Toast type="info" icon={false} title="Sem ícone">O ícone de status não é renderizado — sem espaço reservado.</Toast>
      <Toast type="info">Sem título — a descrição sobe e ocupa o espaço sozinha.</Toast>
      <Toast type="info" title="Com ação" action={{ label: "Desfazer", onClick: () => {} }}>
        Ação secundária reutiliza o Button oficial (Ghost/SM).
      </Toast>
      <Toast type="info" title="Sem dismiss" dismissible={false}>
        `dismissible={"{false}"}` — o slot de fechar não é renderizado, sem espaço reservado.
      </Toast>
      <Toast
        type="info"
        title="Ação + Dispensável"
        action={{ label: "Desfazer", onClick: () => {} }}
        dismissible
        onDismiss={() => {}}
      >
        Os dois juntos, sem sobreposição.
      </Toast>
    </div>
  ),
};

/** Título e descrição longos — quebra de linha, altura cresce naturalmente, sem clipping/overflow. */
export const LongContent: Story = {
  tags: ["!autodocs"],
  render: () => (
    <div className="w-[384px]">
      <Toast
        type="warning"
        title="Um título consideravelmente mais longo do que o exemplo padrão, para validar a quebra de linha"
        action={{ label: "Desfazer", onClick: () => {} }}
        dismissible
        onDismiss={() => {}}
      >
        Uma descrição bem mais longa do que o texto padrão, com informação suficiente para forçar múltiplas
        linhas e validar que o Toast cresce em altura sem cortar conteúdo, sobrepor a ação ou o botão de
        fechar, e sem gerar overflow horizontal.
      </Toast>
    </div>
  ),
};

/**
 * `w-full max-w-[384px]`: em containers largos trava nos 384px do Figma; em
 * viewports estreitos (mobile) encolhe pra preencher sem overflow. Mesmos
 * containers testados no Figma ("Toast — Width Test", node 3127:26792).
 */
export const Responsive: Story = {
  tags: ["!autodocs"],
  render: () => (
    <div className="flex flex-col gap-6">
      {[320, 384, 500].map((width) => (
        <div key={width} className="flex flex-col gap-1">
          <span className="text-xs text-[var(--color-text-secondary)]">{width}px</span>
          <div style={{ width }}>
            <Toast type="success" title="Informação importante" dismissible onDismiss={() => {}}>
              Informação relevante para o usuário.
            </Toast>
          </div>
        </div>
      ))}
    </div>
  ),
};

/**
 * Empilhamento visual (Figma: "Toast — Documentação" → "04 — Stack
 * Example", node 3127:27180) — só a composição visual de 3 Toasts num
 * container vertical, sem criar um componente `ToastStack` (fora do escopo
 * desta etapa: nenhum gerenciador de fila/posição/timer).
 */
export const StackExample: Story = {
  tags: ["!autodocs"],
  render: () => (
    <div className="flex w-[384px] flex-col gap-2">
      <Toast type="success" title="Reclamação salva" dismissible onDismiss={() => {}}>
        SIATT-2026-004821 atualizada com sucesso.
      </Toast>
      <Toast type="info" title="Sincronizando" dismissible onDismiss={() => {}}>
        Atualizando lista de reclamações.
      </Toast>
      <Toast type="warning" title="Conexão instável" dismissible onDismiss={() => {}}>
        Algumas alterações podem demorar para salvar.
      </Toast>
    </div>
  ),
};

/**
 * Timed/Persistent (Figma: "Toast — Documentação" → "03 — Comportamento
 * (conceitual)", node 3127:27177) são comportamentos do SISTEMA CONSUMIDOR
 * (duração/timer/dismiss-on-action), não do componente visual — por isso
 * documentados aqui como texto, sem variante visual nem prop nova
 * (`duration`/`autoClose`). Implementar isso é outra etapa (ToastProvider/
 * fila/timer, explicitamente fora do escopo desta).
 */
export const TimedVsPersistent: Story = {
  tags: ["!autodocs"],
  render: () => (
    <div className="flex w-[420px] flex-col gap-3 text-sm text-[var(--color-text-secondary)]">
      <p>
        <strong className="text-[var(--color-text-primary)]">Timed</strong> — o Toast desaparece
        automaticamente após o período definido pela aplicação. A duração pertence à implementação
        (fora do componente visual).
      </p>
      <p>
        <strong className="text-[var(--color-text-primary)]">Persistent</strong> — o Toast permanece
        visível até uma ação do usuário, dismiss ou mudança de estado.
      </p>
    </div>
  ),
};
