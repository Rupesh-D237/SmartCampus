import { FiMap, FiTruck } from 'react-icons/fi'
import { Card } from '../components/Card.jsx'
import { demoBusRoute } from '../data/demoData.js'

export function BusTracking() {
  return (
    <div>
      <h1 className="pageTitle">Bus Tracking</h1>
      <p className="pageSub">Live campus bus status (demo).</p>

      <div className="grid two">
        <Card title={demoBusRoute.routeName} icon={FiTruck} right={<span className="pill">Active</span>}>
          <div className="muted" style={{ fontSize: 13, fontWeight: 800 }}>
            Stops
          </div>
          <ol style={{ margin: '10px 0 0', paddingLeft: 18, display: 'grid', gap: 6 }}>
            {demoBusRoute.stops.map((s) => (
              <li key={s} style={{ fontSize: 14 }}>
                {s}
              </li>
            ))}
          </ol>
        </Card>

        <Card title="Bus Status" icon={FiMap}>
          <div style={{ fontSize: 14, fontWeight: 800 }}>{demoBusRoute.status}</div>
          <div className="muted" style={{ marginTop: 10, fontSize: 13 }}>
            Tip: In the real version, this would be connected to GPS / telemetry.
          </div>
        </Card>
      </div>
    </div>
  )
}

