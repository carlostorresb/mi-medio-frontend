'use client'
import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext({ isDark: false, toggleTheme: () => {} })
export const useTheme = () => useContext(ThemeContext)

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false)
  const [manualOverride, setManualOverride] = useState(false)

  // Set initial theme based on time (avoid hydration mismatch)
  useEffect(() => {
    if (!manualOverride) {
      const hour = new Date().getHours()
      setIsDark(hour >= 19 || hour < 7)
    }
  }, [])

  // Auto-update theme every minute if no manual override
  useEffect(() => {
    if (manualOverride) return
    const interval = setInterval(() => {
      const hour = new Date().getHours()
      setIsDark(hour >= 19 || hour < 7)
    }, 60000)
    return () => clearInterval(interval)
  }, [manualOverride])

  // Apply dark class to <html>
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  const toggleTheme = () => {
    setManualOverride(true)
    setIsDark(prev => !prev)
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
