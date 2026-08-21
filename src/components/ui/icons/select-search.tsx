import * as React from "react";

/**
 * SearchIcon do Select / Search (Figma node 2686:3486) — stroke-based
 * (círculo + cabo), viewBox 16×16, stroke-width 1.5. Geometria diferente do
 * `MagnifyingGlassIcon` (Phosphor, preenchido, viewBox 19.139) já usado no
 * NavigationSearch — não é o mesmo asset.
 */
function SelectSearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M1 6.5C1 3.462 3.462 1 6.5 1C9.538 1 12 3.462 12 6.5C12 9.538 9.538 12 6.5 12C3.462 12 1 9.538 1 6.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M10.5 10.5L14.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export { SelectSearchIcon };
