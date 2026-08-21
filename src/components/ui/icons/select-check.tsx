import * as React from "react";

/**
 * Select / Check Icon (Figma node 2705:3118/2705:3117) — checkmark exato
 * exibido à direita do Select/Item quando `Selected`, viewBox 12×9,
 * stroke-width 1.5. Geometria diferente do `CheckIcon` do Menu (14×11,
 * stroke-width 2) — não é o mesmo asset, por isso um componente dedicado.
 */
function SelectCheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M0.75 4.75L4.25 7.75L10.75 0.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export { SelectCheckIcon };
