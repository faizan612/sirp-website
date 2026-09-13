import type { ReactNode } from 'react'
import './BlackGradientCard.css'

export type BlackGradientCardProps = {
  title: ReactNode
  text: ReactNode
}

export function BlackGradientCard({ title, text }: BlackGradientCardProps) {
  return (
    <div className="black-gradient-card">
      <div className="black-gradient-card-inner">
        <h3 className="black-gradient-card-title">{title}</h3>
        <div className="black-gradient-card-text">{text}</div>
      </div>
    </div>
  )
}
