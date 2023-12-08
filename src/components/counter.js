import React, { useState } from 'react';
import {Text, Button } from 'react-dom'

const Counter = () => {
 //  const baseUrl = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_BASE_URL : process.env.REACT_APP_BASE_URL_LOCAL
    
   const [count, setCount] = useState(0);  

     return (
        <>
           <Button
             onPress={() => {setCount(count + 1)}} title="Click Me"
           />
           <Button
             onPress={() => {setCount(0)}} title="Reset"
           />
           <Text>You clicked me {count} times</Text>
       </>
   );
}
export default Counter;