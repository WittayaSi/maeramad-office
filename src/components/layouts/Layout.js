import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Footer from './Footer'
import FullNavBar from './FullNavBar'
import { getCurrentTimestamp, getExpFromToken } from '../../utillities/date'
import { AUTH_LOGOUT, REFRESH_ACCESS_TOKEN } from '../../types/constantTypes'

import { requestRefreshToken } from '../../actions/authAction'
import { useDispatch, useSelector } from 'react-redux'

const Layout = ({ children }) => {
    const location = useLocation()  
    const dispatch = useDispatch()
    const { accessToken, isLoggedIn } = useSelector( state => state.auth )

    const accessTokenExp = getExpFromToken(accessToken)
    const currentTimestamp = getCurrentTimestamp()

    const doRefreshToken = async () => {
        try {
            const data = await requestRefreshToken(accessToken)
            dispatch({
                type: REFRESH_ACCESS_TOKEN,
                payload: data
            })
        } catch (error) {
            dispatch({
                type: AUTH_LOGOUT
            })
        }
    }

    useEffect(() => {
        if (currentTimestamp > accessTokenExp) {
            dispatch({
                type: AUTH_LOGOUT
            })
        }
        const needToRefreshToken = ( isLoggedIn && ((accessTokenExp - currentTimestamp) < 60*5) )
        if (needToRefreshToken) {
            console.log('needToRefreshToken');
            doRefreshToken()
        }
    })

    if (location.pathname === '/login') {
        return <>{children}</>
    }

    if (location.pathname === '/login') {
        return <>{children}</>
    }

    return (
        <>
            <FullNavBar />

            <div className="customContainer">
                <Card body style={{ backgroundColor: '#EAEAEA' }}>
                    { children }
                </Card>
            </div>

            <Footer />
        </>
    )
}

export default Layout
