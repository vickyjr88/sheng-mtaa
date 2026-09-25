export interface Sheng {
  id: number
  word: string
  meaning: string
  status: string
  origin: string
  use: string
  period: string
  synonyms: string
  pronounciation: string
  relate: string
  variation: string
  clarification: string
  history: string
  slug: string
  created_at: string
  updated_at: string
}

export interface Mchongoano {
  id: number
  text: string
  origin: string | null
  status: string
  created_at: string
  updated_at: string
}

export interface Pagination {
  count: number
  page: number
  pages: number
  last: number
  next: number | null
  prev: number | null
}

export interface ShengListResponse {
  pagination: Pagination
  shengs: Sheng[]
}

export interface MchongoanoListResponse {
  pagination: Pagination
  mchongoanos: Mchongoano[]
}

export interface RecentShengsResponse {
  shengs: Sheng[]
}

export interface RecentMchongoanosResponse {
  mchongoanos: Mchongoano[]
}

export interface CommentUser {
  id: number
  first_name: string | null
  last_name: string | null
  slug: string | null
}

export interface Comment {
  comment: {
    id: number
    text: string
    created_at: string
  }
  user: CommentUser
}

export interface CommentListResponse {
  pagination: Pagination
  comments: Comment[]
}

export type CommentableType = 'Sheng' | 'Mchongoano'

export interface AppUser {
  id: number
  email: string
  first_name: string | null
  last_name: string | null
  slug: string
}
