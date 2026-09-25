import type { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { Navigation } from './Navigation'
import { RecentMchongoanos } from './RecentMchongoanos'
import { RecentShengs } from './RecentShengs'
import { Footer } from './Footer'

const AUTH_PATHS = new Set(['/sign-in', '/sign-up'])

export function Layout({ children }: { children: ReactNode }) {
  const location = useLocation()
  const showSidebar = !AUTH_PATHS.has(location.pathname)

  return (
    <div className="min-h-svh bg-cream">
      <Navigation />
      <main className="mx-auto max-w-5xl px-4 py-6">
        <div className={showSidebar ? 'grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_320px]' : ''}>
          <div className="min-w-0">{children}</div>
          {showSidebar && (
            <aside className="space-y-4">
              <RecentMchongoanos />
              <RecentShengs />
              <Footer />
            </aside>
          )}
        </div>
      </main>
    </div>
  )
}
