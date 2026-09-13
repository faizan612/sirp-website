import Script from 'next/script'

/**
 * Layout for the public marketing site. Owns Google Analytics — which should
 * not load inside the private (admin) CMS, which has its own layout. Nav and
 * footer chrome live in the root layout (SiteNav) and are not duplicated here.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Google tag (gtag.js) */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-4D3SJ5T922"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-4D3SJ5T922');
        `}
      </Script>

      {children}
    </>
  )
}
