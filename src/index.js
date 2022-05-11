import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ToastProvider } from 'react-toast-notifications'

import { Provider } from 'react-redux'

import AppComponent from './components/AppComponent'

import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

import store from './store'

ReactDOM.render(
    <Provider store={store}>
        <ToastProvider> 
            <BrowserRouter>
                <AppComponent />
            </BrowserRouter>
        </ToastProvider>
    </Provider>
    ,
    document.getElementById('root')
)
