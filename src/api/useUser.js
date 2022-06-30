import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useUser(baseUrl, slug, authToken) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [user, setUser] = useState({})

    useEffect(() => {
        setLoading(true)
        setError(false)
        let cancel
        axios({
            method: 'GET',
            url: `${baseUrl}/api/private/v2/users/${slug}.json`,
            headers: {
                Authorization: authToken
            },
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {
            console.log(res)
            setUser(res.data)
            setLoading(false)
        }).catch(e => {
            if (axios.isCancel(e)) return
            setError(true)
            setLoading(false)
        })
        return () => cancel()
    }, [baseUrl, slug, authToken])

    return { user, loading, error }
}
