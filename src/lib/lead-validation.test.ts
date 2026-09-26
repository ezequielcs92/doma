import { describe, expect, it } from 'vitest'

import { LEAD_LIMITS, validateLeadInput } from './lead-validation'

const validLead = {
  nombre: 'Maria Perez',
  email: 'maria@example.com',
  telefono: '+54 9 11 3025-3305',
  mensaje: 'Quiero coordinar una evaluacion.',
  procedimiento: 'Lipoescultura HD',
  medico_id: 'web-general',
  website: '',
  privacyAccepted: true,
}

describe('validateLeadInput', () => {
  it('normalizes a valid lead', () => {
    const result = validateLeadInput({
      ...validLead,
      nombre: '  Maria Perez  ',
      email: 'MARIA@EXAMPLE.COM',
    })

    expect(result).toEqual({
      success: true,
      data: {
        nombre: 'Maria Perez',
        email: 'maria@example.com',
        telefono: '+54 9 11 3025-3305',
        mensaje: 'Quiero coordinar una evaluacion.',
        procedimiento: 'Lipoescultura HD',
        medico_id: 'web-general',
        turnstileToken: undefined,
      },
    })
  })

  it('rejects submissions without privacy consent', () => {
    const result = validateLeadInput({ ...validLead, privacyAccepted: false })

    expect(result).toEqual({
      success: false,
      error: 'Debes aceptar la política de privacidad.',
    })
  })

  it('rejects honeypot submissions', () => {
    const result = validateLeadInput({ ...validLead, website: 'spam.example' })

    expect(result.success).toBe(false)
  })

  it('rejects unexpected fields', () => {
    const result = validateLeadInput({ ...validLead, role: 'admin' })

    expect(result.success).toBe(false)
  })

  it('enforces message length limits', () => {
    const result = validateLeadInput({
      ...validLead,
      mensaje: 'a'.repeat(LEAD_LIMITS.mensaje + 1),
    })

    expect(result.success).toBe(false)
  })

  it('accepts a lead without email', () => {
    const withoutEmail: Record<string, unknown> = { ...validLead }
    delete withoutEmail.email
    const result = validateLeadInput(withoutEmail)

    expect(result.success).toBe(true)
    if (result.success) expect(result.data.email).toBe('')
  })

  it('rejects an invalid email when present', () => {
    expect(validateLeadInput({ ...validLead, email: 'not-an-email' })).toEqual({
      success: false,
      error: 'Ingresa un email valido.',
    })
  })

  it('keeps a valid Google Ads click id', () => {
    const result = validateLeadInput({ ...validLead, gclid: 'Cj0KCQjw_abc-123' })

    expect(result.success).toBe(true)
    if (result.success) expect(result.data.clickId).toEqual({ type: 'gclid', value: 'Cj0KCQjw_abc-123' })
  })

  it('rejects a malformed click id', () => {
    expect(validateLeadInput({ ...validLead, gclid: 'bad value<script>' }).success).toBe(false)
  })
})
