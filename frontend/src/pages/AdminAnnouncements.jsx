import { useEffect, useState } from 'react'
import { FiBell } from 'react-icons/fi'
import { Card } from '../components/Card.jsx'
import { apiFetch } from '../utils/api.js'

const empty = { title: '', message: '', postedBy: '' }

export function AdminAnnouncements() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [form, setForm] = useState(empty)

  function refresh() {
    setLoading(true)
    setError('')
    return apiFetch('/api/announcements')
      .then((data) => setItems(Array.isArray(data) ? data : []))
      .catch((e) => setError(e?.message || 'Failed to load announcements'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function create(e) {
    e.preventDefault()
    setError('')
    try {
      await apiFetch('/api/announcements', { method: 'POST', body: form })
      setForm(empty)
      await refresh()
    } catch (err) {
      setError(err?.message || 'Failed to create announcement')
    }
  }

  async function remove(id) {
    setError('')
    try {
      await apiFetch(`/api/announcements/${id}`, { method: 'DELETE' })
      await refresh()
    } catch (err) {
      setError(err?.message || 'Failed to delete announcement')
    }
  }

  return (
    <div>
      <h1 className="pageTitle">Admin • Announcements</h1>
      <p className="pageSub">Create and manage announcements.</p>

      {error ? <div className="muted">{error}</div> : null}

      <Card title="Create announcement" icon={FiBell}>
        <form className="formGrid" onSubmit={create}>
          <label className="label">
            Title
            <input
              className="input"
              value={form.title}
              onChange={(e) => setForm((s) => ({ ...s, title: e.target.value }))}
            />
          </label>
          <label className="label">
            Message
            <textarea
              className="input"
              rows={4}
              value={form.message}
              onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
            />
          </label>
          <label className="label">
            Posted by
            <input
              className="input"
              value={form.postedBy}
              onChange={(e) => setForm((s) => ({ ...s, postedBy: e.target.value }))}
              placeholder="Faculty / Office"
            />
          </label>
          <button type="submit" className="btn">
            Publish
          </button>
        </form>
      </Card>

      <div style={{ marginTop: 14 }}>
        {loading ? <div className="muted">Loading…</div> : null}
        <div className="grid">
          {items.map((a) => (
            <Card
              key={a.id}
              title={a.title}
              icon={FiBell}
              right={<button className="btn" type="button" onClick={() => remove(a.id)}>Delete</button>}
            >
              <div style={{ fontSize: 14, color: 'var(--text)' }}>{a.message}</div>
              <div className="muted" style={{ marginTop: 10, fontSize: 13 }}>
                Posted by {a.postedBy}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

