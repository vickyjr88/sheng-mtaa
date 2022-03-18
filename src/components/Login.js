import React, { useState, useEffect } from "react";

function Login () {
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')

    function login () {
        console.preventDefault()
    }

    return(<>
        <div className="col-sm-6 offset-sm-3">
            <h4>Login to your account</h4>
            <label> Username/ Nickname </label><br/>
            <input type="text" id="username" onChange={(e) =>setUser(e.target.value)} placeholder="username"
               value={user} required/><br/>

            <label> Password </label><br/>
            <input type="password" id="password" onChange={(e) => setPassword(e.target.value)}
               value={password} required/><br/> 

            <button className="col-sm-3 offset-sm-1 btn-primary" onClick={login}>login</button>
              <br/><br/>           
        </div>
        <div className="col-sm-6 offset-sm-3">
        <p>Need an account?</p>
        <button className="col-sm-3 offset-sm-1 btn-primary3">
           <a href="./Register">Register</a>
        </button>
    </div>
    </>
    )

}

export default Login
