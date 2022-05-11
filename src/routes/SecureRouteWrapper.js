import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

const SecureRouteWrapper =  ({ component: Component, layout: Layout, ...rest }) => {
    
    const { isLoggedIn } = useSelector(state => state.auth)

    return (
        <Route { ...rest } render={ props => {
            return (

                isLoggedIn ?
                <Layout>
                    <Component {...props} />
                </Layout>
                :
                <Redirect to='/login' />
            )
        }}

        />
    )
}

export default SecureRouteWrapper