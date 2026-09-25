import { apiClient } from './client'
import type { RecentShengsResponse, Sheng, ShengListResponse } from '../types/api'

const PAGE_SIZE = 20

export async function fetchShengs(searchTerm: string, page: number) {
  const { data } = await apiClient.get<ShengListResponse>('/shengs', {
    params: { search_term: searchTerm, page, count: PAGE_SIZE },
  })
  return data
}

export async function fetchSheng(slug: string) {
  const { data } = await apiClient.get<Sheng>(`/shengs/${slug}`)
  // The API returns HTTP 200 with { error: "not_found" } for a missing
  // slug rather than a real 404 (a backend bug being fixed separately) -
  // treat that shape as a failure here too so a bad slug doesn't render
  // as a half-populated page (and, worse, doesn't request comments with
  // an undefined commentable_id).
  if (!('word' in data)) {
    throw new Error('Sheng not found')
  }
  return data
}

export async function fetchRecentShengs() {
  const { data } = await apiClient.get<RecentShengsResponse>('/recentshengs')
  return data.shengs
}

export { PAGE_SIZE as SHENGS_PAGE_SIZE }
