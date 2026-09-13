'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { PurplePill } from '@/components/shared/PurplePill'
import { ContactForm } from './ContactForm'

const COUNTRY_OPTIONS = [
  'Afghanistan',
  'Albania',
  'Algeria',
  'Andorra',
  'Angola',
  'Antigua and Barbuda',
  'Argentina',
  'Armenia',
  'Australia',
  'Austria',
  'Azerbaijan',
  'Bahamas',
  'Bahrain',
  'Bangladesh',
  'Barbados',
  'Belarus',
  'Belgium',
  'Belize',
  'Benin',
  'Bhutan',
  'Bolivia',
  'Bosnia and Herzegovina',
  'Botswana',
  'Brazil',
  'Brunei',
  'Bulgaria',
  'Burkina Faso',
  'Burundi',
  'Cambodia',
  'Cameroon',
  'Canada',
  'Cape Verde',
  'Central African Republic',
  'Chad',
  'Chile',
  'China',
  'Colombia',
  'Comoros',
  'Congo',
  'Costa Rica',
  "Cote d'Ivoire",
  'Croatia',
  'Cuba',
  'Cyprus',
  'Czech Republic',
  'Democratic Republic of the Congo',
  'Denmark',
  'Djibouti',
  'Dominica',
  'Dominican Republic',
  'Ecuador',
  'Egypt',
  'El Salvador',
  'Equatorial Guinea',
  'Eritrea',
  'Estonia',
  'Eswatini',
  'Ethiopia',
  'Fiji',
  'Finland',
  'France',
  'Gabon',
  'Gambia',
  'Georgia',
  'Germany',
  'Ghana',
  'Greece',
  'Grenada',
  'Guatemala',
  'Guinea',
  'Guinea-Bissau',
  'Guyana',
  'Haiti',
  'Honduras',
  'Hungary',
  'Iceland',
  'India',
  'Indonesia',
  'Iran',
  'Iraq',
  'Ireland',
  'Israel',
  'Italy',
  'Jamaica',
  'Japan',
  'Jordan',
  'Kazakhstan',
  'Kenya',
  'Kiribati',
  'Kosovo',
  'Kuwait',
  'Kyrgyzstan',
  'Laos',
  'Latvia',
  'Lebanon',
  'Lesotho',
  'Liberia',
  'Libya',
  'Liechtenstein',
  'Lithuania',
  'Luxembourg',
  'Madagascar',
  'Malawi',
  'Malaysia',
  'Maldives',
  'Mali',
  'Malta',
  'Marshall Islands',
  'Mauritania',
  'Mauritius',
  'Mexico',
  'Micronesia',
  'Moldova',
  'Monaco',
  'Mongolia',
  'Montenegro',
  'Morocco',
  'Mozambique',
  'Myanmar (Burma)',
  'Namibia',
  'Nauru',
  'Nepal',
  'Netherlands',
  'New Zealand',
  'Nicaragua',
  'Niger',
  'Nigeria',
  'North Korea',
  'North Macedonia',
  'Norway',
  'Oman',
  'Pakistan',
  'Palau',
  'Palestine',
  'Panama',
  'Papua New Guinea',
  'Paraguay',
  'Peru',
  'Philippines',
  'Poland',
  'Portugal',
  'Qatar',
  'Romania',
  'Russia',
  'Rwanda',
  'Saint Kitts and Nevis',
  'Saint Lucia',
  'Saint Vincent and the Grenadines',
  'Samoa',
  'San Marino',
  'Sao Tome and Principe',
  'Saudi Arabia',
  'Senegal',
  'Serbia',
  'Seychelles',
  'Sierra Leone',
  'Singapore',
  'Slovakia',
  'Slovenia',
  'Solomon Islands',
  'Somalia',
  'South Africa',
  'South Korea',
  'South Sudan',
  'Spain',
  'Sri Lanka',
  'Sudan',
  'Suriname',
  'Sweden',
  'Switzerland',
  'Syria',
  'Taiwan',
  'Tajikistan',
  'Tanzania',
  'Thailand',
  'Timor-Leste',
  'Togo',
  'Tonga',
  'Trinidad and Tobago',
  'Tunisia',
  'Turkey',
  'Turkmenistan',
  'Tuvalu',
  'Uganda',
  'Ukraine',
  'United Arab Emirates',
  'United Kingdom',
  'United States',
  'Uruguay',
  'Uzbekistan',
  'Vanuatu',
  'Vatican City',
  'Venezuela',
  'Vietnam',
  'Yemen',
  'Zambia',
  'Zimbabwe',
] as const

export function ContactClient() {
  const router = useRouter()
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    window.localStorage.removeItem('sirp_contact_submitted')
  }, [])

  function handleFormSuccess() {
    setIsSubmitted(true)
  }

  useEffect(() => {
    if (!isSubmitted || typeof window === 'undefined') return

    // Add one history step so browser "Back" from submitted view
    // returns users to home instead of showing this contact state again.
    window.history.pushState({ contactSubmitted: true }, '', window.location.href)

    const handlePopState = () => {
      router.replace('/')
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [isSubmitted, router])

  return (
    <div className={`contact-page ${isSubmitted ? 'contact-page--submitted' : ''}`}>
      <section className="contact-hero">
        <div className="container-sirp contact-hero-inner">
          <div className="contact-copy">
            <PurplePill className="contact-badge-pill">Contact us</PurplePill>
            <h1 className="contact-title">
              Get a <em>demo</em>
            </h1>
            <p className="contact-description">
              Fill in the form below to ask a question or speak with someone at SIRP.
            </p>
          </div>

          {isSubmitted ? (
            <div className="contact-form-card contact-inline-message" role="status" aria-live="polite">
              <h2>You&rsquo;re In. Welcome to Actually Autonomous.</h2>
              <p>
                Thanks for requesting a demo of Sirp &mdash; the only platform built{' '}
                <i>from the ground up</i> for truly autonomous security operations.
              </p>
              <p>We&rsquo;ll reach out within one business day. But if you&rsquo;re ready to move faster, start now:</p>
              <p><strong>Two reads from the core of Autonomous SecOps:</strong></p>
              <ul>
                <li>
                  <Link href="/blog/sirp-6-0-3-actually-autonomous">
                    <strong>SIRP 6.0.3</strong> &rarr; Actually Autonomous
                  </Link>
                </li>
                <li>
                  <Link href="/omnisense">
                    <strong>Inside the AI Mesh</strong> &rarr; How SIRP&rsquo;s triage agents eliminate noise at scale
                  </Link>
                </li>
              </ul>
              <p>Talk soon.</p>
            </div>
          ) : (
            <ContactForm countries={COUNTRY_OPTIONS} onSuccess={handleFormSuccess} />
          )}
        </div>
      </section>
    </div>
  )
}
