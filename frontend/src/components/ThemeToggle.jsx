import { FiMoon, FiSun } from 'react-icons/fi'
import { useTheme } from '../context/ThemeContext.jsx'
import './ThemeToggle.css'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button className="themeToggle" onClick={toggleTheme} type="button">
      <span className="themeToggleIcon" aria-hidden="true">
        {isDark ? <FiSun /> : <FiMoon />}
      </span>
      <span className="themeToggleText">{isDark ? 'Light' : 'Dark'}</span>
    </button>
  )
}

