import type { ReactNode } from "react";

/**
 * Share the navbar's responsive gutters at every viewport, not just 1920px.
 */
export function Container({
  children,
  className = "",
  surface,
}: {
  children: ReactNode;
  className?: string;
  surface?: 'light' | 'dark';
}) {
  return (
    <div data-cta-surface={surface} className={`mx-auto w-full px-[var(--site-gutter)] ${className}`}>
      {children}
    </div>
  );
}
