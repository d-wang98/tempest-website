"use client";
import { useEffect, useRef } from "react";

const COLORS = [
  "#0073FF", "#2DAAFF", "#2DAAFF", "#55DCFF",
  "#2DAAFF", "#0073FF", "#55DCFF", "#2DAAFF",
];

const COLS = 34;
const ROWS = 14;
const DOT = 5;
const GAP_X = 58;
const GAP_Y = 70;
const BASE_AMPLITUDE = 14;
const MOUSE_AMPLITUDE = 22;
const FREQUENCY = 0.38;      // wave cycles per row
const SPEED = 0.0008;        // phase advance per ms
const ROW_PHASE_OFFSET = 0.6; // phase shift between rows (stagger)

export function SineWaveBg() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseYRef = useRef(0.5); // 0–1, normalised
  const lerpMouseY = useRef(0.5);
  const rafRef = useRef<number>(0);

  const dots = Array.from({ length: ROWS * COLS }, (_, i) => ({
    col: i % COLS,
    row: Math.floor(i / COLS),
    fill: COLORS[(Math.floor(i / COLS) * 3 + (i % COLS)) % COLORS.length],
  }));

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onMove = (e: MouseEvent) => {
      const r = container.getBoundingClientRect();
      mouseYRef.current = Math.max(0, Math.min(1, (e.clientY - r.top) / r.height));
    };

    const els = Array.from(
      container.querySelectorAll<HTMLDivElement>("[data-wave-dot]")
    );

    let startTime: number | null = null;

    const tick = (ts: number) => {
      if (!startTime) startTime = ts;
      const elapsed = ts - startTime;

      // Lerp mouse
      lerpMouseY.current += (mouseYRef.current - lerpMouseY.current) * 0.05;
      const amplitude = BASE_AMPLITUDE + lerpMouseY.current * MOUSE_AMPLITUDE;

      const W = container.offsetWidth;
      const H = container.offsetHeight;
      const offsetX = W / 2 - ((COLS - 1) * GAP_X) / 2;
      const offsetY = H / 2 - ((ROWS - 1) * GAP_Y) / 2;
      const phase = elapsed * SPEED;

      for (const el of els) {
        const col = parseInt(el.dataset.col ?? "0");
        const row = parseInt(el.dataset.row ?? "0");

        const x = offsetX + col * GAP_X;
        const baseY = offsetY + row * GAP_Y;
        const wave = amplitude * Math.sin(col * FREQUENCY + phase + row * ROW_PHASE_OFFSET);
        const y = baseY + wave;

        // Opacity pulses subtly with the wave position
        const waveFraction = (Math.sin(col * FREQUENCY + phase + row * ROW_PHASE_OFFSET) + 1) / 2;
        const opacity = 0.13 + waveFraction * 0.2;

        el.style.left = `${x - DOT / 2}px`;
        el.style.top = `${y - DOT / 2}px`;
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
      {dots.map(({ col, row, fill }) => (
        <div
          key={`${col}-${row}`}
          data-wave-dot=""
          data-col={col}
          data-row={row}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: DOT,
            height: DOT,
            borderRadius: 1,
            background: fill,
            opacity: 0.13,
            willChange: "transform, opacity",
          }}
        />
      ))}
    </div>
  );
}
