'use client'

import { useState } from 'react'
import adminApi from '../../Services/adminApi'

const initialForm = { school: '', degree: '', period: '', description: '' }

export default function EducationAdminPage() {
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
      await adminApi.post('/education', form)
      setStatus('success')
      setMessage('Education entry created successfully.')
      setForm(initialForm)
    } catch (err) {
      setStatus('error')
      setMessage('Unable to save education. Please try again later.')
      console.error(err)
    }
  }

  return (
    <main style={{ minHeight: '100vh', padding: '36px 24px', background: '#0b0b0f', color: '#f4f1ec' }}>
      <div style={{ maxWidth: 980, margin: '0 auto' }}>
        <section style={{ marginBottom: 32 }}>
          <p style={{ color: '#c9a44a', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 10 }}>
            Education Manager
          </p>
          <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(2.8rem, 4vw, 4.4rem)', margin: 0 }}>
            Add a new education entry
          </h1>
        </section>

        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 18 }}>
          <label style={{ display: 'grid', gap: 8 }}>
            <span style={{ color: '#d1ccc4' }}>School</span>
            <input value={form.school} onChange={handleChange('school')} required style={inputStyle} />
          </label>
          <label style={{ display: 'grid', gap: 8 }}>
            <span style={{ color: '#d1ccc4' }}>Degree</span>
            <input value={form.degree} onChange={handleChange('degree')} required style={inputStyle} />
          </label>
          <label style={{ display: 'grid', gap: 8 }}>
            <span style={{ color: '#d1ccc4' }}>Period</span>
            <input value={form.period} onChange={handleChange('period')} placeholder="e.g. 2021 - 2025" style={inputStyle} />
          </label>
          <label style={{ display: 'grid', gap: 8 }}>
            <span style={{ color: '#d1ccc4' }}>Description</span>
            <textarea value={form.description} onChange={handleChange('description')} rows={5} style={{ ...inputStyle, minHeight: 130 }} />
          </label>
          <button type="submit" style={buttonStyle}>
            {status === 'saving' ? 'Saving…' : 'Create Education'}
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
