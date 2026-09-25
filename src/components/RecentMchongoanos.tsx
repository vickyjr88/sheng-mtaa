import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { fetchRecentMchongoanos } from '../api/mchongoanos'
import { ErrorMessage } from './ErrorMessage'
import { Spinner } from './Spinner'

export function RecentMchongoanos() {
  const { data, error, isPending } = useQuery({
    queryKey: ['recent-mchongoanos'],
    queryFn: fetchRecentMchongoanos,
  })

  return (
    <section className="rounded-2xl border border-line bg-white p-4">
      <h2 className="text-base font-bold text-ink">Mchongoano</h2>
      {isPending && <Spinner />}
      {error && <ErrorMessage />}
      <ul className="mt-2 divide-y divide-line">
        {data?.map((mchongoano) => (
          <li key={mchongoano.id} className="py-2">
            <Link
              to={`/mchongoanos/${mchongoano.id}`}
              className="text-sm text-ink-soft underline decoration-line decoration-2 underline-offset-2 hover:text-brand-600 hover:decoration-brand-500"
            >
              {mchongoano.text}
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/mchongoanos" className="mt-2 inline-block text-sm font-semibold text-brand-600 hover:text-brand-700">
        View more…
      </Link>
    </section>
  )
}
