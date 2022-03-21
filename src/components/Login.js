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
        <form>
        <div className="form-group">
            <h4>Login to your account</h4>
            <label> Username/ Nickname </label><br/>
            <input class="form-control" type="text" id="username" onChange={(e) =>setUser(e.target.value)} placeholder="username"
               value={user} required/><br/>
        </div>
        <div className="form-group">
            <label> Password </label><br/>
            <input class="form-control" type="password" id="password" onChange={(e) => setPassword(e.target.value)}
               value={password} required/><br/> 
        </div> <br/>

            <button className="btn btn-primary" onClick={login}>login</button>
              <br/><br/>           
        
        </form>
        <div className="col-sm-6 offset-sm-3">
        <p>Need an account?</p>
        <button className="btn-success">
           <a class="btn-success" href="./Register">Create New Account</a>
        </button>
    </div>
    </>
    )

}

export default Login
