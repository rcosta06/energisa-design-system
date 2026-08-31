import * as React from "react";

/**
 * CaretRight — ícone Phosphor (Figma: PaginationItem, node 2971:139,
 * variantes Type=Next), ausente na lucide-react com esta geometria
 * (o ChevronRight do lucide é stroke-based, formato em V — diferente do
 * path preenchido do Phosphor). Path/viewBox extraídos diretamente do
 * asset exportado pelo Figma MCP.
 */
function CaretRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fill="currentColor"
        d="M11.265 8.265L6.265 13.265C6.19391 13.3312 6.09989 13.3673 6.00274 13.3656C5.90559 13.3639 5.8129 13.3245 5.74419 13.2558C5.67548 13.1871 5.63613 13.0944 5.63441 12.9973C5.6327 12.9001 5.66876 12.8061 5.735 12.735L10.4694 8L5.735 3.265C5.66876 3.19391 5.6327 3.09989 5.63441 3.00274C5.63613 2.90559 5.67548 2.8129 5.74419 2.74419C5.8129 2.67548 5.90559 2.63613 6.00274 2.63441C6.09989 2.6327 6.19391 2.66876 6.265 2.735L11.265 7.735C11.3352 7.80531 11.3747 7.90062 11.3747 8C11.3747 8.09938 11.3352 8.19469 11.265 8.265Z"
      />
    </svg>
  );
}

export { CaretRightIcon };
