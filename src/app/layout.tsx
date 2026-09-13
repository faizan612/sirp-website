import type { Metadata, Viewport } from 'next'
import { Inter, Noto_Serif, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'
import { SiteHeader, SiteFooter } from '@/components/homepage/SiteChrome'
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from '@/lib/constants'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

const notoSerif = Noto_Serif({
  subsets: ['latin'],
  variable: '--font-noto-serif',
  display: 'swap',
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-ibm-mono',
  display: 'swap',
  weight: ['400', '500', '600'],
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Autonomous SOC Platform`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'autonomous SOC',
    'SOAR alternative',
    'AI security operations',
    'OmniSense',
    'SIRP',
    'security automation',
  ],
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Autonomous SOC Platform`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} | Autonomous SOC Platform`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/images/logos/sirp_favicon.svg',
    shortcut: '/images/logos/sirp_favicon.svg',
  },
}

export const viewport: Viewport = {
  themeColor: '#080810',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${notoSerif.variable} ${ibmPlexMono.variable}`}
      suppressHydrationWarning
    >
      <body
        className="min-h-screen bg-[#121218] text-white antialiased overflow-x-hidden flex flex-col"
        suppressHydrationWarning
      >
        {/* Pre-paint: flag the OmniSense view from the URL so the classic
            chrome (Navbar/Footer) is hidden before first paint, no flash. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{if(new URLSearchParams(location.search).get('view')==='omnisense'){document.documentElement.classList.add('omni-active')}}catch(e){}})()",
          }}
        />

        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />

      </body>
    </html>
  )
}
