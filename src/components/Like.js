import axios from "axios"
import React from "react"
import Counter from "./counter"

var Like = ({params}) => { 
    console.log(params)
    const {
        id,
        baseUrl, 
        actionableType
        } = params
        
    const url = baseUrl + "/api/private/likes"

    function submit (e) {
        e.preventDefault()

        axios
        .post(url, {
            like: {
                user_id: 2, 
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
        <button onClick={submit}class="btn btn-outline-primary"> Like {Counter}</button>
        </>
        
  )
}
export default Like