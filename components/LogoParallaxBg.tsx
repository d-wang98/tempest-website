"use client";
import { useEffect, useRef, useMemo } from "react";

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

// Deterministic LCG so SSR and client produce the same layout
function makeRand(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = Math.imul(s, 1664525) + 1013904223;
    return (s >>> 0) / 0xffffffff;
  };
}

function shuffle<T>(arr: T[], rand: () => number): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function LogoParallaxBg({
  count = 14,
  seed = 1,
  minOpacity = 0.045,
  maxOpacity = 0.13,
  dark = false,
}: {
  count?: number;
  seed?: number;
  minOpacity?: number;
  maxOpacity?: number;
  dark?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const lerpRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  const clusters = useMemo(() => {
    const rand = makeRand(seed);
    return Array.from({ length: count }, (_, i) => {
      const pixelCount = Math.floor(rand() * 5) + 3; // 3–7 pixels
      const pixels = shuffle(LOGO_PIXELS, rand).slice(0, pixelCount);
      return {
        id: i,
        cx: rand() * 88 + 6,        // % from left
        cy: rand() * 76 + 12,       // % from top
        size: rand() * 52 + 24,     // px width/height of SVG
        depth: rand() * 0.055 + 0.015,
        opacity: rand() * (maxOpacity - minOpacity) + minOpacity,
        rotation: rand() * 34 - 17,
        pixels,
      };
    });
  }, [count, seed, minOpacity, maxOpacity]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onMove = (e: MouseEvent) => {
      const r = container.getBoundingClientRect();
      mouseRef.current.x = (e.clientX - r.left - r.width * 0.5) / r.width;
      mouseRef.current.y = (e.clientY - r.top - r.height * 0.5) / r.height;
    };

    const els = Array.from(
      container.querySelectorAll<SVGSVGElement>("[data-parallax-cluster]")
    );

    const tick = () => {
      const L = lerpRef.current;
      const M = mouseRef.current;
      L.x += (M.x - L.x) * 0.055;
      L.y += (M.y - L.y) * 0.055;

      for (const el of els) {
        const depth = parseFloat(el.dataset.depth ?? "0.03");
        const rot = parseFloat(el.dataset.rot ?? "0");
        const dx = L.x * depth * 260;
        const dy = L.y * depth * 260;
        el.style.transform = `translate(${dx}px,${dy}px) rotate(${rot}deg)`;
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
      {clusters.map((c) => (
        <svg
          key={c.id}
          data-parallax-cluster={c.id}
          data-depth={c.depth}
          data-rot={c.rotation}
          width={c.size}
          height={c.size}
          viewBox="0 0 4 4"
          style={{
            position: "absolute",
            left: `${c.cx}%`,
            top: `${c.cy}%`,
            opacity: dark ? c.opacity * 1.6 : c.opacity,
            willChange: "transform",
            transform: `rotate(${c.rotation}deg)`,
          }}
        >
          {c.pixels.map((p, i) => (
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
