import { useEffect, useMemo, useState } from 'react'
import { Card } from '../components/Card.jsx'
import { apiFetch } from '../utils/api.js'

function roleLabel(roles) {
  const r = Array.isArray(roles) ? roles : []
  if (r.includes('ADMIN')) return 'ADMIN'
  return 'STUDENT'
}

export function AdminUsers() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return users
    return users.filter((u) => String(u.email || '').toLowerCase().includes(q))
  }, [users, query])

  function refresh() {
    setLoading(true)
    setError('')
    return apiFetch('/api/admin/users')
      .then((data) => setUsers(Array.isArray(data) ? data : []))
      .catch((e) => setError(e?.message || 'Failed to load users'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function toggleEnabled(u) {
    const next = !u.enabled
    try {
      await apiFetch(`/api/admin/users/${u.id}/enabled`, {
        method: 'PATCH',
        body: { enabled: next },
      })
      await refresh()
    } catch (e) {
      setError(e?.message || 'Update failed')
    }
  }

  async function toggleAdmin(u) {
    const roles = Array.isArray(u.roles) ? u.roles : []
    const nextRoles = roles.includes('ADMIN') ? ['STUDENT'] : ['ADMIN']
    try {
      await apiFetch(`/api/admin/users/${u.id}/roles`, {
        method: 'PATCH',
        body: { roles: nextRoles },
      })
      await refresh()
    } catch (e) {
      setError(e?.message || 'Update failed')
    }
  }

  return (
    <div>
      <h1 className="pageTitle">Admin • Users</h1>
      <p className="pageSub">Enable/disable accounts and assign admin access.</p>

      <div style={{ marginBottom: 12 }}>
        <input
          className="input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by email…"
          style={{ maxWidth: 420 }}
        />
      </div>

      {loading ? <div className="muted">Loading…</div> : null}
      {error ? <div className="muted">{error}</div> : null}

      <div className="grid two">
        {filtered.map((u) => (
          <Card
            key={u.id}
            title={u.email}
            right={
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <span className="pill">{roleLabel(u.roles)}</span>
                <span className="pill" style={{ opacity: u.enabled ? 1 : 0.6 }}>
                  {u.enabled ? 'ENABLED' : 'DISABLED'}
                </span>
              </div>
            }
          >
            <div className="muted" style={{ fontSize: 13 }}>
              User ID: <strong style={{ color: 'var(--text)' }}>{u.id}</strong>
            </div>

            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 12 }}>
              <button type="button" className="btn" onClick={() => toggleEnabled(u)}>
                {u.enabled ? 'Disable' : 'Enable'}
              </button>
              <button type="button" className="btn" onClick={() => toggleAdmin(u)}>
                {Array.isArray(u.roles) && u.roles.includes('ADMIN') ? 'Remove admin' : 'Make admin'}
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

