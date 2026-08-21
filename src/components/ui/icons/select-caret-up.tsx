import * as React from "react";

/**
 * CaretUp — Select Trigger no state Open/Focus (Figma: Select / Field, node
 * 2695:3602), stroke-based, viewBox 16×16, stroke-width 1.5. Path exportado
 * diretamente via Plugin API.
 */
function SelectCaretUpIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M3 10.5L8 5.5L13 10.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export { SelectCaretUpIcon };
