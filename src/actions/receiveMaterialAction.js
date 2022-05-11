import axios from 'axios'
import { 
    LOADING_MATERIAL_RECEIVE, 
    API_URL, 
    GET_MATERIAL_RECEIVE,
    CREATE_MATERIAL_RECEIVE,
    UPDATE_MATERIAL_RECEIVE,
    DELETE_MATERIAL_RECEIVE
} from '../types/constantTypes'


export const loadingMaterialReceive = dispatch => dispatch({ type: LOADING_MATERIAL_RECEIVE })

export const getMaterialReceive  = async (dispatch, mounted) => {
    try {
        const { data } = await axios.get(`${API_URL}/receive`)
        dispatch({
            type: GET_MATERIAL_RECEIVE,
            payload: data
        })
    } catch (err) {
        throw err
    }
}

export const createMaterialReceive = async (receives) => {
    try {
        const { data } = await axios.post(`${API_URL}/receive`, { receives })
        return {
            type: CREATE_MATERIAL_RECEIVE,
            payload: data
        }
    } catch (err) {
        throw err
    } 
}

export const updateMaterialReceive = async (receive) => {
    try {
        const [item] = receive
        const id = item.id
        const {data} = await axios.patch(`${API_URL}/receive/${id}`, { receive } )
        return {
            type: UPDATE_MATERIAL_RECEIVE,
            payload: { id, data }
        }
    } catch (err) {
        throw err
        
    }
}

export const deleteMaterialReceive = async (id) => {
    try {
        await axios.delete(`${API_URL}/receive/${id}`)
        return {
            type: DELETE_MATERIAL_RECEIVE,
            payload: id
        }
    } catch(err) {
        throw err
    }
}