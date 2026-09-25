import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { fetchUser } from '../api/users'
import { Spinner } from '../components/Spinner'

function displayName(user: { first_name: string | null; last_name: string | null; email: string }) {
  if (user.first_name) return `${user.first_name} ${user.last_name ?? ''}`.trim()
  const localPart = user.email.split('@')[0]
  return localPart.charAt(0).toUpperCase() + localPart.slice(1)
}

export function UserPage() {
  const { slug } = useParams<{ slug: string }>()
  const { user: currentUser, loading: authLoading } = useAuth()

  // The API only returns a profile for the signed-in user's own slug (it
  // 400s for anyone else's), so there's no point requesting a profile that
  // isn't ours - this also lets us show a clear, specific message instead
  // of a generic error for the common case (clicking someone else's name
  // in a comment).
  const isOwnProfile = Boolean(currentUser && currentUser.slug === slug)

  const { data: user, error, isPending } = useQuery({
    queryKey: ['user', slug],
    queryFn: () => fetchUser(slug!),
    enabled: isOwnProfile,
  })

  if (authLoading || (isOwnProfile && isPending)) return <Spinner />

  if (!currentUser) {
    return (
      <div className="rounded-2xl border border-line bg-white p-6 text-center">
        <p className="text-ink-soft">
          <Link to="/sign-in" className="font-semibold text-brand-600 hover:text-brand-700">
            Sign in
          </Link>{' '}
          to view profiles.
        </p>
      </div>
    )
  }

  if (!isOwnProfile) {
    return (
      <div className="rounded-2xl border border-line bg-white p-6 text-center">
        <p className="text-ink-soft">Other members' profiles aren't public yet — check back soon.</p>
      </div>
    )
  }

  if (error || !user) {
    return (
      <div className="rounded-2xl border border-line bg-white p-6 text-center">
        <p className="text-ink-soft">Couldn't load this profile.</p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-line bg-white p-6">
      <h1 className="text-xl font-black text-ink">Profile</h1>
      <p className="mt-3 text-ink-soft">
        <span className="font-semibold text-ink">Name: </span>
        {displayName(user)}
      </p>
      <p className="mt-1 text-ink-soft">
        <span className="font-semibold text-ink">Email: </span>
        {user.email}
      </p>
    </div>
  )
}
