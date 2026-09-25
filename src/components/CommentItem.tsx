import { Link } from 'react-router-dom'
import type { Comment } from '../types/api'

function displayName(user: Comment['user']) {
  if (user.first_name) return `${user.first_name} ${user.last_name ?? ''}`.trim()
  const localPart = user.email.split('@')[0]
  return localPart.charAt(0).toUpperCase() + localPart.slice(1)
}

export function CommentItem({ comment }: { comment: Comment }) {
  return (
    <p className="py-2 text-sm text-ink-soft">
      <Link to={`/users/${comment.user.slug}`} className="font-semibold text-ink hover:text-brand-600">
        {displayName(comment.user)}
      </Link>{' '}
      {comment.comment.text}
    </p>
  )
}
