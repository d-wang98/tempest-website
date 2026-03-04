"use client";

import { useRef, useState, useEffect, type ReactNode } from "react";

type ScrollRevealProps = {
  children: ReactNode;
  /** CSS class when hidden (before in view) */
  className?: string;
  /** Fraction of element that must be visible to trigger (0–1). Default 0.1 */
  threshold?: number;
  /** Trigger when element is this many pixels from viewport. e.g. 50 = trigger 50px before visible */
  rootMargin?: string;
};

export function ScrollReveal({
  children,
  className = "",
  threshold = 0.1,
  rootMargin = "0px 0px -40px 0px",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${isVisible ? "scroll-reveal-visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
