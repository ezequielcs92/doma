'use client'

import { useMemo, useState } from 'react'
import { Download, MessageCircle, Search } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { Lead, Medico } from '@/types/database'

export const LEAD_STATUSES = [
  { value: 'pendiente', label: 'Pendiente', tone: 'bg-amber-100 text-amber-800' },
  { value: 'contactado', label: 'Contactado', tone: 'bg-sky-100 text-sky-800' },
  { value: 'cerrado', label: 'Cerrado', tone: 'bg-emerald-100 text-emerald-800' },
] as const

const CLICK_ID_LINE = /^(gclid|gbraid|wbraid): (\S+)$/m

function parseMessage(mensaje: string) {
  const lines = mensaje.split('\n')
  const procedure = lines[0]?.replace(/^Procedimiento de interes:\s*/, '') ?? ''
  const clickId = CLICK_ID_LINE.exec(mensaje)?.[2] ?? ''
  const text = lines
    .slice(1)
    .filter((line) => !CLICK_ID_LINE.test(line))
    .join('\n')
    .trim()
  return { procedure, clickId, text }
}

function whatsappLink(phone: string) {
  const digits = phone.replace(/\D/g, '')
  const international = digits.startsWith('54') ? digits : `549${digits.replace(/^0/, '')}`
  return `https://wa.me/${international}`
}

function toCsv(rows: string[][]) {
  return rows
    .map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(','))
    .join('\r\n')
}

export default function LeadsTab({
  leads,
  medicos,
  onLeadsChange,
  onError,
}: {
  leads: Lead[]
  medicos: Medico[]
  onLeadsChange: (leads: Lead[]) => void
  onError: (message: string | null) => void
}) {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('todos')
  const [onlyAds, setOnlyAds] = useState(false)
  const [savingId, setSavingId] = useState<string | null>(null)

  const doctorNames = useMemo(
    () => Object.fromEntries(medicos.map((medico) => [medico.id, medico.nombre])),
    [medicos]
  )

  const rows = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return leads
      .map((lead) => ({ lead, parsed: parseMessage(lead.mensaje || '') }))
      .filter(({ lead, parsed }) => {
        if (status !== 'todos' && (lead.status || 'pendiente') !== status) return false
        if (onlyAds && !parsed.clickId) return false
        if (!needle) return true
        return [lead.nombre, lead.email, lead.telefono, parsed.procedure]
          .join(' ')
          .toLowerCase()
          .includes(needle)
      })
  }, [leads, query, status, onlyAds])

  function originLabel(medicoId: string) {
    if (medicoId === 'web-general') return 'Formulario general'
    return doctorNames[medicoId] ? `Página de ${doctorNames[medicoId]}` : medicoId
  }

  async function changeStatus(lead: Lead, nextStatus: string) {
    if (!lead.id) return
    onError(null)
    setSavingId(lead.id)
    const { error } = await supabase.from('leads').update({ status: nextStatus }).eq('id', lead.id)
    setSavingId(null)
    if (error) {
      onError(`No se pudo actualizar la consulta: ${error.message}`)
      return
    }
    onLeadsChange(leads.map((item) => (item.id === lead.id ? { ...item, status: nextStatus } : item)))
  }

  function exportCsv() {
    const header = ['Fecha', 'Nombre', 'Teléfono', 'Email', 'Tratamiento', 'Origen', 'Estado', 'gclid', 'Mensaje']
    const body = rows.map(({ lead, parsed }) => [
      lead.created_at ? new Date(lead.created_at).toLocaleString('es-AR') : '',
      lead.nombre,
      lead.telefono,
      lead.email,
      parsed.procedure,
      originLabel(lead.medico_id),
      lead.status || 'pendiente',
      parsed.clickId,
      parsed.text,
    ])
    const blob = new Blob(['﻿' + toCsv([header, ...body])], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `consultas-doma-${new Date().toISOString().slice(0, 10)}.csv`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <section className="rounded-3xl bg-white border border-doma-light/40 shadow-sm overflow-hidden">
      <header className="px-6 py-5 border-b border-doma-light/30 flex flex-wrap items-center gap-3 justify-between">
        <div>
          <h2 className="text-lg font-black text-doma-dark">Consultas</h2>
          <p className="text-xs font-semibold text-doma-muted">
            {rows.length} de {leads.length} consultas
          </p>
        </div>
        <button
          type="button"
          onClick={exportCsv}
          disabled={rows.length === 0}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-doma-light/60 text-sm font-bold text-doma-violet hover:bg-doma-light/30 disabled:opacity-40"
        >
          <Download className="w-4 h-4" />
          Exportar CSV
        </button>
      </header>

      <div className="px-6 py-4 border-b border-doma-light/30 flex flex-wrap gap-3 items-center">
        <label className="relative flex-1 min-w-[220px]">
          <Search className="w-4 h-4 text-doma-muted absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar por nombre, teléfono, email o tratamiento"
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-doma-light/60 text-sm"
          />
        </label>
        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          className="px-3 py-2.5 rounded-xl border border-doma-light/60 text-sm font-semibold text-doma-dark"
          aria-label="Filtrar por estado"
        >
          <option value="todos">Todos los estados</option>
          {LEAD_STATUSES.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <label className="inline-flex items-center gap-2 text-sm font-semibold text-doma-dark">
          <input
            type="checkbox"
            checked={onlyAds}
            onChange={(event) => setOnlyAds(event.target.checked)}
            className="h-4 w-4 accent-doma-violet"
          />
          Solo Google Ads
        </label>
      </div>

      <div className="divide-y divide-doma-light/20">
        {rows.length === 0 && <p className="p-6 text-sm text-doma-muted">No hay consultas con esos filtros.</p>}
        {rows.map(({ lead, parsed }) => (
          <article key={lead.id} className="p-6 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-start">
            <div className="space-y-2 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-black text-doma-dark">{lead.nombre}</h3>
                {parsed.procedure && (
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-doma-light/40 text-doma-violet">
                    {parsed.procedure}
                  </span>
                )}
                {parsed.clickId && (
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-doma-accent/15 text-teal-800">
                    Google Ads
                  </span>
                )}
              </div>
              <p className="text-sm text-doma-muted">
                {lead.created_at ? new Date(lead.created_at).toLocaleString('es-AR') : ''} ·{' '}
                {originLabel(lead.medico_id)}
              </p>
              <p className="text-sm text-doma-dark">
                {lead.telefono}
                {lead.email ? ` · ${lead.email}` : ''}
              </p>
              {parsed.text && (
                <p className="text-sm text-doma-muted whitespace-pre-line bg-surface rounded-xl p-3">{parsed.text}</p>
              )}
            </div>
            <div className="flex flex-wrap gap-2 lg:justify-end">
              <a
                href={whatsappLink(lead.telefono)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-[#25D366] text-white text-sm font-bold"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
              <select
                value={lead.status || 'pendiente'}
                disabled={savingId === lead.id}
                onChange={(event) => changeStatus(lead, event.target.value)}
                aria-label={`Estado de la consulta de ${lead.nombre}`}
                className={`px-3 py-2 rounded-xl text-sm font-bold border-0 ${
                  LEAD_STATUSES.find((item) => item.value === (lead.status || 'pendiente'))?.tone ??
                  'bg-doma-light/40 text-doma-violet'
                }`}
              >
                {LEAD_STATUSES.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
