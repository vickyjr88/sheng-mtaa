import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'

const Profile = () => {
    const baseUrl = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_BASE_URL : process.env.REACT_APP_BASE_URL_LOCAL
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem('Auth Token');
        sessionStorage.removeItem('User');
        navigate('/sign-in')
    }

    let user_fetch = {}
    const [user, setUser] = useState({})

    useEffect(() => {
        let authToken = sessionStorage.getItem('Auth Token')
        user_fetch = sessionStorage.getItem('User')

        console.log("The user")
        console.log(user_fetch)

        if (!authToken || !user_fetch) {
            handleLogout()
        }
        let _user = JSON.parse(user_fetch)
        setUser(_user)
    }, [])

    return (
        <div>
            Profile page
            <p>{user.email}</p>
        </div>
    )
}

export default Profile;