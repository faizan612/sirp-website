import type { Metadata } from 'next'
import { ContactClient } from './ContactClient'
import './page.css'

export const metadata: Metadata = {
  title: 'Contact Us: Request a Demo',
  description: 'Request a demo of SIRP\'s autonomous SOC platform. Speak directly with a security operations specialist and see OmniSense in action.',
  alternates: { canonical: '/contact' },
  openGraph: {
    url: '/contact',
    type: 'website',
    title: 'Request a Demo | SIRP',
    description: 'See the Autonomous SOC platform in action. Book a demo with the SIRP team.',
  },
}

export default function ContactPage() {
  return <ContactClient />
}
