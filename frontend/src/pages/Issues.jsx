import { useEffect, useMemo, useState } from 'react'
import { FiFlag } from 'react-icons/fi'
import { Card } from '../components/Card.jsx'
import { apiFetch } from '../utils/api.js'
import { hasRole } from '../utils/auth.js'

function progressFor(status) {
  if (status === 'OPEN') return 0
  if (status === 'IN_PROGRESS') return 50
  if (status === 'RESOLVED') return 100
  return 0
}

export function Issues() {
  const isAdmin = hasRole('ADMIN')
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [saving, setSaving] = useState(false)

  const [resolutionNote, setResolutionNote] = useState('')

  const filtered = useMemo(() => (Array.isArray(items) ? items : []), [items])

  function refresh() {
    setLoading(true)
    setError('')
    return apiFetch('/api/issues')
      .then((data) => setItems(Array.isArray(data) ? data : []))
      .catch((e) => setError(e?.message || 'Failed to load issues'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function create(e) {
    e.preventDefault()
    setError('')
    setSaving(true)
    try {
      await apiFetch('/api/issues', { method: 'POST', body: { title, description } })
      setTitle('')
      setDescription('')
      await refresh()
    } catch (err) {
      setError(err?.message || 'Failed to create issue')
    } finally {
      setSaving(false)
    }
  }

  async function setStatus(id, status) {
    setError('')
    try {
      await apiFetch(`/api/issues/${id}/status`, {
        method: 'PUT',
        body: { status, resolutionNote: status === 'RESOLVED' ? resolutionNote : undefined },
      })
      setResolutionNote('')
      await refresh()
    } catch (err) {
      setError(err?.message || 'Failed to update issue')
    }
  }

  return (
    <div>
      <h1 className="pageTitle">Issue Tracking</h1>
      <p className="pageSub">Report problems and track progress.</p>

      {loading ? <div className="muted">Loading…</div> : null}
      {error ? <div className="muted">{error}</div> : null}

      <Card title="Raise an issue" icon={FiFlag}>
        <form className="formGrid" onSubmit={create}>
          <label className="label">
            Title
            <input
              className="input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Bus tracking wrong route, timetable missing, login issue…"
            />
          </label>
          <label className="label">
            Description
            <textarea
              className="input"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Steps to reproduce / what happened / what you expected…"
            />
          </label>
          <button type="submit" className="btn" disabled={saving}>
            {saving ? 'Submitting…' : 'Submit'}
          </button>
        </form>
      </Card>

      <div className="grid two" style={{ marginTop: 14 }}>
        {filtered.map((it) => {
          const pct = progressFor(it.status)
          return (
            <Card
              key={it.id}
              title={it.title}
              icon={FiFlag}
              right={<span className="pill">{it.status}</span>}
            >
              <div className="muted" style={{ fontSize: 13 }}>
                Progress: <strong style={{ color: 'var(--text)' }}>{pct}%</strong>
              </div>
              <div
                style={{
                  height: 10,
                  borderRadius: 999,
                  background: 'color-mix(in srgb, var(--border) 65%, transparent)',
                  marginTop: 8,
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: `${pct}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, var(--accent), var(--secondary))',
                  }}
                />
              </div>

              <div style={{ marginTop: 10, fontSize: 14 }}>{it.description}</div>

              <div className="muted" style={{ marginTop: 10, fontSize: 13 }}>
                Raised by <strong style={{ color: 'var(--text)' }}>{it.createdByEmail}</strong>
              </div>

              {it.status === 'RESOLVED' && it.resolutionNote ? (
                <div className="muted" style={{ marginTop: 10, fontSize: 13 }}>
                  Resolution: {it.resolutionNote}
                </div>
              ) : null}

              {isAdmin ? (
                <div style={{ marginTop: 12, display: 'grid', gap: 10 }}>
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    <button type="button" className="btn" onClick={() => setStatus(it.id, 'OPEN')}>
                      Mark open
                    </button>
                    <button type="button" className="btn" onClick={() => setStatus(it.id, 'IN_PROGRESS')}>
                      In progress
                    </button>
                    <button type="button" className="btn" onClick={() => setStatus(it.id, 'RESOLVED')}>
                      Resolve
                    </button>
                  </div>
                  <label className="label">
                    Resolution note (optional)
                    <textarea
                      className="input"
                      rows={2}
                      value={resolutionNote}
                      onChange={(e) => setResolutionNote(e.target.value)}
                      placeholder="What was fixed / next steps…"
                    />
                  </label>
                </div>
              ) : null}
            </Card>
          )
        })}
      </div>
    </div>
  )
}

