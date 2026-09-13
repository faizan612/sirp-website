import * as Yup from 'yup'

/** Personal / free email domains not accepted on the business contact form */
const BLOCKED_BUSINESS_EMAIL_DOMAINS = new Set([
  'gmail.com',
  'googlemail.com',
  'yahoo.com',
  'yahoo.co.uk',
  'hotmail.com',
  'hotmail.co.uk',
  'outlook.com',
  'live.com',
  'msn.com',
  'icloud.com',
  'me.com',
  'mac.com',
  'aol.com',
  'proton.me',
  'protonmail.com',
  'pm.me',
  'mail.com',
  'zoho.com',
  'yandex.com',
  'gmx.com',
  'gmx.net',
])

function getEmailDomain(email: string): string {
  const parts = email.trim().toLowerCase().split('@')
  return parts.length === 2 ? parts[1] : ''
}

export type ContactFormValues = {
  firstName: string
  lastName: string
  jobTitle: string
  businessEmail: string
  company: string
  companyWebsite: string
  phone: string
  companySize: string
  countryRegion: string
  howDidYouHear: string
}

export const contactFormInitialValues: ContactFormValues = {
  firstName: '',
  lastName: '',
  jobTitle: '',
  businessEmail: '',
  company: '',
  companyWebsite: '',
  phone: '',
  companySize: '',
  countryRegion: '',
  howDidYouHear: '',
}

export const contactFormSchema = Yup.object({
  firstName: Yup.string().trim().required('First name is required'),
  lastName: Yup.string().trim().required('Last name is required'),
  jobTitle: Yup.string().trim().required('Job title is required'),
  businessEmail: Yup.string()
    .trim()
    .email('Enter a valid business email')
    .required('Business email is required')
    .test('business-domain', function (value) {
      if (!value) return true
      const domain = getEmailDomain(value)
      if (!domain || !BLOCKED_BUSINESS_EMAIL_DOMAINS.has(domain)) return true
      return this.createError({
        message: `Please enter a different email address. This form does not accept addresses from ${domain}.`,
      })
    }),
  company: Yup.string().trim(),
  companyWebsite: Yup.string()
    .trim()
    .transform((value) => (value === '' ? undefined : value))
    .optional()
    .url('Enter a valid website URL'),
  phone: Yup.string()
    .trim()
    .required('Phone is required')
    .min(7, 'Enter a valid phone number'),
  companySize: Yup.string().required('Company size is required'),
  countryRegion: Yup.string().required('Country / region is required'),
  howDidYouHear: Yup.string()
    .trim()
    .transform((value) => (value === '' ? undefined : value))
    .optional()
    .min(3, 'Please enter at least 3 characters'),
})
