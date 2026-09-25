import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { fetchRecentRiengs } from '../api/riengs'
import { ErrorMessage } from './ErrorMessage'
import { Spinner } from './Spinner'

export function RecentRiengs() {
  const { data, error, isPending } = useQuery({
    queryKey: ['recent-riengs'],
    queryFn: fetchRecentRiengs,
  })

  return (
    <section className="rounded-2xl border border-line bg-white p-4">
      <h2 className="text-base font-bold text-ink">Rieng</h2>
      {isPending && <Spinner />}
      {error && <ErrorMessage />}
      <ul className="mt-2 divide-y divide-line">
        {data?.map((rieng) => (
          <li key={rieng.id} className="py-2">
            <Link
              to={`/riengs/${rieng.id}`}
              className="text-sm text-ink-soft underline decoration-line decoration-2 underline-offset-2 hover:text-brand-600 hover:decoration-brand-500"
            >
              {rieng.text}
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/riengs" className="mt-2 inline-block text-sm font-semibold text-brand-600 hover:text-brand-700">
        View more…
      </Link>
    </section>
  )
}
