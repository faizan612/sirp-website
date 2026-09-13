import { TRUST_CENTER_DATA_RESIDENCY } from '@/lib/constants'
import './trust-center.css'

export function TrustCenterDataResidency() {
  const { heading, intro, columns, rows, bullets } = TRUST_CENTER_DATA_RESIDENCY

  return (
    <section className="overflow-hidden bg-[#f6f5f8] py-16 md:py-20">
      <div className="container-sirp">
        <h2 className="tc-h2 font-sans font-medium text-black mb-3">{heading}</h2>
        <p className="tc-body max-w-2xl mb-10" style={{ color: 'rgba(0,0,0,0.7)' }}>{intro}</p>

        <div className="tc-table-wrap--light mb-10">
          <table>
            <thead>
              <tr>
                {columns.map((col) => (
                  <th key={col} scope="col">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.model}>
                  <td>{row.model}</td>
                  <td>{row.residency}</td>
                  <td>{row.inference}</td>
                  <td>{row.externalLlm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ul className="max-w-3xl space-y-3">
          {bullets.map((bullet) => (
            <li key={bullet} className="flex gap-3 text-sm leading-relaxed" style={{ color: 'rgba(0,0,0,0.65)' }}>
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-purple" aria-hidden />
              {bullet}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
