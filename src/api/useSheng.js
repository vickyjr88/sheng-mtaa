
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useSheng(baseUrl, slug) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [sheng, setSheng] = useState({})

    useEffect(() => {
        setLoading(true)
        setError(false)
        let cancel
        axios({
            method: 'GET',
            url: baseUrl + '/api/private/shengs/' + slug,
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {
            console.log(res)
            setSheng(res.data)
            setLoading(false)
        }).catch(e => {
            if (axios.isCancel(e)) return
            setError(true)
            setLoading(false)
        })
        return () => cancel()
    }, [baseUrl, slug])

    return { sheng, loading, error }
}
