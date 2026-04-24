"use client";
import type { ReactNode } from "react";

export function RequestDemoButton({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <button
      className={className}
      onClick={() => window.dispatchEvent(new Event("request-demo"))}
    >
      {children ?? "Request Demo"}
    </button>
  );
}
