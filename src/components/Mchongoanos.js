import React, { useState, useRef, useCallback } from 'react';
import { Row, Col, Form, FormGroup, FormControl, Card, Spinner } from "react-bootstrap"
import useMchongoanoSearch from '../api/useMchongoanoSearch';
import { Link } from 'react-router-dom';

var Mchongoanos = () => {
    const baseUrl = process.env.NODE_ENV !== 'production' ? process.env.REACT_APP_BASE_URL_LOCAL : process.env.REACT_APP_BASE_URL

    const [query, setQuery] = useState('')
    const [pageNumber, setPageNumber] = useState(1)

    const {
        mchongoanos,
        hasMore,
        loading,
        error
    } = useMchongoanoSearch(baseUrl, query, pageNumber)

    const observer = useRef()
    const lastMchongoanoElementRef = useCallback(node => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore && !error) {
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
        <Card className="p-2 mb-4">
            <Row className="mb-4">
                <Col md={8} className="offset-md-2">
                    <Form className="">
                        <FormGroup>
                            <FormControl type="text" size="lg" placeholder="Search..." value={query} onChange={handleSearch} />
                        </FormGroup>
                    </Form>
                </Col>
            </Row>
            {
                mchongoanos.map((mchongoano, index) => {
                    if (mchongoanos.length === index + 1) {
                        return <div className="mb-1" ref={lastMchongoanoElementRef} key={index} >{mchongoano.text}
                            <Link to={{ pathname: `/mchongoanos/${mchongoano.id}` }}>&nbsp;More...</Link>
                        </div>
                    } else {
                        return <div className="mb-1" key={index} >{mchongoano.text}
                            <Link to={{ pathname: `/mchongoanos/${mchongoano.id}` }}>&nbsp;More...</Link>
                        </div>
                    }
                })}

            {
                loading &&
                <div className="d-flex justify-content-center m-4">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            }
            <div className="d-flex justify-content-center m-4">{error && 'Something went wrong'}</div>
        </Card>
    );
}

export default Mchongoanos;