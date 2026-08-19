import type { Meta, StoryObj } from "@storybook/react";
import { ShowcaseSection } from "./_internal/ShowcaseSection";

const meta: Meta = {
  title: "Foundations/Typography",
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj;

const sizeScale = [
  { token: "--text-xs", label: "xs · 12px" },
  { token: "--text-sm", label: "sm · 14px" },
  { token: "--text-base", label: "base · 16px" },
  { token: "--text-lg", label: "lg · 18px" },
  { token: "--text-xl", label: "xl · 20px" },
  { token: "--text-2xl", label: "2xl · 24px" },
  { token: "--text-3xl", label: "3xl · 32px" },
  { token: "--text-4xl", label: "4xl · 40px" },
  { token: "--text-5xl", label: "5xl · 48px" },
];

const weightScale = [
  { token: "--font-weight-normal", label: "Normal · 400" },
  { token: "--font-weight-medium", label: "Medium · 500" },
  { token: "--font-weight-semibold", label: "Semibold · 600" },
  { token: "--font-weight-bold", label: "Bold · 700" },
];

export const SizeScale: Story = {
  render: () => (
    <ShowcaseSection title="Size Scale" description="Escala de tamanhos tipográficos do sistema.">
      <div className="flex flex-col gap-4">
        {sizeScale.map((s) => (
          <div key={s.token} className="flex items-baseline gap-6">
            <code className="w-32 shrink-0 text-xs text-[var(--color-text-secondary)]">
              {s.label}
            </code>
            <span
              style={{ fontSize: `var(${s.token})`, fontFamily: "var(--font-sans)" }}
              className="text-[var(--color-text-primary)]"
            >
              Energisa Design System
            </span>
          </div>
        ))}
      </div>
    </ShowcaseSection>
  ),
};

export const WeightScale: Story = {
  render: () => (
    <ShowcaseSection title="Weight Scale" description="Escala de pesos disponíveis.">
      <div className="flex flex-col gap-4">
        {weightScale.map((w) => (
          <div key={w.token} className="flex items-baseline gap-6">
            <code className="w-40 shrink-0 text-xs text-[var(--color-text-secondary)]">
              {w.label}
            </code>
            <span
              style={{
                fontWeight: `var(${w.token})`,
                fontFamily: "var(--font-sans)",
                fontSize: "var(--text-xl)",
              }}
              className="text-[var(--color-text-primary)]"
            >
              Energisa Design System
            </span>
          </div>
        ))}
      </div>
    </ShowcaseSection>
  ),
};

export const Families: Story = {
  render: () => (
    <ShowcaseSection title="Font Families" description="Famílias tipográficas do sistema.">
      <div className="flex flex-col gap-6">
        <div>
          <code className="text-xs text-[var(--color-text-secondary)]">--font-sans (Inter)</code>
          <p
            style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-xl)" }}
            className="mt-1 text-[var(--color-text-primary)]"
          >
            Energia que conecta pessoas, operações e experiências.
          </p>
        </div>
        <div>
          <code className="text-xs text-[var(--color-text-secondary)]">
            --font-mono (Roboto Mono)
          </code>
          <p
            style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-lg)" }}
            className="mt-1 text-[var(--color-text-primary)]"
          >
            color/primitive/orange/500
          </p>
        </div>
      </div>
    </ShowcaseSection>
  ),
};
