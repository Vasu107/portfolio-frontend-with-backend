'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { sendContact } from '../Services/api'

const inputStyle = {
  width: '100%',
  background: 'var(--bg3)',
  border: '1px solid rgba(201,164,74,0.15)',
  borderBottom: '1px solid rgba(192,0,26,0.4)',
  color: '#fff',
  fontFamily: "'Cormorant Garamond', serif",
  fontStyle: 'italic',
  fontSize: '17px',
  padding: '14px 16px',
  outline: 'none',
  transition: 'border-color 0.3s',
}

export default function Contact() {
  const [form,    setForm]    = useState({ name: '', email: '', subject: '', message: '' })
  const [status,  setStatus]  = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => setStatus(null), 10000)
      return () => clearTimeout(timer)
    }
  }, [status])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await sendContact(form)
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch {
      setStatus('error')
    } finally {
      setLoading(false)
    }
  }


  return (
    <section id="contact" className="section" style={{ background: 'var(--bg)' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <motion.span className="section-label"
          initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          Signal the Bat
        </motion.span>
        <motion.h2 className="section-title"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          GET IN<span style={{ color: 'var(--gold)' }}> TOUCH</span>
        </motion.h2>
        <div className="divider" />

        <motion.form onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '40px' }}>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="contact-grid">
            <input required placeholder="Your Name" value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              style={inputStyle}
              onFocus={e => e.target.style.borderBottomColor = 'var(--gold)'}
              onBlur={e => e.target.style.borderBottomColor = 'rgba(192,0,26,0.4)'}
            />
            <input required type="email" placeholder="Your Email" value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              style={inputStyle}
              onFocus={e => e.target.style.borderBottomColor = 'var(--gold)'}
              onBlur={e => e.target.style.borderBottomColor = 'rgba(192,0,26,0.4)'}
            />
          </div>

          <input placeholder="Subject" value={form.subject}
            onChange={e => setForm({ ...form, subject: e.target.value })}
            style={inputStyle}
            onFocus={e => e.target.style.borderBottomColor = 'var(--gold)'}
            onBlur={e => e.target.style.borderBottomColor = 'rgba(192,0,26,0.4)'}
          />

          <textarea required rows={6} placeholder="Your Message" value={form.message}
            onChange={e => setForm({ ...form, message: e.target.value })}
            style={{ ...inputStyle, resize: 'vertical' }}
            onFocus={e => e.target.style.borderBottomColor = 'var(--gold)'}
            onBlur={e => e.target.style.borderBottomColor = 'rgba(192,0,26,0.4)'}
          />

          <button type="submit" className="bat-btn" disabled={loading}
            style={{ alignSelf: 'flex-start', opacity: loading ? 0.6 : 1 }}>
            {loading ? 'Sending...' : 'Send Message'}
          </button>

          {status === 'success' && (
            <p style={{ fontFamily: "'Cinzel', serif", fontSize: '12px', letterSpacing: '0.2em', color: 'var(--gold)' }}>
              ✦ Message received. I will respond shortly.
            </p>
          )}
          {status === 'error' && (
            <p style={{ fontFamily: "'Cinzel', serif", fontSize: '12px', letterSpacing: '0.2em', color: 'var(--red)' }}>
              ✦ Something went wrong. Try again.
            </p>
          )}
        </motion.form>
      </div>

      <style>{`
        .contact-grid { grid-template-columns: 1fr 1fr; }
        @media (max-width: 600px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.25); }
      `}</style>
    </section>
  )
}
