import React, { useState } from 'react';
import {Text, Button } from 'react-dom'

const Counter = () => {
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