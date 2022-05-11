import axios from 'axios'
import { 
    API_URL, 
    AUTH_LOGOUT,
    CLEAR_APP_SETTING_DATA
} from '../types/constantTypes'

export const register = (username, email, password) => async dispatch => {
    try {
        const { data } = await axios.post(`${API_URL}/auth/signup`, { username, email, password })
        console.log(data)
    } catch (err) {
        throw err
    }
}

export const login = async value => {
    try {
        const { data } = await axios.post(`${API_URL}/auth/signin`, value)
        return  data
    } catch (err) {
        throw err
    }
    
}

export const requestRefreshToken = async (token) => {
    try {
        const { data } = await axios.post(`${API_URL}/auth/refresh-token`, {}, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        return data
        
    } catch (error) {
        throw error
    }
}

export const logout = async dispatch => {
    dispatch({ type: AUTH_LOGOUT })
    dispatch({ type: CLEAR_APP_SETTING_DATA })
}

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"))
}