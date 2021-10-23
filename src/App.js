import React, { useState, useRef, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Row, Col } from 'react-bootstrap'
import './App.css';
import Header from './components/Header';
import Sheng from './components/Sheng';
import RecentShengs from './components/RecentShengs';
import Footer from './components/Footer';

import useShengSearch from './api/useShengSearch';

function App() {
  const [query, setQuery] = useState('')
  const [pageNumber, setPageNumber] = useState(1)
  const baseUrl = 'https://shengmtaa.com'

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
        <Col>
          <input type="text" className="form-control m-1" value={query} onChange={handleSearch}></input>
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
        <Col>
          <RecentShengs baseUrl={baseUrl} />
        </Col>
      </Row>
      <Footer />
    </div>
  )
}

export default App;
