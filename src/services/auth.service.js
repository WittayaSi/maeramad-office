import axios from 'axios'
import { API_URL } from '../types'

export const register = (username, email, password) => {
    return axios.post(`${API_URL}/auth/signup`, {
        username,
        email,
        password
    })
}

export const login = async (username, password) => {
    const {data} = await axios.post(`${API_URL}/auth/signin`,{
        username,
        password
    })
    if(data.accessToken){
        localStorage.setItem("user", JSON.stringify(data))
    }
    return data
}

export const logout = () => {
    localStorage.removeItem("user")
}

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"))
}