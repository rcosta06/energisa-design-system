import type { Meta, StoryObj } from "@storybook/react";
import {
  Search, Mail, Lock, User, Phone, AlertCircle,
  Eye, EyeOff, Calendar, Hash, AtSign, Globe,
  CreditCard, MapPin, Briefcase, Tag, Key, Bell,
} from "lucide-react";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { FormField } from "../components/ui/form-field";

/**
 * Input — Energisa Design System
 *
 * Campo de texto base do Design System. Suporta ícones internos,
 * estados de erro/helper text, e variante de senha com toggle de visibilidade.
 * Para o caso de uso mais comum (label + campo + erro), use FormField.
 */

const iconMap = {
  "(nenhum)": undefined,
  Search:      <Search />,
  Mail:        <Mail />,
  Lock:        <Lock />,
  User:        <User />,
  Phone:       <Phone />,
  AlertCircle: <AlertCircle />,
  Eye:         <Eye />,
  EyeOff:      <EyeOff />,
  Calendar:    <Calendar />,
  Hash:        <Hash />,
  AtSign:      <AtSign />,
  Globe:       <Globe />,
  CreditCard:  <CreditCard />,
  MapPin:      <MapPin />,
  Briefcase:   <Briefcase />,
  Tag:         <Tag />,
  Key:         <Key />,
  Bell:        <Bell />,
};

type IconKey = keyof typeof iconMap;

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    error: { control: "boolean" },
    disabled: { control: "boolean" },
    numericOnly: {
      control: "boolean",
      description: "Filtra caracteres não-numéricos em tempo real (desktop + mobile, inclusive ao colar)",
    },
    errorMessage: { control: "text" },
    helperText: { control: "text" },
    type: {
      control: "select",
      options: ["text", "email", "password", "tel", "number", "search", "url", "date"],
      description: "Tipo HTML do campo — controla teclado mobile e comportamento nativo do browser",
    },
    inputMode: {
      control: "select",
      options: ["none", "text", "numeric", "decimal", "tel", "search", "email", "url"],
      description: "Sugere o teclado virtual no mobile. Use 'numeric' para aceitar apenas dígitos em campos tel/text",
    },
    leftIcon: {
      control: "select",
      options: Object.keys(iconMap) as IconKey[],
      mapping: iconMap,
      description: "Ícone à esquerda do texto",
    },
    rightIcon: {
      control: "select",
      options: Object.keys(iconMap) as IconKey[],
      mapping: iconMap,
      description: "Ícone à direita do texto",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

// ─── DOCS PAGE ────────────────────────────────────────────────────────────────

/** Estado padrão interativo — selecione ícones e ajuste todas as props via Controls. */
export const Default: Story = {
  args: {
    placeholder: "Digite aqui...",
    leftIcon: "(nenhum)" as unknown as IconKey,
    rightIcon: "(nenhum)" as unknown as IconKey,
  },
  render: (args) => <Input {...args} />,
};

/** Com texto de apoio abaixo do campo. */
export const WithHelperText: Story = {
  parameters: {
    docs: { source: { code: `<Input placeholder="seu@email.com" helperText="Nunca compartilharemos seu e-mail." />` } },
  },
  args: {
    placeholder: "seu@email.com",
    helperText: "Nunca compartilharemos seu e-mail.",
  },
};

/** Estado de erro com mensagem de validação. */
export const WithError: Story = {
  parameters: {
    docs: { source: { code: `<Input\n  placeholder="seu@email.com"\n  error\n  errorMessage="E-mail inválido. Verifique e tente novamente."\n  defaultValue="email-invalido"\n/>` } },
  },
  args: {
    placeholder: "seu@email.com",
    error: true,
    errorMessage: "E-mail inválido. Verifique e tente novamente.",
    defaultValue: "email-invalido",
  },
};

/** Campo desabilitado. */
export const Disabled: Story = {
  parameters: {
    docs: { source: { code: `<Input placeholder="Campo desabilitado" disabled defaultValue="Valor somente leitura" />` } },
  },
  args: {
    placeholder: "Campo desabilitado",
    disabled: true,
    defaultValue: "Valor somente leitura",
  },
};

/** Com ícone à esquerda. */
export const WithLeftIcon: Story = {
  parameters: {
    docs: { source: { code: `import { Search } from "lucide-react";\n\n<Input placeholder="Buscar..." leftIcon={<Search />} />` } },
  },
  args: {
    placeholder: "Buscar...",
    leftIcon: <Search />,
  },
};

/** Com ícone à direita. */
export const WithRightIcon: Story = {
  parameters: {
    docs: { source: { code: `import { Mail } from "lucide-react";\n\n<Input placeholder="Informe seu e-mail" rightIcon={<Mail />} />` } },
  },
  args: {
    placeholder: "Informe seu e-mail",
    rightIcon: <Mail />,
  },
};

/** Com ícones nos dois lados. */
export const WithBothIcons: Story = {
  parameters: {
    docs: { source: { code: `import { User, AlertCircle } from "lucide-react";\n\n<Input placeholder="Usuário" leftIcon={<User />} rightIcon={<AlertCircle />} />` } },
  },
  args: {
    placeholder: "Usuário",
    leftIcon: <User />,
    rightIcon: <AlertCircle />,
  },
};

/** Campo de senha com botão de mostrar/ocultar automático. */
export const Password: Story = {
  parameters: {
    docs: { source: { code: `import { Lock } from "lucide-react";\n\n<Input type="password" placeholder="Sua senha" leftIcon={<Lock />} />` } },
  },
  args: {
    type: "password",
    placeholder: "Sua senha",
    leftIcon: <Lock />,
  },
};

/** Campo de senha em estado de erro. */
export const PasswordError: Story = {
  parameters: {
    docs: { source: { code: `import { Lock } from "lucide-react";\n\n<Input\n  type="password"\n  placeholder="Sua senha"\n  leftIcon={<Lock />}\n  error\n  errorMessage="A senha deve ter pelo menos 8 caracteres."\n  defaultValue="123"\n/>` } },
  },
  args: {
    type: "password",
    placeholder: "Sua senha",
    leftIcon: <Lock />,
    error: true,
    errorMessage: "A senha deve ter pelo menos 8 caracteres.",
    defaultValue: "123",
  },
};

/** Os 3 tamanhos disponíveis: sm, md (padrão) e lg. */
export const Sizes: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Search } from "lucide-react";

<Input size="sm" placeholder="Small (sm)" leftIcon={<Search />} />
<Input size="md" placeholder="Medium (md) — padrão" leftIcon={<Search />} />
<Input size="lg" placeholder="Large (lg)" leftIcon={<Search />} />`,
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <Input size="sm" placeholder="Small (sm)" leftIcon={<Search />} />
      <Input size="md" placeholder="Medium (md) — padrão" leftIcon={<Search />} />
      <Input size="lg" placeholder="Large (lg)" leftIcon={<Search />} />
    </div>
  ),
};

/** Todos os estados reunidos: default, helper, erro, disabled, ícone, senha. */
export const States: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Mail, Lock } from "lucide-react";

<Input placeholder="Default" />
<Input placeholder="Com helper" helperText="Texto auxiliar de apoio." />
<Input
  placeholder="Com erro"
  error
  errorMessage="Mensagem de erro aqui."
  defaultValue="valor inválido"
/>
<Input placeholder="Disabled" disabled defaultValue="Valor desabilitado" />
<Input placeholder="Com ícone esquerdo" leftIcon={<Mail />} />
<Input type="password" placeholder="Senha com toggle" leftIcon={<Lock />} />`,
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <Input placeholder="Default" />
      <Input placeholder="Com helper" helperText="Texto auxiliar de apoio." />
      <Input
        placeholder="Com erro"
        error
        errorMessage="Mensagem de erro aqui."
        defaultValue="valor inválido"
      />
      <Input placeholder="Disabled" disabled defaultValue="Valor desabilitado" />
      <Input placeholder="Com ícone esquerdo" leftIcon={<Mail />} />
      <Input type="password" placeholder="Senha com toggle" leftIcon={<Lock />} />
    </div>
  ),
};

// ─── FormField ────────────────────────────────────────────────────────────────

/**
 * FormField — Label + Input + helper/error unidos em um único componente.
 * Caso de uso padrão para 90% dos formulários.
 */
export const WithFormField: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { User, Mail, Phone, Lock } from "lucide-react";
import { FormField } from "@/components/ui/form-field";

<FormField
  label="Nome completo"
  placeholder="João Silva"
  required
  leftIcon={<User />}
  helperText="Conforme documento oficial."
/>
<FormField
  label="E-mail"
  type="email"
  placeholder="joao@energisa.com.br"
  required
  leftIcon={<Mail />}
/>
<FormField
  label="Telefone"
  type="tel"
  placeholder="(21) 99999-9999"
  leftIcon={<Phone />}
  helperText="Com DDD, somente números."
/>
<FormField
  label="Senha"
  type="password"
  placeholder="Mínimo 8 caracteres"
  required
  leftIcon={<Lock />}
  error
  errorMessage="A senha deve ter pelo menos 8 caracteres."
/>`,
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-6 w-80">
      <FormField
        label="Nome completo"
        placeholder="João Silva"
        required
        leftIcon={<User />}
        helperText="Conforme documento oficial."
      />
      <FormField
        label="E-mail"
        type="email"
        placeholder="joao@energisa.com.br"
        required
        leftIcon={<Mail />}
      />
      <FormField
        label="Telefone"
        type="tel"
        placeholder="(21) 99999-9999"
        leftIcon={<Phone />}
        helperText="Com DDD, somente números."
      />
      <FormField
        label="Senha"
        type="password"
        placeholder="Mínimo 8 caracteres"
        required
        leftIcon={<Lock />}
        error
        errorMessage="A senha deve ter pelo menos 8 caracteres."
      />
    </div>
  ),
};

// ─── Label ────────────────────────────────────────────────────────────────────

/** Label — componente de rótulo acessível com suporte a obrigatório e desabilitado. */
export const LabelVariants: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Label } from "@/components/ui/label";

<Label>Label padrão</Label>
<Label required>Label obrigatório</Label>
<Label disabled>Label desabilitado</Label>
<Label required disabled>Label obrigatório e desabilitado</Label>`,
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-3 w-80">
      <Label>Label padrão</Label>
      <Label required>Label obrigatório</Label>
      <Label disabled>Label desabilitado</Label>
      <Label required disabled>Label obrigatório e desabilitado</Label>
    </div>
  ),
};
