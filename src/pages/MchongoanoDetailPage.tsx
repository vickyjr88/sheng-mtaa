import { useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchMchongoano } from '../api/mchongoanos'
import { CommentForm } from '../components/CommentForm'
import { Comments } from '../components/Comments'
import { ErrorMessage } from '../components/ErrorMessage'
import { Spinner } from '../components/Spinner'

export function MchongoanoDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const { data: mchongoano, error, isPending } = useQuery({
    queryKey: ['mchongoano', id],
    queryFn: () => fetchMchongoano(id!),
    enabled: Boolean(id),
  })

  if (isPending) return <Spinner />
  if (error || !mchongoano) return <ErrorMessage />

  return (
    <div className="rounded-2xl border border-line bg-white p-6">
      <button onClick={() => navigate(-1)} className="mb-4 text-sm font-semibold text-tan hover:text-ink">
        &larr; Back
      </button>
      <p className="text-lg text-ink-soft">{mchongoano.text}</p>

      <section className="mt-6 border-t border-line pt-4">
        <h2 className="mb-2 text-base font-bold text-ink">Comments</h2>
        <Comments commentableId={mchongoano.id} commentableType="Mchongoano" />
        <div className="mt-4">
          <CommentForm commentableId={mchongoano.id} commentableType="Mchongoano" />
        </div>
      </section>
    </div>
  )
}
