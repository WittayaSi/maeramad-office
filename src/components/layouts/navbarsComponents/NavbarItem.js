import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const NavbarItem = ({pathname, icon, color, label, locationPath}) => {
    const setIconCenter = { textAlign: "center", padding: "0rem 0.3rem 0rem 0.3rem" }
    return (
        <li className={`nav-item ${(locationPath === pathname) ? 'active' : ''}`} style={setIconCenter} >
            <Link to={pathname} className='nav-link' aria-current="page" >
                <FontAwesomeIcon icon={icon} size="2x" color={color} /> <br /> {label}
            </Link>
        </li>
    )
}

export default NavbarItem
