const BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

export const api = {
  get: (path) => fetch(`${BASE}${path}`).then((r) => r.json()),
  post: (path, body) => fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).then((r) => r.json()),
}

export const getProjects       = () => api.get('/projects')
export const getSkills         = () => api.get('/skills')
export const getEducations     = () => api.get('/education')
export const getCertifications = () => api.get('/certifications')
export const sendContact       = (body) => api.post('/contact', body)
export const createProject     = (body) => api.post('/projects', body)
