import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchComments, COMMENTS_PAGE_SIZE } from '../api/comments'
import type { CommentableType } from '../types/api'
import { CommentItem } from './CommentItem'
import { ErrorMessage } from './ErrorMessage'
import { Spinner } from './Spinner'
import { useInfiniteScrollSentinel } from '../hooks/useInfiniteScrollSentinel'

interface CommentsProps {
  commentableId: number
  commentableType: CommentableType
}

export function Comments({ commentableId, commentableType }: CommentsProps) {
  const { data, error, isPending, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['comments', commentableType, commentableId],
    queryFn: ({ pageParam }) => fetchComments(commentableId, commentableType, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.comments.length === COMMENTS_PAGE_SIZE ? allPages.length + 1 : undefined,
  })

  const sentinelRef = useInfiniteScrollSentinel(() => fetchNextPage(), Boolean(hasNextPage))
  const comments = data?.pages.flatMap((page) => page.comments) ?? []

  if (error) return <ErrorMessage />

  return (
    <div className="divide-y divide-line">
      {comments.length === 0 && !isPending && (
        <p className="py-4 text-sm text-tan">No comments yet. Be the first to say something.</p>
      )}
      {comments.map((comment, index) => (
        <div key={comment.comment.id} ref={index === comments.length - 1 ? sentinelRef : undefined}>
          <CommentItem comment={comment} />
        </div>
      ))}
      {(isPending || isFetchingNextPage) && <Spinner />}
    </div>
  )
}
