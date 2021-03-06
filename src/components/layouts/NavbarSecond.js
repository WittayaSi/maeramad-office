import React, { useContext } from 'react'
import {
    Navbar,
    Nav,
    NavDropdown,
    Container
} from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faTachometerAlt,
    faListOl,
    faThLarge,
    faCogs,
    faUniversity,
    faPuzzlePiece,
    faArchive,
    faUsers,
    faDollyFlatbed,
    faSortAmountDownAlt,
    faAddressCard,
    faAlignCenter,
    faCartArrowDown,
    faPrint,
    faImages,
    faStoreAlt,
    faChartBar,
    faFileInvoiceDollar,
    faCarSide,
    faUsersCog
} from '@fortawesome/free-solid-svg-icons'
import {
    faBitcoin
} from '@fortawesome/free-brands-svg-icons'
import { getCurrentFiscalYear } from '../utillities/utillities'
import { AppContext } from '../../contexts/AppContext';

export default function NavbarSecond () {

    const { isAdmin, currentUrl } = useContext(AppContext)
    const homeIcon = <FontAwesomeIcon icon={faTachometerAlt} size="2x" color="#019C3E" />
    const setIconCenter = { textAlign: "center", padding: "0rem 0.3rem 0rem 0.3rem" }

    const currentFiscalYear= getCurrentFiscalYear()
    const fiscalYear = 2020
    // console.log(currentFiscalYear, fiscalYear)

    return (
        
        <Navbar variant="dark" bg="secondary" expand="md" style={{ marginTop: "3rem", minHeight: "9rem" }}>
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto mr-auto">
                        <Nav.Item style={setIconCenter}>
                            <Nav.Link href="/" active={currentUrl === "/"}>
                                {homeIcon} <br /> DASHBOARD
                            </Nav.Link>
                        </Nav.Item>
                        {
                            ( isAdmin ) && (
                                <NavDropdown
                                    // show={false}
                                    title={
                                        <span><FontAwesomeIcon icon={faCogs} size="2x" color="#0FEAD6" /><br />????????????????????????????????? </span>
                                    }
                                    id="basic-nav-dropdown"
                                    style={setIconCenter}
                                    className={ (currentUrl.split("/")[1] === "settings") && "active" }
                                >
                                    <NavDropdown.Item href="/settings/office">
                                        <FontAwesomeIcon icon={faUniversity} /> ???????????????????????????????????????????????????????????????
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="/settings/department">
                                        <FontAwesomeIcon icon={faPuzzlePiece} /> ????????????/????????????/????????????????????????
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="/settings/durable-categories">
                                        <FontAwesomeIcon icon={faListOl} /> ??????????????????????????????????????????
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="/settings/durables">
                                        <FontAwesomeIcon icon={faAddressCard} /> ????????????????????????????????????
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="/settings/material-categories">
                                        <FontAwesomeIcon icon={faAlignCenter} /> ?????????????????????????????????
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="/settings/materials">
                                        <FontAwesomeIcon icon={faThLarge} /> ???????????????????????????
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="/settings/sellers">
                                        <FontAwesomeIcon icon={faStoreAlt} /> ???????????????????????????????????????
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="/settings/depreciations">
                                        <FontAwesomeIcon icon={faArchive} /> ??????????????????????????????????????????????????????????????????????????????????????????
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="/settings/personnels">
                                        <FontAwesomeIcon icon={faUsers} /> ???????????????????????????????????????
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="/settings/cars">
                                        <FontAwesomeIcon icon={faCarSide} /> ????????????????????????????????????
                                    </NavDropdown.Item>
                                    {
                                        (fiscalYear < currentFiscalYear) && (
                                            <>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item href="/settings/processing">
                                                <FontAwesomeIcon icon={faUsersCog} /> ??????????????????????????????????????????????????????????????????
                                            </NavDropdown.Item>
                                            </>
                                        )
                                    }
                                    

                                    {
                                    /* <NavDropdown.Divider /> */
                                    }


                                    {
                                    /* <div className={ [ expanded && "show" , "dropdown nav-item"].join(' ') }>
                                        <a  aria-haspopup="true" 
                                            aria-expanded={expanded} 
                                            id="basic-nav-dropdown" 
                                            href="#" 
                                            className="dropdown-toggle dropdown-item" 
                                            role="button"
                                            onClick={ () => setExpanded(!expanded) }
                                        >
                                            Dropdown
                                        </a>
                                        <div aria-labelledby="basic-nav-dropdown" className={[ "dropdown-menu", expanded && "show" ].join(' ')} style={{margin: '0px'}}>
                                            <a href="#action/3.1" className="dropdown-item">Action</a>
                                            <a href="#action/3.2" className="dropdown-item">Another action</a>
                                            <a href="#action/3.3" className="dropdown-item">Something</a>
                                            <a href="#action/3.4" className="dropdown-item">Separated link</a>
                                        </div>
                                    </div> */
                                    }

                                </NavDropdown>
                            )
                        }

                        <NavDropdown
                            title={
                                <span><FontAwesomeIcon icon={faDollyFlatbed} size="2x" color="orange" /><br />??????????????????/??????????????????????????? </span>
                            }
                            id="basic-nav-dropdown"
                            style={setIconCenter}
                            className={ (currentUrl === "/receives" || currentUrl === "/orders") && "active" }
                        >
                            <NavDropdown.Item href="/orders">
                                <FontAwesomeIcon icon={faCartArrowDown} /> ?????????????????????????????????????????????
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/receives">
                                <FontAwesomeIcon icon={faSortAmountDownAlt} /> ??????????????????????????????????????????????????????
                            </NavDropdown.Item>
                        </NavDropdown>

                        <Nav.Item style={setIconCenter}>
                            <Nav.Link href="/registered-durable" active={currentUrl === "/registered-durable"}>
                                <FontAwesomeIcon icon={faImages} size="2x" color="#21FD03"/> <br />?????????????????????????????????????????????
                            </Nav.Link>
                        </Nav.Item>

                        <Nav.Item style={setIconCenter}>
                            <Nav.Link href="/procurement" active={currentUrl === "/procurement"}>
                                <FontAwesomeIcon icon={faBitcoin} size="2x" color="#F033FF"/> <br />?????????????????????/?????????????????????
                            </Nav.Link>
                        </Nav.Item>

                        <Nav.Item style={setIconCenter}>
                            <Nav.Link href="/allowance" active={currentUrl === "/allowance"}>
                                <FontAwesomeIcon icon={faFileInvoiceDollar} size="2x" color="#73C6B6"/> <br />??????????????????????????????
                            </Nav.Link>
                        </Nav.Item>

                        <NavDropdown
                            title={
                                <span><FontAwesomeIcon icon={faChartBar} size="2x" color="red" /><br />?????????????????? </span>
                            }
                            id="basic-nav-dropdown"
                            style={setIconCenter}
                            className={ (currentUrl.split("/")[1] === "reports") && "active" }
                        >
                            {/* <NavDropdown.Item href="/reports">
                                <FontAwesomeIcon icon={faFileInvoiceDollar} /> ????????????????????????
                            </NavDropdown.Item> */}
                            <NavDropdown.Item href="/reports/1">
                                <FontAwesomeIcon icon={faPrint} /> ??????????????????1
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/reports/2">
                                <FontAwesomeIcon icon={faPrint} /> ??????????????????2
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}