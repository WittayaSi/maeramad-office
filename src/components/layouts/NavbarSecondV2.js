import React from 'react'
import { useLocation } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faTachometerAlt,
    faThLarge,
    faCogs,
    faUniversity,
    faPuzzlePiece,
    faUsers,
    faDollyFlatbed,
    faSortAmountDownAlt,
    faAlignCenter,
    faCartArrowDown,
    faPrint,
    faStoreAlt,
    faChartBar,
    faUsersCog,
    faImages,
    faFileInvoiceDollar
} from '@fortawesome/free-solid-svg-icons'
import {
    faBitcoin
} from '@fortawesome/free-brands-svg-icons'
import { getCurrentFiscalYear } from '../../utillities/anotherFunctions'
import DropdownItem from './navbarsComponents/DropdownItem'
import NavbarItem from './navbarsComponents/NavbarItem'
import { useSelector } from 'react-redux'

export default function NavbarSecond() {
    
    const location = useLocation()
    // console.log("currentUrl", location.pathname)

    const { isAdmin } = useSelector( state => state.auth )

    // const homeIcon = <FontAwesomeIcon icon={faTachometerAlt} size="2x" color="#019C3E" />
    const setIconCenter = { textAlign: "center", padding: "0rem 0.3rem 0rem 0.3rem" }

    const currentFiscalYear = getCurrentFiscalYear()
    const fiscalYear = 2020
    // console.log(currentFiscalYear, fiscalYear)

    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-secondary" style={{ marginTop: "3rem", minHeight: "7rem" }}>
            <div className="container">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto mr-auto">

                        <NavbarItem pathname={"/"} icon={faTachometerAlt} label="DASHBOARD" color="#019C3E" locationPath={location.pathname} />
                        
                        {
                            (isAdmin) && (
                                <li className={`nav-item dropdown ${(location.pathname.split("/")[1] === "settings") ? "active" : ""}`} style={setIconCenter}>
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <span><FontAwesomeIcon icon={faCogs} size="2x" color="#0FEAD6" /><br />ตั้งค่าระบบ </span>
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <DropdownItem pathname={"/settings/office"} icon={faUniversity} label={"ข้อมูลพื้นฐานหน่วยงาน"} />
                                        <DropdownItem pathname={"/settings/department"} icon={faPuzzlePiece} label={"ฝ่าย/แผนก/กลุ่มงาน"} />
                                        {/* <li><hr className="dropdown-divider" /></li>
                                        <DropdownItem pathname={"/settings/durable-categories"} icon={faListOl} label={"ประเภทครุภัณฑ์"} />
                                        <DropdownItem pathname={"/settings/durables"} icon={faAddressCard} label={"ชนิดครุภัณฑ์"} /> */}
                                        <li><hr className="dropdown-divider" /></li>
                                        <DropdownItem pathname={"/settings/material-category"} icon={faAlignCenter} label={"ประเภทวัสดุ"} />
                                        <DropdownItem pathname={"/settings/material"} icon={faThLarge} label={"ชนิดวัสดุ"} />
                                        <li><hr className="dropdown-divider" /></li>
                                        <DropdownItem pathname={"/settings/seller"} icon={faStoreAlt} label={"รายชื่อผู้ขาย"} />
                                        {/* <DropdownItem pathname={"/settings/depreciations"} icon={faArchive} label={"อายุการใช้งานและอัตราค่าเสื่อม"} /> */}
                                        <li><hr className="dropdown-divider" /></li>
                                        <DropdownItem pathname={"/settings/personnel"} icon={faUsers} label={"ข้อมูลบุคลากร"} />
                                        {/* <DropdownItem pathname={"/settings/cars"} icon={faCarSide} label={"รถยนต์ราชการ"} /> */}
                                        {
                                            (fiscalYear < currentFiscalYear) && (
                                                <>
                                                <li><hr className="dropdown-divider" /></li>
                                                <DropdownItem pathname={"/settings/processing"} icon={faUsersCog} label={"ประมวลผลสิ้นปีงบประมาณ"} />
                                                </>
                                            )
                                        }
                                    </ul>
                                </li>
                            )
                        }
                        <li className={`nav-item dropdown ${(location.pathname === "/receive" || location.pathname === "/order") ? "active" : ""}`} style={setIconCenter}>
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <span><FontAwesomeIcon icon={faDollyFlatbed} size="2x" color="orange" /><br />เบิก/รับเข้าวัสดุ </span>
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <DropdownItem pathname={"/order"} icon={faCartArrowDown} label={"รายการเบิกวัสดุ"} />
                                <DropdownItem pathname={"/receive"} icon={faSortAmountDownAlt} label={"รายการรับเข้าวัสดุ"} isAdmin={isAdmin} />
                            </ul>
                        </li>

                        <NavbarItem pathname={"/registered-durable"} icon={faImages} color="#21FD03" label="ทะเบียนครุภัณฑ์"  locationPath={location.pathname} />
                        <NavbarItem pathname={"/procurement"} icon={faBitcoin} color="#F033FF" label="ขอซื้อ/ขอจ้าง"  locationPath={location.pathname} />
                        <NavbarItem pathname={"/allowance"} icon={faFileInvoiceDollar} color="#73C6B6" label="ไปราชการ"  locationPath={location.pathname} />

                        <li className={`nav-item dropdown ${(location.pathname.split("/")[1] === "reports") ? "active" : ""}`} style={setIconCenter}>
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <span><FontAwesomeIcon icon={faChartBar} size="2x" color="red" /><br />รายงาน </span>
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <DropdownItem pathname={"/reports/material-by-month"} icon={faPrint} label={"สรุปวัสดุรายเดือน"} />
                                <DropdownItem pathname={"/reports/each-material"} icon={faPrint} label={"รายงานคุมวัสดุแยกรายการ"} />
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}