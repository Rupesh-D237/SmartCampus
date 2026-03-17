import { useEffect, useState } from 'react'
import { FiCalendar } from 'react-icons/fi'
import { Card } from '../components/Card.jsx'
import { apiFetch } from '../utils/api.js'

export function Events() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let alive = true
    setLoading(true)
    setError('')
    apiFetch('/api/events')
      .then((data) => {
        if (!alive) return
        setItems(Array.isArray(data) ? data : [])
      })
      .catch((e) => {
        if (!alive) return
        setError(e?.message || 'Failed to load events')
      })
      .finally(() => {
        if (!alive) return
        setLoading(false)
      })
    return () => {
      alive = false
    }
  }, [])

  return (
    <div>
      <h1 className="pageTitle">Events</h1>
      <p className="pageSub">Upcoming events at Sri Sairam Engineering College.</p>

      {loading ? <div className="muted">Loading…</div> : null}
      {error ? <div className="muted">{error}</div> : null}

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
          </Card>
        ))}
      </div>
    </div>
  )
}

