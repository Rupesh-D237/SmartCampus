import { Link } from 'react-router-dom'
import {
  FiBell,
  FiCalendar,
  FiMessageCircle,
  FiSearch,
  FiMap,
  FiTruck,
  FiCpu,
  FiGrid,
  FiFlag,
} from 'react-icons/fi'
import { Card } from '../components/Card.jsx'
import { demoStudent } from '../data/demoData.js'
import { getUser } from '../utils/auth.js'
import './Dashboard.css'

const services = [
  { title: 'Announcements', to: '/app/announcements', icon: FiBell },
  { title: 'Events', to: '/app/events', icon: FiCalendar },
  { title: 'Timetable', to: '/app/timetable', icon: FiGrid },
  { title: 'Issues', to: '/app/issues', icon: FiFlag },
  { title: 'Chat', to: '/app/chat', icon: FiMessageCircle },
  { title: 'Lost & Found', to: '/app/lost-found', icon: FiSearch },
  { title: 'Campus Map', to: '/app/campus-map', icon: FiMap },
  { title: 'Bus Tracking', to: '/app/bus-tracking', icon: FiTruck },
  { title: 'AI Assistant', to: '/app/assistant', icon: FiCpu },
]

export function Dashboard() {
  const user = getUser()
  const email = user?.email || demoStudent.email
  const displayName = email.split('@')[0]

  return (
    <div>
      <h1 className="pageTitle">Welcome {displayName} 👋</h1>
      <p className="pageSub">
        {demoStudent.shortDept} {demoStudent.year} - {demoStudent.college}
      </p>

      <div className="grid cards">
        {services.map((s) => (
          <Link key={s.to} to={s.to} className="serviceLink">
            <Card
              title={s.title}
              icon={s.icon}
              right={<span className="serviceGo">Open</span>}
            >
              <div className="serviceBody">
                <div className="serviceDesc">
                  Quick access to {s.title.toLowerCase()}.
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

