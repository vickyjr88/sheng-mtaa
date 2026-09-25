import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Spinner } from '../components/Spinner'

function displayName(user: { first_name: string | null; last_name: string | null; email: string }) {
  if (user.first_name) return `${user.first_name} ${user.last_name ?? ''}`.trim()
  const localPart = user.email.split('@')[0]
  return localPart.charAt(0).toUpperCase() + localPart.slice(1)
}

export function ProfilePage() {
  const { user, loading } = useAuth()

  if (loading) return <Spinner />
  if (!user) return <Navigate to="/sign-in" replace />

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
