import { Link } from 'react-router-dom'
import type { Sheng } from '../types/api'

export function ShengCard({ sheng }: { sheng: Sheng }) {
  return (
    <article className="border-b border-line py-4 first:pt-0 last:border-b-0">
      <h3 className="text-lg font-bold text-ink">
        <Link to={`/shengs/${sheng.slug}`} className="hover:text-brand-600">
          {sheng.word}
        </Link>
      </h3>
      <p className="mt-1 text-sm text-ink-soft">{sheng.meaning}</p>
    </article>
  )
}
