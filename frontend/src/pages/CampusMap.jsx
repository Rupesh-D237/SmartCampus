import { FiMapPin } from 'react-icons/fi'
import { Card } from '../components/Card.jsx'
import { demoCampusLocations } from '../data/demoData.js'

export function CampusMap() {
  return (
    <div>
      <h1 className="pageTitle">Campus Map</h1>
      <p className="pageSub">Key locations around the campus.</p>

      <div className="grid cards">
        {demoCampusLocations.map((loc) => (
          <Card key={loc} title={loc} icon={FiMapPin} right={<span className="pill">Location</span>}>
            <div className="muted" style={{ fontSize: 13 }}>
              Tap to view details (demo).
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

