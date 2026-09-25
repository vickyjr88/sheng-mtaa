import { useInfiniteQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { fetchRiengs, RIENGS_PAGE_SIZE } from '../api/riengs'
import { ErrorMessage } from '../components/ErrorMessage'
import { RiengCard } from '../components/RiengCard'
import { SearchInput } from '../components/SearchInput'
import { Spinner } from '../components/Spinner'
import { useInfiniteScrollSentinel } from '../hooks/useInfiniteScrollSentinel'

export function RiengsPage() {
  const [query, setQuery] = useState('')

  const { data, error, isPending, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['riengs', query],
    queryFn: ({ pageParam }) => fetchRiengs(query, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.riengs.length === RIENGS_PAGE_SIZE ? allPages.length + 1 : undefined,
  })

  const sentinelRef = useInfiniteScrollSentinel(() => fetchNextPage(), Boolean(hasNextPage))
  const riengs = data?.pages.flatMap((page) => page.riengs) ?? []

  return (
    <div className="rounded-2xl border border-line bg-white p-4">
      <SearchInput value={query} onChange={setQuery} placeholder="Search Rieng…" />
      {error && <ErrorMessage />}
      <div className="mt-4">
        {riengs.map((rieng, index) => (
          <div key={rieng.id} ref={index === riengs.length - 1 ? sentinelRef : undefined}>
            <RiengCard rieng={rieng} />
          </div>
        ))}
      </div>
      {(isPending || isFetchingNextPage) && <Spinner />}
    </div>
  )
}
