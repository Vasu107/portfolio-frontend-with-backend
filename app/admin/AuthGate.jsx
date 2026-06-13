'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { getAdminToken } from './auth'

export default function AuthGate({ children }) {
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const token = getAdminToken()
    const isLoginPath = pathname === '/admin/login'

    if (!token && !isLoginPath) {
      router.replace('/admin/login')
    }

    if (token && isLoginPath) {
      router.replace('/admin')
    }
  }, [pathname, router])

  return <>{children}</>
}
