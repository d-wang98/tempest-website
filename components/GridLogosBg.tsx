"use client";
import { useEffect, useRef } from "react";

const LOGO_PIXELS = [
  { x: 0, y: 0, fill: "#2DAAFF" },
  { x: 1, y: 0, fill: "#2DAAFF" },
  { x: 2, y: 0, fill: "#55DCFF" },
  { x: 1, y: 1, fill: "#0073FF" },
  { x: 2, y: 1, fill: "#2DAAFF" },
  { x: 3, y: 1, fill: "#2DAAFF" },
  { x: 1, y: 2, fill: "#55DCFF" },
  { x: 2, y: 2, fill: "#2DAAFF" },
  { x: 2, y: 3, fill: "#2DAAFF" },
];

const COLS = 14;
const ROWS = 8;
const MARK_SIZE = 36;
const GAP_X = 140;
const GAP_Y = 120;
const BASE_OPACITY = 0.13;
const INFLUENCE_RADIUS = 320;

export function GridLogosBg() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const lerpRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);

  const marks = Array.from({ length: ROWS * COLS }, (_, i) => ({
    col: i % COLS,
    row: Math.floor(i / COLS),
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
      container.querySelectorAll<SVGSVGElement>("[data-grid-mark]")
    );

    const tick = () => {
      const L = lerpRef.current;
      const M = mouseRef.current;
      L.x += (M.x - L.x) * 0.07;
      L.y += (M.y - L.y) * 0.07;

      const W = container.offsetWidth;
      const H = container.offsetHeight;
      const offsetX = W / 2 - ((COLS - 1) * GAP_X) / 2;
      const offsetY = H / 2 - ((ROWS - 1) * GAP_Y) / 2;

      for (const el of els) {
        const col = parseInt(el.dataset.col ?? "0");
        const row = parseInt(el.dataset.row ?? "0");
        const cx = offsetX + col * GAP_X;
        const cy = offsetY + row * GAP_Y;

        const dx = L.x - cx;
        const dy = L.y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const influence = Math.max(0, 1 - dist / INFLUENCE_RADIUS);

        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        const opacity = BASE_OPACITY + influence * 0.2;

        el.style.transform = `rotate(${influence > 0.05 ? angle * 0.25 : 0}deg) scale(${1 + influence * 0.18})`;
        el.style.opacity = String(opacity);
        // Update position each tick so it's correct after resize
        el.style.left = `${cx - MARK_SIZE / 2}px`;
        el.style.top = `${cy - MARK_SIZE / 2}px`;
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
      {marks.map(({ col, row }) => (
        <svg
          key={`${col}-${row}`}
          data-grid-mark=""
          data-col={col}
          data-row={row}
          width={MARK_SIZE}
          height={MARK_SIZE}
          viewBox="0 0 4 4"
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            opacity: 0.13,
            willChange: "transform, opacity",
            transformOrigin: "center center",
          }}
        >
          {LOGO_PIXELS.map((p, i) => (
            <rect
              key={i}
              x={p.x + 0.06}
              y={p.y + 0.06}
              width="0.82"
              height="0.82"
              fill={p.fill}
              rx="0.1"
            />
          ))}
        </svg>
      ))}
    </div>
  );
}
