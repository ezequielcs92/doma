import { NextResponse } from 'next/server'

import { validateLeadInput } from '@/lib/lead-validation'
import { createSupabaseAdminClient } from '@/lib/supabase-admin'

export const runtime = 'nodejs'

const MAX_BODY_LENGTH = 16_384
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT_MAX_REQUESTS = 5
const RATE_LIMIT_MAX_ENTRIES = 10_000

interface RateLimitEntry {
  count: number
  resetAt: number
}

const globalRateLimit = globalThis as typeof globalThis & {
  leadRateLimit?: Map<string, RateLimitEntry>
}

const rateLimit = globalRateLimit.leadRateLimit ?? new Map<string, RateLimitEntry>()
globalRateLimit.leadRateLimit = rateLimit

function getClientIp(request: Request): string {
  return (
    request.headers.get('cf-connecting-ip') ||
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  )
}

function checkRateLimit(ip: string): { allowed: boolean; retryAfter: number } {
  const now = Date.now()
  const current = rateLimit.get(ip)

  if (!current || current.resetAt <= now) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return { allowed: true, retryAfter: 0 }
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return {
      allowed: false,
      retryAfter: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
    }
  }

  current.count += 1

  if (rateLimit.size > RATE_LIMIT_MAX_ENTRIES) {
    for (const [key, entry] of rateLimit) {
      if (entry.resetAt <= now) rateLimit.delete(key)
    }

    while (rateLimit.size > RATE_LIMIT_MAX_ENTRIES) {
      const oldestKey = rateLimit.keys().next().value
      if (typeof oldestKey !== 'string') break
      rateLimit.delete(oldestKey)
    }
  }

  return { allowed: true, retryAfter: 0 }
}

async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) return true

  const body = new URLSearchParams({ secret, response: token })
  if (ip !== 'unknown') body.set('remoteip', ip)

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body,
    signal: AbortSignal.timeout(5000),
    cache: 'no-store',
  })
  if (!response.ok) return false

  const result: unknown = await response.json()
  return (
    typeof result === 'object' &&
    result !== null &&
    'success' in result &&
    result.success === true
  )
}

function errorResponse(error: string, status: number, headers?: HeadersInit) {
  return NextResponse.json({ error }, { status, headers })
}

export async function POST(request: Request) {
  const ip = getClientIp(request)
  const limit = checkRateLimit(ip)
  if (!limit.allowed) {
    return errorResponse(
      'Demasiados intentos. Espera unos minutos antes de volver a enviar.',
      429,
      { 'Retry-After': String(limit.retryAfter) }
    )
  }

  if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) {
    return errorResponse('El contenido debe enviarse como JSON.', 415)
  }

  const declaredLength = Number(request.headers.get('content-length'))
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_LENGTH) {
    return errorResponse('La solicitud supera el limite permitido.', 413)
  }

  let input: unknown
  try {
    const rawBody = await request.text()
    if (rawBody.length > MAX_BODY_LENGTH) {
      return errorResponse('La solicitud supera el limite permitido.', 413)
    }
    input = JSON.parse(rawBody)
  } catch {
    return errorResponse('El JSON enviado no es valido.', 400)
  }

  const validation = validateLeadInput(input)
  if (!validation.success) {
    return errorResponse(validation.error, 400)
  }

  if (process.env.TURNSTILE_SECRET_KEY && !validation.data.turnstileToken) {
    return errorResponse('Completa la validacion anti-spam.', 400)
  }

  try {
    const turnstileValid = await verifyTurnstile(validation.data.turnstileToken ?? '', ip)
    if (!turnstileValid) {
      return errorResponse('No se pudo validar la proteccion anti-spam.', 403)
    }

    const { error } = await createSupabaseAdminClient().from('leads').insert({
      nombre: validation.data.nombre,
      email: validation.data.email,
      telefono: validation.data.telefono,
      mensaje: `Procedimiento de interes: ${validation.data.procedimiento}\n${validation.data.mensaje}`.trim(),
      medico_id: validation.data.medico_id,
    })

    if (error) {
      return errorResponse('No se pudo guardar la consulta. Intenta nuevamente.', 500)
    }

    return NextResponse.json({ success: true }, { status: 201 })
  } catch {
    return errorResponse('El servicio no esta disponible temporalmente.', 503)
  }
}
