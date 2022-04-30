import React, { useState } from "react";
import Axios from "axios";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import {useNavigate} from "react-router-dom";
import { app } from '../firebase-config'

function Login(/*{params}*/) {
    /* console.log(params)
     const{
         baseUrl,
         email,
         password
     } = params */
     const navigate = useNavigate();

    const baseUrl = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_BASE_URL : process.env.REACT_APP_BASE_URL_LOCAL

    const [user, setUser] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const url = baseUrl + "/login.json"

    function login(e) {
        e.preventDefault()
        const authentication = getAuth();
       

        setUser("")
        /** 
                Axios
                    .post(url, {
                        user: {
                            email: email,
                            password: password
                        }
                    }, {
                        headers: {
                            'content-type': 'application/json',
                        }
                    })
                    .then(res => {
                        console.log(res.user)
                    })
                    **/

        signInWithEmailAndPassword(authentication, email, password)
            .then((response) => {
                navigate('/')
                sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
            }).catch((error) => {
                console.log(error)
       })
    }



    return (<>
        <form className="offset-sm-3">
            <div className="form-group">
                <h4>Login to your account</h4>
                <label> Email Address </label><br />
                <input className="form-control" type="text" id="email" onChange={(e) => setEmail(e.target.value)}
                    placeholder="email" value={email} required />
            </div>
            <div className="form-group">
                <label> Password </label><br />
                <input className="form-control" type="password" id="password" onChange={(e) => setPassword(e.target.value)}
                    value={password} required />
            </div> <br />
            <button className="btn btn-primary" onClick={login}>Login</button>
        </form><br />
        <div className="col-sm-6 offset-sm-3">
            <hr />
            <p> <a href="./register">Forgot your password?</a></p>
            <p><a href="/sign-up">Sign Up</a></p>
        </div>
    </>
    )

}

export default Login
