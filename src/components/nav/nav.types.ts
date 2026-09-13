export type NavStatus = 'live' | 'planned'

export type NavLink = {
  label: string
  href: string
  description?: string
  status: NavStatus
  badge?: string
}

export type NavColumn = {
  eyebrow: string
  links: NavLink[]
}

export type FeaturedVisual = 'sara' | 'partner' | 'report' | 'static'

export type FeaturedCard = {
  eyebrow: string
  title: string
  body?: string
  href?: string
  cta?: string
  status: NavStatus
  visual: FeaturedVisual
  badge?: string
}

export type PanelFooter = {
  text: string
  cta: string
  href: string
  status: NavStatus
}

export type NavMenu = {
  id: string
  label: string
  href?: string
  columns: NavColumn[]
  featured?: FeaturedCard
  footer?: PanelFooter
}
