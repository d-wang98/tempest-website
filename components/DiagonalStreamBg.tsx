"use client";
import { useEffect, useRef } from "react";

const COLORS = ["#0073FF", "#2DAAFF", "#2DAAFF", "#55DCFF", "#2DAAFF", "#0073FF", "#55DCFF"];

const NUM_STREAMS = 28;
const DOT_SPACING = 52;   // px between dots in a stream
const DOT_SIZE = 5;
const BASE_SPEED = 0.6;   // px per frame
const LEAN = 0.45;        // horizontal drift per vertical px (base diagonal angle)
const MOUSE_LEAN = 0.3;   // extra lean added by mouse X (-0.5..0.5)
const BASE_OPACITY = 0.15;

interface Stream {
  x: number;       // base x position (0..1 normalised)
  speed: number;   // px per frame
  phase: number;   // initial y offset so streams stagger
  opacity: number;
  color: string;
  dotSpacing: number;
}

function makeStreams(seed: number): Stream[] {
  let s = seed >>> 0;
  const rand = () => {
    s = Math.imul(s, 1664525) + 1013904223;
    return (s >>> 0) / 0xffffffff;
  };
  return Array.from({ length: NUM_STREAMS }, (_, i) => ({
    x: (i + 0.5) / NUM_STREAMS + (rand() - 0.5) * 0.025,
    speed: BASE_SPEED * (0.5 + rand() * 1.1),
    phase: rand() * 1000,
    opacity: BASE_OPACITY + rand() * 0.12,
    color: COLORS[Math.floor(rand() * COLORS.length)],
    dotSpacing: DOT_SPACING * (0.8 + rand() * 0.6),
  }));
}

const STREAMS = makeStreams(77);

export function DiagonalStreamBg() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseXRef = useRef(0.5);
  const lerpMouseX = useRef(0.5);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const onMove = (e: MouseEvent) => {
      const r = container.getBoundingClientRect();
      mouseXRef.current = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    let frame = 0;

    const tick = () => {
      frame++;
      lerpMouseX.current += (mouseXRef.current - lerpMouseX.current) * 0.04;

      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      const aspectScale = W > 0 && H > 0 ? Math.min(1, W / H) : 1;
      const totalLean = (LEAN + (lerpMouseX.current - 0.5) * MOUSE_LEAN * 2) * aspectScale;

      const drift = H * totalLean;
      for (const stream of STREAMS) {
        const baseX = stream.x * (W + drift) - drift;
        // How many dots fit vertically (plus overflow on both ends)
        const dotsPerStream = Math.ceil(H / stream.dotSpacing) + 4;
        const travel = (frame * stream.speed + stream.phase) % stream.dotSpacing;

        ctx.globalAlpha = stream.opacity;
        ctx.fillStyle = stream.color;

        for (let d = -2; d < dotsPerStream; d++) {
          const y = d * stream.dotSpacing + travel;
          // Diagonal offset: lean * y
          const x = baseX + y * totalLean;
          if (x < -DOT_SIZE || x > W + DOT_SIZE) continue;
          ctx.fillRect(x - DOT_SIZE / 2, y - DOT_SIZE / 2, DOT_SIZE, DOT_SIZE);
        }
      }

      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      ro.disconnect();
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
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
