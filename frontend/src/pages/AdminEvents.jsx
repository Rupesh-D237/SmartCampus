import { useEffect, useState } from 'react'
import { FiCalendar } from 'react-icons/fi'
import { Card } from '../components/Card.jsx'
import { apiFetch } from '../utils/api.js'

const empty = { title: '', dateLabel: '', location: '', description: '' }

export function AdminEvents() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [form, setForm] = useState(empty)

  function refresh() {
    setLoading(true)
    setError('')
    return apiFetch('/api/events')
      .then((data) => setItems(Array.isArray(data) ? data : []))
      .catch((e) => setError(e?.message || 'Failed to load events'))
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
      await apiFetch('/api/events', { method: 'POST', body: form })
      setForm(empty)
      await refresh()
    } catch (err) {
      setError(err?.message || 'Failed to create event')
    }
  }

  async function remove(id) {
    setError('')
    try {
      await apiFetch(`/api/events/${id}`, { method: 'DELETE' })
      await refresh()
    } catch (err) {
      setError(err?.message || 'Failed to delete event')
    }
  }

  return (
    <div>
      <h1 className="pageTitle">Admin • Events</h1>
      <p className="pageSub">Create and manage campus events.</p>

      {error ? <div className="muted">{error}</div> : null}

      <Card title="Create event" icon={FiCalendar}>
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
            Date label
            <input
              className="input"
              value={form.dateLabel}
              onChange={(e) => setForm((s) => ({ ...s, dateLabel: e.target.value }))}
              placeholder="April 15"
            />
          </label>
          <label className="label">
            Location
            <input
              className="input"
              value={form.location}
              onChange={(e) => setForm((s) => ({ ...s, location: e.target.value }))}
            />
          </label>
          <label className="label">
            Description
            <textarea
              className="input"
              value={form.description}
              onChange={(e) => setForm((s) => ({ ...s, description: e.target.value }))}
              rows={4}
            />
          </label>
          <button type="submit" className="btn">
            Create
          </button>
        </form>
      </Card>

      <div style={{ marginTop: 14 }}>
        {loading ? <div className="muted">Loading…</div> : null}
        <div className="grid two">
          {items.map((e) => (
            <Card
              key={e.id}
              title={e.title}
              icon={FiCalendar}
              right={<span className="pill">{e.dateLabel}</span>}
            >
              <div className="muted" style={{ fontSize: 13 }}>
                Location: <strong style={{ color: 'var(--text)' }}>{e.location}</strong>
              </div>
              <div style={{ marginTop: 10, fontSize: 14 }}>{e.description}</div>
              <div style={{ marginTop: 12 }}>
                <button type="button" className="btn" onClick={() => remove(e.id)}>
                  Delete
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

