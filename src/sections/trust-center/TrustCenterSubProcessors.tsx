import { TRUST_CENTER_SUB_PROCESSORS, TRUST_CENTER_DATA_PROCESSED } from '@/lib/constants'
import './trust-center.css'

export function TrustCenterSubProcessors() {
  const { heading, infrastructure, corporate, callout } = TRUST_CENTER_SUB_PROCESSORS
  const dataProcessed = TRUST_CENTER_DATA_PROCESSED

  return (
    <section className="overflow-hidden bg-[#f6f5f8] py-16 md:py-20">
      <div className="container-sirp">
        <h2 className="tc-h2 font-sans font-medium text-black mb-10">{heading}</h2>

        {[infrastructure, corporate].map((group) => (
          <div key={group.heading} className="mb-10">
            <h3 className="font-sans text-lg font-medium text-black mb-4">{group.heading}</h3>
            <div className="tc-table-wrap--light">
              <table>
                <thead>
                  <tr>
                    {group.columns.map((col) => (
                      <th key={col} scope="col">{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {group.rows.map((row) => (
                    <tr key={row.name}>
                      <td>{row.name}</td>
                      <td>{row.role}</td>
                      <td>{row.region}</td>
                      <td>{row.data}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}

        <div className="tc-note--light max-w-3xl mb-10">
          <span className="tc-note-label">{callout.label}</span>
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(0,0,0,0.7)' }}>{callout.body}</p>
        </div>

        <h3 className="font-sans text-lg font-medium text-black mb-4">{dataProcessed.heading}</h3>
        <div className="tc-table-wrap--light">
          <table>
            <thead>
              <tr>
                <th scope="col">Category</th>
                <th scope="col">Detail</th>
              </tr>
            </thead>
            <tbody>
              {dataProcessed.rows.map((row) => (
                <tr key={row.category}>
                  <td>{row.category}</td>
                  <td>{row.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
