import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar.jsx'
import { Sidebar } from './Sidebar.jsx'
import '../pages/pages.css'

export function AppLayout() {
  return (
    <div className="appShell">
      <Sidebar />
      <div className="main">
        <Navbar />
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

