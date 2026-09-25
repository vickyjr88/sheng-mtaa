import { useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchRieng } from '../api/riengs'
import { CommentForm } from '../components/CommentForm'
import { Comments } from '../components/Comments'
import { ErrorMessage } from '../components/ErrorMessage'
import { Spinner } from '../components/Spinner'

export function RiengDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const { data: rieng, error, isPending } = useQuery({
    queryKey: ['rieng', id],
    queryFn: () => fetchRieng(id!),
    enabled: Boolean(id),
  })

  if (isPending) return <Spinner />
  if (error || !rieng) return <ErrorMessage />

  return (
    <div className="rounded-2xl border border-line bg-white p-6">
      <button onClick={() => navigate(-1)} className="mb-4 text-sm font-semibold text-tan hover:text-ink">
        &larr; Back
      </button>
      <p className="text-lg text-ink-soft">{rieng.text}</p>
      {rieng.reference && <p className="mt-2 text-sm text-tan">Reference: {rieng.reference}</p>}

      <section className="mt-6 border-t border-line pt-4">
        <h2 className="mb-2 text-base font-bold text-ink">Comments</h2>
        <Comments commentableId={rieng.id} commentableType="Rieng" />
        <div className="mt-4">
          <CommentForm commentableId={rieng.id} commentableType="Rieng" />
        </div>
      </section>
    </div>
  )
}
