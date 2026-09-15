/**
 * Icon geometry traced from the Figma nav frames so the ink boxes match:
 * the chevron is 12.6 x 7.2 inside an 18px frame, the CTA arrow 9.2 x 9.2
 * inside a 12px frame.
 */

export function NavChevron({ className }: { className?: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path
        d="M3.6 7.2 9 12.6 14.4 7.2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function NavArrowUpRight({ className }: { className?: string }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path
        d="M3.5 1.542s5.78-.452 6.6.362c.81.814.36 6.596.36 6.596M9.75 2.25 1.42 10.583"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
