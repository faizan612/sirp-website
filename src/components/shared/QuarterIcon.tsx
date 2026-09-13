interface QuarterIconProps {
  gradient: string
  size?: number
  id: string
}

function parseStops(gradient: string): string[] {
  return [...gradient.matchAll(/rgb\([^)]+\)/g)].map(m => m[0])
}

export function QuarterIcon({ gradient, size = 50, id }: QuarterIconProps) {
  const gradientId = `qg-${id}`
  const stops = parseStops(gradient)
  const [c1 = '#fff', c2 = '#fff', c3 = '#fff'] = stops

  return (
    <svg
      width={size}
      height={size * 1.76}
      viewBox="0 0 50 88"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id={gradientId} x1="25" y1="88" x2="25" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor={c1} />
          <stop offset="50%"  stopColor={c2} />
          <stop offset="100%" stopColor={c3} />
        </linearGradient>
      </defs>
      <path
        d="M 50 88 A 88 88 0 0 0 50 0"
        stroke={`url(#${gradientId})`}
        strokeWidth="7"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}
