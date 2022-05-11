import axios from 'axios'

import { LOADING_OFFICE, CREATE_OFFICE, UPDATE_OFFICE, GET_OFFICE_COMPLETED, API_URL } from "../../types/constantTypes"


export const loadingOffice = dispatch => {
    dispatch({
        type: LOADING_OFFICE
    })
}

export const getOffice = async dispatch => {
    try {
        const { data } = await axios.get(`${API_URL}/office`)
        console.log(data)
        dispatch({
            type: GET_OFFICE_COMPLETED,
            payload: data
        })
    } catch(err) {
        throw err
    }
}

export const createOffice = async (office) => {
    // console.log(office);
    try {
        const { data } = await axios.post(`${API_URL}/office`, office)
        // console.log(data)
        return {
            type: CREATE_OFFICE,
            payload: data
        }
    } catch (err) {
        throw err
    }  
}

export const updateOffice = async (id, office) => {
    try {
        const { data } = await axios.patch(`${API_URL}/office/${id}`, office)
        console.log(data)
        return {
            type: UPDATE_OFFICE,
            payload: data
        }
    } catch (err) {
        throw err
    }
    
}