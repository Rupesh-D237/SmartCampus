import { useMemo, useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { FiLock, FiMail } from 'react-icons/fi'
import { Card } from '../components/Card.jsx'
import { ThemeToggle } from '../components/ThemeToggle.jsx'
import { setToken, setUser } from '../utils/auth.js'
import { apiFetch } from '../utils/api.js'
import './Login.css'

export function Register() {
  const navigate = useNavigate()
  const location = useLocation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const redirectTo = useMemo(() => {
    const from = location.state?.from
    return typeof from === 'string' && from.startsWith('/app') ? from : '/app'
  }, [location.state])

  async function onSubmit(e) {
    e.preventDefault()
    setError('')

    try {
      const result = await apiFetch('/api/auth/register', {
        method: 'POST',
        auth: false,
        body: { email, password },
      })

      if (!result?.token) throw new Error('Signup failed')

      setToken(result.token)
      setUser({ email: result.email, roles: result.roles || [] })
      navigate(redirectTo, { replace: true })
    } catch (err) {
      setError(err?.message || 'Signup failed')
    }
  }

  return (
    <div className="loginWrap">
      <div className="loginTop">
        <div className="loginBrand">
          <div className="loginMark" aria-hidden="true" />
          <div>
            <div className="loginTitle">CAMPUS CONNECT</div>
            <div className="loginSub">Create your account</div>
          </div>
        </div>
        <ThemeToggle />
      </div>

      <div className="loginGrid">
        <Card title="Sign up">
          <form className="formGrid" onSubmit={onSubmit}>
            <label className="label">
              Email
              <div className="inputRow">
                <span className="inputIcon" aria-hidden="true">
                  <FiMail />
                </span>
                <input
                  className="input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@sairam.edu"
                  autoComplete="email"
                />
              </div>
            </label>

            <label className="label">
              Password
              <div className="inputRow">
                <span className="inputIcon" aria-hidden="true">
                  <FiLock />
                </span>
                <input
                  className="input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  autoComplete="new-password"
                />
              </div>
            </label>

            {error ? <div className="error">{error}</div> : null}

            <button type="submit" className="btn">
              Create account
            </button>

            <div className="muted" style={{ fontSize: 13 }}>
              Already have an account? <Link to="/login">Sign in</Link>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}

