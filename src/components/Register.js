import axios from "axios";
import React, { useState, useEffect } from "react";

function Register () {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [user, setUser] = useState('')
    const [email, setEmail] = useState ('')
    const [password, setPassword] = useState('')
    const url = "/api/private/users"

    function submit (e) {
        e.preventDefault()

        axios.post(url, {
            user: {
                first_name: firstName,
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
        <div className="offset-sm-3">

            <h4>Register new Account</h4>

              <label> First Name </label><br/>
              <input type="text" id="text" onChange={(e) =>setFirstName(e.target.value)} 
              placeholder="First Name" value={firstName} class="form-control"/><br/>

              <label> Last Name </label><br/>
              <input type="text" id="text" onChange={(e) =>setLastName(e.target.value)}
               placeholder="Last Name" value={lastName} class="form-control"/><br/>

              <label> Email Address </label><br/>
              <input type="email" id="email" onChange={(e) =>setEmail(e.target.value)} 
              placeholder="email@example.com" value={email} required class="form-control"/><br/>

              <label> Password </label><br/>
              <input type="password" id="password" onChange={(e) => setPassword(e.target.value)}
               value={password} class="form-control"/><br/>

              <label> Repeat Password </label><br/>
              <input type="password" id="password" onChange={(e) => setPassword(e.target.value)}
               value={password} class="form-control"/><br/>

              <button className="btn btn-primary" onClick={submit}>Sign Up</button>
              <br/><br/>
          </div>
          <div className="col-sm-6 offset-sm-3">
              <p>Already have an account?</p>
              <a class="btn btn-success" href="./login" role="button">Login</a>
          </div>
          </>
    )

}

export default Register
