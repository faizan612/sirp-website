import type { ReactNode } from "react";

/**
 * Page container — the reference uses 120px desktop gutters at 1920px.
 * A 1776px outer width with 48px padding leaves a 1680px content area.
 */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1776px] px-[48px] ${className}`}>
      {children}
    </div>
  );
}
