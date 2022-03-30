import React, { useState } from "react";

function Login (/*{params}*/) {
   /* console.log(params)
    const{
        baseUrl,
        email,
        password
    } = params */

    const [user, setUser] = useState('')
    const [pwd, setPwd] = useState('')
    /*const url = baseUrl + "/api/private/users" */

    function login (e) {
        e.preventDefault()
        setUser("")
        window.location.reload()     

     /*   Axios
        .post(url, {
            user: {
                email: email,
                password: password
            }
        })
        .then(res => {
            console.log(res.user)
        }) */
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
            <input class="form-control" type="password" id="password" onChange={(e) => setPwd(e.target.value)}
               value={pwd} required/>
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
