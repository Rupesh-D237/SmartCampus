import { useEffect, useMemo, useState } from 'react'
import { FiGrid } from 'react-icons/fi'
import { Card } from '../components/Card.jsx'
import { apiFetch } from '../utils/api.js'
import { hasRole } from '../utils/auth.js'

export function Timetable() {
  const isAdmin = hasRole('ADMIN')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [dataUrl, setDataUrl] = useState('')
  const [updatedAt, setUpdatedAt] = useState('')
  const [saving, setSaving] = useState(false)

  const updatedLabel = useMemo(() => {
    if (!updatedAt) return ''
    try {
      return new Date(updatedAt).toLocaleString()
    } catch {
      return String(updatedAt)
    }
  }, [updatedAt])

  function refresh() {
    setLoading(true)
    setError('')
    return apiFetch('/api/timetable')
      .then((res) => {
        setDataUrl(res?.imageDataUrl || '')
        setUpdatedAt(res?.updatedAt || '')
      })
      .catch((e) => setError(e?.message || 'Failed to load timetable'))
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

    const reader = new FileReader()
    const data = await new Promise((resolve, reject) => {
      reader.onerror = () => reject(new Error('Failed to read file'))
      reader.onload = () => resolve(String(reader.result || ''))
      reader.readAsDataURL(file)
    })

    setSaving(true)
    try {
      const res = await apiFetch('/api/timetable', {
        method: 'PUT',
        body: { imageDataUrl: data },
      })
      setDataUrl(res?.imageDataUrl || data)
      setUpdatedAt(res?.updatedAt || '')
    } catch (e) {
      setError(e?.message || 'Failed to save timetable')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <h1 className="pageTitle">Timetable</h1>
      <p className="pageSub">Class timetable (shared for everyone).</p>

      {loading ? <div className="muted">Loading…</div> : null}
      {error ? <div className="muted">{error}</div> : null}

      <Card
        title="Timetable"
        icon={FiGrid}
        right={updatedLabel ? <span className="pill">Updated: {updatedLabel}</span> : null}
      >
        {isAdmin ? (
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
            <label className="btn" style={{ cursor: saving ? 'not-allowed' : 'pointer' }}>
              {saving ? 'Saving…' : 'Upload new timetable image'}
              <input
                type="file"
                accept="image/*"
                disabled={saving}
                style={{ display: 'none' }}
                onChange={(e) => onPickFile(e.target.files?.[0])}
              />
            </label>
            <button type="button" className="btn" onClick={refresh} disabled={saving}>
              Refresh
            </button>
            <div className="muted" style={{ fontSize: 13 }}>
              Use your provided timetable image as reference by uploading it here.
            </div>
          </div>
        ) : (
          <div className="muted" style={{ fontSize: 13 }}>
            If the timetable is missing, ask an admin to upload it.
          </div>
        )}

        <div style={{ marginTop: 12 }}>
          {dataUrl ? (
            <img
              src={dataUrl}
              alt="Timetable"
              style={{
                width: '100%',
                borderRadius: 14,
                border: '1px solid var(--border)',
                background: 'var(--panel)',
              }}
            />
          ) : (
            <div className="muted" style={{ padding: 14 }}>
              No timetable uploaded yet.
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}

