import { describe, it, expect } from 'vitest'
import { createAdminSchema } from '../createAdminSchema'

const base = { email: 'teammate@sirp.io', password: 'Passw0rd' }

describe('createAdminSchema', () => {
  it('accepts a valid submission and lower-cases the email', async () => {
    const out = await createAdminSchema.validate({ ...base, email: 'Teammate@SIRP.io' })
    expect(out.email).toBe('teammate@sirp.io')
  })

  it('requires a valid email', async () => {
    await expect(createAdminSchema.validate({ ...base, email: 'not-an-email' })).rejects.toThrow(/valid email/i)
  })

  it('rejects a password under 8 characters', async () => {
    await expect(createAdminSchema.validate({ ...base, password: 'ab1' })).rejects.toThrow(/8 characters/i)
  })

  it('rejects a password with no letter', async () => {
    await expect(createAdminSchema.validate({ ...base, password: '12345678' })).rejects.toThrow(/letter/i)
  })

  it('rejects a password with no number', async () => {
    await expect(createAdminSchema.validate({ ...base, password: 'abcdefgh' })).rejects.toThrow(/number/i)
  })
})
