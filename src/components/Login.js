import React, { useState } from "react";
import  Axios  from "axios";

function Login (/*{params}*/) {
   /* console.log(params)
    const{
        baseUrl,
        email,
        password
    } = params */

    const baseUrl = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_BASE_URL : process.env.REACT_APP_BASE_URL_LOCAL

    const [user, setUser] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const url = baseUrl + "/login" 

    function login (e) {
        e.preventDefault()
        setUser("")
       
        Axios
        .post(url, {
            user: {
                email: email,
                password: password
            }
        })
        .then(res => {
            console.log(res.user)
        }) 
    }

    

    return(<>
        <form className="offset-sm-3">
        <div className="form-group">
            <h4>Login to your account</h4>
            <label> Email Address </label><br/>
            <input className="form-control" type="text" id="email" onChange={(e) =>setEmail(e.target.value)} 
            placeholder="email" value={email} required/>
        </div>
        <div className="form-group">
            <label> Password </label><br/>
            <input className="form-control" type="password" id="password" onChange={(e) => setPassword(e.target.value)}
               value={password} required/>
        </div> <br/>
            <button className="btn btn-primary" onClick={login}>login</button>       
        </form><br/>
        <div className="col-sm-6 offset-sm-3">
        <p>Need an account?</p>
        <a className="btn btn-success" href="./register" role="button">Create New Account</a>
        </div>
    </>
    )

}

export default Login
