import axios from 'axios'
import { 
    LOADING_PROCUREMENT, 
    GET_PROCUREMENT, 
    CREATE_PROCUREMENT,
    UPDATE_PROCUREMENT,
    DELETE_PROCUREMENT,
    API_URL
} from "../types/constantTypes";

export const loadingProcurement = dispatch => dispatch({type: LOADING_PROCUREMENT})

export const getProcurement = dispatch => {
    axios.get(`${API_URL}/procurement`)
        .then( ({data}) => {
            // console.log(data);
            dispatch({
                type: GET_PROCUREMENT,
                payload: data
            })
        })
        .catch( err => { throw err } )
}

export const createProcurement = async procurement => {
    try {
        let {data} = await axios.post(`${API_URL}/procurement`, procurement)
        // console.log(data)
        return {
            type: CREATE_PROCUREMENT,
            payload: data
        }
    } catch (err) {
        throw err
    }
}

export const updateProcurement = async procurement => {
    
    try {
        const id = procurement.id
        let {data} = await axios.patch(`${API_URL}/procurement/${id}`, procurement)
        // console.log(data)
        return {
            type: UPDATE_PROCUREMENT,
            payload: {id, data}
        }
    } catch (err) {
        throw err
    }
}

export const deleteProcurement = async id => {
    try {
        await axios.delete(`${API_URL}/procurement/${id}`)
        // console.log(data)
        return {
            type: DELETE_PROCUREMENT,
            payload: id
        }
    } catch (err) {
        throw err
    }
}