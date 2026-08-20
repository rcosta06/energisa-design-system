import * as React from "react";

/**
 * BrandMark — logotipo exato do Figma (Navigation/Sidebar → "Brand Icon",
 * node 2654:3636), 3 vectors brancos sobre o quadrado laranja (`--color-action-primary`,
 * confirmado via Plugin API), viewBox 28×28 para caber no container
 * `size-7 rounded-[var(--radius-sm)]`. Fill sempre branco — não é um ícone
 * monocromático de currentColor, é a marca em si sobre o fundo colorido.
 */
function BrandMarkIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g transform="translate(3, 0)">
        <path
          transform="translate(1.6405671834945679, 0)"
          d="M11.9266 0.00349973C5.46006 0.00349973 0 0.00349973 0 0.00349973C0 0.00349973 13.6764 4.41101 7.72433 13.3637C7.72433 13.3637 17.8393 6.42926 11.9266 0"
          fill="white"
        />
        <path
          transform="translate(2.2968380451202393, 8.272553443908691)"
          d="M7.39263 0C0.571334 2.69321 -5.23588 9.74667 7.70376 19.7274H18.7032C18.7032 19.7274 -3.47177 7.20453 7.39263 0.00114572"
          fill="white"
        />
        <path
          transform="translate(0, 17.500001907348633)"
          d="M0.640463 0C0.640463 0 -1.36445 5.04709 1.7203 10.5H9.1875C5.46226 8.84966 0.48688 4.24121 0.640463 0.00113821"
          fill="white"
        />
      </g>
    </svg>
  );
}

export { BrandMarkIcon };
