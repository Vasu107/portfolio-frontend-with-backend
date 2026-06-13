'use client'

import { useState } from 'react'
import adminApi from '../../Services/adminApi'

const initialForm = { name: '', level: '', category: '' }

export default function SkillsAdminPage() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('')
  const [message, setMessage] = useState('')

  const handleChange = (field) => (event) => {
    setForm({ ...form, [field]: event.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus('saving')
    setMessage('')

    try {
      await adminApi.post('/skills', form)
      setStatus('success')
      setMessage('Skill added successfully.')
      setForm(initialForm)
    } catch (err) {
      setStatus('error')
      setMessage('Unable to save skill. Check backend and try again.')
      console.error(err)
    }
  }

  return (
    <main style={{ minHeight: '100vh', padding: '36px 24px', background: '#09090f', color: '#f4f0e8' }}>
      <div style={{ maxWidth: 980, margin: '0 auto' }}>
        <section style={{ marginBottom: 32 }}>
          <p style={{ color: '#c9a44a', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 10 }}>
            Skills Manager
          </p>
          <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(2.8rem, 4vw, 4.4rem)', margin: 0 }}>
            Add a new skill
          </h1>
        </section>

        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 18 }}>
          <label style={{ display: 'grid', gap: 8 }}>
            <span style={{ color: '#d1ccc4' }}>Skill Name</span>
            <input value={form.name} onChange={handleChange('name')} required style={inputStyle} />
          </label>
          <label style={{ display: 'grid', gap: 8 }}>
            <span style={{ color: '#d1ccc4' }}>Proficiency</span>
            <input value={form.level} onChange={handleChange('level')} placeholder="e.g. Advanced" style={inputStyle} />
          </label>
          <label style={{ display: 'grid', gap: 8 }}>
            <span style={{ color: '#d1ccc4' }}>Category</span>
            <input value={form.category} onChange={handleChange('category')} placeholder="e.g. Frontend" style={inputStyle} />
          </label>
          <button type="submit" style={buttonStyle}>
            {status === 'saving' ? 'Saving…' : 'Create Skill'}
          </button>
        </form>

        {message && <p style={{ marginTop: 18, color: status === 'success' ? '#9fe3a7' : '#ff7a7a' }}>{message}</p>}
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
  padding: '14px 24px',
  borderRadius: 999,
  background: '#c9a44a',
  color: '#111',
  fontWeight: 700,
  cursor: 'pointer',
}
