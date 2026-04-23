"use client";
import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { LogoParallaxBg } from "./LogoParallaxBg";
import { GridLogosBg } from "./GridLogosBg";
import { PixelRippleBg } from "./PixelRippleBg";
import { SineWaveBg } from "./SineWaveBg";
import { DiagonalStreamBg } from "./DiagonalStreamBg";

type HeadingTag = "h1" | "h2" | "h3";
type BgVariant = "scatter" | "grid" | "ripple" | "wave" | "streams";

export function StickyReveal({
  text,
  as: Tag = "h2",
  className = "",
  dark = false,
  bg = "transparent",
  label,
  description,
  id,
  seed = 1,
  bgVariant = "scatter",
}: {
  text: string;
  as?: HeadingTag;
  className?: string;
  dark?: boolean;
  bg?: string;
  label?: string;
  description?: ReactNode;
  id?: string;
  seed?: number;
  bgVariant?: BgVariant;
}) {
  const outerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const outer = outerRef.current;
    const heading = headingRef.current;
    if (!outer || !heading) return;

    const spans = heading.querySelectorAll<HTMLSpanElement>("span[data-word]");
    spans.forEach((s) => {
      s.style.opacity = "0.15";
      s.style.transform = "translateY(10px)";
    });

    const update = () => {
      const rect = outer.getBoundingClientRect();
      const scrolledPast = -rect.top;
      const scrollRoom = outer.offsetHeight - window.innerHeight;
      const p = Math.max(0, Math.min(1, scrolledPast / scrollRoom));
      const n = Math.round(spans.length * p);
      spans.forEach((s, i) => {
        if (i < n) {
          s.style.opacity = "1";
          s.style.transform = "translateY(0)";
        } else {
          s.style.opacity = "0.15";
          s.style.transform = "translateY(10px)";
        }
      });
    };

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    requestAnimationFrame(update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const parts: ReactNode[] = [];
  let key = 0;
  text.split("\n").forEach((line, lineIdx) => {
    if (lineIdx > 0) parts.push(<br key={`br-${key++}`} />);
    line.split(" ").filter(Boolean).forEach((word, wordIdx) => {
      if (wordIdx > 0) parts.push(" ");
      parts.push(
        <span
          data-word=""
          key={key++}
          style={{
            display: "inline-block",
            opacity: 0.15,
            transform: "translateY(10px)",
            transition: "opacity 0.45s ease-out, transform 0.45s ease-out",
          }}
          aria-hidden="true"
        >
          {word}
        </span>
      );
    });
  });

  return (
    <div ref={outerRef} id={id} style={{ height: "250vh", background: bg }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: bg,
        }}
      >
        {bgVariant === "scatter" && <LogoParallaxBg seed={seed} dark={dark} />}
        {bgVariant === "grid"    && <GridLogosBg />}
        {bgVariant === "ripple"  && <PixelRippleBg />}
        {bgVariant === "wave"    && <SineWaveBg />}
        {bgVariant === "streams" && <DiagonalStreamBg />}

        <div className="relative mx-auto w-full max-w-6xl px-6 text-center">
          {label && (
            <p className={`text-sm font-bold uppercase tracking-widest mb-3 ${dark ? "text-brand-blue" : "text-brand-primary"}`}>
              {label}
            </p>
          )}
          <Tag
            ref={headingRef}
            className={className}
            style={{ overflowWrap: "break-word" }}
            aria-label={text.replace(/\n/g, " ")}
          >
            {parts}
          </Tag>
          {description && (
            <div className={`mx-auto mt-5 max-w-2xl text-lg ${dark ? "text-white/60" : "text-gray-500"}`}>
              {description}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
