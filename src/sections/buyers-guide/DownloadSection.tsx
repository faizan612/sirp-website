import type { buyersGuideContent } from '@/app/(site)/buyers-guide/content'
import { DownloadCard } from './DownloadCard'
import { Badge } from '@/components/homepage/ui/badge'
import { Container } from '@/components/homepage/ui/container'
import './DownloadSection.css'

type DownloadSectionProps = { data: (typeof buyersGuideContent)['download'] }

export function DownloadSection({ data }: DownloadSectionProps) {
  return (
    <section className="bg-download-section" id="download" aria-labelledby="guide-download-title">
      <Container>
        <div className="bg-download-layout">
          <div className="bg-download-copy">
            <Badge variant="light">{data.eyebrow}</Badge>
            <h2 id="guide-download-title" className="bg-download-heading">{data.heading}</h2>
            <p className="bg-download-lead">{data.lead}</p>
          </div>
          <DownloadCard data={data} />
        </div>
      </Container>
    </section>
  )
}
