'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { getAdminToken } from './auth'

export default function AuthGate({ children }) {
  const pathname = usePathname()
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = getAdminToken()

    const isLoginPage = pathname === '/admin/login'
    const isAdminRoute = pathname.startsWith('/admin')

    if (isAdminRoute && !isLoginPage && !token) {
      router.replace('/admin/login')
      return
    }

    if (isLoginPage && token) {
      router.replace('/admin')
      return
    }

    setLoading(false)
  }, [pathname, router])

  if (loading) return null

  return children
}