import React, {useState } from "react"
import Axios from "axios"

function CommentForm ({params}){
    console.log(params)
    const {
        id,
        baseUrl, 
        actionableType
        } = params

    const url = baseUrl + "/api/private/comments"
    const [comment, setComment] = useState('')
        

    function submit (e) {
        e.preventDefault()
        setComment("")
        window.location.reload()

        Axios
        .post(url, {
            comment: {
                text: comment, 
                user_id: 1, 
                commentable_id: id, 
                commentable_type: actionableType
            }
        })
        .then(res => {
            console.log(res.comment)
        })
    }
        return (
            <form onSubmit={submit}>
                <div className="form-group">
                <label>Please leave a comment: </label> 
                    <textarea className="form-control" value={comment} placeholder="comment here"
                        onChange={(e) => setComment(e.target.value)} class="form-control"/>
                </div> <br />
                <button className="btn btn-primary" type="submit">submit</button>
            </form>

        )
    }

export default CommentForm