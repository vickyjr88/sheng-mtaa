import React, { useState } from "react"

var Like = () => { 
const [count, setCount] = useState(0)
    return (
        <button onClick={() => setCount(count + 1)}>Likes: {count}</button>
  )
}
export default Like