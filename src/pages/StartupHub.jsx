import { FiZap } from 'react-icons/fi'
import { Card } from '../components/Card.jsx'
import { demoStartup } from '../data/demoData.js'

export function StartupHub() {
  return (
    <div>
      <h1 className="pageTitle">Startup Hub</h1>
      <p className="pageSub">Explore campus startup ideas and find teammates.</p>

      <Card title={demoStartup.name} icon={FiZap} right={<span className="pill">Idea</span>}>
        <div style={{ fontSize: 14 }}>{demoStartup.description}</div>
        <div style={{ marginTop: 12, display: 'grid', gap: 8 }}>
          <div className="muted" style={{ fontSize: 13, fontWeight: 800 }}>
            Skills Needed
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {demoStartup.skillsNeeded.map((s) => (
              <span key={s} className="pill">
                {s}
              </span>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
}

