import * as React from "react";

/**
 * Check — glifo exato do "Selected Indicator" do Figma (Menu / Item, node
 * 2627:2623), viewBox 14×11 (não 24×24) e stroke em vez de fill — geometria
 * própria, diferente do `Check` da lucide-react. Path exportado diretamente
 * via Plugin API (`node.exportAsync({ format: "SVG_STRING" })`).
 */
function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M1 6.00001L5 10L13 1.00001"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export { CheckIcon };
