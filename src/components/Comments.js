import React, { useState, useRef, useCallback } from 'react';
import { Card, Spinner } from "react-bootstrap"
import Comment from "./Comment"
import useComments from '../api/useComments';


var Comments = ({params}) => {
    const baseUrl = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_BASE_URL : process.env.REACT_APP_BASE_URL_LOCAL

    const [pageNumber, setPageNumber] = useState(1)

    const {commentable, commentableType} = params

    const useCommentsParams = {
        baseUrl: baseUrl, 
        commentableId: commentable.id, 
        pageNumber: pageNumber, 
        commentableType: commentableType
    }

    const {
        comments,
        hasMore,
        loading,
        error
    } = useComments({params: useCommentsParams})

    const observer = useRef()
    const lastShengElementRef = useCallback(node => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore && !error) {
                setPageNumber(prevPageNumber => prevPageNumber + 1)
            }
        })
        if (node) observer.current.observe(node)
    }, [loading, hasMore, error])

    return (
        <Card className="p-2 mb-4">
            {
                comments.map((comment, index) => {
                    if (comments.length === index + 1) {
                        return <div ref={lastShengElementRef} key={comment.id} ><Comment comment={comment} /></div>
                    } else {
                        return <div key={comment.id} ><Comment comment={comment} /></div>
                    }
                })}

            {
                loading &&
                <div className="d-flex justify-content-center m-4">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            }
            <div className="d-flex justify-content-center m-4">{error && 'Something went wrong'}</div>
        </Card>
    )
}

export default Comments