'use client'

import { useEffect, useState } from 'react'
import adminApi from '../../Services/adminApi'

export default function MessagesAdminPage() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const data = await adminApi.get('/contact')
        setMessages(data)
      } catch (err) {
        setError('Unable to load messages. Please check backend connectivity.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadMessages()
  }, [])

  return (
    <main style={{ minHeight: '100vh', padding: '36px 24px', background: '#060608', color: '#f5f2ec' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <section style={{ marginBottom: 32 }}>
          <p style={{ color: '#c9a44a', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 10 }}>
            Visitor Messages
          </p>
          <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(2.8rem, 4vw, 4.4rem)', margin: 0 }}>
            Contact submissions
          </h1>
          <p style={{ marginTop: 18, maxWidth: 760, lineHeight: 1.8, color: '#d0cbc5' }}>
            Review messages sent through the contact form. This page shows the sender, email, and the message body.
          </p>
        </section>

        {loading ? (
          <p>Loading messages…</p>
        ) : error ? (
          <p style={{ color: '#ff7a7a' }}>{error}</p>
        ) : messages.length === 0 ? (
          <p>No messages have been received yet.</p>
        ) : (
          <div style={{ display: 'grid', gap: 18 }}>
            {messages.map((message) => (
              <article
                key={message._id || message.id || message.email}
                style={{
                  padding: 22,
                  borderRadius: 24,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: '#f4f0e8',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 14, flexWrap: 'wrap' }}>
                  <div>
                    <p style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>{message.name || 'Anonymous'}</p>
                    <p style={{ margin: '6px 0 0', color: '#c7c2bc' }}>{message.email}</p>
                  </div>
                  <span style={{ color: '#c9a44a', fontWeight: 700, fontSize: 13, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                    {new Date(message.createdAt || message.date || Date.now()).toLocaleDateString()}
                  </span>
                </div>

                <p style={{ marginTop: 18, color: '#e4ddd4', lineHeight: 1.8 }}>{message.message || 'No message text provided.'}</p>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
