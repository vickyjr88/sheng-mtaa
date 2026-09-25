import { apiClient } from './client'
import type { Comment, CommentListResponse, CommentableType } from '../types/api'

const PAGE_SIZE = 20

export async function fetchComments(
  commentableId: number,
  commentableType: CommentableType,
  page: number,
) {
  const { data } = await apiClient.get<CommentListResponse>('/v2/comments', {
    params: { commentable_id: commentableId, commentable_type: commentableType, page, count: PAGE_SIZE },
  })
  return data
}

export async function createComment(
  text: string,
  commentableId: number,
  commentableType: CommentableType,
  userId: number,
) {
  // Comment belongs_to :user (validated, required), and the controller
  // trusts this user_id from the request rather than deriving it from the
  // authenticated session - so it must be sent, and it's safe to send here
  // because it's the current, already-authenticated user's own id.
  const { data } = await apiClient.post<Comment>('/v2/comments', {
    comment: { text, commentable_id: commentableId, commentable_type: commentableType, user_id: userId },
  })
  return data
}

export { PAGE_SIZE as COMMENTS_PAGE_SIZE }
