import { useEffect, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { Card } from '../components/Card.jsx'
import { apiFetch } from '../utils/api.js'
import { hasRole } from '../utils/auth.js'

export function LostFound() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  const [item, setItem] = useState('')
  const [details, setDetails] = useState('')
  const [imageDataUrl, setImageDataUrl] = useState('')

  function refresh() {
    setLoading(true)
    setError('')
    return apiFetch('/api/lost-found')
      .then((data) => setItems(Array.isArray(data) ? data : []))
      .catch((e) => setError(e?.message || 'Failed to load lost & found'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function onPickFile(file) {
    if (!file) return
    setError('')

    const ok = String(file.type || '').startsWith('image/')
    if (!ok) {
      setError('Please select an image file')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Image is too large. Please choose a file under 5MB.')
      return
    }

    try {
      const data = await compressImageToDataUrl(file, { maxEdge: 1280, quality: 0.82 })
      setImageDataUrl(data)
    } catch (e) {
      setError(e?.message || 'Failed to process image')
    }
  }

  async function submit(e) {
    e.preventDefault()
    setError('')
    setSaving(true)
    try {
      await apiFetch('/api/lost-found', {
        method: 'POST',
        body: { item, details, imageDataUrl },
      })
      setItem('')
      setDetails('')
      setImageDataUrl('')
      await refresh()
    } catch (err) {
      setError(err?.message || 'Failed to post item')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <h1 className="pageTitle">Lost &amp; Found</h1>
      <p className="pageSub">Report and track items around campus.</p>

      {loading ? <div className="muted">Loading…</div> : null}
      {error ? <div className="muted">{error}</div> : null}

      <Card title="Report an item" icon={FiSearch}>
        <form className="formGrid" onSubmit={submit}>
          <label className="label">
            Item
            <input
              className="input"
              value={item}
              onChange={(e) => setItem(e.target.value)}
              placeholder="Black backpack, Calculator, ID card…"
            />
          </label>

          <label className="label">
            Details (optional if image uploaded)
            <textarea
              className="input"
              rows={3}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Where/when found or lost, contact details…"
            />
          </label>

          <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
            <label className="btn" style={{ cursor: saving ? 'not-allowed' : 'pointer' }}>
              Upload image (optional)
              <input
                type="file"
                accept="image/*"
                disabled={saving}
                style={{ display: 'none' }}
                onChange={(e) => onPickFile(e.target.files?.[0])}
              />
            </label>
            {imageDataUrl ? <span className="pill">Image selected</span> : <span className="pill">No image</span>}
          </div>

          {imageDataUrl ? (
            <img
              src={imageDataUrl}
              alt="Preview"
              style={{
                width: '100%',
                maxWidth: 520,
                borderRadius: 14,
                border: '1px solid var(--border)',
                background: 'var(--panel)',
              }}
            />
          ) : null}

          <button type="submit" className="btn" disabled={saving}>
            {saving ? 'Posting…' : 'Post'}
          </button>
        </form>
      </Card>

      <div className="grid two">
        {items.map((i) => (
          <Card key={i.id} title={i.item} icon={FiSearch}>
            {i.imageDataUrl ? (
              <img
                src={i.imageDataUrl}
                alt={i.item}
                style={{
                  width: '100%',
                  borderRadius: 14,
                  border: '1px solid var(--border)',
                  background: 'var(--panel)',
                  marginBottom: 10,
                }}
              />
            ) : null}
            {i.details ? <div style={{ fontSize: 14 }}>{i.details}</div> : <div className="muted">No details</div>}
          </Card>
        ))}
      </div>
    </div>
  )
}

async function compressImageToDataUrl(file, { maxEdge = 1280, quality = 0.82 } = {}) {
  const bitmap = await createImageBitmap(file)

  const { width, height } = bitmap
  const scale = Math.min(1, maxEdge / Math.max(width, height))
  const outW = Math.max(1, Math.round(width * scale))
  const outH = Math.max(1, Math.round(height * scale))

  const canvas = document.createElement('canvas')
  canvas.width = outW
  canvas.height = outH
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Canvas not supported')

  ctx.drawImage(bitmap, 0, 0, outW, outH)

  // JPEG is much smaller than PNG for photos
  const dataUrl = canvas.toDataURL('image/jpeg', quality)
  if (!dataUrl.startsWith('data:image/')) throw new Error('Invalid image')
  return dataUrl
}

