import axios from "axios"
import React, { useEffect, useState } from "react"

var Like = () => { 
    const [count, setCount] = useState(0)

    useEffect(() =>
      axios.post('/api/private/likes')
          .then(res => {
              console.log(res)
              
              })
          .catch(err => {
              console.log(err)
             })
          )
  
    useEffect(() =>
      axios.get('/api/private/likes')
          .then(res => {
              console.log(res)
              setCount(res.data)
              })
          .catch(err => {
              console.log(err)
             })
          )


  return ( 
        <>

        <button onClick={() => setCount(count +1)}>Like</button>
        
        <button> { count } </button>

        </>

    
  )
}
export default Like