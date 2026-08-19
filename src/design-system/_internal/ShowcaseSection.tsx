import * as React from "react";

interface ShowcaseSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function ShowcaseSection({ title, description, children }: ShowcaseSectionProps) {
  return (
    <section className="mb-10">
      <div className="mb-4 border-b border-[var(--color-border-default)] pb-2">
        <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">{title}</h2>
        {description && (
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{description}</p>
        )}
      </div>
      {children}
    </section>
  );
}
