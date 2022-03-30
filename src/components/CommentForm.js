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
                <p className="col-sm-6 offset-sm-6">Please leave a comment: </p>
                <div className="col-sm-6 offset-sm-5">
                    <textarea className="form-control" value={comment} placeholder="comment here"
                        onChange={(e) => setComment(e.target.value)}/>
                </div> <br />
                <button className="btn-primary col-sm-2 offset-sm-7" type="submit">submit</button>
            </form>

        )
    }

export default CommentForm