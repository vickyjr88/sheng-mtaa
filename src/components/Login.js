import React, { useState, useEffect } from "react";

function Login () {
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')

    function login (e) {
        console.log(user)
        setPassword("")
        setUser("")
    }

    return(<>
        <form className="offset-sm-3">
        <div className="form-group">
            <h4>Login to your account</h4>
            <label> Username/ Nickname </label><br/>
            <input class="form-control" type="text" id="username" onChange={(e) =>setUser(e.target.value)} placeholder="username"
               value={user} required/>
        </div>
        <div className="form-group">
            <label> Password </label><br/>
            <input class="form-control" type="password" id="password" onChange={(e) => setPassword(e.target.value)}
               value={password} required/>
        </div> <br/>
            <button className="btn btn-primary" onClick={login}>login</button>       
        </form><br/>
        <div className="col-sm-6 offset-sm-3">
        <p>Need an account?</p>
        <a class="btn btn-success" href="./register" role="button">Create New Account</a>
        </div>
    </>
    )

}

export default Login
