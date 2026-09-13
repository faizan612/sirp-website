import Image from "next/image";
import type { ReactNode } from "react";

/**
 * Primary CTA button — Figma "Component 12" / "Component 379".
 * bg #8E2DFF, radius 12, pl 24 / pr 20 / py 12, gap 8, purple glow shadow,
 * trailing 20px arrow-up-right icon.
 */
export function PrimaryButton({
  children,
  className = "",
  href = "/contact",
}: {
  children: ReactNode;
  className?: string;
  href?: string;
}) {
  return (
    <a
      href={href}
      className={`inline-flex shrink-0 items-center justify-center gap-[8px] rounded-[12px] bg-home-primary-300 py-[12px] pl-[24px] pr-[20px] text-[16px] font-medium leading-[24px] text-white no-underline shadow-[0px_2px_16px_0px_rgba(142,45,255,0.55)] transition-[background-color,box-shadow] duration-150 hover:bg-home-primary-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white motion-reduce:transition-none ${className}`}
    >
      {children}
      <Image
        src="/homepage/figma/shared/arrow-up-right.svg"
        alt=""
        width={20}
        height={20}
        className="size-[20px] shrink-0"
      />
    </a>
  );
}
