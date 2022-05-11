import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage = ({ option = null }) => {
    return (
        <div id="notfound">
            <div className="notfound">
                <div className="notfound-404">
                    <h1>Oops!</h1>
                    <h2>404 - page not found</h2>
                </div>
                <Link to="/">กลับสู่หน้าหลัก</Link>
            </div>
        </div>
    )
}

export default NotFoundPage
