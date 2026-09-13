import { TRUST_CENTER_ATTESTATION } from '@/lib/constants'
import './trust-center.css'

export function TrustCenterAttestation() {
  const { heading, rows, callout } = TRUST_CENTER_ATTESTATION

  return (
    <section className="overflow-hidden bg-hero-surface py-16 md:py-20">
      <div className="container-sirp">
        <h2 className="tc-h2 font-sans font-medium text-white mb-8">{heading}</h2>

        <div className="tc-table-wrap--dark mb-8">
          <table className="tc-table--kv">
            <tbody>
              {rows.map((row) => (
                <tr key={row.field}>
                  <td>{row.field}</td>
                  <td>{row.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="tc-note--dark max-w-3xl">
          <span className="tc-note-label">{callout.label}</span>
          <p className="text-sm leading-relaxed text-white/65">{callout.body}</p>
        </div>
      </div>
    </section>
  )
}
