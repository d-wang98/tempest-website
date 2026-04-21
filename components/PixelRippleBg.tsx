"use client";
import { useEffect, useRef } from "react";

// Brand color palette for the dot field
const COLORS = ["#0073FF", "#2DAAFF", "#2DAAFF", "#55DCFF", "#2DAAFF", "#0073FF"];

const COLS = 38;
const ROWS = 22;
const DOT = 5;
const GAP_X = 52;
const GAP_Y = 46;
const BASE_OPACITY = 0.14;
const RIPPLE_RADIUS = 200;

export function PixelRippleBg() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const lerpRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);

  const dots = Array.from({ length: ROWS * COLS }, (_, i) => ({
    col: i % COLS,
    row: Math.floor(i / COLS),
    // Color cycles diagonally for a subtle pattern
    fill: COLORS[(Math.floor(i / COLS) + (i % COLS)) % COLORS.length],
  }));

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onMove = (e: MouseEvent) => {
      const r = container.getBoundingClientRect();
      mouseRef.current.x = e.clientX - r.left;
      mouseRef.current.y = e.clientY - r.top;
    };

    const els = Array.from(
      container.querySelectorAll<HTMLDivElement>("[data-ripple-dot]")
    );

    const tick = () => {
      const L = lerpRef.current;
      const M = mouseRef.current;
      L.x += (M.x - L.x) * 0.08;
      L.y += (M.y - L.y) * 0.08;

      const W = container.offsetWidth;
      const H = container.offsetHeight;
      const offsetX = (W - (COLS - 1) * GAP_X) / 2;
      const offsetY = (H - (ROWS - 1) * GAP_Y) / 2;

      for (const el of els) {
        const col = parseInt(el.dataset.col ?? "0");
        const row = parseInt(el.dataset.row ?? "0");
        const cx = offsetX + col * GAP_X;
        const cy = offsetY + row * GAP_Y;

        const dx = L.x - cx;
        const dy = L.y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const influence = Math.max(0, 1 - dist / RIPPLE_RADIUS);
        const ease = influence * influence; // quadratic falloff

        const scale = 1 + ease * 2.8;
        const opacity = BASE_OPACITY + ease * 0.38;

        el.style.transform = `translate(-50%, -50%) scale(${scale})`;
        el.style.opacity = String(opacity);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {dots.map(({ col, row, fill }) => {
        // SSR-safe: use percentages for initial position
        const leftPct = `calc(50% + ${(col - (COLS - 1) / 2) * GAP_X}px)`;
        const topPct = `calc(50% + ${(row - (ROWS - 1) / 2) * GAP_Y}px)`;
        return (
          <div
            key={`${col}-${row}`}
            data-ripple-dot=""
            data-col={col}
            data-row={row}
            style={{
              position: "absolute",
              left: leftPct,
              top: topPct,
              width: DOT,
              height: DOT,
              borderRadius: 1,
              background: fill,
              opacity: 0.14,
              willChange: "transform, opacity",
              transform: "translate(-50%, -50%)",
            }}
          />
        );
      })}
    </div>
  );
}
