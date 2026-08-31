import * as React from "react";

/**
 * CaretLeft — ícone Phosphor (Figma: PaginationItem, node 2971:139,
 * variantes Type=Previous), ausente na lucide-react com esta geometria
 * (o ChevronLeft do lucide é stroke-based, formato em V — diferente do
 * path preenchido do Phosphor). Path/viewBox extraídos diretamente do
 * asset exportado pelo Figma MCP.
 */
function CaretLeftIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fill="currentColor"
        d="M10.265 12.735C10.3018 12.7693 10.3314 12.8107 10.3519 12.8567C10.3724 12.9027 10.3834 12.9524 10.3843 13.0027C10.3852 13.0531 10.3759 13.1031 10.3571 13.1498C10.3382 13.1965 10.3101 13.2389 10.2745 13.2745C10.2389 13.3101 10.1965 13.3382 10.1498 13.3571C10.1031 13.3759 10.0531 13.3852 10.0027 13.3843C9.95239 13.3834 9.90273 13.3724 9.85673 13.3519C9.81073 13.3314 9.76933 13.3018 9.735 13.265L4.735 8.265C4.66477 8.19469 4.62533 8.09938 4.62533 8C4.62533 7.90062 4.66477 7.80531 4.735 7.735L9.735 2.735C9.80609 2.66876 9.90011 2.6327 9.99726 2.63441C10.0944 2.63613 10.1871 2.67548 10.2558 2.74419C10.3245 2.8129 10.3639 2.90559 10.3656 3.00274C10.3673 3.09989 10.3312 3.19391 10.265 3.265L5.53062 8L10.265 12.735Z"
      />
    </svg>
  );
}

export { CaretLeftIcon };
