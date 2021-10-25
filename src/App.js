import 'bootstrap/dist/css/bootstrap.min.css'
import { Row, Col, Container } from 'react-bootstrap'
import './App.css';
import RecentShengs from './components/RecentShengs';
import ShengDetails from './components/ShengDetails';
import RecentMchongoanos from './components/RecentMchongoanos';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Mchongoanos from './components/Mchongoanos';
import Shengs from './components/Shengs';
import Navigation from './components/Navigation';
import About from './components/About';

function App() {

  const baseUrl = process.env.NODE_ENV !== 'production' ? process.env.REACT_APP_BASE_URL_LOCAL : process.env.REACT_APP_BASE_URL

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
            <Route
              path='/'
              exact
              render={() => (
                <Shengs />
              )}
            />
            <Route path='/about'>
              <About />
            </Route>
            <Route exact path='/shengs' component={Shengs} />
            <Route path='/mchongoanos' component={Mchongoanos} />
            <Route path='/shengs/:slug' component={ShengDetails} />
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
