import * as React from "react";

/**
 * CaretDown — Select Trigger (Figma: Select / Field, node 2695:3566),
 * stroke-based (diferente do CaretDown preenchido usado no NavigationAvatar,
 * node 2231:1439) — viewBox 16×16, stroke-width 1.5. Path exportado
 * diretamente via Plugin API.
 */
function SelectCaretDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M3 5.5L8 10.5L13 5.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export { SelectCaretDownIcon };
