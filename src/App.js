import React, { useState, useRef, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Row, Col, Form, FormGroup, FormControl } from 'react-bootstrap'
import './App.css';
import Header from './components/Header';
import Sheng from './components/Sheng';
import RecentShengs from './components/RecentShengs';
import RecentMchongoanos from './components/RecentMchongoanos';
import Footer from './components/Footer';

import useShengSearch from './api/useShengSearch';

function App() {
  const [query, setQuery] = useState('')
  const [pageNumber, setPageNumber] = useState(1)
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

  return (
    <div className="container">
      <Header />
      <Row>
        <Col md={8}>
          <Form>
            <FormGroup>
              <FormControl type="text" placeholder="Search..." value={query} onChange={handleSearch} />
            </FormGroup>
          </Form>
          {
            shengs.map((sheng, index) => {
              if (shengs.length === index + 1) {
                return <div ref={lastShengElementRef} key={sheng.word}><Sheng sheng={sheng} /></div>
              } else {
                return <div key={sheng.word} ><Sheng sheng={sheng} /></div>
              }
            })}

          <div>{loading && 'Loading...'}</div>
          <div>{error && 'Error'}</div>
        </Col>
        <Col md={4}>
          <RecentShengs baseUrl={baseUrl} />
          <RecentMchongoanos baseUrl={baseUrl} />
        </Col>
      </Row>
      <Footer />
    </div>
  )
}

export default App;
