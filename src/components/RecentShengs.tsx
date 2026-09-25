import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { fetchRecentShengs } from '../api/shengs'
import { ErrorMessage } from './ErrorMessage'
import { Spinner } from './Spinner'

export function RecentShengs() {
  const { data, error, isPending } = useQuery({
    queryKey: ['recent-shengs'],
    queryFn: fetchRecentShengs,
  })

  return (
    <section className="rounded-2xl border border-line bg-white p-4">
      <h2 className="text-base font-bold text-ink">Latest Sheng</h2>
      {isPending && <Spinner />}
      {error && <ErrorMessage />}
      <ul className="mt-2 divide-y divide-line">
        {data?.map((sheng) => (
          <li key={sheng.id} className="py-2">
            <Link
              to={`/shengs/${sheng.slug}`}
              className="text-sm font-semibold text-ink underline decoration-line decoration-2 underline-offset-2 hover:text-brand-600 hover:decoration-brand-500"
            >
              {sheng.word}
            </Link>
            <p className="text-sm text-tan">{sheng.meaning}</p>
          </li>
        ))}
      </ul>
      <Link to="/shengs" className="mt-2 inline-block text-sm font-semibold text-brand-600 hover:text-brand-700">
        View more…
      </Link>
    </section>
  )
}
