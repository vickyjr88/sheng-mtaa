import { NavLink } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `text-sm font-semibold transition-colors ${isActive ? 'text-brand-600' : 'text-ink-soft hover:text-ink'}`

export function Navigation() {
  const { user, signOut } = useAuth()

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-cream/95 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <NavLink to="/" className="text-lg font-black text-ink">
          Sheng<span className="text-brand-500">Mtaa</span>
        </NavLink>
        <nav className="flex items-center gap-5">
          <NavLink to="/shengs" className={navLinkClass}>
            Sheng
          </NavLink>
          <NavLink to="/mchongoanos" className={navLinkClass}>
            Mchongoano
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            About
          </NavLink>
          {user ? (
            <>
              <NavLink to="/profile" className={navLinkClass}>
                Profile
              </NavLink>
              <button
                onClick={() => void signOut()}
                className="text-sm font-semibold text-ink-soft transition-colors hover:text-ink"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <NavLink to="/sign-in" className={navLinkClass}>
                Login
              </NavLink>
              <NavLink
                to="/sign-up"
                className="rounded-full bg-brand-500 px-4 py-1.5 text-sm font-bold text-white transition-colors hover:bg-brand-600"
              >
                Sign up
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
