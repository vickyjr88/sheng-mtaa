import 'bootstrap/dist/css/bootstrap.min.css'
import { Row, Col, Container } from 'react-bootstrap'
import './App.css';
import RecentShengs from './components/RecentShengs';
import ShengDetails from './components/ShengDetails';
import RecentMchongoanos from './components/RecentMchongoanos';
import Footer from './components/Footer';
import { BrowserRouter as Router, Outlet, Route, Routes } from 'react-router-dom';

import Mchongoanos from './components/Mchongoanos';
import Shengs from './components/Shengs';
import Navigation from './components/Navigation';
import About from './components/About';
import MchongoanoDetails from './components/MchongoanoDetails';

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
            <Route path='/' element={ <Shengs /> } />
            <Route path='/about'  element={ <About />} />
            <Route exact path='/shengs' element={ <Shengs />} />
            <Route exact path='/mchongoanos' element={ <Mchongoanos /> } />
            <Route path='/shengs/:slug' element={ <ShengDetails /> } />
            <Route path='/mchongoanos/:id' element={ <MchongoanoDetails /> } />
            </Routes>
            <Outlet />
          </Col>
          <Col md={4}>
            <RecentMchongoanos baseUrl={baseUrl} />
            <RecentShengs baseUrl={baseUrl} />
            <Footer />
          </Col>
        </Row>
      </Container>
    </Router>
  )
}

export default App;
