import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useRecentSheng(baseUrl) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [recentShengs, setRecentShengs] = useState([])

    useEffect(() => {
        setLoading(true)
        setError(false)
        let cancel
        axios({
            method: 'GET',
            url: baseUrl + '/api/private/recentshengs',
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {
            setRecentShengs(prevShengs => {
                return [...new Set([...prevShengs, ...res.data.shengs])]
            })
            setLoading(false)
        }).catch(e => {
            if (axios.isCancel(e)) return
            setError(true)
            setLoading(false)
        })
        return () => cancel()
    }, [baseUrl])

    return { recentShengs, loading, error }
}
