import type { ValidatedLead } from '@/lib/lead-validation'

// Email alert for every new lead, sent through Resend (https://resend.com).
// Configure in Vercel and .env.local:
//   RESEND_API_KEY           API key from Resend
//   LEAD_NOTIFICATION_EMAIL  where alerts go (comma-separated for several)
//   LEAD_NOTIFICATION_FROM   verified sender, e.g. "DOMA Web <web@domasculptcenter.com>"
// If any value is missing the alert is skipped; the lead is still stored.

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export function buildLeadEmail(lead: ValidatedLead) {
  const rows: Array<[string, string]> = [
    ['Nombre', lead.nombre],
    ['Email', lead.email],
    ['Teléfono', lead.telefono],
    ['Tratamiento', lead.procedimiento],
    ['Origen', lead.medico_id === 'web-general' ? 'Formulario general' : `Página de médico (${lead.medico_id})`],
    ['Mensaje', lead.mensaje || '—'],
  ]

  const subject = `Nueva consulta web: ${lead.nombre} – ${lead.procedimiento}`
  const text = rows.map(([label, value]) => `${label}: ${value}`).join('\n')
  const html = `<h2>Nueva consulta desde la web</h2><table cellpadding="6">${rows
    .map(
      ([label, value]) =>
        `<tr><td><strong>${escapeHtml(label)}</strong></td><td>${escapeHtml(value).replace(/\n/g, '<br>')}</td></tr>`
    )
    .join('')}</table>`

  return { subject, text, html }
}

export async function sendLeadNotification(lead: ValidatedLead) {
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.LEAD_NOTIFICATION_EMAIL
  const from = process.env.LEAD_NOTIFICATION_FROM
  if (!apiKey || !to || !from) return

  const { subject, text, html } = buildLeadEmail(lead)
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: to.split(',').map((address) => address.trim()).filter(Boolean),
      reply_to: lead.email,
      subject,
      text,
      html,
    }),
    signal: AbortSignal.timeout(5000),
    cache: 'no-store',
  })

  if (!response.ok) {
    console.error('Lead notification failed', response.status, await response.text().catch(() => ''))
  }
}
