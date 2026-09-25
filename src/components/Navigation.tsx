import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `text-sm font-semibold transition-colors ${isActive ? 'text-brand-600' : 'text-ink-soft hover:text-ink'}`

const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  `block rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
    isActive ? 'bg-brand-50 text-brand-600' : 'text-ink-soft hover:bg-cream-deep hover:text-ink'
  }`

function NavLinks({ mobile = false, onNavigate }: { mobile?: boolean; onNavigate?: () => void }) {
  const { user, signOut } = useAuth()
  const linkClass = mobile ? mobileNavLinkClass : navLinkClass

  return (
    <>
      <NavLink to="/shengs" className={linkClass} onClick={onNavigate}>
        Sheng
      </NavLink>
      <NavLink to="/mchongoanos" className={linkClass} onClick={onNavigate}>
        Mchongoano
      </NavLink>
      <NavLink to="/riengs" className={linkClass} onClick={onNavigate}>
        Rieng
      </NavLink>
      <NavLink to="/about" className={linkClass} onClick={onNavigate}>
        About
      </NavLink>
      {user ? (
        <>
          <NavLink to="/profile" className={linkClass} onClick={onNavigate}>
            Profile
          </NavLink>
          <button
            onClick={() => {
              void signOut()
              onNavigate?.()
            }}
            className={
              mobile
                ? 'rounded-lg px-3 py-2 text-left text-sm font-semibold text-ink-soft transition-colors hover:bg-cream-deep hover:text-ink'
                : 'text-left text-sm font-semibold text-ink-soft transition-colors hover:text-ink'
            }
          >
            Log out
          </button>
        </>
      ) : (
        <>
          <NavLink to="/sign-in" className={linkClass} onClick={onNavigate}>
            Login
          </NavLink>
          <NavLink
            to="/sign-up"
            onClick={onNavigate}
            className="rounded-full bg-brand-500 px-4 py-1.5 text-center text-sm font-bold text-white transition-colors hover:bg-brand-600"
          >
            Sign up
          </NavLink>
        </>
      )}
    </>
  )
}

export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-cream/95 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <NavLink to="/" className="text-lg font-black text-ink" onClick={() => setMenuOpen(false)}>
          Sheng<span className="text-brand-500">Mtaa</span>
        </NavLink>
        <nav className="hidden items-center gap-5 sm:flex">
          <NavLinks />
        </nav>
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-ink sm:hidden"
        >
          {menuOpen ? (
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </div>
      {menuOpen && (
        <nav className="flex flex-col gap-1 border-t border-line px-4 py-3 sm:hidden">
          <NavLinks mobile onNavigate={() => setMenuOpen(false)} />
        </nav>
      )}
    </header>
  )
}
