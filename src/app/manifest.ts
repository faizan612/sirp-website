import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'SIRP: Autonomous SOC Platform',
    short_name: 'SIRP',
    description: 'OmniSense™, the first Autonomous SOC that detects, investigates, and responds at machine speed.',
    start_url: '/',
    display: 'standalone',
    background_color: '#080810',
    theme_color: '#8e2dff',
    icons: [
      {
        src: '/images/logos/sirp_favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  }
}
