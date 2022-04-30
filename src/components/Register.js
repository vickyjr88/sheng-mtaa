import axios from "axios";
import React, { useState } from "react";

function Register () {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [user, setUser] = useState('')
    const [email, setEmail] = useState ('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const url = "/api/private/users"

    function submit (e) {
        e.preventDefault()
        
        axios.post(url, {
            user: {
                first_name: firstName,
                last_name: lastName,
                email: email,
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
            <div className="form-group">
              <label> First Name </label><br/>
              <input type="text" id="text" onChange={(e) =>setFirstName(e.target.value)} 
              placeholder="First Name" value={firstName} className="form-control"/>
            </div>
            <div className="form-group">
              <label> Last Name </label><br/>
              <input type="text" id="texts" onChange={(e) =>setLastName(e.target.value)}
               placeholder="Last Name" value={lastName} className="form-control"/>
            </div>
            <div className="form-group">
              <label> Email Address </label><br/>
              <input type="email" id="email" onChange={(e) =>setEmail(e.target.value)} 
              placeholder="email@example.com" value={email} required className="form-control"/>
            </div>
            <div className="form-group">
              <label> Password </label><br/>
              <input type="password" id="password" onChange={(e) => setPassword(e.target.value)}
               value={password} className="form-control"/>
            </div>
            <div className="form-group">
              <label> Repeat Password </label><br/>
              <input type="password" id="password2" onChange={(e) => setPassword2(e.target.value)}
               value={password2} className="form-control"/>
            </div><br/>

              <button className="btn btn-primary" onClick={submit}>Sign Up</button>
              <br/><br/>
          </div>
          <div className="col-sm-6 offset-sm-3">
              <p>Already have an account?</p>
              <a href="/sign-in">Login</a>
          </div>
          </>
    )

}

export default Register
