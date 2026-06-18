const BASE = "https://porfolio-with-back-end.vercel.app/api" || 'http://localhost:5000/api'

export const api = {
  get: async (path) => {
    const response = await fetch(`${BASE}${path}`)
    const data = await response.json()
    if (!response.ok) throw new Error(data.message || 'Network response was not ok')
    return data
  },
  post: async (path, body) => {
    const response = await fetch(`${BASE}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.message || 'Network response was not ok')
    return data
  },
}

export const getProjects      = () => api.get('/projects')
export const getSkills        = () => api.get('/skills')
export const getEducations    = () => api.get('/education')
export const getcertifications= () => api.get('/certifications')
export const sendContact      = (body) => api.post('/contact', body)
