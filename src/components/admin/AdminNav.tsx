'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutList, LayoutTemplate, PenSquare, Search, SquarePlus, Users } from 'lucide-react'
import { cn } from '@/lib/utils'

const GROUPS = [
  {
    label: 'Blog',
    items: [
      { href: '/admin', label: 'Posts', icon: LayoutList, exact: true },
      { href: '/admin/posts/new', label: 'New post', icon: PenSquare, exact: false },
      { href: '/admin/seo', label: 'SEO', icon: Search, exact: false },
    ],
  },
  {
    label: 'Pages',
    items: [
      { href: '/admin/pages', label: 'All pages', icon: LayoutTemplate, exact: true },
      { href: '/admin/pages/new', label: 'New page', icon: SquarePlus, exact: false },
    ],
  },
  {
    label: 'Access',
    items: [{ href: '/admin/team', label: 'Team', icon: Users, exact: false }],
  },
] as const

export function AdminNav() {
  const pathname = usePathname()

  return (
    <nav className="cms-nav">
      {GROUPS.map((group) => (
        <div key={group.label}>
          <p className="cms-nav-label">{group.label}</p>
          {group.items.map(({ href, label, icon: Icon, exact }) => {
            const active = exact ? pathname === href : pathname === href || pathname.startsWith(`${href}/`)
            return (
              <Link
                key={href}
                href={href}
                className={cn('cms-nav-item', active && 'is-active')}
                aria-current={active ? 'page' : undefined}
              >
                <Icon size={17} />
                {label}
              </Link>
            )
          })}
        </div>
      ))}
    </nav>
  )
}
