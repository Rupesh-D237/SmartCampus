import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Card } from '../components/Card.jsx'
import { apiFetch } from '../utils/api.js'

export function Admin() {
  const [stats, setStats] = useState({ users: 0, announcements: 0 })
  const [error, setError] = useState('')

  useEffect(() => {
    let alive = true
    setError('')
    Promise.all([apiFetch('/api/admin/users'), apiFetch('/api/announcements')])
      .then(([users, announcements]) => {
        if (!alive) return
        setStats({
          users: Array.isArray(users) ? users.length : 0,
          announcements: Array.isArray(announcements) ? announcements.length : 0,
        })
      })
      .catch((e) => {
        if (!alive) return
        setError(e?.message || 'Failed to load admin data')
      })
    return () => {
      alive = false
    }
  }, [])

  return (
    <div>
      <h1 className="pageTitle">Admin</h1>
      <p className="pageSub">Manage events and users.</p>

      {error ? <div className="muted">{error}</div> : null}

      <div className="grid two">
        <Card title="Announcements" right={<span className="pill">{stats.announcements}</span>}>
          <div className="muted">Post and edit campus announcements.</div>
          <div style={{ marginTop: 12 }}>
            <Link className="btn" to="/app/admin/announcements">
              Manage announcements
            </Link>
          </div>
        </Card>

        <Card title="Events">
          <div className="muted">Create, edit, and delete campus events.</div>
          <div style={{ marginTop: 12 }}>
            <Link className="btn" to="/app/admin/events">
              Manage events
            </Link>
          </div>
        </Card>

        <Card title="Users" right={<span className="pill">{stats.users}</span>}>
          <div className="muted">View users, enable/disable accounts, and assign roles.</div>
          <div style={{ marginTop: 12 }}>
            <Link className="btn" to="/app/admin/users">
              Manage users
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}

