export const ADMIN_TOKEN_KEY = 'portfolioAdminToken'

export const getAdminToken = () => {
  if (typeof window === 'undefined') return null
  return window.localStorage.getItem(ADMIN_TOKEN_KEY)
}

export const setAdminToken = (token) => {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(ADMIN_TOKEN_KEY, token)
}

export const removeAdminToken = () => {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(ADMIN_TOKEN_KEY)
}

export const isAdminAuthenticated = () => Boolean(getAdminToken())
