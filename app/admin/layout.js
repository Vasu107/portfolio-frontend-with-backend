import AuthGate from './AuthGate'

export default function AdminLayout({ children }) {
  return <AuthGate>{children}</AuthGate>
}
