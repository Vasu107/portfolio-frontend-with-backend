'use client'
import { motion } from 'framer-motion'
import './TechStack.css'

const categories = [
  {
    key: 'frontend',
    label: 'Frontend',
    skills: [
      { name: 'HTML',    icon: 'devicon-html5-plain colored',      proficiency: 90 },
      { name: 'CSS',     icon: 'devicon-css3-plain colored',       proficiency: 85 },
      { name: 'JavaScript', icon: 'devicon-javascript-plain colored', proficiency: 82 },
      { name: 'React JS',   icon: 'devicon-react-original colored',   proficiency: 80 },
      { name: 'Next JS',    icon: 'devicon-nextjs-plain',             proficiency: 75 },
    ],
  },
  {
    key: 'backend',
    label: 'Backend',
    skills: [
      { name: 'Python',     icon: 'devicon-python-plain colored',     proficiency: 80 },
      { name: 'Django',     icon: 'devicon-django-plain colored',     proficiency: 72 },
      { name: 'Express JS', icon: 'devicon-express-original',         proficiency: 78 },
    ],
  },
  {
    key: 'database',
    label: 'Database',
    skills: [
      { name: 'MongoDB', icon: 'devicon-mongodb-plain colored', proficiency: 75 },
    ],
  },
  {
    key: 'tools',
    label: 'Tools',
    skills: [
      { name: 'Git',      icon: 'devicon-git-plain colored',    proficiency: 85 },
      { name: 'GitHub',   icon: 'devicon-github-original',      proficiency: 85 },
      { name: 'Postman',  icon: 'devicon-postman-plain colored', proficiency: 78 },
    ],
  },
]

export default function TechStack() {
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

          {categories.map((cat, ci) => (
            <div key={cat.key} className={`techstack-category cat-${cat.key}`}>
              <motion.h3 className="techstack-category-label"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0, transition: { delay: ci * 0.1 } }}
                viewport={{ once: true }}>
                {cat.label}
              </motion.h3>

              <div className="techstack-grid">
                {cat.skills.map((skill, i) => (
                  <motion.div key={skill.name} className="skill-card"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0, transition: { delay: i * 0.08 } }}
                    viewport={{ once: true }}>

                    <i className={`skill-icon ${skill.icon}`} />

                    <span className="skill-name">{skill.name}</span>

                    <div className="skill-bar" style={{ width: `${skill.proficiency}%` }} />
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
