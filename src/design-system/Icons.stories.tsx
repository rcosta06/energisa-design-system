import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "../components/ui/button";

const meta: Meta = {
  title: "Foundations/Icons",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "Biblioteca de ícones do Energisa Design System, fornecida pelo **Lucide React** (já incluído via shadcn/ui).",
          "",
          "**Import:**",
          "```tsx",
          'import { IconName } from "lucide-react";',
          "```",
          "",
          "**Props principais:**",
          "| Prop | Tipo | Padrão | Descrição |",
          "|------|------|--------|-----------|",
          "| `size` | `number` | `24` | Tamanho em px |",
          "| `strokeWidth` | `number` | `2` | Espessura da linha |",
          "| `color` | `string` | `currentColor` | Cor CSS ou token |",
          "",
          "**Referência completa:** [lucide.dev](https://lucide.dev/icons/)",
        ].join("\n"),
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// ─── Lista curada por categoria ───────────────────────────────────────────────
const iconsByCategory: Record<string, string[]> = {
  "Ações": [
    "Plus", "Minus", "X", "Check", "Search", "Filter", "SortAsc", "SortDesc",
    "Download", "Upload", "Share", "Copy", "Clipboard", "Edit", "Edit2", "Edit3",
    "Trash", "Trash2", "Save", "RefreshCw", "RefreshCcw", "RotateCw", "RotateCcw",
    "Undo", "Redo", "ZoomIn", "ZoomOut", "Maximize", "Minimize", "Move",
  ],
  "Navegação": [
    "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown",
    "ArrowLeftRight", "ArrowUpDown",
    "ChevronLeft", "ChevronRight", "ChevronUp", "ChevronDown",
    "ChevronsLeft", "ChevronsRight", "ChevronsUp", "ChevronsDown",
    "Home", "Menu", "MoreHorizontal", "MoreVertical",
    "ExternalLink", "Link", "Link2", "Unlink",
  ],
  "Comunicação": [
    "Mail", "MailOpen", "MessageCircle", "MessageSquare", "MessageSquarePlus",
    "Send", "Bell", "BellOff", "BellRing", "Phone", "PhoneCall",
    "PhoneMissed", "PhoneOff", "Inbox", "Reply", "ReplyAll", "Forward",
  ],
  "Usuário & Acesso": [
    "User", "UserPlus", "UserMinus", "UserCheck", "UserX", "Users",
    "Lock", "LockOpen", "Key", "Shield", "ShieldCheck", "ShieldAlert",
    "Eye", "EyeOff", "LogIn", "LogOut", "Fingerprint",
  ],
  "Dados & Arquivos": [
    "File", "FileText", "FilePlus", "FileMinus", "FileCheck", "FileX",
    "Folder", "FolderOpen", "FolderPlus", "FolderMinus",
    "Database", "Table", "Sheet", "BarChart", "BarChart2", "BarChart3",
    "LineChart", "PieChart", "TrendingUp", "TrendingDown",
  ],
  "Status & Feedback": [
    "AlertCircle", "AlertTriangle", "AlertOctagon",
    "CheckCircle", "CheckCircle2", "XCircle",
    "Info", "HelpCircle", "Loader", "Loader2",
    "ThumbsUp", "ThumbsDown", "Star", "StarOff", "Heart", "HeartOff",
  ],
  "Interface": [
    "Settings", "Settings2", "Sliders", "SlidersHorizontal",
    "Layout", "LayoutGrid", "LayoutList", "LayoutDashboard",
    "Sidebar", "SidebarOpen", "SidebarClose",
    "Columns", "Rows", "Grid", "List", "ListFilter",
    "ToggleLeft", "ToggleRight",
  ],
  "Mídia": [
    "Image", "Images", "Camera", "Video", "VideoOff", "Film",
    "Play", "Pause", "Stop", "SkipForward", "SkipBack",
    "Volume", "Volume1", "Volume2", "VolumeX",
    "Mic", "MicOff", "Headphones",
  ],
  "Energia & Utilidades": [
    "Zap", "ZapOff", "Sun", "Moon", "Cloud", "CloudLightning",
    "Wifi", "WifiOff", "Bluetooth", "Battery", "BatteryCharging",
    "Power", "PowerOff", "Gauge", "Activity", "Cpu", "Server",
  ],
  "Tempo & Calendário": [
    "Calendar", "CalendarDays", "CalendarCheck", "CalendarPlus",
    "CalendarMinus", "CalendarX", "Clock", "Clock1", "Timer",
    "AlarmClock", "Hourglass",
  ],
};

// ─── Componente de galeria interativa ─────────────────────────────────────────
function IconGallery() {
  const [search, setSearch] = useState("");
  const [size, setSize] = useState(24);
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (name: string) => {
    navigator.clipboard.writeText(`<${name} />`);
    setCopied(name);
    setTimeout(() => setCopied(null), 1500);
  };

  const filtered = Object.entries(iconsByCategory).reduce<Record<string, string[]>>(
    (acc, [cat, icons]) => {
      const matches = icons.filter((name) =>
        name.toLowerCase().includes(search.toLowerCase())
      );
      if (matches.length > 0) acc[cat] = matches;
      return acc;
    },
    {}
  );

  const totalVisible = Object.values(filtered).flat().length;

  return (
    <div style={{ fontFamily: "var(--font-sans)" }}>
      {/* Toolbar */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "var(--spacing-4)",
          alignItems: "center",
          marginBottom: "var(--spacing-6)",
          padding: "var(--spacing-4)",
          background: "var(--color-surface-secondary)",
          borderRadius: "var(--radius-md)",
          border: "1px solid var(--color-border-default)",
        }}
      >
        <input
          type="text"
          placeholder="Buscar ícone… ex: arrow, check, user"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: "1 1 240px",
            height: "36px",
            padding: "0 12px",
            border: "1px solid var(--color-border-strong)",
            borderRadius: "var(--radius-sm)",
            background: "var(--color-surface-primary)",
            color: "var(--color-text-primary)",
            fontSize: "var(--text-sm)",
            outline: "none",
          }}
        />

        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "var(--text-sm)",
            color: "var(--color-text-secondary)",
            whiteSpace: "nowrap",
          }}
        >
          Tamanho:{" "}
          <strong style={{ color: "var(--color-text-primary)" }}>{size}px</strong>
          <input
            type="range" min={12} max={48} value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            style={{ width: "80px" }}
          />
        </label>

        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "var(--text-sm)",
            color: "var(--color-text-secondary)",
            whiteSpace: "nowrap",
          }}
        >
          Espessura:{" "}
          <strong style={{ color: "var(--color-text-primary)" }}>{strokeWidth}</strong>
          <input
            type="range" min={1} max={3} step={0.5} value={strokeWidth}
            onChange={(e) => setStrokeWidth(Number(e.target.value))}
            style={{ width: "80px" }}
          />
        </label>

        <span
          style={{
            fontSize: "var(--text-xs)",
            color: "var(--color-text-muted)",
            marginLeft: "auto",
          }}
        >
          {totalVisible} ícones
        </span>
      </div>

      {/* Categorias */}
      {Object.entries(filtered).map(([category, icons]) => (
        <div key={category} style={{ marginBottom: "var(--spacing-8)" }}>
          <h3
            style={{
              fontSize: "var(--text-sm)",
              fontWeight: 600,
              color: "var(--color-text-secondary)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: "var(--spacing-3)",
              paddingBottom: "var(--spacing-2)",
              borderBottom: "1px solid var(--color-border-default)",
            }}
          >
            {category}
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
              gap: "var(--spacing-2)",
            }}
          >
            {icons.map((name) => {
              const Icon = (LucideIcons as unknown as Record<string, LucideIcon>)[name];
              if (!Icon) return null;
              const isCopied = copied === name;
              return (
                <button
                  key={name}
                  onClick={() => handleCopy(name)}
                  title={`Copiar <${name} />`}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "var(--spacing-2)",
                    padding: "var(--spacing-3)",
                    border: isCopied
                      ? "1px solid var(--color-action-primary)"
                      : "1px solid transparent",
                    borderRadius: "var(--radius-sm)",
                    background: isCopied
                      ? "color-mix(in srgb, var(--color-action-primary) 10%, transparent)"
                      : "transparent",
                    cursor: "pointer",
                    transition: "all 0.15s",
                    color: isCopied
                      ? "var(--color-action-primary)"
                      : "var(--color-text-primary)",
                  }}
                  onMouseEnter={(e) => {
                    if (!isCopied) {
                      (e.currentTarget as HTMLButtonElement).style.background =
                        "var(--color-surface-secondary)";
                      (e.currentTarget as HTMLButtonElement).style.borderColor =
                        "var(--color-border-default)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isCopied) {
                      (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "transparent";
                    }
                  }}
                >
                  <Icon size={size} strokeWidth={strokeWidth} />
                  <span
                    style={{
                      fontSize: "10px",
                      color: isCopied
                        ? "var(--color-action-primary)"
                        : "var(--color-text-muted)",
                      textAlign: "center",
                      lineHeight: 1.3,
                      wordBreak: "break-all",
                    }}
                  >
                    {isCopied ? "Copiado!" : name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {totalVisible === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "var(--spacing-12)",
            color: "var(--color-text-muted)",
            fontSize: "var(--text-sm)",
          }}
        >
          Nenhum ícone encontrado para &ldquo;{search}&rdquo;
        </div>
      )}
    </div>
  );
}

// ─── Gallery ──────────────────────────────────────────────────────────────────
/** Galeria completa com busca e controles de tamanho/espessura. Clique em um ícone para copiar `<IconName />`. */
export const Gallery: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Zap } from "lucide-react";

// Uso mínimo — herda currentColor do elemento pai
<Zap />

// Personalizado
<Zap size={32} strokeWidth={1.5} color="var(--color-action-primary)" />`,
      },
    },
  },
  render: () => <IconGallery />,
};

// ─── Sizes ────────────────────────────────────────────────────────────────────
/** Tamanhos recomendados pelo Design System: 12 · 16 · 20 · **24** (padrão) · 32 · 48. */
export const Sizes: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Zap } from "lucide-react";

<Zap size={12} />
<Zap size={16} />
<Zap size={20} />
<Zap size={24} />  {/* padrão */}
<Zap size={32} />
<Zap size={48} />`,
      },
    },
  },
  render: () => {
    const sizes = [12, 16, 20, 24, 32, 48];
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-4)" }}>
        {sizes.map((s) => (
          <div
            key={s}
            style={{ display: "flex", alignItems: "center", gap: "var(--spacing-4)" }}
          >
            <code
              style={{
                width: "60px",
                fontSize: "var(--text-xs)",
                color: s === 24 ? "var(--color-action-primary)" : "var(--color-text-secondary)",
                fontWeight: s === 24 ? 700 : 400,
              }}
            >
              {s}px{s === 24 ? " ★" : ""}
            </code>
            <LucideIcons.Zap size={s} color="var(--color-action-primary)" />
            <LucideIcons.Bell size={s} color="var(--color-text-primary)" />
            <LucideIcons.Search size={s} color="var(--color-text-secondary)" />
          </div>
        ))}
      </div>
    );
  },
};

// ─── StrokeWeights ────────────────────────────────────────────────────────────
/** Espessuras de linha disponíveis — de fino (1) a grosso (3). O padrão do EDS é **2**. */
export const StrokeWeights: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Home } from "lucide-react";

<Home strokeWidth={1} />    {/* fino */}
<Home strokeWidth={1.5} />
<Home strokeWidth={2} />    {/* padrão EDS */}
<Home strokeWidth={2.5} />
<Home strokeWidth={3} />    {/* grosso */}`,
      },
    },
  },
  render: () => {
    const weights = [1, 1.5, 2, 2.5, 3];
    const icons = [
      LucideIcons.Home,
      LucideIcons.Settings,
      LucideIcons.User,
      LucideIcons.Bell,
      LucideIcons.Search,
    ];
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-4)" }}>
        {weights.map((w) => (
          <div
            key={w}
            style={{ display: "flex", alignItems: "center", gap: "var(--spacing-4)" }}
          >
            <code
              style={{
                width: "90px",
                fontSize: "var(--text-xs)",
                color: w === 2 ? "var(--color-action-primary)" : "var(--color-text-secondary)",
                fontWeight: w === 2 ? 700 : 400,
              }}
            >
              {w}{w === 2 ? " ★" : ""}
            </code>
            {icons.map((Icon, i) => (
              <Icon key={i} size={24} strokeWidth={w} color="var(--color-text-primary)" />
            ))}
          </div>
        ))}
      </div>
    );
  },
};

// ─── ColorTokens ──────────────────────────────────────────────────────────────
/** Use sempre tokens semânticos em vez de cores fixas para garantir suporte ao modo escuro. */
export const ColorTokens: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Zap, CheckCircle2, AlertTriangle, XCircle, AlertCircle } from "lucide-react";

// ✅ Correto — usa token semântico (funciona em dark mode)
<Zap color="var(--color-action-primary)" />
<CheckCircle2 color="var(--color-success-default)" />
<AlertTriangle color="var(--color-warning-default)" />
<XCircle color="var(--color-danger-default)" />
<AlertCircle color="var(--color-info-default)" />

// ❌ Evitar — cor hardcoded quebra no dark mode
<Zap color="#f58220" />`,
      },
    },
  },
  render: () => {
    const tokens = [
      { name: "action-primary",   cssVar: "--color-action-primary",   icon: LucideIcons.Zap },
      { name: "action-secondary", cssVar: "--color-action-secondary", icon: LucideIcons.Star },
      { name: "text-primary",     cssVar: "--color-text-primary",     icon: LucideIcons.User },
      { name: "text-secondary",   cssVar: "--color-text-secondary",   icon: LucideIcons.Info },
      { name: "success-default",  cssVar: "--color-success-default",  icon: LucideIcons.CheckCircle2 },
      { name: "warning-default",  cssVar: "--color-warning-default",  icon: LucideIcons.AlertTriangle },
      { name: "danger-default",   cssVar: "--color-danger-default",   icon: LucideIcons.XCircle },
      { name: "info-default",     cssVar: "--color-info-default",     icon: LucideIcons.AlertCircle },
    ];
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "var(--spacing-3)",
        }}
      >
        {tokens.map(({ name, cssVar, icon: Icon }) => (
          <div
            key={name}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--spacing-3)",
              padding: "var(--spacing-3)",
              border: "1px solid var(--color-border-default)",
              borderRadius: "var(--radius-sm)",
            }}
          >
            <Icon size={24} color={`var(${cssVar})`} />
            <div>
              <div
                style={{
                  fontSize: "var(--text-xs)",
                  fontWeight: 600,
                  color: "var(--color-text-primary)",
                }}
              >
                {name}
              </div>
              <code style={{ fontSize: "10px", color: "var(--color-text-muted)" }}>
                {cssVar}
              </code>
            </div>
          </div>
        ))}
      </div>
    );
  },
};

// ─── WithComponents ───────────────────────────────────────────────────────────
/** Ícones compostos com o componente Button — padrão mais comum de uso no EDS. */
export const WithComponents: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { Save, Download, Trash2, ChevronRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

{/* Ícone à esquerda */}
<Button leftIcon={<Save />}>Salvar</Button>
<Button leftIcon={<Download />} variant="secondary">Exportar</Button>

{/* Ícone à direita */}
<Button rightIcon={<ChevronRight />}>Próximo</Button>

{/* Somente ícone (IconButton) */}
<Button size="icon" variant="primary" aria-label="Adicionar">
  <Plus />
</Button>
<Button size="icon" variant="danger" aria-label="Excluir">
  <Trash2 />
</Button>`,
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-6)" }}>
      <div>
        <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-secondary)", marginBottom: "var(--spacing-3)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>
          Ícone à esquerda
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--spacing-3)" }}>
          <Button leftIcon={<LucideIcons.Save size={16} />}>Salvar</Button>
          <Button leftIcon={<LucideIcons.Download size={16} />} variant="secondary">Exportar</Button>
          <Button leftIcon={<LucideIcons.Plus size={16} />} variant="tertiary">Adicionar</Button>
        </div>
      </div>

      <div>
        <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-secondary)", marginBottom: "var(--spacing-3)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>
          Ícone à direita
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--spacing-3)" }}>
          <Button rightIcon={<LucideIcons.ChevronRight size={16} />}>Próximo</Button>
          <Button rightIcon={<LucideIcons.ExternalLink size={16} />} variant="ghost">Abrir link</Button>
        </div>
      </div>

      <div>
        <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-secondary)", marginBottom: "var(--spacing-3)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>
          Somente ícone (Icon Button)
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--spacing-3)" }}>
          <Button size="icon" variant="primary" aria-label="Adicionar"><LucideIcons.Plus /></Button>
          <Button size="icon" variant="secondary" aria-label="Editar"><LucideIcons.Edit /></Button>
          <Button size="icon" variant="tertiary" aria-label="Configurações"><LucideIcons.Settings /></Button>
          <Button size="icon" variant="ghost" aria-label="Mais opções"><LucideIcons.MoreVertical /></Button>
          <Button size="icon" variant="destructive" aria-label="Excluir"><LucideIcons.Trash2 /></Button>
        </div>
      </div>
    </div>
  ),
};
