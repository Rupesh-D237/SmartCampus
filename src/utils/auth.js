const TOKEN_KEY = 'cc_token'
const USER_KEY = 'cc_user'

export function isAuthed() {
  return Boolean(getToken())
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY) || ''
}

export function setToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token)
  else localStorage.removeItem(TOKEN_KEY)
}

export function getUser() {
  const raw = localStorage.getItem(USER_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function hasRole(role) {
  const user = getUser()
  const roles = Array.isArray(user?.roles) ? user.roles : []
  return roles.includes(role)
}

export function setUser(user) {
  if (user) localStorage.setItem(USER_KEY, JSON.stringify(user))
  else localStorage.removeItem(USER_KEY)
}

export function logout() {
  setToken('')
  setUser(null)
}

