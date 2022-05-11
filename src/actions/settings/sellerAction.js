import axios from "axios"
import { 
    LOADING_SELLER, 
    GET_SELLER_COMPLETED,
    CREATE_SELLER, 
    UPDATE_SELLER, 
    DELETE_SELLER, 
    API_URL 
} from "../../types/constantTypes"

// set loading to true
export const loadingSeller = dispatch => dispatch({ type: LOADING_SELLER })

// get all sellers from db and set loading to false
export const getSeller = dispatch => {
    axios.get(`${API_URL}/seller`)
        .then( ({data}) => dispatch({
            type: GET_SELLER_COMPLETED,
            payload: data
        }) )
        .catch( err => {
            // console.log(err)
            throw err
        })
}

export const createSeller = async seller => {
    try {
        let { data } = await axios.post(`${API_URL}/seller`, seller)
        // console.log(data)
        return {
            type: CREATE_SELLER,
            payload: data
        }
    } catch (err) {
        // console.log(err)
        throw err
    }
}

export const updateSeller = async seller => {
    try {
        let id = seller.id
        let { data } = await axios.patch(`${API_URL}/seller/${id}`, seller)
        // console.log(data)
        return {
            type: UPDATE_SELLER,
            payload: data
        }
    } catch (err) {
        // console.log(err)
        throw err
    }
}

export const deleteSeller = async id => {
    try {
        await axios.delete(`${API_URL}/seller/${id}`)
        // console.log(data)
        return {
            type: DELETE_SELLER,
            payload: id
        }
    } catch (err) {
        throw err
    }
}