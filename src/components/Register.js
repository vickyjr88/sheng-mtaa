import axios from "axios";
import React, { useState, useEffect } from "react";

function Register () {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [user, setUser] = useState('')
    const [userName, setUserName] = useState ('')
    const [password, setPassword] = useState('')
    const url = "/api/private/users"

    function submit (e) {
        e.preventDefault()

        axios.post(url, {
            user: {
                first_name: firstName,
                middle_name: userName,
                last_name: lastName,
                email: user,
                password: password
            }
    })
             .then(res => {
                 console.log(res.user)
    })
}

    return(
        <>
        <div className="col-sm-6 offset-sm-3">

            <h4>Register new Account</h4>

              <label> First Name </label><br/>
              <input type="text" id="text" onChange={(e) =>setFirstName(e.target.value)} 
              placeholder="First Name" value={firstName} required/><br/>

              <label> Last Name </label><br/>
              <input type="text" id="text" onChange={(e) =>setLastName(e.target.value)}
               placeholder="Last Name" value={lastName} required/><br/>

              <label> Username/ Nickname </label><br/>
              <input type="text" id="username" onChange={(e) =>setUserName(e.target.value)} placeholder="username"
               value={userName} required/><br/>

              <label> Password </label><br/>
              <input type="password" id="password" onChange={(e) => setPassword(e.target.value)}
               value={password} required/><br/>

              <label> Repeat Password </label><br/>
              <input type="password" id="password" onChange={(e) => setPassword(e.target.value)}
               value={password} required/><br/> <br/>

              <button className="col-sm-3 offset-sm-1 btn-primary" onClick={submit}>Sign Up</button>
              <br/><br/>
          </div>
          <div className="col-sm-6 offset-sm-3">
              <p>Already have an account?</p>
              <button className="col-sm-3 offset-sm-1 btn-primary3">
                 <a href="./Login">Login</a>
              </button>
          </div>
          </>
    )

}

export default Register
