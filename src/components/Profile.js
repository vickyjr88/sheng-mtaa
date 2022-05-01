import { useLocation } from 'react-router-dom'

const Profile = () => {
    const baseUrl = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_BASE_URL : process.env.REACT_APP_BASE_URL_LOCAL
    const location = useLocation();

    console.log(location.pathname)

    if (location.pathname === '/sign-in' || location.pathname === '/sign-up') return null

    return (
        <div>
            Profile page
        </div>
    )
}

export default Profile;