import { Container, Nav, Navbar } from "react-bootstrap"
import React, { useState } from "react";
import { LinkContainer } from 'react-router-bootstrap'
import {useNavigate} from "react-router-dom";

const Navigation = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem('Auth Token');
        sessionStorage.removeItem('User');
        navigate('/sign-in')
    }

    return (
        <Navbar collapseOnSelect fixed="top" expand="sm" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">Sheng Mtaa</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav>
                        <LinkContainer to="/">
                            <Nav.Link>Sheng</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to='/mchongoanos'>
                            <Nav.Link>Mchongoano</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to='/about'>
                            <Nav.Link>About</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to='/sign-in'>
                            <Nav.Link>Login</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to='/sign-up'>
                            <Nav.Link>Sign Up</Nav.Link>
                        </LinkContainer>

                        <a onClick={handleLogout} className="pull-right">
                           Log Out
                        </a>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation