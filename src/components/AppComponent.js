import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'

import Dashboard from '../pages/DashboardPage'
import Login from '../pages/LoginPage'

// Setting Page
import OfficePage from '../pages/settings/OfficePage'
import DepartmentPage from '../pages/settings/DepartmentPage'
import MaterialCategoryPage from '../pages/settings/MaterialCategoryPage'
import MaterialPage from '../pages/settings/MaterialPage'
import SellerPage from '../pages/settings/SellerPage'
import PersonnelPage from '../pages/settings/PersonnelPage'

// Material Page
import OrderMaterialPage from '../pages/materials/OrderMaterialPage'
import ReceiveMaterialPage from '../pages/materials/ReceiveMaterialPage'
// Durable Page
import RegisteredDurablePage from '../pages/RegisteredDurablePage'
// Procurement Page
import ProcurementPage from '../pages/ProcurementPage'
// AllowancePage
import AllowancePage from '../pages/AllowancePage'
// Reports
import MaterialByMonth from '../components/reports/materials/MaterialByMonth'
import EachMaterial from '../components/reports/materials/EachMaterial'

import NotFoundPage from '../pages/NotFoundPage'

import SecureRouteWrapper from '../routes/SecureRouteWrapper'
import AdminRouteWrapper from '../routes/AdminRouteWrapper'

import Layout from './layouts/Layout'
import { getAllSettingData, loadingGetAllSettingData } from '../actions/appSettingAction'


const App = () => {

    const dispatch = useDispatch()
    const { isLoggedIn } = useSelector(state => state.auth)

    useEffect(() => {
        if (isLoggedIn) {
            loadingGetAllSettingData(dispatch)
            getAllSettingData(dispatch)
        }
    }, [isLoggedIn])

    return (

        <Switch>
            <Route path='/login' render={(props) => {
                return (
                    isLoggedIn ? <Redirect to='/' /> : <Login {...props} />
                )
            }}
            />
            {/* Loggedin Route */}
            <SecureRouteWrapper exact path={['/', '/home']} component={Dashboard} layout={Layout} />
            {/* Materials */}
            <SecureRouteWrapper path='/order' component={OrderMaterialPage} layout={Layout} />
            <SecureRouteWrapper path='/receive' component={ReceiveMaterialPage} layout={Layout} />
            {/* registered-durable */}
            <SecureRouteWrapper path='/registered-durable' component={RegisteredDurablePage} layout={Layout} />
            {/* procurement */}
            <SecureRouteWrapper path='/procurement' component={ProcurementPage} layout={Layout} />
            {/* allowance */}
            <SecureRouteWrapper path='/allowance' component={AllowancePage} layout={Layout} />

            {/* <SecureRouteWrapper path='/reports' component={Report2Component} /> */}
            {/* <SecureRouteWrapper path='/reports/orderReport' component={OrderReport} /> */}
            <SecureRouteWrapper path='/reports/material-by-month' component={MaterialByMonth} layout={Layout} />
            <SecureRouteWrapper path='/reports/each-material' component={EachMaterial} layout={Layout} />

            
            {/* Admin Route */}
            <AdminRouteWrapper path='/settings/office' component={OfficePage} layout={Layout} />
            <AdminRouteWrapper path='/settings/department' component={DepartmentPage} layout={Layout} />
            <AdminRouteWrapper path='/settings/material-category' component={MaterialCategoryPage} layout={Layout} />
            <AdminRouteWrapper path='/settings/material' component={MaterialPage} layout={Layout} />
            <AdminRouteWrapper path='/settings/seller' component={SellerPage} layout={Layout} />
            <AdminRouteWrapper path='/settings/personnel' component={PersonnelPage} layout={Layout} />



            

            {/* Page Not Found */}
            <Route render={() => <NotFoundPage props="notfound_page" />} />
        </Switch>
    )
}

export default App
