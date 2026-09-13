import type { buyersGuideContent } from '@/app/(site)/buyers-guide/content'
import { DownloadCard } from './DownloadCard'
import './DownloadSection.css'

type DownloadSectionProps = {
  data: (typeof buyersGuideContent)['download']
}

export function DownloadSection({ data }: DownloadSectionProps) {
  return (
    <section className="bg-download-section">
      <div className="container-sirp">
        <div className="bg-download-eyebrow">{data.eyebrow}</div>
        <h2 className="bg-download-heading">{data.heading}</h2>
        <p className="bg-download-lead">{data.lead}</p>

        <DownloadCard data={data} />
      </div>
    </section>
  )
}
