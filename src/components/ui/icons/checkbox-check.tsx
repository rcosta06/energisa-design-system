import * as React from "react";

/**
 * CheckboxCheck — glifo exato do "Control" checked do Form/Checkbox (Figma
 * node 3020:25988), viewBox 16×16 (mesmo tamanho do controle, sem crop),
 * stroke-width 1.5. Geometria diferente de `CheckIcon` (Menu, 14×11,
 * stroke-width 2) e `SelectCheckIcon` (Select, 12×9, stroke-width 1.5) —
 * não é o mesmo asset, por isso um componente dedicado.
 */
function CheckboxCheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M3 8.5L6.5 12L13 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export { CheckboxCheckIcon };
