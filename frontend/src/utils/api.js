import { getToken, logout } from './auth.js'

const API_BASE = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/+$/, '')

async function parseJsonSafe(res) {
  const text = await res.text()
  if (!text) return null
  try {
    return JSON.parse(text)
  } catch {
    return null
  }
}

export async function apiFetch(path, { method = 'GET', body, headers, auth = true } = {}) {
  const h = new Headers(headers || {})
  h.set('Accept', 'application/json')

  if (auth) {
    const token = getToken()
    if (token) h.set('Authorization', `Bearer ${token}`)
  }

  let payload = undefined
  if (body !== undefined) {
    h.set('Content-Type', 'application/json')
    payload = JSON.stringify(body)
  }

  const url = path.startsWith('http') ? path : `${API_BASE}${path}`
  const res = await fetch(url, { method, headers: h, body: payload })
  const data = await parseJsonSafe(res)

  if (res.status === 401) {
    logout()
  }

  if (!res.ok) {
    const message = data?.message || `Request failed (${res.status})`
    const err = new Error(message)
    err.status = res.status
    err.data = data
    throw err
  }

  return data
}

