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
  return data
}

export async function fetchRecentShengs() {
  const { data } = await apiClient.get<RecentShengsResponse>('/recentshengs')
  return data.shengs
}

export { PAGE_SIZE as SHENGS_PAGE_SIZE }
