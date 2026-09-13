type IconType = React.ComponentType<{ size?: number; color?: string }>

/** Placeholder for a section that needs a data source this app doesn't have wired up (yet, or possibly ever — e.g. a paid keyword-tracking vendor). Deliberately shows no numbers rather than fabricating any. */
export function NotConnectedCard({
  icon: Icon,
  title,
  description,
  requirement,
}: {
  icon: IconType
  title: string
  description: string
  requirement: string
}) {
  return (
    <div className="cms-card">
      <div className="cms-card-body" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
        <div
          style={{
            display: 'grid',
            placeItems: 'center',
            width: 40,
            height: 40,
            borderRadius: 10,
            background: 'var(--cms-elevated)',
            flexShrink: 0,
          }}
        >
          <Icon size={18} color="var(--cms-fg-faint)" />
        </div>
        <div>
          <div className="cms-card-title">{title}</div>
          <p className="cms-subtitle" style={{ margin: '0.35rem 0 0', fontSize: '0.85rem' }}>
            {description}
          </p>
          <p className="cms-list-meta" style={{ marginTop: '0.5rem' }}>
            {requirement}
          </p>
        </div>
      </div>
    </div>
  )
}
