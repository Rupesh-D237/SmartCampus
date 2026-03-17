import { FiLogOut, FiUser } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom'
import { demoStudent } from '../data/demoData.js'
import { getUser, logout } from '../utils/auth.js'
import { ThemeToggle } from './ThemeToggle.jsx'
import './Navbar.css'

export function Navbar() {
  const navigate = useNavigate()
  const user = getUser()
  const email = user?.email || ''

  return (
    <header className="navbar">
      <div className="navbarInner">
        <div className="navbarBrand">
          <div className="brandMark" aria-hidden="true" />
          <div className="brandText">
            <div className="brandTitle">CAMPUS CONNECT</div>
            <div className="brandSub">
              {email ? email : 'Smart Campus'} • {demoStudent.college}
            </div>
          </div>
        </div>

        <div className="navbarActions">
          <ThemeToggle />
          <Link to="/app/profile" className="navBtn">
            <FiUser />
            <span className="hideSm">Profile</span>
          </Link>
          <button
            type="button"
            className="navBtn danger"
            onClick={() => {
              logout()
              navigate('/login', { replace: true })
            }}
          >
            <FiLogOut />
            <span className="hideSm">Logout</span>
          </button>
        </div>
      </div>
    </header>
  )
}

