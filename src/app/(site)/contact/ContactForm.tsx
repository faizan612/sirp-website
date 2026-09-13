'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Form, Formik, type FormikHelpers } from 'formik'
import {
  contactFormInitialValues,
  contactFormSchema,
  type ContactFormValues,
} from './contactFormSchema'

type SelectOption = {
  label: string
  value: string
}

function ContactCustomSelect({
  options,
  placeholder = 'Please Select',
  value,
  onChange,
  onBlur,
  hasError,
  searchable = false,
  searchPlaceholder = 'Search...',
  emptyMessage = 'No results found',
}: {
  options: readonly SelectOption[]
  placeholder?: string
  value: string
  onChange: (value: string) => void
  onBlur: () => void
  hasError?: boolean
  searchable?: boolean
  searchPlaceholder?: string
  emptyMessage?: string
}) {
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const rootRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const filteredOptions = useMemo(() => {
    if (!searchable || !searchQuery.trim()) return options
    const query = searchQuery.trim().toLowerCase()
    return options.filter((option) => option.label.toLowerCase().includes(query))
  }, [options, searchQuery, searchable])

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onPointerDown)
    return () => document.removeEventListener('mousedown', onPointerDown)
  }, [])

  useEffect(() => {
    if (!open) {
      setSearchQuery('')
      return
    }
    if (searchable) {
      searchInputRef.current?.focus()
    }
  }, [open, searchable])

  const selected = options.find((option) => option.value === value)

  function closeMenu() {
    setOpen(false)
    setSearchQuery('')
  }

  return (
    <div className={`contact-custom-select${hasError ? ' contact-custom-select--error' : ''}`} ref={rootRef}>
      <button
        type="button"
        className="contact-custom-select-trigger"
        onClick={() => setOpen((prev) => !prev)}
        onBlur={onBlur}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-invalid={hasError}
      >
        <span
          className={`contact-custom-select-value${selected ? '' : ' contact-custom-select-placeholder'}`}
        >
          {selected?.label ?? placeholder}
        </span>
        <span className="contact-custom-select-chevron" aria-hidden="true">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M2.5 4.5L6 8L9.5 4.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
      {open ? (
        <div
          className={`contact-custom-select-menu${searchable ? ' contact-custom-select-menu--searchable' : ''}`}
          role="listbox"
        >
          {searchable ? (
            <div className="contact-custom-select-search">
              <input
                ref={searchInputRef}
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                onMouseDown={(event) => event.preventDefault()}
                placeholder={searchPlaceholder}
                aria-label={searchPlaceholder}
                autoComplete="off"
              />
            </div>
          ) : null}
          <ul className="contact-custom-select-options">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <li key={option.value}>
                  <button
                    type="button"
                    className="contact-custom-select-option"
                    role="option"
                    aria-selected={option.value === value}
                    onClick={() => {
                      onChange(option.value)
                      closeMenu()
                    }}
                  >
                    {option.label}
                  </button>
                </li>
              ))
            ) : (
              <li className="contact-custom-select-empty">{emptyMessage}</li>
            )}
          </ul>
        </div>
      ) : null}
    </div>
  )
}

function FieldError({ message, show }: { message?: string; show: boolean }) {
  if (!show || !message) return null
  return (
    <span className="contact-field-error" role="alert">
      {message}
    </span>
  )
}

function showFieldError(touched: boolean | undefined, submitCount: number, error?: string) {
  return Boolean(error && (touched || submitCount > 0))
}

type ContactFormProps = {
  countries: readonly string[]
  onSuccess: () => void
}

export function ContactForm({ countries, onSuccess }: ContactFormProps) {
  const [submitError, setSubmitError] = useState<string | null>(null)

  async function handleSubmit(
    values: ContactFormValues,
    { setSubmitting }: FormikHelpers<ContactFormValues>
  ) {
    setSubmitError(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })

      const data = (await response.json().catch(() => ({}))) as { error?: string }

      if (!response.ok) {
        setSubmitError(data.error ?? 'Failed to submit. Please try again.')
        return
      }

      onSuccess()
    } catch {
      setSubmitError('Failed to submit. Please check your connection and try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Formik
      initialValues={contactFormInitialValues}
      validationSchema={contactFormSchema}
      onSubmit={handleSubmit}
      validateOnBlur
      validateOnChange={false}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        setFieldValue,
        setFieldTouched,
        isSubmitting,
        submitCount,
      }) => (
        <Form className="contact-form-card" aria-label="Contact form" noValidate>
          <div className="contact-form-grid">
            <label
              className={`contact-field${showFieldError(touched.firstName, submitCount, errors.firstName) ? ' contact-field--error' : ''}`}
            >
              <span>First Name*</span>
              <input
                type="text"
                name="firstName"
                autoComplete="given-name"
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={showFieldError(touched.firstName, submitCount, errors.firstName)}
              />
              <FieldError
                show={showFieldError(touched.firstName, submitCount, errors.firstName)}
                message={errors.firstName}
              />
            </label>

            <label
              className={`contact-field${showFieldError(touched.lastName, submitCount, errors.lastName) ? ' contact-field--error' : ''}`}
            >
              <span>Last Name*</span>
              <input
                type="text"
                name="lastName"
                autoComplete="family-name"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={showFieldError(touched.lastName, submitCount, errors.lastName)}
              />
              <FieldError
                show={showFieldError(touched.lastName, submitCount, errors.lastName)}
                message={errors.lastName}
              />
            </label>

            <label
              className={`contact-field${showFieldError(touched.jobTitle, submitCount, errors.jobTitle) ? ' contact-field--error' : ''}`}
            >
              <span>Job Title*</span>
              <input
                type="text"
                name="jobTitle"
                autoComplete="organization-title"
                value={values.jobTitle}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={showFieldError(touched.jobTitle, submitCount, errors.jobTitle)}
              />
              <FieldError
                show={showFieldError(touched.jobTitle, submitCount, errors.jobTitle)}
                message={errors.jobTitle}
              />
            </label>

            <label
              className={`contact-field${showFieldError(touched.businessEmail, submitCount, errors.businessEmail) ? ' contact-field--error' : ''}`}
            >
              <span>Business Email*</span>
              <input
                type="email"
                name="businessEmail"
                autoComplete="email"
                value={values.businessEmail}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={showFieldError(touched.businessEmail, submitCount, errors.businessEmail)}
              />
              <FieldError
                show={showFieldError(touched.businessEmail, submitCount, errors.businessEmail)}
                message={errors.businessEmail}
              />
            </label>

            <label className="contact-field">
              <span>Company</span>
              <input
                type="text"
                name="company"
                autoComplete="organization"
                value={values.company}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </label>

            <label
              className={`contact-field${showFieldError(touched.companyWebsite, submitCount, errors.companyWebsite) ? ' contact-field--error' : ''}`}
            >
              <span>Company Website</span>
              <input
                type="url"
                name="companyWebsite"
                autoComplete="url"
                placeholder="https://example.com"
                value={values.companyWebsite}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={showFieldError(touched.companyWebsite, submitCount, errors.companyWebsite)}
              />
              <FieldError
                show={showFieldError(touched.companyWebsite, submitCount, errors.companyWebsite)}
                message={errors.companyWebsite}
              />
            </label>

            <label
              className={`contact-field${showFieldError(touched.phone, submitCount, errors.phone) ? ' contact-field--error' : ''}`}
            >
              <span>Phone*</span>
              <input
                type="tel"
                name="phone"
                autoComplete="tel"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={showFieldError(touched.phone, submitCount, errors.phone)}
              />
              <FieldError
                show={showFieldError(touched.phone, submitCount, errors.phone)}
                message={errors.phone}
              />
            </label>

            <label
              className={`contact-field${showFieldError(touched.companySize, submitCount, errors.companySize) ? ' contact-field--error' : ''}`}
            >
              <span>Company size*</span>
              <ContactCustomSelect
                options={[
                  { label: '<500', value: '<500' },
                  { label: '>500', value: '>500' },
                ]}
                value={values.companySize}
                onChange={(value) => setFieldValue('companySize', value)}
                onBlur={() => setFieldTouched('companySize', true, true)}
                hasError={showFieldError(touched.companySize, submitCount, errors.companySize)}
              />
              <FieldError
                show={showFieldError(touched.companySize, submitCount, errors.companySize)}
                message={errors.companySize}
              />
            </label>
          </div>

          <label
            className={`contact-field contact-field-full${showFieldError(touched.countryRegion, submitCount, errors.countryRegion) ? ' contact-field--error' : ''}`}
          >
            <span>Country / Region*</span>
            <ContactCustomSelect
              searchable
              searchPlaceholder="Search countries..."
              emptyMessage="No countries found"
              options={countries.map((country) => ({
                label: country,
                value: country,
              }))}
              value={values.countryRegion}
              onChange={(value) => setFieldValue('countryRegion', value)}
              onBlur={() => setFieldTouched('countryRegion', true, true)}
              hasError={showFieldError(touched.countryRegion, submitCount, errors.countryRegion)}
            />
            <FieldError
              show={showFieldError(touched.countryRegion, submitCount, errors.countryRegion)}
              message={errors.countryRegion}
            />
          </label>

          <label
            className={`contact-field contact-field-full${showFieldError(touched.howDidYouHear, submitCount, errors.howDidYouHear) ? ' contact-field--error' : ''}`}
          >
            <span>How did you hear about us?</span>
            <textarea
              name="howDidYouHear"
              rows={3}
              value={values.howDidYouHear}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={showFieldError(touched.howDidYouHear, submitCount, errors.howDidYouHear)}
            />
            <FieldError
              show={showFieldError(touched.howDidYouHear, submitCount, errors.howDidYouHear)}
              message={errors.howDidYouHear}
            />
          </label>

          <p className="contact-legal">
            SIRP needs the contact information you provide to us to contact you about our products
            and services. You may unsubscribe from these communications at any time. For information
            on how to unsubscribe, as well as our privacy practices, and our commitment to protecting
            your privacy, please review our Privacy Policy.
          </p>

          <div className="contact-recaptcha">protected by reCAPTCHA</div>
          {submitError ? (
            <p className="contact-submit-error" role="alert">
              {submitError}
            </p>
          ) : null}
          <button type="submit" className="contact-submit" disabled={isSubmitting}>
            {isSubmitting ? 'Sending…' : 'Send'}
          </button>
        </Form>
      )}
    </Formik>
  )
}
