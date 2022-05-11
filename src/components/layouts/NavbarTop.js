import React, { useState } from "react";
import {
    Navbar,
    Container,
    Nav,
    NavDropdown
} from "react-bootstrap"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt, faSignOutAlt, faUser, faLaptopHouse } from '@fortawesome/free-solid-svg-icons'
import { logout } from '../../actions/authAction'
import { useDispatch, useSelector } from "react-redux";

const NavbarTop = () =>  {
    const dispatch = useDispatch()
    const { isLoggedIn, user } = useSelector( state => state.auth )
    // console.log(user)
    const [userName] = useState( Object.keys(user).length > 0 && (user.personnel===null ? user.username : `${user.personnel.fname} ${user.personnel.lname}`) )
    const logo = <FontAwesomeIcon icon={faLaptopHouse} size="lg" color="green"/>
        return (
            <div>
                <Navbar bg="dark" variant="dark" expand="md" fixed="top">
                    <Container>
                        <Navbar.Brand href="#">
                            {logo} ระบบสำนักงาน
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        {/* <NavbarToggler onClick={this.toggle} /> */}
                        <Navbar.Collapse className="justify-content-end" id="responsive-navbar-nav">
                            <Nav>
                                {
                                    !isLoggedIn ? 
                                    <Nav.Link href="/login"><FontAwesomeIcon icon={faSignInAlt} /> LogIn</Nav.Link>
                                    :
                                    <NavDropdown 
                                        title={<span><FontAwesomeIcon icon={faUser} /> {`ยินดีต้อนรับ: คุณ${ userName }`} </span>} 
                                        id="collasible-nav-dropdown"
                                        style={{textAlign: 'right'}}
                                    >
                                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                        {/* <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item> */}
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item 
                                            href="#"
                                            onClick={ () => logout(dispatch) }
                                        ><FontAwesomeIcon icon={faSignOutAlt} /> ออกจากระบบ</NavDropdown.Item>
                                    </NavDropdown>
                                }
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        )
}

export default NavbarTop
