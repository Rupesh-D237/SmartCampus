import {
  FiBell,
  FiCalendar,
  FiHome,
  FiFlag,
  FiMessageCircle,
  FiMap,
  FiTruck,
  FiCpu,
  FiUser,
  FiSearch,
  FiShield,
  FiGrid,
} from 'react-icons/fi'
import { NavLink } from 'react-router-dom'
import { hasRole } from '../utils/auth.js'
import './Sidebar.css'

const navItems = [
  { to: '/app/dashboard', label: 'Dashboard', icon: FiHome },
  { to: '/app/announcements', label: 'Announcements', icon: FiBell },
  { to: '/app/events', label: 'Events', icon: FiCalendar },
  { to: '/app/timetable', label: 'Timetable', icon: FiGrid },
  { to: '/app/issues', label: 'Issues', icon: FiFlag },
  { to: '/app/chat', label: 'Chat', icon: FiMessageCircle },
  { to: '/app/lost-found', label: 'Lost & Found', icon: FiSearch },
  { to: '/app/campus-map', label: 'Campus Map', icon: FiMap },
  { to: '/app/bus-tracking', label: 'Bus Tracking', icon: FiTruck },
  { to: '/app/assistant', label: 'AI Assistant', icon: FiCpu },
  { to: '/app/profile', label: 'Profile', icon: FiUser },
]

export function Sidebar() {
  const isAdmin = hasRole('ADMIN')
  const items = isAdmin
    ? [...navItems, { to: '/app/admin', label: 'Admin', icon: FiShield }]
    : navItems

  return (
    <aside className="sidebar">
      <div className="sidebarInner">
        <div className="sidebarHeader">
          <div className="sidebarLogo" aria-hidden="true" />
          <div className="sidebarTitle">
            <div className="sidebarName">Campus Connect</div>
            <div className="sidebarTag">Sri Sairam Engineering College</div>
          </div>
        </div>

        <nav className="sidebarNav">
          {items.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `sideLink ${isActive ? 'active' : ''}`.trim()
                }
              >
                <span className="sideIcon" aria-hidden="true">
                  <Icon />
                </span>
                <span className="sideLabel">{item.label}</span>
              </NavLink>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}

