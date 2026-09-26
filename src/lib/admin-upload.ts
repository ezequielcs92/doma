import { supabase } from '@/lib/supabase'

const MAX_SIDE = 1600
const QUALITY = 0.85

// Resizes to a 1600 px longest side and re-encodes as WebP in the browser, so
// a 6 MB phone photo uploads as a few hundred KB.
export async function compressImage(file: File): Promise<Blob> {
  const bitmap = await createImageBitmap(file)
  const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height))
  const width = Math.round(bitmap.width * scale)
  const height = Math.round(bitmap.height * scale)

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const context = canvas.getContext('2d')
  if (!context) throw new Error('El navegador no permite procesar imagenes.')
  context.drawImage(bitmap, 0, 0, width, height)
  bitmap.close()

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error('No se pudo comprimir la imagen.'))),
      'image/webp',
      QUALITY
    )
  })
}

async function authHeaders() {
  const { data } = await supabase.auth.getSession()
  const token = data.session?.access_token
  if (!token) throw new Error('La sesion expiro. Volve a ingresar.')
  return { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
}

// Compresses and uploads the files; returns their public URLs in order.
export async function uploadResultPhotos(files: File[]): Promise<string[]> {
  const response = await fetch('/api/admin/storage', {
    method: 'POST',
    headers: await authHeaders(),
    body: JSON.stringify({ count: files.length }),
  })
  const result: unknown = await response.json().catch(() => null)
  if (!response.ok || typeof result !== 'object' || result === null || !('targets' in result)) {
    throw new Error('No se pudo preparar la subida de fotos.')
  }

  const { bucket, targets } = result as {
    bucket: string
    targets: Array<{ path: string; token: string; publicUrl: string }>
  }

  return Promise.all(
    files.map(async (file, index) => {
      const target = targets[index]
      const blob = await compressImage(file)
      const { error } = await supabase.storage
        .from(bucket)
        .uploadToSignedUrl(target.path, target.token, blob, { contentType: 'image/webp' })
      if (error) throw new Error(`No se pudo subir ${file.name}.`)
      return target.publicUrl
    })
  )
}

export async function deleteResultPhotos(urls: string[]) {
  await fetch('/api/admin/storage', {
    method: 'DELETE',
    headers: await authHeaders(),
    body: JSON.stringify({ urls }),
  })
}
