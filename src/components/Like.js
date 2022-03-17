import React, { useState } from "react"

var Like = () => { 
const [count, setCount] = useState(0)
    return ( <>
        <button onClick={() => setCount(count +1)}>Like</button>
        <button onclick>{count} </button> 
    
        </>
  )
}
export default Like