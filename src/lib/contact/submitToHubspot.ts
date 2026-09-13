import type { ContactFormValues } from '@/app/(site)/contact/contactFormSchema'

/**
 * Public HubSpot portal + form identifiers. These are not secrets — they are
 * visible in the form embed code — so they are safe in source. They can be
 * overridden via env without a code change if the form is ever swapped out.
 */
const HUBSPOT_PORTAL_ID = process.env.HUBSPOT_PORTAL_ID ?? '6506790'
const HUBSPOT_FORM_ID =
  process.env.HUBSPOT_FORM_ID ?? 'ada36233-e78c-4b42-9b61-44ba87304641'

type HubspotField = { name: string; value: string }

/**
 * Maps our contact form values to HubSpot form field (internal) names.
 *
 * IMPORTANT: each `name` below MUST match the internal name of a field that
 * actually exists on the HubSpot form. The Forms Submission API rejects the
 * WHOLE submission if it receives a field the form does not define. These use
 * HubSpot's standard contact property names; the last two are typically custom
 * properties. Verify/adjust them in HubSpot under
 * Marketing > Forms > (this form) > each field's internal name.
 */
function toHubspotFields(values: ContactFormValues): HubspotField[] {
  const mapped: Array<[string, string | undefined]> = [
    ['firstname', values.firstName],
    ['lastname', values.lastName],
    ['email', values.businessEmail],
    ['jobtitle', values.jobTitle],
    ['company', values.company],
    ['website', values.companyWebsite],
    ['phone', values.phone],
    // Custom field internal names, confirmed from the HubSpot form's API errors:
    ['country_region1', values.countryRegion],
    ['company_size_custom', values.companySize],
    ['how_did_you_hear_about_us_', values.howDidYouHear],
  ]

  return mapped
    .filter(([, value]) => value != null && value.trim() !== '')
    .map(([name, value]) => ({ name, value: (value as string).trim() }))
}

export type HubspotSubmitResult =
  | { ok: true }
  | { ok: false; status: number; message: string }

/**
 * Submits a contact form entry to HubSpot via the no-auth Forms Submission
 * API. Returns a result object rather than throwing so the caller can decide
 * how to surface a failure to the user.
 */
export async function submitToHubspot(
  values: ContactFormValues,
  context?: { pageUri?: string; pageName?: string }
): Promise<HubspotSubmitResult> {
  const endpoint = `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`

  const payload = {
    fields: toHubspotFields(values),
    context: {
      ...(context?.pageUri ? { pageUri: context.pageUri } : {}),
      pageName: context?.pageName ?? 'Contact',
    },
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      cache: 'no-store',
    })

    if (!response.ok) {
      const message = await response.text().catch(() => response.statusText)
      return { ok: false, status: response.status, message }
    }

    return { ok: true }
  } catch (error) {
    return {
      ok: false,
      status: 0,
      message: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
