import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import LoginFormComponent from '../components/authentications/LoginFormComponent'

const Login = (props) => {

    const authState = useSelector(state => state.auth)

    const isLoggedInKey = 'isLoggedIn'
    const accessTokenKey = 'accessToken'
    const userKey = 'user'
    const isAdminKey = 'isAdmin'

    useEffect(() => {
        console.log('LoginFormComponent')
        localStorage.setItem(isLoggedInKey, JSON.stringify(authState.isLoggedIn))
        localStorage.setItem(accessTokenKey, JSON.stringify(authState.accessToken))
        localStorage.setItem(userKey, JSON.stringify(authState.user))
        localStorage.setItem(isAdminKey, JSON.stringify(authState.isAdmin))
    }, [authState])

    return (
        <>
            <LoginFormComponent  props={props} />
        </>
    )
}

export default Login
