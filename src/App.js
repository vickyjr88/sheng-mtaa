import React, { useState, useRef, useCallback } from 'react';
import './App.css';
import Header from './components/Header.js';
import Sheng from './components/Sheng.js';

import useShengSearch from './useShengSearch';

function App() {
  const [query, setQuery] = useState('')
  const [pageNumber, setPageNumber] = useState(1)

  const {
    shengs,
    hasMore,
    loading,
    error
  } = useShengSearch(query, pageNumber)

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
    <>
      <Header />
      <input type="text" value={query} onChange={handleSearch}></input>
      {
        shengs.map((sheng, index) => {
          if (shengs.length === index + 1) {
            return <div  ref={lastShengElementRef} key={sheng.word}><Sheng sheng={sheng} /></div>
          } else {
            return <div  key={sheng.word} ><Sheng sheng={sheng} /></div>
          }
        })}
      <div>{loading && 'Loading...'}</div>
      <div>{error && 'Error'}</div>
    </>
  )
}

export default App;
