import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useMchongoano(baseUrl, id) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [mchongoano, setMchongoano] = useState({})

    useEffect(() => {
        setLoading(true)
        setError(false)
        let cancel
        axios({
            method: 'GET',
            url: baseUrl + '/api/private/mchongoanos/' + id,
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {
            console.log(res)
            setMchongoano(res.data)
            setLoading(false)
        }).catch(e => {
            if (axios.isCancel(e)) return
            setError(true)
            setLoading(false)
        })
        return () => cancel()
    }, [baseUrl, id])

    return { mchongoano, loading, error }
}
