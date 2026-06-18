'use client'
import { motion } from 'framer-motion'
import useFetch from '../hooks/useFetch'
import { getcertifications } from '../Services/api'

export default function certification() {
  const { data: certs, loading } = useFetch(getcertifications)

  return (
    <section id="certifications" className="section" style={{ background: 'var(--bg2)' }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, var(--gold), transparent)',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <motion.span className="section-label"
          initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          Achievements
        </motion.span>
        <motion.h2 className="section-title"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          CERTI<span style={{ color: 'var(--gold)' }}>FICATIONS</span>
        </motion.h2>
        <div className="divider" />

        {loading ? (
          <p style={{ color: 'var(--text-dim)', fontStyle: 'italic' }}>Loading achievements...</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '32px', borderRadius: '4px' }}>
            {certs?.map((cert, i) => (
              <motion.div key={cert._id} className="bat-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0, transition: { delay: i * 0.1 } }}
                viewport={{ once: true }}
                style={{ padding: '28px' }}>

                {cert.image && (
                  <div style={{display: "flex", justifyContent: "center", alignItems: "center",margin: "0", marginBottom: "10px"
                    }}
                  >
                    <img
                      src={cert.image}
                      alt={cert.title}
                      style={{
                        width: "180%",
                        height: "100%",
                        objectFit: "cover",
                        filter: "grayscale(20%)",
                        margin: "0",
                        borderRadius: "4px",
                      }}
                    />
                  </div>
                )}

                <h3 style={{
                  fontFamily: "'Bebas Neue', sans-serif", fontSize: '22px',
                  color: '#fff', letterSpacing: '0.05em', marginBottom: '8px', lineHeight: 1.2,
                }}>{cert.title}</h3>

                <p style={{
                  fontFamily: "'Cinzel', serif", fontSize: '11px',
                  letterSpacing: '0.15em', color: 'var(--gold)',
                  textTransform: 'uppercase', marginBottom: '16px',
                }}>{cert.issuer}</p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{
                    fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic',
                    fontSize: '14px', color: 'var(--text-dim)',
                  }}>
                    {new Date(cert.issueDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    {cert.expiryDate && ` — ${new Date(cert.expiryDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`}
                  </span>

                  {cert.credentialUrl && (
                    <a href={cert.credentialUrl} target="_blank" rel="noreferrer"
                      style={{
                        fontFamily: "'Cinzel', serif", fontSize: '10px',
                        letterSpacing: '0.15em', color: 'var(--red)',
                        textDecoration: 'none', textTransform: 'uppercase',
                        borderBottom: '1px solid var(--red)', paddingBottom: '1px',
                        transition: 'color 0.3s',
                      }}
                      onMouseEnter={e => e.target.style.color = 'var(--gold)'}
                      onMouseLeave={e => e.target.style.color = 'var(--red)'}
                    >Verify</a>
                  )}
                </div>

                {cert.credentialId && (
                  <p style={{
                    fontFamily: 'monospace', fontSize: '11px',
                    color: 'var(--text-dim)', marginTop: '10px',
                    borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '10px',
                  }}>ID: {cert.credentialId}</p>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
