import type { Meta, StoryObj } from "@storybook/react";
import { ShowcaseSection } from "./_internal/ShowcaseSection";

const meta: Meta = {
  title: "Foundations/SpacingAndRadius",
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj;

const spacingScale = [
  "0", "1", "2", "3", "4", "5", "6", "8", "10", "12", "16", "20", "24",
];

const radiusScale = [
  { token: "none", label: "none · 0px" },
  { token: "xs", label: "xs · 4px" },
  { token: "sm", label: "sm · 8px" },
  { token: "md", label: "md · 12px" },
  { token: "lg", label: "lg · 16px" },
  { token: "xl", label: "xl · 20px" },
  { token: "2xl", label: "2xl · 28px" },
  { token: "3xl", label: "3xl · 36px" },
  { token: "full", label: "full · 999px" },
];

export const Spacing: Story = {
  render: () => (
    <ShowcaseSection title="Spacing Scale" description="Escala de espaçamento do sistema.">
      <div className="flex flex-col gap-3">
        {spacingScale.map((s) => (
          <div key={s} className="flex items-center gap-4">
            <code className="w-20 shrink-0 text-xs text-[var(--color-text-secondary)]">
              space-{s}
            </code>
            <div
              className="h-4 bg-[var(--color-action-primary)]"
              style={{ width: `var(--spacing-${s})` }}
            />
          </div>
        ))}
      </div>
    </ShowcaseSection>
  ),
};

export const Radius: Story = {
  render: () => (
    <ShowcaseSection title="Border Radius" description="Escala de arredondamentos disponíveis.">
      <div className="grid grid-cols-3 gap-6 sm:grid-cols-4">
        {radiusScale.map((r) => (
          <div key={r.token} className="flex flex-col items-center gap-2">
            <div
              className="size-16 border border-[var(--color-border-strong)] bg-[var(--color-surface-secondary)]"
              style={{ borderRadius: `var(--radius-${r.token})` }}
            />
            <code className="text-xs text-[var(--color-text-secondary)]">{r.label}</code>
          </div>
        ))}
      </div>
    </ShowcaseSection>
  ),
};
