import React from 'react'
import { Container, Navbar } from 'react-bootstrap'

const Footer = () => {
    return (
        <Navbar variant="dark" bg="secondary" expand="lg" fixed="bottom">
            <Container>
                <Navbar.Collapse href="#">
                    <Navbar.Text>
                        <small><b style={{color: "white"}}>&copy; { (new Date()).getFullYear() }</b></small>
                    </Navbar.Text>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        <small>Developed by <a href="#login">Wittaya Siriphorn</a></small>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Footer
