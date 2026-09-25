import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { createComment } from '../api/comments'
import { useAuth } from '../contexts/AuthContext'
import type { CommentableType } from '../types/api'

interface CommentFormProps {
  commentableId: number
  commentableType: CommentableType
}

export function CommentForm({ commentableId, commentableType }: CommentFormProps) {
  const { user } = useAuth()
  const queryClient = useQueryClient()
  const [text, setText] = useState('')

  const mutation = useMutation({
    mutationFn: (userId: number) => createComment(text, commentableId, commentableType, userId),
    onSuccess: () => {
      setText('')
      queryClient.invalidateQueries({ queryKey: ['comments', commentableType, commentableId] })
    },
  })

  if (!user) {
    return (
      <p className="rounded-xl border border-line bg-cream-deep px-4 py-3 text-sm text-tan">
        <Link to="/sign-in" className="font-semibold text-brand-600 hover:text-brand-700">
          Sign in
        </Link>{' '}
        to leave a comment.
      </p>
    )
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (text.trim()) mutation.mutate(user.id)
      }}
      className="space-y-3"
    >
      <label htmlFor="comment-text" className="block text-sm font-semibold text-ink">
        Leave a comment
      </label>
      <textarea
        id="comment-text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Say something…"
        rows={3}
        className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink placeholder:text-tan focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
      />
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={mutation.isPending || !text.trim()}
          className="rounded-full bg-brand-500 px-5 py-2 text-sm font-bold text-white transition-colors hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {mutation.isPending ? 'Posting…' : 'Post comment'}
        </button>
        {mutation.isError && <span className="text-sm text-tan">Couldn't post that. Try again.</span>}
      </div>
    </form>
  )
}
