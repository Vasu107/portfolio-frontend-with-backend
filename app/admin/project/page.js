'use client'

import { useState } from 'react'
import { createProject } from '../../Services/projactService'

const defaultForm = {
  title: '',
  description: '',
  image: '',
  technologies: '',
  githubLink: '',
  liveLink: '',
  featured: false,
}

export default function ProjectAdminPage() {
  const [form, setForm] = useState(defaultForm)
  const [status, setStatus] = useState('')
  const [message, setMessage] = useState('')

  const handleChange = (key) => (event) => {
    const value = key === 'featured' ? event.target.checked : event.target.value
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus('saving')
    setMessage('')

    try {
      const payload = {
        title: form.title.trim(),
        description: form.description.trim(),
        image: form.image.trim(),
        technologies: form.technologies
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean),
        githubLink: form.githubLink.trim(),
        liveLink: form.liveLink.trim(),
        featured: form.featured,
      }

      await createProject(payload)
      setStatus('success')
      setMessage('Project created successfully.')
      setForm(defaultForm)
    } catch (error) {
      setStatus('error')
      setMessage('Unable to create project. Check your backend and try again.')
      console.error(error)
    }
  }

  return (
    <div style={{ maxWidth: 780, margin: '40px auto', padding: '0 20px', color: '#f8f8f8' }}>
      <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 38, letterSpacing: '0.2em', marginBottom: 12 }}>
        Create Project
      </h1>
      <p style={{ fontFamily: 'Cinzel, serif', fontSize: 14, color: '#ccc', marginBottom: 28 }}>
        Add a new project to your portfolio backend. Fill in the fields below and submit.
      </p>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 18 }}>
        <label style={{ display: 'grid', gap: 8 }}>
          <span style={{ fontSize: 13, color: '#bbb', letterSpacing: '0.08em' }}>Title</span>
          <input
            value={form.title}
            onChange={handleChange('title')}
            required
            placeholder="Project title"
            style={inputStyle}
          />
        </label>

        <label style={{ display: 'grid', gap: 8 }}>
          <span style={{ fontSize: 13, color: '#bbb', letterSpacing: '0.08em' }}>Description</span>
          <textarea
            value={form.description}
            onChange={handleChange('description')}
            required
            placeholder="Short project description"
            rows={5}
            style={{ ...inputStyle, minHeight: 140, resize: 'vertical' }}
          />
        </label>

        <div style={{ display: 'grid', gap: 18, gridTemplateColumns: '1fr 1fr' }}>
          <label style={{ display: 'grid', gap: 8 }}>
            <span style={{ fontSize: 13, color: '#bbb', letterSpacing: '0.08em' }}>Image URL</span>
            <input
              value={form.image}
              onChange={handleChange('image')}
              placeholder="https://..."
              style={inputStyle}
            />
          </label>

          <label style={{ display: 'grid', gap: 8 }}>
            <span style={{ fontSize: 13, color: '#bbb', letterSpacing: '0.08em' }}>Technologies</span>
            <input
              value={form.technologies}
              onChange={handleChange('technologies')}
              placeholder="React, Node, MongoDB"
              style={inputStyle}
            />
          </label>
        </div>

        <div style={{ display: 'grid', gap: 18, gridTemplateColumns: '1fr 1fr' }}>
          <label style={{ display: 'grid', gap: 8 }}>
            <span style={{ fontSize: 13, color: '#bbb', letterSpacing: '0.08em' }}>GitHub Link</span>
            <input
              value={form.githubLink}
              onChange={handleChange('githubLink')}
              placeholder="https://github.com/username/repo"
              style={inputStyle}
            />
          </label>

          <label style={{ display: 'grid', gap: 8 }}>
            <span style={{ fontSize: 13, color: '#bbb', letterSpacing: '0.08em' }}>Live URL</span>
            <input
              value={form.liveLink}
              onChange={handleChange('liveLink')}
              placeholder="https://your-app.com"
              style={inputStyle}
            />
          </label>
        </div>

        <label style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 6 }}>
          <input
            type="checkbox"
            checked={form.featured}
            onChange={handleChange('featured')}
            style={{ width: 18, height: 18 }}
          />
          <span style={{ fontSize: 13, color: '#ddd' }}>Mark as featured</span>
        </label>

        <button
          type="submit"
          style={{
            marginTop: 10,
            alignSelf: 'flex-start',
            background: '#c9a44a',
            color: '#111',
            border: 'none',
            padding: '14px 24px',
            borderRadius: 999,
            fontWeight: 700,
            cursor: 'pointer',
            letterSpacing: '0.08em',
          }}
        >
          {status === 'saving' ? 'Saving…' : 'Create Project'}
        </button>
      </form>

      {message && (
        <p style={{ marginTop: 20, color: status === 'success' ? '#9fe3a7' : '#ff7a7a' }}>
          {message}
        </p>
      )}
    </div>
  )
}

const inputStyle = {
  width: '100%',
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: 16,
  color: '#fff',
  padding: '14px 16px',
  fontSize: 14,
  outline: 'none',
}
