import type { Meta, StoryObj } from "@storybook/react";
import { ShowcaseSection } from "./_internal/ShowcaseSection";

const meta: Meta = {
  title: "Foundations/Colors",
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj;

interface Swatch {
  name: string;
  varName: string;
}

function ColorRow({ name, varName }: Swatch) {
  return (
    <div className="flex items-center gap-4 py-2">
      <div
        className="size-12 shrink-0 rounded-[var(--radius-sm)] border border-[var(--color-border-default)]"
        style={{ background: `var(${varName})` }}
      />
      <div>
        <div className="text-sm font-medium text-[var(--color-text-primary)]">{name}</div>
        <code className="text-xs text-[var(--color-text-secondary)]">{varName}</code>
      </div>
    </div>
  );
}

function ColorGroup({ title, swatches }: { title: string; swatches: Swatch[] }) {
  return (
    <ShowcaseSection title={title}>
      <div className="grid grid-cols-2 gap-x-8 md:grid-cols-3">
        {swatches.map((s) => (
          <ColorRow key={s.varName} {...s} />
        ))}
      </div>
    </ShowcaseSection>
  );
}

const primitives: Swatch[] = [
  { name: "orange-400", varName: "--color-primitive-orange-400" },
  { name: "orange-500", varName: "--color-primitive-orange-500" },
  { name: "orange-600", varName: "--color-primitive-orange-600" },
  { name: "purple-400", varName: "--color-primitive-purple-400" },
  { name: "purple-500", varName: "--color-primitive-purple-500" },
  { name: "magenta-300", varName: "--color-primitive-magenta-300" },
  { name: "magenta-500", varName: "--color-primitive-magenta-500" },
  { name: "green-400", varName: "--color-primitive-green-400" },
  { name: "green-500", varName: "--color-primitive-green-500" },
  { name: "red-400", varName: "--color-primitive-red-400" },
  { name: "red-500", varName: "--color-primitive-red-500" },
  { name: "red-600", varName: "--color-primitive-red-600" },
  { name: "blue-400", varName: "--color-primitive-blue-400" },
  { name: "blue-500", varName: "--color-primitive-blue-500" },
  { name: "neutral-0", varName: "--color-primitive-neutral-0" },
  { name: "neutral-100", varName: "--color-primitive-neutral-100" },
  { name: "neutral-300", varName: "--color-primitive-neutral-300" },
  { name: "neutral-600", varName: "--color-primitive-neutral-600" },
  { name: "neutral-800", varName: "--color-primitive-neutral-800" },
  { name: "neutral-900", varName: "--color-primitive-neutral-900" },
];

const semanticAction: Swatch[] = [
  { name: "action-primary", varName: "--color-action-primary" },
  { name: "action-primary-hover", varName: "--color-action-primary-hover" },
  { name: "action-primary-active", varName: "--color-action-primary-active" },
  { name: "action-secondary", varName: "--color-action-secondary" },
];

const semanticSurface: Swatch[] = [
  { name: "surface-primary", varName: "--color-surface-primary" },
  { name: "surface-secondary", varName: "--color-surface-secondary" },
  { name: "surface-tertiary", varName: "--color-surface-tertiary" },
  { name: "border-default", varName: "--color-border-default" },
  { name: "border-strong", varName: "--color-border-strong" },
];

const semanticFeedback: Swatch[] = [
  { name: "success-default", varName: "--color-success-default" },
  { name: "warning-default", varName: "--color-warning-default" },
  { name: "danger-default", varName: "--color-danger-default" },
  { name: "info-default", varName: "--color-info-default" },
];

export const Primitives: Story = {
  render: () => <ColorGroup title="Primitive" swatches={primitives} />,
};

export const Semantic: Story = {
  render: () => (
    <>
      <ColorGroup title="Action" swatches={semanticAction} />
      <ColorGroup title="Surface & Border" swatches={semanticSurface} />
      <ColorGroup title="Feedback" swatches={semanticFeedback} />
    </>
  ),
};

export const AllColors: Story = {
  render: () => (
    <>
      <ColorGroup title="Primitive" swatches={primitives} />
      <ColorGroup title="Action" swatches={semanticAction} />
      <ColorGroup title="Surface & Border" swatches={semanticSurface} />
      <ColorGroup title="Feedback" swatches={semanticFeedback} />
    </>
  ),
};
