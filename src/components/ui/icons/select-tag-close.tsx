import * as React from "react";

/**
 * Close (X) do Select / Multi Value Tag (Figma node "Close", instância de
 * 2686:3489) — viewBox 11.5×11.5, stroke-width 1.5, quase corner-to-corner
 * (inset ~6.5%). Geometria diferente do "X" da lucide-react (inset ~25%,
 * mais recolhido) — por isso um ícone dedicado.
 */
function SelectTagCloseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 11.5 11.5" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M0.75 0.75L10.75 10.75M10.75 0.75L0.75 10.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export { SelectTagCloseIcon };
