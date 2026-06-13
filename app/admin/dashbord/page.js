import Link from 'next/link'

export default function DashboardPage() {
  return (
    <main style={{ minHeight: '100vh', padding: '36px 24px', background: '#08080a', color: '#f4f1ec' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <section style={{ marginBottom: 34 }}>
          <p style={{ color: '#c9a44a', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 14 }}>
            Admin Dashboard
          </p>
          <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(3rem, 4vw, 5rem)', margin: 0, lineHeight: 1 }}>
            Portfolio Content Control Center
          </h1>
          <p style={{ marginTop: 18, maxWidth: 760, lineHeight: 1.8, color: '#d2cdc7' }}>
            Welcome to the admin panel. From here you can manage projects, certifications, education, skills, and visitor messages.
          </p>
        </section>

        <div style={{ display: 'grid', gap: 18, gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
          {[
            { title: 'Projects', href: '/admin/project' },
            { title: 'Certifications', href: '/admin/Certification' },
            { title: 'Education', href: '/admin/Education' },
            { title: 'Skills', href: '/admin/Skills' },
            { title: 'Messages', href: '/admin/messages' },
          ].map((item) => (
            <Link key={item.title} href={item.href} style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: 140,
              padding: 24,
              borderRadius: 24,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: '#f4f1ec',
              textDecoration: 'none',
            }}>
              <span style={{ fontSize: 18, fontWeight: 700 }}>{item.title}</span>
              <span style={{ marginTop: 18, color: '#c7c2bc', fontSize: 14 }}>Open management page</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
