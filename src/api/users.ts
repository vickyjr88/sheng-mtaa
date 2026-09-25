import { apiClient } from './client'
import type { AppUser } from '../types/api'

export async function verifyFirebaseToken(token: string) {
  const { data } = await apiClient.post<AppUser>('/verify_firebase_token', { token })
  return data
}

export async function fetchUser(slug: string) {
  const { data } = await apiClient.get<AppUser>(`/v2/users/${slug}.json`)
  return data
}
