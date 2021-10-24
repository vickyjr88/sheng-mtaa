import 'bootstrap/dist/css/bootstrap.min.css'
import { Row, Col, Container, Navbar, Nav } from 'react-bootstrap'
import './App.css';
import Header from './components/Header';
import RecentShengs from './components/RecentShengs';
import ShengDetails from './components/ShengDetails';
import RecentMchongoanos from './components/RecentMchongoanos';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Mchongoanos from './components/Mchongoanos';
import Shengs from './components/Shengs';

function App() {

  const baseUrl = process.env.NODE_ENV !== 'production' ? process.env.REACT_APP_BASE_URL_LOCAL : process.env.REACT_APP_BASE_URL

  return (
    <Router>
      <Container>
        <Navbar>
          <Nav>Sheng</Nav>
          <Nav>Mchongoano</Nav>
        </Navbar>
        <Header />

      </Container>
      <Container>
        <Row>
          <Col md={8}>
            <Route
              path='/'
              exact
              render={() => (
                <Shengs />
              )}
            />
            <Route path='/about'>
              <Footer />
            </Route>
            <Route exact path='/' component={Shengs} />
            <Route exact path='/shengs' component={Shengs} />
            <Route path='/mchongoanos' component={<Mchongoanos />} />
            <Route path='/shengs/:slug' component={ShengDetails} />
          </Col>
          <Col md={4}>
            <RecentShengs baseUrl={baseUrl} />
            <RecentMchongoanos baseUrl={baseUrl} />
            <Footer />
          </Col>
        </Row>
      </Container>
    </Router>
  )
}

export default App;
