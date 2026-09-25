import { Link } from 'react-router-dom'
import type { Comment } from '../types/api'

function displayName(user: Comment['user']) {
  if (user.first_name) return `${user.first_name} ${user.last_name ?? ''}`.trim()
  return 'A Sheng Mtaa member'
}

export function CommentItem({ comment }: { comment: Comment }) {
  const name = displayName(comment.user)

  return (
    <p className="py-2 text-sm text-ink-soft">
      {comment.user.slug ? (
        <Link to={`/users/${comment.user.slug}`} className="font-semibold text-ink hover:text-brand-600">
          {name}
        </Link>
      ) : (
        <span className="font-semibold text-ink">{name}</span>
      )}{' '}
      {comment.comment.text}
    </p>
  )
}
