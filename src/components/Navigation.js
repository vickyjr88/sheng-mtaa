import { Container, Nav, Navbar } from "react-bootstrap"

const Navigation = () => {
    return (
        <Navbar collapseOnSelect fixed="top" expand="sm" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">Sheng Mtaa</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav>
                        <Nav.Link href='/'>Sheng</Nav.Link>
                        <Nav.Link href='/about'>About</Nav.Link>
                        <Nav.Link href='/mchongoanos'>Mchongoano</Nav.Link>
                        <Nav.Link href='/login/login'>Login</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation