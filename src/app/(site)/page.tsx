import Home from '@/components/homepage/Home'
import type { Metadata } from 'next'
import { JsonLd } from '@/components/seo/JsonLd'
import {
  SITE_NAME,
  SITE_DESCRIPTION,
  SITE_URL,
} from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Autonomous SOC Platform | OmniSense by SIRP',
  description: 'OmniSense investigates every alert, closes the case, and passes every action through a governance gate you define. Deployable in cloud, on-prem, or airgapped.',
  alternates: { canonical: '/' },
  openGraph: {
    url: '/',
    type: 'website',
    title: 'Autonomous SOC Platform | OmniSense by SIRP',
    description: 'OmniSense investigates every alert, closes the case, and passes every action through a governance gate you define. Deployable in cloud, on-prem, or airgapped.',
  },
}

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'WebSite',
              '@id': `${SITE_URL}/#website`,
              url: SITE_URL,
              name: SITE_NAME,
              description: SITE_DESCRIPTION,
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
                },
                'query-input': 'required name=search_term_string',
              },
            },
            {
              '@type': 'Organization',
              '@id': `${SITE_URL}/#organization`,
              name: SITE_NAME,
              url: SITE_URL,
              logo: {
                '@type': 'ImageObject',
                url: `${SITE_URL}/images/logos/sirp_favicon.svg`,
              },
              sameAs: [
                'https://www.linkedin.com/company/sirp-io',
              ],
            },
          ],
        }}
      />
      <Home />
    </>
  )
}
