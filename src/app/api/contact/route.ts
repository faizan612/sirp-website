import { NextResponse } from 'next/server'
import { ValidationError } from 'yup'
import { contactFormSchema, type ContactFormValues } from '@/app/(site)/contact/contactFormSchema'
import { submitToHubspot } from '@/lib/contact/submitToHubspot'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const values = (await contactFormSchema.validate(body, {
      abortEarly: false,
      stripUnknown: true,
    })) as ContactFormValues

    const hubspot = await submitToHubspot(values, {
      pageUri: request.headers.get('referer') ?? undefined,
      pageName: 'Contact',
    })

    if (!hubspot.ok) {
      console.error('[contact] HubSpot submit failed:', hubspot.status, hubspot.message)
      const message =
        process.env.NODE_ENV === 'development'
          ? `HubSpot submit failed (${hubspot.status}): ${hubspot.message}`
          : 'Failed to submit your enquiry. Please try again.'
      return NextResponse.json({ error: message }, { status: 502 })
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json({ error: 'Invalid form data.' }, { status: 400 })
    }
    console.error('[contact] submit error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
