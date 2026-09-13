import type { ReactNode } from "react";

/**
 * Pill badge — Figma "Frame 2147224708" / "Frame 2147224809" etc.
 * h 36, radius 50, px 16, 14px text. Dark variant on dark sections,
 * light variant on the light panel.
 */
export function Badge({
  children,
  variant = "dark",
}: {
  children: ReactNode;
  variant?: "dark" | "light";
}) {
  const styles =
    variant === "dark"
      ? "border-home-hairline-strong bg-home-ink-850 text-white"
      : "border-[#d4d4d4] bg-[#e2e2e2] text-[#2b2b2b]";

  return (
    <span
      className={`box-border inline-flex h-[36px] items-center rounded-[50px] border px-[16px] text-[14px] leading-[24px] ${styles}`}
    >
      {children}
    </span>
  );
}
