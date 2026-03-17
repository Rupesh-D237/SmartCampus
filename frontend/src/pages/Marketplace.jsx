import { useEffect, useState } from 'react'
import { FiShoppingBag, FiTag } from 'react-icons/fi'
import { Card } from '../components/Card.jsx'
import { apiFetch } from '../utils/api.js'

export function Marketplace() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let alive = true
    setLoading(true)
    setError('')
    apiFetch('/api/marketplace')
      .then((data) => {
        if (!alive) return
        setItems(Array.isArray(data) ? data : [])
      })
      .catch((e) => {
        if (!alive) return
        setError(e?.message || 'Failed to load marketplace')
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
      <h1 className="pageTitle">Marketplace</h1>
      <p className="pageSub">Buy &amp; sell items with fellow students.</p>

      {loading ? <div className="muted">Loading…</div> : null}
      {error ? <div className="muted">{error}</div> : null}

      <div className="grid two">
        {items.map((p) => (
          <Card
            key={p.id}
            title={p.item}
            icon={FiShoppingBag}
            right={
              <span className="pill">
                <FiTag /> {p.priceLabel}
              </span>
            }
          >
            <div style={{ fontSize: 14 }}>{p.details}</div>
          </Card>
        ))}
      </div>
    </div>
  )
}

