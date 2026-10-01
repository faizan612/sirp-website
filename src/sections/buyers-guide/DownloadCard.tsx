import Link from 'next/link'
import { FileText } from 'lucide-react'
import type { buyersGuideContent } from '@/app/(site)/buyers-guide/content'
import { PrimaryButton } from '@/components/homepage/ui/primary-button'
import './DownloadCard.css'

type DownloadCardProps = { data: (typeof buyersGuideContent)['download'] }

export function DownloadCard({ data }: DownloadCardProps) {
  return (
    <div className="bg-download-card">
      <div className="bg-download-card-top">
        <span className="bg-download-file"><FileText size={28} strokeWidth={1.5} aria-hidden="true" /></span>
        <div><h3 className="bg-download-title">{data.title}</h3><span className="bg-download-format">8 questions · Ready for your RFP</span></div>
      </div>
      <p className="bg-download-body">{data.body}</p>
      <div className="bg-download-actions">
        <PrimaryButton href="/buyers-guide/print">Open printable scorecard</PrimaryButton>
        <Link href="/contact">Discuss your evaluation with SIRP</Link>
      </div>
    </div>
  )
}
