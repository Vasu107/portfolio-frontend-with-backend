'use client'

import { useState } from 'react'
import adminApi from '../../Services/adminApi'

const initialForm = { title: '', issuer: '', date: '', certificateLink: '' }

export default function CertificationAdminPage() {
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
      await adminApi.post('/certifications', form)
      setStatus('success')
      setMessage('Certification created successfully.')
      setForm(initialForm)
    } catch (err) {
      setStatus('error')
      setMessage('Unable to save certification. Verify backend and try again.')
      console.error(err)
    }
  }

  return (
    <main style={{ minHeight: '100vh', padding: '36px 24px', background: '#09090c', color: '#f7f3ec' }}>
      <div style={{ maxWidth: 980, margin: '0 auto' }}>
        <section style={{ marginBottom: 32 }}>
          <p style={{ color: '#c9a44a', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 10 }}>
            Certification Manager
          </p>
          <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(2.8rem, 4vw, 4.4rem)', margin: 0 }}>
            Add a new certification
          </h1>
        </section>

        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 18 }}>
          <label style={{ display: 'grid', gap: 8 }}>
            <span style={{ color: '#d1ccc4' }}>Title</span>
            <input value={form.title} onChange={handleChange('title')} required style={inputStyle} />
          </label>
          <label style={{ display: 'grid', gap: 8 }}>
            <span style={{ color: '#d1ccc4' }}>Issuer</span>
            <input value={form.issuer} onChange={handleChange('issuer')} required style={inputStyle} />
          </label>
          <label style={{ display: 'grid', gap: 8 }}>
            <span style={{ color: '#d1ccc4' }}>Date</span>
            <input value={form.date} onChange={handleChange('date')} placeholder="e.g. 2025" style={inputStyle} />
          </label>
          <label style={{ display: 'grid', gap: 8 }}>
            <span style={{ color: '#d1ccc4' }}>Certificate Link</span>
            <input value={form.certificateLink} onChange={handleChange('certificateLink')} style={inputStyle} />
          </label>
          <button type="submit" style={buttonStyle}>
            {status === 'saving' ? 'Saving…' : 'Create Certification'}
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
