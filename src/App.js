import React, { useState, useRef, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Card, Row, Col, Form, FormGroup, FormControl, Container } from 'react-bootstrap'
import './App.css';
import Header from './components/Header';
import Sheng from './components/Sheng';
import RecentShengs from './components/RecentShengs';
import ShengDetails from './components/ShengDetails';
import RecentMchongoanos from './components/RecentMchongoanos';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import useShengSearch from './api/useShengSearch';

function App() {
  const [query, setQuery] = useState('')
  const [pageNumber, setPageNumber] = useState(1)
  const [currentSheng, setCurrentSheng] = useState({})
  // const baseUrl = 'https://shengmtaa.com'
  const baseUrl = 'http://localhost:5000'

  const {
    shengs,
    hasMore,
    loading,
    error
  } = useShengSearch(baseUrl, query, pageNumber)

  const observer = useRef()
  const lastShengElementRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPageNumber(prevPageNumber => prevPageNumber + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore])

  function handleSearch(e) {
    setQuery(e.target.value)
    setPageNumber(1)
  }

  var onAction = (s) => {
    setCurrentSheng(s)
  }

  return (
    <Router>
      <Container>
        <Header />
        <Row className="mb-4">
          <Col md={8} className="offset-2">
            <Form className="">
              <FormGroup>
                <FormControl type="text" size="lg" placeholder="Search..." value={query} onChange={handleSearch} />
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Route
            path='/'
            exact
            render={(props) => (
              <>
                <Col md={8}>
                  <Card className="p-2 mb-4">
                    {
                      shengs.map((sheng, index) => {
                        if (shengs.length === index + 1) {
                          return <div ref={lastShengElementRef} key={sheng.word}><Sheng sheng={sheng} /></div>
                        } else {
                          return <div key={sheng.word} ><Sheng sheng={sheng} onAction={onAction} /></div>
                        }
                      })}

                    <div>{loading && 'Loading...'}</div>
                    <div>{error && 'Error'}</div>
                  </Card>
                </Col>
              </>
            )}
          />
          <Route path='/about'>
            <Footer />
          </Route>
          <Route path='/shengs/:id'>
            <ShengDetails baseUrl={baseUrl} sheng={currentSheng} />
          </Route>
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
