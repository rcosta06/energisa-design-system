import * as React from "react";

/**
 * BoltIcon — ícone Phosphor central do Loading/Circular (Figma node 2775:23642,
 * layer "Bolt Icon"), ausente na lucide-react (geometria diferente do "Zap").
 * Path e viewBox (recortado ao bounding box do glifo) extraídos diretamente do
 * asset exportado pelo Figma MCP — não substituir por um ícone "parecido".
 */
function BoltIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="32.25 22.0759 32 53.8482" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M57.1249 22.0759L45.4914 35.9793L32.25 52.0897H45.4914L38.65 75.9241L64.25 43.4828H51.2293L57.1249 22.0759Z" />
    </svg>
  );
}

export { BoltIcon };
