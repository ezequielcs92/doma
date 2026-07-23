export const LEAD_LIMITS = {
  nombre: 100,
  email: 254,
  telefono: 30,
  mensaje: 2000,
  procedimiento: 100,
  medicoId: 100,
  turnstileToken: 2048,
} as const

export interface ValidatedLead {
  nombre: string
  email: string
  telefono: string
  mensaje: string
  procedimiento: string
  medico_id: string
  turnstileToken?: string
}

export type LeadValidationResult =
  | { success: true; data: ValidatedLead }
  | { success: false; error: string }

const ALLOWED_FIELDS = new Set([
  'nombre',
  'email',
  'telefono',
  'mensaje',
  'procedimiento',
  'medico_id',
  'website',
  'privacyAccepted',
  'cf-turnstile-response',
])

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function readString(
  input: Record<string, unknown>,
  field: string,
  maxLength: number,
  allowEmpty = false
): string | null {
  const value = input[field]
  if (typeof value !== 'string') return null

  const normalized = value.trim()
  if ((!allowEmpty && normalized.length === 0) || normalized.length > maxLength) {
    return null
  }

  return normalized
}

export function validateLeadInput(input: unknown): LeadValidationResult {
  if (!isRecord(input)) {
    return { success: false, error: 'El cuerpo de la solicitud no es valido.' }
  }

  if (Object.keys(input).some((field) => !ALLOWED_FIELDS.has(field))) {
    return { success: false, error: 'La solicitud contiene campos no permitidos.' }
  }

  const honeypot = input.website
  if (honeypot !== undefined && (typeof honeypot !== 'string' || honeypot.trim() !== '')) {
    return { success: false, error: 'La solicitud fue rechazada.' }
  }

  if (input.privacyAccepted !== true) {
    return { success: false, error: 'Debes aceptar la política de privacidad.' }
  }

  const nombre = readString(input, 'nombre', LEAD_LIMITS.nombre)
  if (
    nombre === null ||
    nombre.length < 2 ||
    !/^[\p{L}\p{M} .'-]+$/u.test(nombre) ||
    !/[\p{L}]/u.test(nombre)
  ) {
    return { success: false, error: 'Ingresa un nombre valido.' }
  }

  const email = readString(input, 'email', LEAD_LIMITS.email)
  if (
    email === null ||
    !/^[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9-]+(?:\.[A-Z0-9-]+)+$/i.test(email)
  ) {
    return { success: false, error: 'Ingresa un email valido.' }
  }

  const telefono = readString(input, 'telefono', LEAD_LIMITS.telefono)
  const phoneDigits = telefono?.replace(/\D/g, '') ?? ''
  if (
    telefono === null ||
    !/^[+()\d\s.-]+$/.test(telefono) ||
    phoneDigits.length < 7 ||
    phoneDigits.length > 15
  ) {
    return { success: false, error: 'Ingresa un telefono valido.' }
  }

  const mensaje = readString(input, 'mensaje', LEAD_LIMITS.mensaje, true)
  if (mensaje === null || /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(mensaje)) {
    return { success: false, error: 'El mensaje supera el limite permitido.' }
  }

  const procedimiento = readString(input, 'procedimiento', LEAD_LIMITS.procedimiento)
  if (procedimiento === null || !/^[\p{L}\p{M}\d .,'&()+/-]+$/u.test(procedimiento)) {
    return { success: false, error: 'Selecciona un procedimiento valido.' }
  }

  const medicoId = readString(input, 'medico_id', LEAD_LIMITS.medicoId)
  if (medicoId === null || !/^[A-Za-z0-9_-]+$/.test(medicoId)) {
    return { success: false, error: 'El medico indicado no es valido.' }
  }

  const rawTurnstileToken = input['cf-turnstile-response']
  let turnstileToken: string | undefined
  if (rawTurnstileToken !== undefined) {
    if (
      typeof rawTurnstileToken !== 'string' ||
      rawTurnstileToken.length === 0 ||
      rawTurnstileToken.length > LEAD_LIMITS.turnstileToken
    ) {
      return { success: false, error: 'No se pudo validar la proteccion anti-spam.' }
    }
    turnstileToken = rawTurnstileToken
  }

  return {
    success: true,
    data: {
      nombre,
      email: email.toLowerCase(),
      telefono,
      mensaje,
      procedimiento,
      medico_id: medicoId,
      turnstileToken,
    },
  }
}
