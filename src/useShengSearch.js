import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useShengSearch(query, pageNumber) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [shengs, setShengs] = useState([])
    const [hasMore, setHasMore] = useState(false)

    useEffect(() => {
        setShengs([])
    }, [query])

    useEffect(() => {
        setLoading(true)
        setError(false)
        let cancel
        axios({
            method: 'GET',
            url: 'https://shengmtaa.com/api/private/shengs?',
            params: { search_term: query, page: pageNumber },
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {
            setShengs(prevShengs => {
                console.log(res)
                return [...new Set([...prevShengs, ...res.data.shengs])]
            })
            setHasMore(res.data.shengs.length > 0)
            setLoading(false)
        }).catch(e => {
            if (axios.isCancel(e)) return
            setError(true)
        })
        return () => cancel()
    }, [query, pageNumber])

    return { loading, error, shengs, hasMore }
}