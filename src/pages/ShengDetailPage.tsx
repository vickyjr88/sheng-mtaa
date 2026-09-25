import { useQuery } from '@tanstack/react-query'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { fetchSheng } from '../api/shengs'
import { CommentForm } from '../components/CommentForm'
import { Comments } from '../components/Comments'
import { ErrorMessage } from '../components/ErrorMessage'
import { Spinner } from '../components/Spinner'

const BLANK_VALUES = new Set(['-', 'Unknown', '', null, undefined])

function Field({ label, value }: { label: string; value: string | null | undefined }) {
  if (BLANK_VALUES.has(value ?? '')) return null
  return (
    <p className="text-sm text-ink-soft">
      <span className="font-semibold text-ink">{label}: </span>
      {value}
    </p>
  )
}

export function ShengDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()

  const { data: sheng, error, isPending } = useQuery({
    queryKey: ['sheng', slug],
    queryFn: () => fetchSheng(slug!),
    enabled: Boolean(slug),
  })

  if (isPending) return <Spinner />
  if (error || !sheng) return <ErrorMessage />

  return (
    <div className="rounded-2xl border border-line bg-white p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-sm font-semibold text-tan hover:text-ink"
      >
        &larr; Back
      </button>
      <h1 className="text-2xl font-black text-ink">{sheng.word}</h1>
      <p className="mt-2 text-base text-ink-soft">{sheng.meaning}</p>

      <div className="mt-4 space-y-1">
        <Field label="Origin" value={sheng.origin} />
        <Field label="Use" value={sheng.use} />
        <Field label="Period" value={sheng.period} />
        <Field label="Synonyms" value={sheng.synonyms} />
        <Field label="Pronunciation" value={sheng.pronounciation} />
        {!BLANK_VALUES.has(sheng.relate) && (
          <p className="text-sm text-ink-soft">
            <span className="font-semibold text-ink">Relate: </span>
            {sheng.relate
              .split(' ')
              .filter(Boolean)
              .map((word, index) => (
                <span key={word}>
                  {index > 0 && ' '}
                  <Link to={`/shengs/${word.replace(',', '').toLowerCase()}`} className="text-brand-600 hover:underline">
                    {word}
                  </Link>
                </span>
              ))}
          </p>
        )}
        <Field label="Variation" value={sheng.variation} />
        <Field label="History" value={sheng.history} />
      </div>

      <section className="mt-6 border-t border-line pt-4">
        <h2 className="mb-2 text-base font-bold text-ink">Comments</h2>
        <Comments commentableId={sheng.id} commentableType="Sheng" />
        <div className="mt-4">
          <CommentForm commentableId={sheng.id} commentableType="Sheng" />
        </div>
      </section>
    </div>
  )
}
