'use client'
import { motion } from 'framer-motion'

const stats = [
  { value: '3+', label: 'Years Coding' },
  { value: '10+', label: 'Projects Built' },
  { value: '3', label: 'Awards Won' },
  { value: '∞', label: 'Lines of Code' },
]

const fadeUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, type: 'spring', stiffness: 60 } }),
}

export default function About() {
  return (
    <section id="about" className="section" style={{ background: 'var(--bg2)' }}>
      {/* top accent */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, var(--gold), transparent)',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <motion.span className="section-label"
          initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}>
          The Man Behind the Mask
        </motion.span>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}
          className="about-grid">

          {/* Left */}
          <div>
            <motion.h2 className="section-title"
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}>
              ABOUT<br />
              <span style={{ color: 'var(--gold)' }}>ME</span>
            </motion.h2>
            <div className="divider" />
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '18px', lineHeight: 1.8, color: 'var(--text)', marginBottom: '16px' }}>
              Born in Gorakhpur, forged through countless lines of code and late-night debugging sessions.
              I am a passionate B.Tech IT student and aspiring AI Engineer on a mission to harness
              the power of AI and modern web development to solve meaningful problems.
            </motion.p>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1, transition: { delay: 0.2 } }}
              viewport={{ once: true }}
              style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '18px', lineHeight: 1.8, color: 'var(--text-dim)' }}>
              Winner by mindset. Builder by passion. I turn competitive coding success into building
              intelligent, impactful solutions that make a real difference.
            </motion.p>
            <motion.a href="#contact" className="bat-btn" style={{ marginTop: '32px' }}
              initial={{ opacity: 0 }} whileInView={{ opacity: 1, transition: { delay: 0.3 } }}
              viewport={{ once: true }}>
              Get In Touch
            </motion.a>
          </div>

          {/* Right — image + stats */}
          <div style={{ display: 'grid', gridTemplateRows: 'auto 1fr', gap: '20px', alignItems: 'start' }} className="about-right">
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <div className="about-image-wrap" style={{ width: '100%', maxWidth: '500px', height: '260px', overflow: 'hidden', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <img src="/images/vasudev1.png" alt="About me" className="about-image" style={{ width: '100%', height: '360px', objectFit: 'cover', objectPosition: 'top center', display: 'block' }} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px', width: '100%' }}>
              {stats.map((s, i) => (
                <motion.div key={s.label} custom={i} variants={fadeUp}
                  initial="hidden" whileInView="visible" viewport={{ once: true }}
                  style={{
                    padding: '20px 16px',
                    background: i % 2 === 0 ? 'var(--bg3)' : 'var(--bg)',
                    borderTop: '2px solid transparent',
                    borderImage: 'linear-gradient(90deg, var(--red), var(--gold)) 1',
                    borderRadius: '4px',
                    textAlign: 'center',
                  }}>
                  <div style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: '36px', color: '#fff', lineHeight: 1,
                    textShadow: '0 0 12px var(--red-glow)',
                  }}>{s.value}</div>
                  <div style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: '10px', letterSpacing: '0.12em',
                    color: 'var(--gold)', marginTop: '6px', textTransform: 'uppercase',
                  }}>{s.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .about-image-wrap { width: 380px !important; height: 250px !important; }
          .about-image { width: 100% !important; height: 250px !important; object-position: top center !important; }
          .about-right { width: 100%; }
          .about-right .bat-btn { padding: 10px 18px; }
          .about-right .section-title { font-size: 32px; }
        }
      `}</style>
    </section>
  )
}
