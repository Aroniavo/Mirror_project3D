const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api'

class ApiClient {
  constructor() {
    this.token = null
  }

  setToken(token) {
    this.token = token
  }

  async request(path, { method = 'GET', body, headers = {}, auth = false } = {}) {
    const finalHeaders = { 'Content-Type': 'application/json', ...headers }
    if (auth && this.token) {
      finalHeaders.Authorization = `Bearer ${this.token}`
    }
    const res = await fetch(`${BASE_URL}${path}`, {
      method,
      headers: finalHeaders,
      body: body ? JSON.stringify(body) : undefined,
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
      const message = data?.message || 'Une erreur est survenue.'
      throw new Error(message)
    }
    return data
  }

  login(payload) { return this.request('/auth/login', { method: 'POST', body: payload }) }
  register(payload) { return this.request('/auth/register', { method: 'POST', body: payload }) }
  resetRequest(payload) { return this.request('/auth/reset/request', { method: 'POST', body: payload }) }
  resetConfirm(payload) { return this.request('/auth/reset/confirm', { method: 'POST', body: payload }) }
  me() { return this.request('/auth/me', { auth: true }) }
}

export const api = new ApiClient()


