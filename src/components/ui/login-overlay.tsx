import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * LoginOverlay — Energisa Design System (Figma: "Login Page - Anim 01..06",
 * node "Overlay" → "Gradient Fill", idêntico em todos os 6 frames).
 *
 * Gradiente `rgba(0,0,0,0)→rgba(0,0,0,0.1)→rgba(0,0,0,0.6)` da esquerda pra
 * direita (escurece o lado da foto onde a `EnergyAnimation` acontece, pro
 * feixe/glow terem contraste contra a paisagem). Não é uma Variable do
 * Figma (confirmado via `get_variable_defs` — nenhuma dessas rgba aparece
 * como token), então os valores são reproduzidos literalmente, sem inventar
 * um token novo pra um gradiente de uso único.
 */
function LoginOverlay({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 size-full", className)}
      style={{
        backgroundImage: "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.6) 100%)",
      }}
    />
  );
}

export { LoginOverlay };
