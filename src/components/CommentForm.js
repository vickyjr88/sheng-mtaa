import React, {useState } from "react"
import Axios from "axios"

function CommentForm ({params}){
    console.log(params)
    const {
        id,
        baseUrl, 
        commentableType
        } = params

    const url = baseUrl + "/api/private/comments"
    const [comment, setComment] = useState('')

    

    function submit (e) {
        e.preventDefault()

        Axios
        .post(url, {
            comment: {
                text: comment, 
                user_id: 1, 
                commentable_id: id, 
                commentable_type: commentableType
            }
        })
        .then(res => {
            console.log(res.comment)
        })
    }
        return (
            <form onSubmit={submit}>
                Please leave a comment:
                <div>
                    <textarea class="form-control" value={comment} placeholder="comment here"
                        onChange={(e) => setComment(e.target.value)}/>
                </div>
                <button class="btn-primary" type="submit">submit</button>
            </form>

        )
    }

export default CommentForm