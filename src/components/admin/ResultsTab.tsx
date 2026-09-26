'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { ImagePlus, Loader2, Plus, Trash2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { deleteResultPhotos, uploadResultPhotos } from '@/lib/admin-upload'
import { AntesDespues, Medico } from '@/types/database'

export const RESULT_CATEGORIES = [
  'Lipoescultura HD',
  'Abdominoplastia',
  'Body Lifting',
  'Mommy Makeover',
  'Cirugía Mamaria',
  'Cirugía Glútea',
  'Cirugía Facial',
  'Medicina Estética',
]

type PhotoSlot = { file: File; preview: string } | null

function PhotoPicker({
  label,
  photo,
  onChange,
}: {
  label: string
  photo: PhotoSlot
  onChange: (photo: PhotoSlot) => void
}) {
  const [dragging, setDragging] = useState(false)

  function pick(file: File | undefined) {
    if (!file || !file.type.startsWith('image/')) return
    if (photo) URL.revokeObjectURL(photo.preview)
    onChange({ file, preview: URL.createObjectURL(file) })
  }

  return (
    <label
      onDragOver={(event) => {
        event.preventDefault()
        setDragging(true)
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(event) => {
        event.preventDefault()
        setDragging(false)
        pick(event.dataTransfer.files[0])
      }}
      className={`relative aspect-[4/3] rounded-2xl border-2 border-dashed overflow-hidden cursor-pointer flex items-center justify-center text-center transition-colors ${
        dragging ? 'border-doma-accent bg-doma-accent/5' : 'border-doma-light bg-surface hover:border-doma-violet/40'
      }`}
    >
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="sr-only"
        onChange={(event) => pick(event.target.files?.[0])}
      />
      {photo ? (
        // Local preview (blob URL), so next/image is not needed here.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={photo.preview} alt={label} className="absolute inset-0 w-full h-full object-cover" />
      ) : (
        <span className="px-4 text-sm text-doma-muted">
          <ImagePlus className="w-6 h-6 mx-auto mb-2 text-doma-violet" />
          Arrastrá o elegí la foto
        </span>
      )}
      <span className="absolute top-2 left-2 px-2.5 py-1 rounded-full bg-white/90 text-doma-dark text-xs font-bold uppercase">
        {label}
      </span>
    </label>
  )
}

export default function ResultsTab({
  medicos,
  onError,
}: {
  medicos: Medico[]
  onError: (message: string | null) => void
}) {
  const [results, setResults] = useState<AntesDespues[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [medicoId, setMedicoId] = useState('')
  const [titulo, setTitulo] = useState('')
  const [categoria, setCategoria] = useState(RESULT_CATEGORIES[0])
  const [before, setBefore] = useState<PhotoSlot>(null)
  const [after, setAfter] = useState<PhotoSlot>(null)

  const selectedMedicoId = medicoId || medicos[0]?.id || ''

  useEffect(() => {
    let cancelled = false
    supabase
      .from('antes_despues')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (cancelled) return
        if (error) onError(`No se pudieron cargar los resultados: ${error.message}`)
        setResults((data || []) as AntesDespues[])
        setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [onError])

  function resetForm() {
    if (before) URL.revokeObjectURL(before.preview)
    if (after) URL.revokeObjectURL(after.preview)
    setBefore(null)
    setAfter(null)
    setTitulo('')
  }

  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onError(null)
    if (!before || !after) {
      onError('Cargá la foto del antes y la del después.')
      return
    }
    if (!selectedMedicoId) {
      onError('Primero cargá al menos un profesional.')
      return
    }

    setSaving(true)
    let uploaded: string[] = []
    try {
      uploaded = await uploadResultPhotos([before.file, after.file])
      const { data, error } = await supabase
        .from('antes_despues')
        .insert({
          medico_id: selectedMedicoId,
          titulo: titulo.trim() || categoria,
          categoria,
          url_antes: uploaded[0],
          url_despues: uploaded[1],
        })
        .select('*')
        .single()
      if (error) throw new Error(error.message)
      setResults((prev) => [data as AntesDespues, ...prev])
      resetForm()
    } catch (saveError) {
      if (uploaded.length > 0) await deleteResultPhotos(uploaded).catch(() => undefined)
      onError(saveError instanceof Error ? saveError.message : 'No se pudo guardar el resultado.')
    } finally {
      setSaving(false)
    }
  }

  async function remove(result: AntesDespues) {
    if (!window.confirm(`¿Eliminar "${result.titulo}"? Se borran también sus fotos.`)) return
    onError(null)
    const { error } = await supabase.from('antes_despues').delete().eq('id', result.id)
    if (error) {
      onError(`No se pudo eliminar: ${error.message}`)
      return
    }
    await deleteResultPhotos([result.url_antes, result.url_despues]).catch(() => undefined)
    setResults((prev) => prev.filter((item) => item.id !== result.id))
  }

  const doctorName = (id: string) => medicos.find((medico) => medico.id === id)?.nombre ?? 'Sin profesional'

  return (
    <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
      <section className="xl:col-span-3 rounded-3xl bg-white border border-doma-light/40 shadow-sm overflow-hidden">
        <header className="px-6 py-5 border-b border-doma-light/30 flex items-center justify-between">
          <h2 className="text-lg font-black text-doma-dark">Antes y después</h2>
          <span className="text-xs font-semibold text-doma-muted">{results.length} casos</span>
        </header>
        <div className="divide-y divide-doma-light/20">
          {loading && <p className="p-6 text-sm text-doma-muted">Cargando…</p>}
          {!loading && results.length === 0 && (
            <p className="p-6 text-sm text-doma-muted">
              Todavía no hay casos cargados. Se muestran en la sección Resultados y en la página de cada
              profesional.
            </p>
          )}
          {results.map((result) => (
            <article key={result.id} className="p-5 flex items-center gap-4">
              <div className="flex gap-1.5 shrink-0">
                {[result.url_antes, result.url_despues].map((url, index) => (
                  <div key={url} className="relative w-20 aspect-[4/3] rounded-lg overflow-hidden bg-surface">
                    <Image src={url} alt={index === 0 ? 'Antes' : 'Después'} fill sizes="80px" className="object-cover" />
                  </div>
                ))}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-black text-doma-dark truncate">{result.titulo}</h3>
                <p className="text-sm text-doma-muted">
                  {result.categoria} · {doctorName(result.medico_id)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => remove(result)}
                aria-label={`Eliminar ${result.titulo}`}
                className="w-9 h-9 rounded-xl border border-red-200 text-red-600 inline-flex items-center justify-center hover:bg-red-50 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="xl:col-span-2 rounded-3xl bg-white border border-doma-light/40 shadow-sm p-6">
        <h2 className="text-lg font-black text-doma-dark mb-1">Nuevo caso</h2>
        <p className="text-sm text-doma-muted mb-5">
          Usá fotos horizontales con el mismo encuadre en el antes y el después. Se comprimen solas antes de
          subirse.
        </p>
        <form onSubmit={save} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <PhotoPicker label="Antes" photo={before} onChange={setBefore} />
            <PhotoPicker label="Después" photo={after} onChange={setAfter} />
          </div>
          <select
            value={categoria}
            onChange={(event) => setCategoria(event.target.value)}
            aria-label="Tratamiento"
            className="w-full px-4 py-3 rounded-xl border border-doma-light/60"
          >
            {RESULT_CATEGORIES.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          <select
            value={selectedMedicoId}
            onChange={(event) => setMedicoId(event.target.value)}
            aria-label="Profesional"
            className="w-full px-4 py-3 rounded-xl border border-doma-light/60"
          >
            {medicos.map((medico) => (
              <option key={medico.id} value={medico.id}>
                {medico.nombre}
              </option>
            ))}
          </select>
          <input
            value={titulo}
            onChange={(event) => setTitulo(event.target.value)}
            maxLength={80}
            placeholder="Título (opcional, por defecto el tratamiento)"
            className="w-full px-4 py-3 rounded-xl border border-doma-light/60"
          />
          <button
            type="submit"
            disabled={saving}
            className="btn-primary w-full inline-flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
            {saving ? 'Subiendo fotos…' : 'Agregar caso'}
          </button>
        </form>
      </section>
    </div>
  )
}
