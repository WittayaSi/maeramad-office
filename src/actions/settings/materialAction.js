import axios from 'axios'

import { 
    LOADING_MATERIAL, 
    GET_MATERIAL_COMPLETED, 
    CREATE_MATERIAL, 
    REMOVE_MATERIAL, 
    UPDATE_MATERIAL_STATUS, 
    UPDATE_MATERIAL,
    API_URL
} from '../../types/constantTypes'

export const loadingMaterial = dispatch => dispatch({type: LOADING_MATERIAL})

export const getMaterial = async (dispatch) => {
    try {
        const response = await axios.get(`${API_URL}/material`)
        const data = response.data
        console.log(data)
        dispatch({ 
            type: GET_MATERIAL_COMPLETED, 
            payload: data 
        })
    } catch (error) {
        throw error
    }
}

export const createMaterial = async (materialObject) => {
    try{
        let { data } = await axios.post(`${API_URL}/material`, materialObject)
        console.log(data)
        return {
            type: CREATE_MATERIAL,
            payload: data
        }
    } catch (err){
        // console.log(err.response);
        throw err
    }
}

export const updateMaterial = async (id, materialObject) => {
    try{
        let { data } = await axios.patch(`${API_URL}/material/${id}`, materialObject)
        // // console.log(data);
        return {
            type: UPDATE_MATERIAL,
            payload: data
        }
    } catch (err){
        throw err
    }
}

export const updateMaterialStatus = async (status, id) => {
    try{
        await axios.patch(`${API_URL}/material/status/${id}`, { status })
        return {
            type: UPDATE_MATERIAL_STATUS,
            payload: {id, status}
        }
    } catch (err){
        throw err
    }
}

export const removeMaterial = async (id) => {
    try {
        console.log(id)
        await axios.delete(`${API_URL}/material/${id}`)
        return {
            type: REMOVE_MATERIAL,
            payload: id
        }
    } catch (err) {
        throw err
    }
}