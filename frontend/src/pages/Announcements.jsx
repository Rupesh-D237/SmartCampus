import { useEffect, useState } from 'react'
import { FiBell } from 'react-icons/fi'
import { Card } from '../components/Card.jsx'
import { apiFetch } from '../utils/api.js'

export function Announcements() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let alive = true
    setLoading(true)
    setError('')
    apiFetch('/api/announcements')
      .then((data) => {
        if (!alive) return
        setItems(Array.isArray(data) ? data : [])
      })
      .catch((e) => {
        if (!alive) return
        setError(e?.message || 'Failed to load announcements')
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
      <h1 className="pageTitle">Announcements</h1>
      <p className="pageSub">Latest updates from the college and department.</p>

      {loading ? <div className="muted">Loading…</div> : null}
      {error ? <div className="muted">{error}</div> : null}

      <div className="grid">
        {items.map((a) => (
          <Card key={a.id} title={a.title} icon={FiBell} right={<span className="pill">New</span>}>
            <div style={{ fontSize: 14, color: 'var(--text)' }}>{a.message}</div>
            <div className="muted" style={{ marginTop: 10, fontSize: 13 }}>
              Posted by {a.postedBy}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

