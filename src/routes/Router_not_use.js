import React, { useContext } from 'react'
import { Redirect, Switch, Route } from 'react-router-dom'


import Dashboard from './components/Dashboard'
import OfficeComponent from './components/settings/offices/OfficeComponent'
import DepartmentComponent from './components/settings/departments/DepartmentComponent'
import SellerComponent from './components/settings/sellers/SellerComponent'
import PersonnelComponent from './components/settings/personnels/PersonnelComponent'

import DepreciationComponent from './components/settings/depreciations/DepreciationComponent'

import DurableCategoryComponent from './components/settings/durable-categories/DurableCategoryComponent'
import DurableComponent from './components/settings/durables/DurableComponent'

import MaterialCategoryComponent from './components/settings/m-categories/CategoryComponent'
import MaterialsComponent from './components/settings/m-items/MaterialComponent'

import ReceiveComponent from './components/materials/receives/ReceiveComponent'
import OrderComponent from './components/materials/orders/OrderComponent'

import OrderReport from './components/reports/orderReports/orderReport'
import Report2Component from './components/reports/Reports2'

import ProcurementComponent from './components/procurements/ProcurementComponent'
import AllowanceComponent from './components/allowances/AllowanceComponent'
import CarComponent from './components/settings/cars/CarComponent'

import LoginComponent from './components/authentications/LoginComponent'

// import DepreciationPage from './components/pages/depreciations/DepreciationPage'
// import PersonalPage from './components/pages/personals/PersonalPage'
// import MovieComponent from './components/reports'

import SecureRouteWrapper from './SecureRouteWrapper'

import Layout from './components/layouts/Layout'
import RegisteredDurablesComponent from './components/durables/RegisteredDurablesComponent'
import { AppContext } from './contexts/AppContext'

export default function Router() {
    return (
        <Switch>

                <Route path='/login' component={LoginComponent}/>

                <SecureRouteWrapper path={['/','/home']} component={Dashboard} layout={Layout} isLoggedIn={isLoggedIn} />
                <SecureRouteWrapper path='/settings/office' component={OfficeComponent} layout={Layout} isLoggedIn={isLoggedIn} />
                <SecureRouteWrapper path='/settings/department' component={DepartmentComponent} layout={Layout} isLoggedIn={isLoggedIn} />

                <SecureRouteWrapper path='/settings/durable-categories' component={DurableCategoryComponent} layout={Layout} isLoggedIn={isLoggedIn} />
                <SecureRouteWrapper path='/settings/durables' component={DurableComponent} layout={Layout} isLoggedIn={isLoggedIn} />

                <SecureRouteWrapper path='/settings/material-categories' component={MaterialCategoryComponent} layout={Layout} isLoggedIn={isLoggedIn} />
                <SecureRouteWrapper path='/settings/materials' component={MaterialsComponent} layout={Layout} isLoggedIn={isLoggedIn} />
                <SecureRouteWrapper path='/settings/sellers' component={SellerComponent} layout={Layout} isLoggedIn={isLoggedIn} />
                <SecureRouteWrapper path='/settings/depreciations' component={DepreciationComponent} layout={Layout} isLoggedIn={isLoggedIn} />
                <SecureRouteWrapper path='/settings/personnels' component={PersonnelComponent} layout={Layout} isLoggedIn={isLoggedIn} />
                <SecureRouteWrapper path='/settings/cars' component={CarComponent} layout={Layout} isLoggedIn={isLoggedIn} />

                {/* <SecureRouteWrapper exact path='/settings/items' component={ItemComponent} />
                <SecureRouteWrapper exact path='/settings/categories' component={CategoryComponent} /> */}

                <SecureRouteWrapper path='/receives' component={ReceiveComponent} layout={Layout} isLoggedIn={isLoggedIn} />
                <SecureRouteWrapper path='/orders' component={OrderComponent} layout={Layout} isLoggedIn={isLoggedIn} />

                <SecureRouteWrapper path='/regitered-duable' component={RegisteredDurablesComponent} layout={Layout} isLoggedIn={isLoggedIn} />

                <SecureRouteWrapper path='/reports/orderReport' component={OrderReport} layout={Layout} isLoggedIn={isLoggedIn} />
                <SecureRouteWrapper path='/reports' component={Report2Component} layout={Layout} isLoggedIn={isLoggedIn} />

                <SecureRouteWrapper path='/procurement' component={ProcurementComponent} layout={Layout} isLoggedIn={isLoggedIn} />
                <SecureRouteWrapper path='/allowance' component={AllowanceComponent} layout={Layout} isLoggedIn={isLoggedIn} />

        </Switch>
    )
}
