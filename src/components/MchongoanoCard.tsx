import { Link } from 'react-router-dom'
import type { Mchongoano } from '../types/api'

export function MchongoanoCard({ mchongoano }: { mchongoano: Mchongoano }) {
  return (
    <article className="border-b border-line py-4 first:pt-0 last:border-b-0">
      <p className="text-ink-soft">{mchongoano.text}</p>
      <Link
        to={`/mchongoanos/${mchongoano.id}`}
        className="mt-1 inline-block text-sm font-semibold text-brand-600 hover:text-brand-700"
      >
        Read more
      </Link>
    </article>
  )
}
