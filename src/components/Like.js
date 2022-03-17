import axios from "axios"
import React, { useEffect, useState } from "react"

var Like = ({params}) => { 
    console.log(params)
    const {
        id,
        baseUrl, 
        actionableType
        } = params

    const url = baseUrl + "/api/private/likes"
    const [like, setLike] = useState('')

    function submit (e) {
        e.preventDefault()

        axios
        .post(url, {
            like: {
                user_id: 1, 
                likeable_id: id, 
                likeable_type: actionableType
            }
        })
        .then(res => {
            console.log(res.like)
        })
    }
  return ( 
        <>
        <button onClick={submit}>Like</button>
        { like }
        </>
  )
}
export default Like