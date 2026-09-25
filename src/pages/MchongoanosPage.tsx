import { useInfiniteQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { fetchMchongoanos, MCHONGOANOS_PAGE_SIZE } from '../api/mchongoanos'
import { ErrorMessage } from '../components/ErrorMessage'
import { MchongoanoCard } from '../components/MchongoanoCard'
import { SearchInput } from '../components/SearchInput'
import { Spinner } from '../components/Spinner'
import { useInfiniteScrollSentinel } from '../hooks/useInfiniteScrollSentinel'

export function MchongoanosPage() {
  const [query, setQuery] = useState('')

  const { data, error, isPending, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['mchongoanos', query],
    queryFn: ({ pageParam }) => fetchMchongoanos(query, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.mchongoanos.length === MCHONGOANOS_PAGE_SIZE ? allPages.length + 1 : undefined,
  })

  const sentinelRef = useInfiniteScrollSentinel(() => fetchNextPage(), Boolean(hasNextPage))
  const mchongoanos = data?.pages.flatMap((page) => page.mchongoanos) ?? []

  return (
    <div className="rounded-2xl border border-line bg-white p-4">
      <SearchInput value={query} onChange={setQuery} placeholder="Search Mchongoano…" />
      {error && <ErrorMessage />}
      <div className="mt-4">
        {mchongoanos.map((mchongoano, index) => (
          <div key={mchongoano.id} ref={index === mchongoanos.length - 1 ? sentinelRef : undefined}>
            <MchongoanoCard mchongoano={mchongoano} />
          </div>
        ))}
      </div>
      {(isPending || isFetchingNextPage) && <Spinner />}
    </div>
  )
}
