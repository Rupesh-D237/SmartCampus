import { Navigate, useLocation } from 'react-router-dom'
import { getUser, isAuthed } from '../utils/auth.js'

export function RequireRole({ role, children }) {
  const location = useLocation()

  if (!isAuthed()) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  const user = getUser()
  const roles = Array.isArray(user?.roles) ? user.roles : []
  if (!roles.includes(role)) {
    return <Navigate to="/app" replace />
  }

  return children
}

