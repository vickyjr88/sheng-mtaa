import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useLikes({params}) {
    const [likes, setLikes] = useState([])

    const {baseUrl, likeableId, likeableType} = params

    useEffect(() => {
        setLikes([])
    }, [likeableId])

    useEffect(() => {
        let cancel
        axios({
            method: 'GET',
            url: baseUrl + '/api/private/likes?',
            params: { 
                likeable_id: likeableId, 
                likeable_type: likeableType, 
                count: count 
            },
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {
            console.log(res.like)  
        })
        return () => cancel()
    }, [likeableId, likeableType, baseUrl])
}
