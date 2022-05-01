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

        if (!authToken || !user_fetch) {
            handleLogout()
        }
        let _user = JSON.parse(user_fetch)
        setUser(_user)
    }, [])

console.log(user)

    function getName() {
        if (user.first_name === undefined || user.first_name === "") {
            return user.email.split("@")[0]
        } else {
            return `${user.first_name} ${user.last_name}`
        }
    }

    return (
        <div>
            <h3>Profile</h3>
            <p><b>Name:</b> {getName()}</p>
            <p><b>Email:</b> {user.email}</p>
        </div>
    )
}

export default Profile;