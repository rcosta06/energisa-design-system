import type { Meta, StoryObj } from "@storybook/react";
import { Alert } from "../components/ui/alert";

const meta: Meta<typeof Alert> = {
  title: "Components/Alert",
  component: Alert,
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
type Story = StoryObj<typeof Alert>;

/** Alert interativo — altere type/icon/title/dismissible no painel de Controls. Light/Dark: toolbar do Storybook. */
export const Default: Story = {
  args: {
    type: "neutral",
    icon: true,
    title: "Informação importante",
    dismissible: false,
    children: "Informação relevante para o usuário.",
  },
};

/**
 * Os 5 types (Figma: "Alert", node 3124:26756) — surface + cor do ícone
 * mudam, tudo via semantic tokens (`success/info/warning/danger-surface` e
 * `-strong`, novos nesta leva de componentes). Dark: toolbar de tema.
 */
export const Types: Story = {
  render: () => (
    <div className="flex w-[400px] flex-col gap-3">
      <Alert type="neutral" title="Informação importante">Informação relevante para o usuário.</Alert>
      <Alert type="success" title="Informação importante">Informação relevante para o usuário.</Alert>
      <Alert type="info" title="Informação importante">Informação relevante para o usuário.</Alert>
      <Alert type="warning" title="Informação importante">Informação relevante para o usuário.</Alert>
      <Alert type="error" title="Informação importante">Informação relevante para o usuário.</Alert>
    </div>
  ),
};

/**
 * Comportamento booleano de cada slot (Figma: "Alert — Documentação",
 * node 3125:24705, seção "02 — Composições") — cada slot omitido some sem
 * deixar gap fantasma (`icon`/`title`/`action`/`dismissible`), reflow via
 * `flex` normal, não `position: absolute`.
 */
export const Compositions: Story = {
  tags: ["!autodocs"],
  render: () => (
    <div className="flex w-[400px] flex-col gap-3">
      <Alert type="info" icon={false} title="Sem ícone">O ícone de status não é renderizado — sem espaço reservado.</Alert>
      <Alert type="info">Sem título — a descrição sobe e ocupa o espaço sozinha.</Alert>
      <Alert type="info" title="Com ação" action={{ label: "Desfazer", onClick: () => {} }}>
        Ação secundária reutiliza o Button oficial (Ghost/SM).
      </Alert>
      <Alert type="info" title="Dispensável" dismissible onDismiss={() => {}}>
        Botão de fechar reutiliza o IconButton oficial (size sm).
      </Alert>
      <Alert
        type="info"
        title="Ação + Dispensável"
        action={{ label: "Desfazer", onClick: () => {} }}
        dismissible
        onDismiss={() => {}}
      >
        Os dois juntos, sem sobreposição.
      </Alert>
    </div>
  ),
};

/** Título e descrição longos — quebra de linha, altura cresce naturalmente, sem clipping/overflow. */
export const LongContent: Story = {
  tags: ["!autodocs"],
  render: () => (
    <div className="w-[400px]">
      <Alert
        type="warning"
        title="Um título consideravelmente mais longo do que o exemplo padrão, para validar a quebra de linha"
        action={{ label: "Desfazer", onClick: () => {} }}
        dismissible
        onDismiss={() => {}}
      >
        Uma descrição bem mais longa do que o texto padrão, com informação suficiente para forçar múltiplas
        linhas e validar que o Alert cresce em altura sem cortar conteúdo, sobrepor a ação ou o botão de
        fechar, e sem gerar overflow horizontal.
      </Alert>
    </div>
  ),
};

/**
 * Mesmo componente em containers de 320/400/600px — Alert não é
 * estruturalmente `width: 400px` (esse valor é só o exemplo do Figma),
 * então se adapta à largura do container/parent.
 */
export const Responsive: Story = {
  tags: ["!autodocs"],
  render: () => (
    <div className="flex flex-col gap-6">
      {[320, 400, 600].map((width) => (
        <div key={width} className="flex flex-col gap-1">
          <span className="text-xs text-[var(--color-text-secondary)]">{width}px</span>
          <div style={{ width }}>
            <Alert type="success" title="Informação importante" action={{ label: "Desfazer", onClick: () => {} }} dismissible onDismiss={() => {}}>
              Informação relevante para o usuário.
            </Alert>
          </div>
        </div>
      ))}
    </div>
  ),
};
