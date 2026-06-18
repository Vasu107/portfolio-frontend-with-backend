import Link from 'next/link'

const adminSections = [
  {
    title: 'Project Manager',
    description: 'Add or update your portfolio projects.',
    href: '/admin/project',
  },
  {
    title: 'certification Manager',
    description: 'Manage certifications shown in your portfolio.',
    href: '/admin/certification',
  },
  {
    title: 'Education Manager',
    description: 'Edit education entries and course details.',
    href: '/admin/Education',
  },
  {
    title: 'Skills Manager',
    description: 'Update your skill list and proficiency.',
    href: '/admin/Skills',
  },
  {
    title: 'Dashboard',
    description: 'View portfolio summary stats and quick links.',
    href: '/admin/dashbord',
  },
  {
    title: 'Messages',
    description: 'Review contact form submissions from visitors.',
    href: '/admin/messages',
  },
]

export default function AdminPage() {
  return (
    <main style={{ minHeight: '100vh', padding: '32px 24px', color: '#f7f2e8', background: '#111114' }}>
      <div style={{ maxWidth: 1160, margin: '0 auto' }}>
        <section style={{ marginBottom: 40 }}>
          <p style={{ color: '#c9a44a', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}>
            Admin Panel
          </p>
          <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'min(5rem, 4.4vw)', margin: 0, lineHeight: 1 }}>
            Manage your portfolio content
          </h1>
          <p style={{ maxWidth: 760, marginTop: 18, fontSize: 18, color: '#d7d2cc', lineHeight: 1.8 }}>
            Use these tools to create and maintain projects, certifications, education, skills, and visitor messages.
            Keep your portfolio content fresh and aligned with your latest experience.
          </p>
        </section>

        <div style={{ display: 'grid', gap: 20, gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
          {adminSections.map((section) => (
            <Link
              key={section.title}
              href={section.href}
              style={{
                display: 'block',
                padding: 24,
                borderRadius: 24,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: '#f7f2e8',
                textDecoration: 'none',
                transition: 'transform 0.18s ease, background 0.18s ease',
              }}
            >
              <h2 style={{ margin: 0, fontSize: 22, marginBottom: 10 }}>{section.title}</h2>
              <p style={{ margin: 0, color: '#d7d2cc', lineHeight: 1.7 }}>{section.description}</p>
              <span style={{ display: 'inline-block', marginTop: 18, color: '#c9a44a', fontWeight: 700, letterSpacing: '0.08em' }}>
                Open →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
