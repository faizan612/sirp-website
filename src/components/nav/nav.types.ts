export type NavLink = {
  label: string
  description?: string
  href: string
  /** Opens in a new tab; skips next/link. */
  external?: boolean
}

export type NavColumn = {
  /** Stored in sentence case and uppercased in CSS, so screen readers don't spell it out. */
  eyebrow: string
  links: NavLink[]
}

export type NavMenu = {
  id: string
  label: string
  /**
   * A top-level item with `href` and no columns renders as a plain link rather
   * than a dropdown trigger.
   */
  href?: string
  columns?: NavColumn[]
}
