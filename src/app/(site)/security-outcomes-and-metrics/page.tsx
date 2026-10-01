import type { Metadata } from 'next'
import { OutcomesExperience } from '@/sections/security-outcomes-and-metrics/OutcomesExperience'

export const metadata: Metadata = {
  title: 'Security Outcomes & Metrics',
  description: 'Production data from autonomous SOCs: real metrics on MTTR reduction, analyst hours saved, autonomous actions taken, and measurable security ROI.',
  alternates: { canonical: '/security-outcomes-and-metrics' },
  openGraph: {
    url: '/security-outcomes-and-metrics',
    type: 'website',
    title: 'Security Outcomes & Metrics | SIRP',
    description: '80% faster MTTD. 70% faster MTTR. 90% autonomous actions. Real production data from SIRP deployments.',
  },
}

export default function SecurityOutcomesPage() {
  return (
    <OutcomesExperience />
  )
}
