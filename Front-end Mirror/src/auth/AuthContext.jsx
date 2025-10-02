import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { api } from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem('auth') || sessionStorage.getItem('auth')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setToken(parsed.token)
        setUser(parsed.user || null)
        api.setToken(parsed.token)
      } catch {}
    }
    setLoading(false)
  }, [])

  function saveAuth({ token: newToken, user: newUser, remember }) {
    setToken(newToken)
    setUser(newUser || null)
    api.setToken(newToken)
    const payload = JSON.stringify({ token: newToken, user: newUser || null })
    ;(remember ? localStorage : sessionStorage).setItem('auth', payload)
    ;(remember ? sessionStorage : localStorage).removeItem('auth')
  }

  function logout() {
    setToken(null)
    setUser(null)
    api.setToken(null)
    localStorage.removeItem('auth')
    sessionStorage.removeItem('auth')
  }

  const value = useMemo(() => ({
    token,
    user,
    isAuthenticated: Boolean(token),
    loading,
    saveAuth,
    logout,
  }), [token, user, loading])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}


