import axios from 'axios'
import {
    LOADING_ALLOWANCE, GET_ALLOWANCE, DELETE_ALLOWANCE, CREATE_ALLOWANCE, UPDATE_ALLOWANCE, API_URL
} from '../types/constantTypes'

export const loadingAllowances = dispatch => dispatch({type: LOADING_ALLOWANCE})

export const getAllowances = async dispatch => {
    try {
        let {data} = await axios.get(`${API_URL}/allowance`)
        dispatch({
            type: GET_ALLOWANCE,
            payload: data
        })
    } catch (err) {
        throw err
    }
}

export const createAllowance = async value => {
    console.log(value)
    try {
        let {data} = await axios.post(`${API_URL}/allowance`, value)
        return {
            type: CREATE_ALLOWANCE,
            payload: data
        }
    } catch (err) {
        throw err
    }
}

export const updateAllowance = async (newValue, oldValue) => {
    const { generalStepData: {id} } = newValue
    try {
        let {data} = await axios.patch(`${API_URL}/allowance/${id}`, newValue)
        return {
            type: UPDATE_ALLOWANCE,
            payload: data
        }
    } catch (err) {
        throw err
    }
}

export const deleteAllowance = async id => {
    try {
        await axios.delete(`${API_URL}/allowance/${id}`)
        return {
            type: DELETE_ALLOWANCE,
            payload: id
        }
    } catch (err) {
        throw err
    }
}