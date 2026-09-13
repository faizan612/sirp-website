import './SocAutonomyFrameworkTable.css'

export type SocAutonomyFrameworkRow = {
  level: string
  name: string
  aiDecisionScope: string
  humanRole: string
  actionRate: string
  /** When true, row gets the purple outline (e.g. L4 on sirp.io/manifesto). */
  highlighted?: boolean
}

const DEFAULT_ROWS: SocAutonomyFrameworkRow[] = [
  {
    level: 'L0',
    name: 'Manual SOC',
    aiDecisionScope: 'None',
    humanRole: 'Everything',
    actionRate: '0%',
  },
  {
    level: 'L1',
    name: 'Assisted Detection',
    aiDecisionScope: 'Surface, prioritize alerts',
    humanRole: 'Investigate, decide',
    actionRate: '0%',
  },
  {
    level: 'L2',
    name: 'Automated Triage',
    aiDecisionScope: 'Triage, enrich, correlate, filter FPs',
    humanRole: 'Validate, investigate, respond',
    actionRate: '0-10%',
  },
  {
    level: 'L3',
    name: 'Conditional Autonomy',
    aiDecisionScope: 'Investigate, recommend, execute low-risk',
    humanRole: 'Approve high-impact, supervise',
    actionRate: '20-50%',
  },
  {
    level: 'L4',
    name: 'High Autonomy',
    aiDecisionScope: 'Full lifecycle within governed boundaries',
    humanRole: 'Monitor, exceptions, policy updates',
    actionRate: '70-90%',
    highlighted: true,
  },
  {
    level: 'L5',
    name: 'Full Autonomy',
    aiDecisionScope: 'Entire SOC lifecycle',
    humanRole: 'Set policy only',
    actionRate: '99-100%',
  },
]

export type SocAutonomyFrameworkTableProps = {
  rows?: SocAutonomyFrameworkRow[]
}

export function SocAutonomyFrameworkTable({ rows = DEFAULT_ROWS }: SocAutonomyFrameworkTableProps) {
  return (
    <div className="soc-af-table-scroll">
      <table className="soc-af-table">
        <thead>
          <tr>
            <th scope="col">Level</th>
            <th scope="col">Name</th>
            <th scope="col">AI decision scope</th>
            <th scope="col">Human role</th>
            <th scope="col">Action rate</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.level}
              className={row.highlighted ? 'soc-af-table__row--highlight' : undefined}
            >
              <td>{row.level}</td>
              <td>{row.name}</td>
              <td>{row.aiDecisionScope}</td>
              <td>{row.humanRole}</td>
              <td>{row.actionRate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
