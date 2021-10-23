
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useRecentSheng({ baseUrl }) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [recentShengs, setRecentShengs] = useState([])

    useEffect(() => {
        setLoading(true)
        setError(false)
        let cancel
        axios({
            method: 'GET',
            url: baseUrl + '/api/private/shengs',
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {
            setRecentShengs(prevShengs => {
                console.log(res)
                return [...new Set([...prevShengs, ...res.data.shengs])]
            })
            setLoading(false)
        }).catch(e => {
            if (axios.isCancel(e)) return
            setError(true)
        })
        return () => cancel()
    }, [])

    return { recentShengs, loading, error }
}
