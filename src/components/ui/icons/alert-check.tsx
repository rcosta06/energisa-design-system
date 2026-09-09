import * as React from "react";

/**
 * Check — ícone Phosphor (Figma: Icones/Property 1=Check, usado pelo
 * Alert/Toast type="success"), variante 24×24 preenchida, viewBox próprio.
 * Nome do arquivo prefixado (`alert-check`) porque `check.tsx`/`CheckIcon`
 * já existe no projeto para um glifo DIFERENTE (Menu "Selected Indicator",
 * 14×11, stroke-based) — mesmo padrão de desambiguação já usado em
 * `select-check.tsx` para outro "Check" de contexto distinto. Path e viewBox
 * extraídos diretamente do asset exportado pelo Figma MCP.
 */
function AlertCheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M21.3975 7.1475L9.3975 19.1475C9.29203 19.2528 9.14906 19.312 9 19.312C8.85094 19.312 8.70797 19.2528 8.6025 19.1475L3.3525 13.8975C3.25314 13.7909 3.19905 13.6498 3.20162 13.5041C3.20419 13.3584 3.26322 13.2193 3.36628 13.1163C3.46934 13.0132 3.60838 12.9542 3.75411 12.9516C3.89983 12.949 4.04087 13.0031 4.1475 13.1025L9 17.9541L20.6025 6.3525C20.7091 6.25314 20.8502 6.19905 20.9959 6.20162C21.1416 6.20419 21.2807 6.26322 21.3837 6.36628C21.4868 6.46934 21.5458 6.60838 21.5484 6.75411C21.551 6.89983 21.4969 7.04087 21.3975 7.1475Z" />
    </svg>
  );
}

export { AlertCheckIcon };
