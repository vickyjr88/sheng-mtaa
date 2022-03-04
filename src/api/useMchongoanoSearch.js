import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useMchongoanoSearch(baseUrl, query, pageNumber) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [mchongoanos, setMchongoanos] = useState([])
    const [hasMore, setHasMore] = useState(false)

    useEffect(() => {
        setMchongoanos([])
    }, [query])

    const count = 20;

    useEffect(() => {
        setLoading(true)
        setError(false)
        let cancel
        axios({
            method: 'GET',
            url: baseUrl + '/api/private/mchongoanos?',
            params: { search_term: query, 
                      page: pageNumber,
                      count: count
                     },
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {
            setMchongoanos(prevMchongoanos => {
                console.log(res)
                return [...new Set([...prevMchongoanos, ...res.data.mchongoanos])]
            })
            setHasMore(res.data.mchongoanos.length == count > 0)
            setLoading(false)
        }).catch(e => {
            if (axios.isCancel(e)) return
            setError(true)
            setLoading(false)
        })
        return () => cancel()
    }, [query, pageNumber, baseUrl])

    return { loading, error, mchongoanos, hasMore }
}
