'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { setAdminToken } from '../auth'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus('loading')
    setError('')

    try {
      const response = await fetch(`${API_BASE}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Login failed')
      }

      setAdminToken(data.token)
      router.replace('/admin')
    } catch (err) {
      setStatus('error')
      setError(err.message || 'Unable to login')
      console.error(err)
    }
  }

  return (
    <main style={{ minHeight: '100vh', padding: '36px 24px', background: '#111114', color: '#f4f0e8' }}>
      <div style={{ maxWidth: 560, margin: '0 auto', padding: 24, borderRadius: 24, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(2.8rem, 5vw, 4rem)', margin: 0 }}>Admin Login</h1>
        <p style={{ marginTop: 14, color: '#ccc', lineHeight: 1.7 }}>
          Enter your admin credentials to manage portfolio content.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 16, marginTop: 28 }}>
          <label style={{ display: 'grid', gap: 8, color: '#d1ccc4' }}>
            Email
            <input value={email} onChange={(event) => setEmail(event.target.value)} required type="email" style={inputStyle} />
          </label>
          <label style={{ display: 'grid', gap: 8, color: '#d1ccc4' }}>
            Password
            <input value={password} onChange={(event) => setPassword(event.target.value)} required type="password" style={inputStyle} />
          </label>

          <button type="submit" style={buttonStyle}>
            {status === 'loading' ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        {error && <p style={{ marginTop: 16, color: '#ff7a7a' }}>{error}</p>}
      </div>
    </main>
  )
}

const inputStyle = {
  width: '100%',
  padding: '14px 16px',
  borderRadius: 16,
  border: '1px solid rgba(255,255,255,0.12)',
  background: 'rgba(255,255,255,0.05)',
  color: '#fff',
  outline: 'none',
}

const buttonStyle = {
  border: 'none',
  borderRadius: 999,
  background: '#c9a44a',
  color: '#111',
  padding: '14px 24px',
  fontWeight: 700,
  cursor: 'pointer',
}
