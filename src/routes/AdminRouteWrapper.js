import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

const AdminRouteWrapper = ({ 
    component: Component,
    layout: Layout,
    ...rest
}) => {

    const { isLoggedIn , isAdmin } = useSelector( state => state.auth )

    return (
        <Route { ...rest } render={ props => {

            // const isSettingRoute = props.location.pathname.split('/')[1] === 'settings'
            let conditions = isLoggedIn && isAdmin
            // if(isSettingRoute){
            //     conditions = isLoggedIn && isAdmin
            // }
            return (
                conditions ?
                <Layout>
                    <Component {...props} />    
                </Layout>
                :
                <Redirect to={{ pathname: props.history.goBack() }} />
            )
        }}

        />
    )
}

export default AdminRouteWrapper
