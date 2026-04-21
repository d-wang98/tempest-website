"use client";
import { useEffect, useRef } from "react";

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";

export function TextReveal({
  children: text,
  className = "",
  as: Tag = "h2",
  dark = false,
}: {
  children: string;
  className?: string;
  as?: HeadingTag;
  dark?: boolean;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const hiddenColor = dark ? "#4b5563" : "#d4d4d4";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const spans = el.querySelectorAll<HTMLSpanElement>("span[data-char]");
    spans.forEach((s) => { s.style.color = hiddenColor; });

    const update = () => {
      const { top } = el.getBoundingClientRect();
      const wh = window.innerHeight;
      // Reveal starts when element top hits 88% of viewport height, completes at 15%
      const p = Math.max(0, Math.min(1, (wh * 0.88 - top) / (wh * 0.68)));
      const n = Math.round(spans.length * p);
      spans.forEach((s, i) => {
        s.style.color = i < n ? "" : hiddenColor;
      });
    };

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    // Run once on mount in case element is already partially in view
    requestAnimationFrame(update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [hiddenColor]);

  // Build char spans, converting \n to <br>
  const parts: React.ReactNode[] = [];
  let key = 0;
  for (const char of text) {
    if (char === "\n") {
      parts.push(<br key={`br-${key++}`} />);
    } else {
      parts.push(
        <span
          data-char=""
          key={key++}
          style={{ color: hiddenColor, transition: "color 0.04s linear" }}
          aria-hidden="true"
        >
          {char === " " ? "\u00A0" : char}
        </span>
      );
    }
  }

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={className} aria-label={text.replace(/\n/g, " ")}>
      {parts}
    </Tag>
  );
}
