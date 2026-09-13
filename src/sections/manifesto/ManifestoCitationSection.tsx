import Link from 'next/link'
import { PurplePill } from '@/components/shared/PurplePill'
import { SITE_URL } from '@/lib/constants'
import './ManifestoCitationSection.css'

const MANIFESTO_PAGE_URL = `${SITE_URL}/manifesto`

export function ManifestoCitationSection() {
  return (
    <section className="manifesto-citation-footer" aria-label="Cite this paper">
      <div className="manifesto-citation-footer-inner">
        <PurplePill className="manifesto-citation-footer-pill">Cite This Paper</PurplePill>

        <div className="manifesto-citation-footer-copy">
          <p className="manifesto-citation-footer-line">Shuja, F. (2026).</p>
          <p className="manifesto-citation-footer-line">
            &ldquo;The Autonomous SOC Manifesto: A Framework for Classifying Levels of Security Operations
            Autonomy.&rdquo;
          </p>
          <p className="manifesto-citation-footer-line">
            SIRP Labs. April 2026. Available at:{' '}
            <Link href="/manifesto" className="manifesto-citation-footer-link">
              {MANIFESTO_PAGE_URL}
            </Link>
          </p>
          <p className="manifesto-citation-footer-orcid">ORCID: 0009-0008-3106-2972</p>
        </div>
      </div>
    </section>
  )
}
