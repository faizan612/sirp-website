/* ─── Trusted-by logo strip — content ───────────────────────
 * Client/partner logos shown in the marquee directly below the hero.
 * Assets are cropped from a rendered screenshot of the Figma node
 * (1073:1784, "Trusted By Logos") — the raw image-fill exports for
 * this node came back fully transparent, so the rasterized strip
 * screenshot was sliced into individual logos instead. */

export type TrustedByLogo = {
  name: string
  src:  string
}

export const trustedByLogos: readonly TrustedByLogo[] = [
  { name: 'Al Ghurair Group',      src: '/images/logos-strip/logo-al-ghurair.png' },
  { name: 'Navaio',                src: '/images/logos-strip/logo-navaio.png' },
  { name: 'Raqami',                src: '/images/logos-strip/logo-raqami.png' },
  { name: 'Purdue Federal Credit Union', src: '/images/logos-strip/logo-purdue-federal.png' },
  { name: 'OQ',                    src: '/images/logos-strip/logo-oq.png' },
  { name: 'Qatar Red Crescent',    src: '/images/logos-strip/logo-qatar-red-crescent.png' },
  { name: 'Al Rayyan',             src: '/images/logos-strip/logo-al-rayyan.png' },
] as const
