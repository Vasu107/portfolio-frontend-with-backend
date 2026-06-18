'use client'
import { motion } from 'framer-motion'
import useFetch from '../hooks/useFetch'
import { getProjects } from '../Services/api'
import './Project.css'

export default function Project() {
  const { data: projects, loading, error } = useFetch(getProjects)
  const projectItems = Array.isArray(projects) ? projects : []

  return (
    <section id="projects" className="section projects-section">
      <div className="projects-wrapper">
        <motion.span className="section-label"
          initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          Case Files
        </motion.span>
        <motion.h2 className="section-title"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          MY<br /><span style={{ color: 'var(--gold)' }}>PROJECTS</span>
        </motion.h2>
        <div className="divider" />

        {loading ? (
          <p className="projects-loading">Loading case files...</p>
        ) : error ? (
          <p className="projects-loading">Unable to load projects.</p>
        ) : projectItems.length === 0 ? (
          <p className="projects-loading">No projects available yet.</p>
        ) : (
          <div className="projects-grid">
            {projectItems.map((p, i) => (
              <motion.div key={p._id} className="bat-card"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0, transition: { delay: i * 0.1 } }}
                viewport={{ once: true }}>

                {p.image && (
                  <div className="bat-card-image">
                    <img src={p.image} alt={p.title} />
                    {p.featured && (
                      <span className="bat-card-badge">Featured</span>
                    )}
                  </div>
                )}

                <div className="bat-card-body">
                  <h3 className="bat-card-title">{p.title}</h3>
                  <p className="bat-card-description">{p.description}</p>

                  {p.technologies?.length > 0 && (
                    <div className="bat-card-tech">
                      {p.technologies.map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </div>
                  )}

                  <div className="bat-card-actions">
                    {p.githubLink && (
                      <a href={p.githubLink} target="_blank" rel="noreferrer" className="bat-btn">
                        GitHub
                      </a>
                    )}
                    {p.liveLink && (
                      <a href={p.liveLink} target="_blank" rel="noreferrer" className="bat-btn secondary">
                        Live
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
