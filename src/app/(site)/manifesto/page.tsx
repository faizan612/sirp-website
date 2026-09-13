import type { Metadata } from 'next'
import { PageHeader } from '@/components/layout/PageHeader'
import { Button } from '@/components/shared/Button'
import { PurplePill } from '@/components/shared/PurplePill'
import { SocAutonomyFrameworkTable } from '@/components/shared/SocAutonomyFrameworkTable'
import { KeyInsightsSection } from '@/sections/manifesto/KeyInsightsSection'
import { ManifestoCitationSection } from '@/sections/manifesto/ManifestoCitationSection'
import { ManifestoAboutAuthorSection } from '@/sections/manifesto/ManifestoAboutAuthorSection'
import { CtaSection } from '@/sections/home/CtaSection'
import '@/sections/manifesto/page.css'

/** Google Drive file; iframe uses `/preview` (Drive embed, same idea as sirp.io/manifesto). */
const MANIFESTO_DRIVE_FILE_ID = '1VZA7rl_4LoIIz7wawY96VuRCO6s2AzZN'
const MANIFESTO_DRIVE_VIEW = `https://drive.google.com/file/d/${MANIFESTO_DRIVE_FILE_ID}/view`
const MANIFESTO_DRIVE_EMBED = `https://drive.google.com/file/d/${MANIFESTO_DRIVE_FILE_ID}/preview`

export const metadata: Metadata = {
  title: 'The Autonomous SOC Manifesto',
  description: 'A framework for classifying levels of security operations autonomy, from SIRP Labs. Read the definitive model for governed, AI-native security operations.',
  alternates: { canonical: '/manifesto' },
  openGraph: {
    url: '/manifesto',
    type: 'article',
    title: 'The Autonomous SOC Manifesto | SIRP',
    description: 'The SOC Autonomy Framework: a classification model for security operations maturity, from SIRP Labs.',
  },
}

export default function Page() {
  return (
    <div className="manifesto-page">
      <PageHeader
        badgeText="Manifesto"
        heading={
          <>
            The Autonomous <em>SOC</em> Manifesto
          </>
        }
        subtext={
          <>
            <p className="page-header-subtitle">
              A Framework for Classifying Levels of Security Operations Autonomy
            </p>
            <p className="page-header-byline">Faiz Shuja | SIRP Labs | April 2026</p>
          </>
        }
      />

      <section className="manifesto-hero-cta" aria-label="Manifesto actions">
        <div className="container-sirp manifesto-hero-cta-inner">
          <div className="manifesto-hero-cta-row">
            <Button href={MANIFESTO_DRIVE_VIEW} target="_blank" rel="noopener noreferrer">
              Download Paper
            </Button>
            <Button variant="secondary" disabled>
              Cite this Paper
            </Button>
          </div>
        </div>
      </section>

      <section className="manifesto-pdf-section" aria-label="Manifesto PDF">
        <div className="container-sirp manifesto-pdf-inner">
          <div className="manifesto-pdf-frame">
            <iframe
              src={MANIFESTO_DRIVE_EMBED}
              title="The Autonomous SOC Manifesto (PDF)"
              className="manifesto-pdf-iframe"
              allow="fullscreen"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section className="manifesto-abstract-section" aria-label="Abstract">
        <div className="container-sirp manifesto-abstract-inner">
          <div className="manifesto-abstract-stack">
            <PurplePill className="manifesto-abstract-pill">Abstract</PurplePill>
            <p className="manifesto-abstract-body">
              Security operations faces a scaling crisis driven by workforce shortages, analyst burnout, and alert
              overload. While AI and automation have improved parts of detection, triage, and response, the industry
              still lacks a broadly adopted, vendor-neutral framework for classifying degrees of SOC autonomy, leading
              to vendor confusion, misaligned buyer expectations, and unfocused research investment. This paper introduces
              the SOC Autonomy Framework (SAF), defining six levels of security operations autonomy (L0 through L5),
              analogous to the SAE J3016 standard for automated driving.
            </p>
          </div>
        </div>
      </section>

      <section className="manifesto-framework-section" aria-labelledby="manifesto-framework-title">
        <div className="container-sirp manifesto-framework-inner">
          <div className="manifesto-framework-stack">
            <PurplePill className="manifesto-framework-pill">The Framework</PurplePill>
            <h2 id="manifesto-framework-title" className="manifesto-framework-title">
              SOC Autonomy Framework
            </h2>
            <SocAutonomyFrameworkTable />
          </div>
        </div>
      </section>

      <KeyInsightsSection />

      <div className="manifesto-key-insights-divider-wrap" aria-hidden="true">
        <hr className="manifesto-section-divider" />
      </div>

      <ManifestoCitationSection />

      <div className="manifesto-citation-divider-wrap" aria-hidden="true">
        <hr className="manifesto-section-divider" />
      </div>

      <ManifestoAboutAuthorSection />

      <CtaSection
        heading={<>Experience the <span className="cta-heading-serif">Self-Driving</span> SOC</>}
        description="SARA Open is the free AI security analyst powered by OmniSense: the architecture described in this paper."
        data={{
          primaryBtn:   { label: 'Try SARA Open (Free)', href: '/autonomous-security' },
          secondaryBtn: { label: 'Request a Demo',        href: '/request-demo' },
        }}
      />
    </div>
  )
}
