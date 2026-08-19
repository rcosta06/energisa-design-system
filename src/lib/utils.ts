import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combina classes Tailwind com merge inteligente de conflitos.
 * Padrão shadcn/ui — usado em todos os componentes do Design System.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
