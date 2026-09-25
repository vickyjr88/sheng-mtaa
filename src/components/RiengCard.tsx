import { Link } from 'react-router-dom'
import type { Rieng } from '../types/api'

export function RiengCard({ rieng }: { rieng: Rieng }) {
  return (
    <article className="border-b border-line py-4 first:pt-0 last:border-b-0">
      <Link
        to={`/riengs/${rieng.id}`}
        className="text-ink-soft underline decoration-line decoration-2 underline-offset-2 hover:text-brand-600 hover:decoration-brand-500"
      >
        {rieng.text}
      </Link>
    </article>
  )
}
