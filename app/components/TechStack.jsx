'use client'
import { motion } from 'framer-motion'
import useFetch from '../hooks/useFetch'
import { getSkills } from '../Services/api'
import './TechStack.css'

const categoryLabels = {
  frontend: 'Frontend',
  backend: 'Backend',
  database: 'Database',
  devops: 'DevOps',
  other: 'Other',
}

const categoryOrder = ['frontend', 'backend', 'database', 'devops', 'other']

const normalizeLabel = (key) => categoryLabels[key] || key.replace(/\b\w/g, (char) => char.toUpperCase())

export default function TechStack() {
  const { data: skills, loading, error } = useFetch(getSkills)
  const skillList = Array.isArray(skills) ? skills : []

  const groupedSkills = skillList.reduce((acc, skill) => {
    const category = skill.category || 'other'
    if (!acc[category]) acc[category] = []
    acc[category].push(skill)
    return acc
  }, {})

  const orderedCategories = [
    ...categoryOrder.filter((key) => groupedSkills[key]).map((key) => ({
      key,
      label: categoryLabels[key],
      skills: groupedSkills[key],
    })),
    ...Object.keys(groupedSkills)
      .filter((key) => !categoryOrder.includes(key))
      .map((key) => ({
        key,
        label: normalizeLabel(key),
        skills: groupedSkills[key],
      })),
  ]

  return (
    <>
      {/* Devicons CDN */}
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
      />

      <section id="skills" className="techstack">
        <div className="techstack-inner">

          <motion.span className="section-label"
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}>
            Arsenal
          </motion.span>

          <motion.h2 className="section-title"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}>
            TECH<span style={{ color: 'var(--gold)' }}>STACK</span>
          </motion.h2>

          <div className="divider" style={{ marginBottom: '56px' }} />

          {loading && <p>Loading skills...</p>}
          {error && <p className="error-message">Unable to load skills: {error.message}</p>}
          {!loading && !error && orderedCategories.length === 0 && (
            <p>No skills available. Add skills in the backend to show them here.</p>
          )}

          {!loading && !error && orderedCategories.map((cat, ci) => (
            <div key={cat.key} className={`techstack-category cat-${cat.key}`}>
              <motion.h3 className="techstack-category-label"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0, transition: { delay: ci * 0.1 } }}
                viewport={{ once: true }}>
                {cat.label}
              </motion.h3>

              <div className="techstack-grid">
                {cat.skills.map((skill, i) => (
                  <motion.div key={`${skill.name}-${i}`} className="skill-card"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0, transition: { delay: i * 0.08 } }}
                    viewport={{ once: true }}>

                    <i className={`skill-icon ${skill.icon}`} />

                    <span className="skill-name">{skill.name}</span>

                    <div className="skill-bar" style={{ width: `${skill.proficiency || 0}%` }} />
                  </motion.div>
                ))}
              </div>
            </div>
          ))}

        </div>
      </section>
    </>
  )
}
