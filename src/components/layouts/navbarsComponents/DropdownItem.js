import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const DropdownItem = ({pathname, icon, label, isAdmin}) => {

    return (
        <>
            {
                ( isAdmin===undefined ) ? (
                    <li>
                        <Link className="dropdown-item" to={pathname} >
                            <FontAwesomeIcon icon={icon} /> {label}
                        </Link>
                    </li>
                ) : (
                    (isAdmin!==undefined && isAdmin) && (
                        <li>
                            <Link className="dropdown-item" to={pathname} >
                                <FontAwesomeIcon icon={icon} /> {label}
                            </Link>
                        </li>
                    )
                )
            }
        </>
    )
}

export default DropdownItem
