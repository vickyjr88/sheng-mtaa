
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useRecentSheng(baseUrl) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [recentMchongoanos, setRecentShengs] = useState([])

    useEffect(() => {
        setLoading(true)
        setError(false)
        let cancel
        axios({
            method: 'GET',
            url: baseUrl + '/api/private/recentmchongoanos',
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {
            setRecentShengs(prevShengs => {
                return [...new Set([...prevShengs, ...res.data.mchongoanos])]
            })
            setLoading(false)
        }).catch(e => {
            if (axios.isCancel(e)) return
            setError(true)
            setLoading(false)
        })
        return () => cancel()
    }, [baseUrl])

    return { recentMchongoanos, loading, error }
}
