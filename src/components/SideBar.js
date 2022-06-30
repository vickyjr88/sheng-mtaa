import {useLocation} from 'react-router-dom'
import  RecentMchongoanos from "./RecentMchongoanos"
import  RecentShengs  from "./RecentShengs"
import  Footer from "./Footer"
import { Col } from "react-bootstrap";

const SideBar = () => {
    const baseUrl = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_BASE_URL : process.env.REACT_APP_BASE_URL_LOCAL
const location = useLocation();

if(location.pathname === '/sign-in' || location.pathname === '/sign-up') return null
    
    return(
<Col md={4}>
  <RecentMchongoanos baseUrl={baseUrl} />
  <RecentShengs baseUrl={baseUrl} />
  <Footer />
</Col>
    )
}

export default SideBar;