import { TRUST_CENTER_CONTACT } from '@/lib/constants'
import './trust-center.css'

export function TrustCenterContact() {
  const { heading, disclosure, contacts, footnote } = TRUST_CENTER_CONTACT

  return (
    <section className="overflow-hidden bg-[#f6f5f8] py-16 md:py-20">
      <div className="container-sirp">
        <h2 className="tc-h2 font-sans font-medium text-black mb-8">{heading}</h2>

        <h3 className="font-sans text-lg font-medium text-black mb-3">{disclosure.heading}</h3>
        <p className="tc-body max-w-2xl mb-10" style={{ color: 'rgba(0,0,0,0.7)' }}>{disclosure.body}</p>

        <div className="tc-table-wrap--light mb-8 max-w-2xl">
          <table>
            <thead>
              <tr>
                <th scope="col">Purpose</th>
                <th scope="col">Contact</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((row) => (
                <tr key={row.purpose}>
                  <td>{row.purpose}</td>
                  <td>
                    <a href={`mailto:${row.email}`} style={{ color: '#8e2dff' }} className="hover:underline">
                      {row.email}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="max-w-2xl text-xs leading-relaxed" style={{ color: 'rgba(0,0,0,0.4)' }}>{footnote}</p>
      </div>
    </section>
  )
}
