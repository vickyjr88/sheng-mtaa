import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useComments({params}) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [comments, setComments] = useState([])
    const [hasMore, setHasMore] = useState(false)

    const {baseUrl, commentableId, pageNumber, commentableType} = params

    useEffect(() => {
        setComments([])
    }, [commentableId])

    const count = 20;

    useEffect(() => {
        setLoading(true)
        setError(false)
        let cancel
        axios({
            method: 'GET',
            url: baseUrl + '/api/private/comments?',
            params: { 
                commentable_id: commentableId, 
                page: pageNumber, 
                commentable_type: commentableType, 
                count: count 
            },
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {
            setComments(prevComments => {
                console.log(res)
                return [...new Set([...prevComments, ...res.data.comments])]
            })
            setHasMore(res.data.comments.length === count)
            setLoading(false)
        }).catch(e => {
            if (axios.isCancel(e)) return
            setError(true)
            setLoading(false)
        })
        return () => cancel()
    }, [commentableId, commentableType, pageNumber, baseUrl])

    return { loading, error, comments, hasMore }
}
