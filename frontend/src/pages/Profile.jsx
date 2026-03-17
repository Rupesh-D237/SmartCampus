import { FiMapPin, FiUser } from 'react-icons/fi'
import { Card } from '../components/Card.jsx'
import { demoStudent } from '../data/demoData.js'
import { getUser, hasRole } from '../utils/auth.js'

export function Profile() {
  const user = getUser()
  const email = user?.email || demoStudent.email
  const roles = Array.isArray(user?.roles) ? user.roles : []

  return (
    <div>
      <h1 className="pageTitle">Profile</h1>
      <p className="pageSub">Student details (demo).</p>

      <div className="grid two">
        <Card title="Profile" icon={FiUser} right={<span className="pill">Active</span>}>
          <div style={{ display: 'grid', gap: 10 }}>
            <Row label="Email" value={email} />
            <Row label="Role" value={roles.join(', ') || 'STUDENT'} />
            <Row label="College" value={demoStudent.college} />
          </div>
        </Card>

        <Card title="Location" icon={FiMapPin}>
          <div style={{ fontSize: 14, fontWeight: 900 }}>{demoStudent.location}</div>
          <div className="muted" style={{ marginTop: 10, fontSize: 13 }}>
            Personalized campus services are available based on your location (demo).
          </div>
        </Card>
      </div>
    </div>
  )
}

function Row({ label, value }) {
  return (
    <div style={{ display: 'grid', gap: 4 }}>
      <div className="muted" style={{ fontSize: 12, fontWeight: 800 }}>
        {label}
      </div>
      <div style={{ fontSize: 14, fontWeight: 800 }}>{value}</div>
    </div>
  )
}

