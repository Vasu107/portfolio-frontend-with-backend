'use client'
import { motion } from 'framer-motion'
import useFetch from '../hooks/useFetch'
import { getEducations } from '../Services/api'

export default function Education() {
  const { data: educations, loading } = useFetch(getEducations)

  return (
    <section id="education" className="section" style={{ background: 'var(--bg)' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <motion.span className="section-label"
          initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          Origins
        </motion.span>
        <motion.h2 className="section-title"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          EDU<span style={{ color: 'var(--gold)' }}>CATION</span>
        </motion.h2>
        <div className="divider" />

        {loading ? (
          <p style={{ color: 'var(--text-dim)', fontStyle: 'italic' }}>Loading origins...</p>
        ) : (
          <div style={{ position: 'relative', paddingLeft: '32px' }}>
            {/* vertical line */}
            <div style={{
              position: 'absolute', left: '7px', top: '8px', bottom: '8px',
              width: '1px', background: 'linear-gradient(180deg, var(--gold), var(--red), transparent)',
            }} />

            {educations?.map((edu, i) => (
              <motion.div key={edu._id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0, transition: { delay: i * 0.15 } }}
                viewport={{ once: true }}
                style={{ position: 'relative', marginBottom: '48px' }}>

                {/* dot */}
                <div style={{
                  position: 'absolute', left: '-28px', top: '8px',
                  width: '12px', height: '12px',
                  background: i === 0 ? 'var(--gold)' : 'var(--red)',
                  clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                }} />

                <div className="bat-card" style={{ padding: '28px 32px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
                    <div>
                      <h3 style={{
                        fontFamily: "'Bebas Neue', sans-serif", fontSize: '26px',
                        color: '#fff', letterSpacing: '0.05em',
                      }}>{edu.degree}</h3>
                      <p style={{
                        fontFamily: "'Cinzel', serif", fontSize: '12px',
                        letterSpacing: '0.15em', color: 'var(--gold)', textTransform: 'uppercase',
                      }}>{edu.institution}</p>
                    </div>
                    <span style={{
                      fontFamily: "'Cinzel', serif", fontSize: '11px',
                      color: 'var(--text-dim)', letterSpacing: '0.1em',
                      whiteSpace: 'nowrap',
                    }}>
                      {new Date(edu.startDate).getFullYear()} —{' '}
                      {edu.current ? 'Present' : edu.endDate ? new Date(edu.endDate).getFullYear() : ''}
                    </span>
                  </div>
                  {edu.fieldOfStudy && (
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', color: 'var(--text-dim)', fontSize: '16px', marginBottom: '8px' }}>
                      {edu.fieldOfStudy}
                    </p>
                  )}
                  {edu.description && (
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', color: 'var(--text)', fontSize: '16px', lineHeight: 1.7 }}>
                      {edu.description}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
