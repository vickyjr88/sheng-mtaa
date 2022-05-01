import 'bootstrap/dist/css/bootstrap.min.css'
import { Row, Col, Container } from 'react-bootstrap'
import './App.css';
import Register from './components/Register';
import ShengDetails from './components/ShengDetails';
import { BrowserRouter as Router, Outlet, Route, Routes } from 'react-router-dom';
import Mchongoanos from './components/Mchongoanos';
import Shengs from './components/Shengs';
import Navigation from './components/Navigation';
import About from './components/About';
import MchongoanoDetails from './components/MchongoanoDetails';
import Login from './components/Login';
import SideBar from './components/SideBar';
import Profile from './components/Profile';
import User from './components/User';
import { app } from './firebase-config'

function App() {

  const baseUrl = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_BASE_URL : process.env.REACT_APP_BASE_URL_LOCAL

  return (
    <Router>
      <Container>
        <Row>
          <Col>
            <Navigation />
          </Col>
        </Row>
        <Row className='body'>
          <Col md={8}>
            <Routes>
              <Route path='/' element={<Shengs />} />
              <Route path='/about' element={<About />} />
              <Route exact path='/shengs' element={<Shengs />} />
              <Route exact path='/mchongoanos' element={<Mchongoanos />} />
              <Route path='/shengs/:slug' element={<ShengDetails />} exact />
              <Route path='/mchongoanos/:id' element={<MchongoanoDetails exact />} />
              <Route path='/sign-in' element={<Login />} />
              <Route path='/sign-up' element={<Register />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/users/:slug' element={<User />} exact />
            </Routes>
            <Outlet />
          </Col>
          <SideBar />
        </Row>
      </Container>
    </Router>
  )
}

export default App;
