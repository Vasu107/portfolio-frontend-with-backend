export const ADMIN_TOKEN_KEY = 'portfolioAdminToken'

// Use sessionStorage so token is cleared when the browser tab is closed.
export const getAdminToken = () => {
  if (typeof window === 'undefined') return null
  return window.sessionStorage.getItem(ADMIN_TOKEN_KEY)
}

export const setAdminToken = (token) => {
  if (typeof window === 'undefined') return
  window.sessionStorage.setItem(ADMIN_TOKEN_KEY, token)
}

export const removeAdminToken = () => {
  if (typeof window === 'undefined') return
  window.sessionStorage.removeItem(ADMIN_TOKEN_KEY)
}

export const isAdminAuthenticated = () => Boolean(getAdminToken())
