import { TRUST_CENTER_OVERVIEW, COMPLIANCE_STATUS_LABEL } from '@/lib/constants'
import './trust-center.css'

export function TrustCenterOverview() {
  const { heading, body, rows, callout } = TRUST_CENTER_OVERVIEW

  return (
    <section className="overflow-hidden bg-[#f6f5f8] py-16 md:py-20">
      <div className="container-sirp">
        <h2 className="tc-h2 font-sans font-medium text-black mb-5">{heading}</h2>
        <p className="tc-body max-w-2xl mb-10" style={{ color: 'rgba(0,0,0,0.7)' }}>{body}</p>

        <div className="tc-table-wrap--light mb-8">
          <table>
            <thead>
              <tr>
                <th scope="col">Requirement</th>
                <th scope="col">Status</th>
                <th scope="col">Detail</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.name}>
                  <td>{row.name}</td>
                  <td>
                    <span className={`tc-status tc-status--${row.status}`}>
                      <span className="tc-status-dot" aria-hidden />
                      {COMPLIANCE_STATUS_LABEL[row.status]}
                    </span>
                  </td>
                  <td>{row.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="tc-note--light max-w-3xl">
          <span className="tc-note-label">{callout.label}</span>
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(0,0,0,0.7)' }}>{callout.body}</p>
        </div>
      </div>
    </section>
  )
}
