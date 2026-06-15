'use client'

import { useEffect, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { getAdminToken, removeAdminToken } from './auth'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

export default function AuthGate({ children }) {
  const pathname = usePathname()
  const router = useRouter()
  const prevPathRef = useRef(null)

  useEffect(() => {
    const prev = prevPathRef.current

    // If we navigated away from admin routes, clear session token so returning requires login
    if (prev && prev.startsWith('/admin') && !pathname.startsWith('/admin')) {
      removeAdminToken()
    }

    const check = async () => {
      const token = getAdminToken()
      const isLoginPath = pathname === '/admin/login'
      const justLoggedIn = typeof window !== 'undefined' && window.sessionStorage.getItem('adminJustLoggedIn')

      // If we are entering /admin but not coming from a fresh login, require authentication
      if (pathname.startsWith('/admin') && !isLoginPath) {
        if (token && !justLoggedIn) {
          // token exists but wasn't just obtained — force re-login
          removeAdminToken()
          router.replace('/admin/login')
          return
        }
      }

      if (!token && !isLoginPath) {
        router.replace('/admin/login')
        return
      }

      if (!token && isLoginPath) return

      // If token exists, verify with server to ensure it's valid
      try {
        const res = await fetch(`${API_BASE}/admin/verify`, {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        })

        if (!res.ok) {
          removeAdminToken()
          if (!isLoginPath) router.replace('/admin/login')
          return
        }

        // token valid — if we just logged in, clear the marker and allow entry
        if (isLoginPath) {
          if (justLoggedIn && typeof window !== 'undefined') {
            window.sessionStorage.removeItem('adminJustLoggedIn')
          }
          router.replace('/admin')
        }
      } catch (err) {
        removeAdminToken()
        if (!isLoginPath) router.replace('/admin/login')
      }
    }

    check()

    prevPathRef.current = pathname
  }, [pathname, router])

  return <>{children}</>
}
