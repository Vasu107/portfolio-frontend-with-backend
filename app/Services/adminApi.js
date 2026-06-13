import { getAdminToken } from '../admin/auth'

const BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

const api = {
  get: async (path) => {
    const response = await fetch(`${BASE}${path}`, {
      headers: getAuthHeaders(),
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.message || 'Network response was not ok')
    return data
  },
  post: async (path, body) => {
    const response = await fetch(`${BASE}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      body: JSON.stringify(body),
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.message || 'Network response was not ok')
    return data
  },
}

const getAuthHeaders = () => {
  const token = getAdminToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export default api
