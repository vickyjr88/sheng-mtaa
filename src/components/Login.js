import React, { useState, useEffect } from "react";
import Axios from "axios";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import {useNavigate} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {

     const navigate = useNavigate();

    const baseUrl = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_BASE_URL : process.env.REACT_APP_BASE_URL_LOCAL

    const [user, setUser] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const url = baseUrl + "/api/private/verify_firebase_token"

    useEffect(() => {
        let authToken = sessionStorage.getItem('Auth Token')
  
        if (authToken) {
            navigate('/profile')
        }
  
        if (!authToken) {
            navigate('/sign-in')
        }
    }, [])

    function firebase_login(_token){
        Axios
                    .post(url, {
                            token: _token
                    }, {
                        headers: {
                            'content-type': 'application/json',
                        }
                    })
                    .then(res => {
                        setUser(res.user)
                        console.log(res.user)
                        navigate('/')
                    })
    }

    function login(e) {
        e.preventDefault()
        const authentication = getAuth();
       

        setUser("")
        signInWithEmailAndPassword(authentication, email, password)
            .then((response) => {
                sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
                firebase_login(response._tokenResponse.idToken)
            }).catch((error) => {
                console.log(error)
                if(error.code === 'auth/wrong-password'){
                    toast.error('Please check the Password');
                  }
                  if(error.code === 'auth/user-not-found'){
                    toast.error('Please check the Email');
                  }
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
        <ToastContainer />
    </>
    )

}

export default Login
