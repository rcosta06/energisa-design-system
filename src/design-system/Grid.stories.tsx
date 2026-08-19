import type { Meta, StoryObj } from "@storybook/react";
import { ShowcaseSection } from "./_internal/ShowcaseSection";

const meta: Meta = {
  title: "Foundations/Grid",
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj;

const breakpoints = [
  {
    name: "Tablet",
    width: "var(--grid-tablet-width)",
    columns: "var(--grid-tablet-columns)",
    columnsLabel: "8",
    gutter: "var(--grid-tablet-gutter)",
    gutterLabel: "20px",
    margin: "var(--grid-tablet-margin)",
    marginLabel: "48px",
  },
  {
    name: "Desktop",
    width: "var(--grid-desktop-width)",
    columns: "var(--grid-desktop-columns)",
    columnsLabel: "12",
    gutter: "var(--grid-desktop-gutter)",
    gutterLabel: "24px",
    margin: "var(--grid-desktop-margin)",
    marginLabel: "80px",
  },
];

function GridPreview({ bp }: { bp: (typeof breakpoints)[number] }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between">
        <span className="text-sm font-medium text-[var(--color-text-primary)]">{bp.name}</span>
        <code className="text-xs text-[var(--color-text-secondary)]">
          {bp.columnsLabel} colunas · gutter {bp.gutterLabel} · margin {bp.marginLabel}
        </code>
      </div>
      <div
        className="overflow-hidden border border-[var(--color-border-strong)] bg-[var(--color-surface-primary)]"
        style={{ maxWidth: bp.width }}
      >
        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${bp.columnsLabel}, 1fr)`,
            gap: bp.gutter,
            paddingInline: bp.margin,
            paddingBlock: "var(--spacing-6)",
          }}
        >
          {Array.from({ length: Number(bp.columnsLabel) }).map((_, i) => (
            <div key={i} className="h-24 bg-[var(--color-danger-default)]/10" />
          ))}
        </div>
      </div>
    </div>
  );
}

export const Breakpoints: Story = {
  render: () => (
    <ShowcaseSection
      title="Grid"
      description="Sistema de colunas responsivo extraído dos layout grids do Figma. Usar via classe utilitária .ds-grid (src/styles/tokens.css), que alterna automaticamente entre os breakpoints abaixo."
    >
      <div className="flex flex-col gap-8">
        {breakpoints.map((bp) => (
          <GridPreview key={bp.name} bp={bp} />
        ))}
      </div>
    </ShowcaseSection>
  ),
};
