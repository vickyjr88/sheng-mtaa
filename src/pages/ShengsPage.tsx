import { useInfiniteQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { fetchShengs, SHENGS_PAGE_SIZE } from '../api/shengs'
import { ErrorMessage } from '../components/ErrorMessage'
import { SearchInput } from '../components/SearchInput'
import { ShengCard } from '../components/ShengCard'
import { Spinner } from '../components/Spinner'
import { useInfiniteScrollSentinel } from '../hooks/useInfiniteScrollSentinel'

export function ShengsPage() {
  const [query, setQuery] = useState('')

  const { data, error, isPending, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['shengs', query],
    queryFn: ({ pageParam }) => fetchShengs(query, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.shengs.length === SHENGS_PAGE_SIZE ? allPages.length + 1 : undefined,
  })

  const sentinelRef = useInfiniteScrollSentinel(() => fetchNextPage(), Boolean(hasNextPage))
  const shengs = data?.pages.flatMap((page) => page.shengs) ?? []

  return (
    <div className="rounded-2xl border border-line bg-white p-4">
      <SearchInput value={query} onChange={setQuery} placeholder="Search Sheng words…" />
      {error && <ErrorMessage />}
      <div className="mt-4">
        {shengs.map((sheng, index) => (
          <div key={sheng.id} ref={index === shengs.length - 1 ? sentinelRef : undefined}>
            <ShengCard sheng={sheng} />
          </div>
        ))}
      </div>
      {(isPending || isFetchingNextPage) && <Spinner />}
    </div>
  )
}
