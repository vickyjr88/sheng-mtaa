import { apiClient } from './client'
import type { Mchongoano, MchongoanoListResponse, RecentMchongoanosResponse } from '../types/api'

const PAGE_SIZE = 20

export async function fetchMchongoanos(searchTerm: string, page: number) {
  const { data } = await apiClient.get<MchongoanoListResponse>('/mchongoanos', {
    params: { search_term: searchTerm, page, count: PAGE_SIZE },
  })
  return data
}

export async function fetchMchongoano(id: string) {
  const { data } = await apiClient.get<Mchongoano>(`/mchongoanos/${id}`)
  // See fetchSheng's comment: the API returns 200 with { error: "not_found" }
  // for a missing id instead of a real 404.
  if (!('text' in data)) {
    throw new Error('Mchongoano not found')
  }
  return data
}

export async function fetchRecentMchongoanos() {
  const { data } = await apiClient.get<RecentMchongoanosResponse>('/recentmchongoanos')
  return data.mchongoanos
}

export { PAGE_SIZE as MCHONGOANOS_PAGE_SIZE }
