import axios from 'axios'

export const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/private`,
})

// Attaches the current Firebase ID token, when present, to every request.
// Set by AuthProvider on sign-in/out; read here instead of importing the
// auth context directly to keep this module free of React dependencies.
let authToken: string | null = null

export function setAuthToken(token: string | null) {
  authToken = token
}

apiClient.interceptors.request.use((config) => {
  if (authToken) {
    config.headers.Authorization = authToken
  }
  return config
})
