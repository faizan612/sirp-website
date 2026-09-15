import Link from 'next/link'
import { cn } from '@/lib/utils'
import { NavArrowUpRight } from './NavIcons'
import { DEMO_HREF } from './nav-data'

/**
 * Figma: 162 x 48, 12px radius, #8E2DFF, 24px side padding, 12px gap,
 * Inter Medium 16/19, plus a 0 2px 16px purple drop shadow at 55%.
 */
export function DemoButton({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <Link
      href={DEMO_HREF}
      onClick={onClick}
      className={cn(
        'inline-flex h-12 items-center justify-center gap-3 rounded-[12px] bg-[var(--nav-cta)] px-6',
        'font-sans text-[16px] font-medium leading-[19px] text-white no-underline',
        'shadow-[var(--nav-cta-shadow)] outline-none transition-[filter,box-shadow] duration-150',
        'hover:brightness-110 focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#141414]',
        className,
      )}
    >
      Get a Demo
      <NavArrowUpRight />
    </Link>
  )
}
