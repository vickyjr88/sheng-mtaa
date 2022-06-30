import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import useUser from '../api/useUser';
import { Spinner, Col } from "react-bootstrap";

const User = () => {
    const baseUrl = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_BASE_URL : process.env.REACT_APP_BASE_URL_LOCAL
    const location = useLocation();
    const navigate = useNavigate();
    let { slug } = useParams()
    const [name, setName] = useState("")
    const [authToken, setAuthToken] = useState("")

    const handleLogout = () => {
        sessionStorage.removeItem('Auth Token');
        sessionStorage.removeItem('User');
        navigate('/sign-in')
    }

    const getToken = async () => {
        let _authToken = await sessionStorage.getItem('Auth Token')
        setAuthToken(_authToken)
        if (!_authToken) {
            handleLogout()
        }
    }

    useEffect(() => {
        getToken()
    }, [])

    const {
        user,
        loading,
        error
    } = useUser(baseUrl, slug, authToken)


    useEffect(() => {
        let _name = getName(user)
        setName(_name)
    }, [user])


    function getName(_user) {
        if (_user.email === undefined || _user.email === "" || _user.email === null) return "-"
        if (_user.first_name === undefined || _user.first_name === "" || _user.first_name === null) {
            let str = _user.email.split("@")[0]
            return str.charAt(0).toUpperCase() + str.slice(1);
        } else {
            return `${_user.first_name} ${_user.last_name}`
        }
    }

    return (
        <Col md={8}>
            {
                loading &&
                <div className="d-flex justify-content-center m-4">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            }
            {!error &&
                <>
                    <div>
                        <h3>User</h3>
                        <p><b>Name:</b> {name}</p>
                        <p><b>Email:</b> {user.email}</p>
                    </div>
                </>
            }
        </Col>

    )
}

export default User;