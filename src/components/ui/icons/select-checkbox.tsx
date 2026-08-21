import * as React from "react";

/**
 * Checkbox marcado do Select / Checkbox Item (Figma node "Checkbox",
 * 2698:3390) — quadrado laranja preenchido (`--color-action-primary`) com
 * checkmark branco, viewBox 14×14, radius 2.25 (~16%). Não usa
 * `currentColor`: as duas cores (fundo e check) são fixas por design, como
 * no Figma — o estado "unchecked" não usa este ícone, é só uma borda
 * (`border-default`), renderizada direto no `SelectCheckboxItem`.
 */
function SelectCheckboxCheckedIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect x="0.75" y="0.75" width="12.5" height="12.5" rx="2.25" fill="var(--color-action-primary)" />
      <rect x="0.75" y="0.75" width="12.5" height="12.5" rx="2.25" stroke="var(--color-action-primary)" strokeWidth="1.5" />
      <path
        d="M3 6.76923L5.8 10L11 4"
        stroke="var(--color-icon-on-action)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export { SelectCheckboxCheckedIcon };
