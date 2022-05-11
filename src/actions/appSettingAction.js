import axios from 'axios'

import { 
    GET_SETTING_DATA_COMPLETED,
    LOADING_GET_ALL_SETTING_DATA,
    COMPLETED_GET_ALL_SETTING_DATA,
    API_URL,
    RELOAD_MATERIAL_DATA
} from '../types/constantTypes'

export const loadingGetAllSettingData = async dispatch => dispatch({type: LOADING_GET_ALL_SETTING_DATA})
export const completedGetAllSettingData = async dispatch => dispatch({type: COMPLETED_GET_ALL_SETTING_DATA})

export const getAllSettingData = async (dispatch) => {
    try {
            const response = await axios.get(`${API_URL}/getcode`)
            const data = await response.data
            dispatch({
                type: GET_SETTING_DATA_COMPLETED,
                payload: { ...data }
            })
    } catch (error) {
        throw error
    }
}

export const reloadMaterialData = async (dispatch) => {
    try {
        const response = await axios.get(`${API_URL}/getcode/reget-material`)
        const data = response.data
        console.log(data)
        dispatch({
            type: RELOAD_MATERIAL_DATA,
            payload: data
        })
    } catch (error) {
        throw error
    }
}