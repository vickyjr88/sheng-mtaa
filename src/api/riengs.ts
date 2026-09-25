import { apiClient } from './client'
import type { RecentRiengsResponse, Rieng, RiengListResponse } from '../types/api'

const PAGE_SIZE = 20

export async function fetchRiengs(searchTerm: string, page: number) {
  const { data } = await apiClient.get<RiengListResponse>('/riengs', {
    params: { search_term: searchTerm, page, count: PAGE_SIZE },
  })
  return data
}

export async function fetchRieng(id: string) {
  const { data } = await apiClient.get<Rieng>(`/riengs/${id}`)
  // See fetchSheng's comment: the API returns 200 with { error: "not_found" }
  // for a missing id instead of a real 404.
  if (!('text' in data)) {
    throw new Error('Rieng not found')
  }
  return data
}

export async function fetchRecentRiengs() {
  const { data } = await apiClient.get<RecentRiengsResponse>('/recentriengs')
  return data.riengs
}

export { PAGE_SIZE as RIENGS_PAGE_SIZE }
