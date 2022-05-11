import {
    AUTH_REGISTER,
    AUTH_LOGOUT,
    LOGGIN_COMPLETED,
    LOGGIN_INCOMPLETE,
    REFRESH_ACCESS_TOKEN
} from '../types/constantTypes'

const isLoggedInKey = 'isLoggedIn'
const accessTokenKey = 'accessToken'
const userKey = 'user'
const isAdminKey = 'isAdmin'

const isLoggedInLocal = localStorage.getItem(isLoggedInKey)
const accessTokenLocal = localStorage.getItem(accessTokenKey)
const userLocal = localStorage.getItem(userKey)
const isAdminLocal = localStorage.getItem(isAdminKey)

const initialState = {
    user: userLocal ? JSON.parse(userLocal) : {},
    isLoggedIn: isLoggedInLocal ? JSON.parse(isLoggedInLocal) : false,
    accessToken: accessTokenLocal ? JSON.parse(accessTokenLocal) : '',
    isAdmin: isAdminLocal ? JSON.parse(isAdminLocal) : false,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case AUTH_REGISTER:
            return {
                ...state,
                isLoggedIn: false
            }
        case LOGGIN_INCOMPLETE: 
            return {
                ...state,
                isLoggedIn: false,
                accessToken: '',
                isAdmin: false,
                user: {}
            }
        case LOGGIN_COMPLETED:
            const { roles, accessToken } = action.payload

            const returnValue = {
                ...state,
                isLoggedIn: true,
                accessToken,
                isAdmin: roles.includes('ROLE_ADMIN'),
                user: action.payload
            }

            localStorage.setItem(isLoggedInKey, JSON.stringify(returnValue.isLoggedIn))
            localStorage.setItem(accessTokenKey, JSON.stringify(returnValue.accessToken))
            localStorage.setItem(userKey, JSON.stringify(returnValue.user))
            localStorage.setItem(isAdminKey, JSON.stringify(returnValue.isAdmin))

            return returnValue

        case REFRESH_ACCESS_TOKEN:
            return {
                ...state,
                accessToken: action.payload 
            }
        case AUTH_LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                accessToken: '',
                isAdmin: false,
                user: {}
            }
        default:
            return state
    }
}