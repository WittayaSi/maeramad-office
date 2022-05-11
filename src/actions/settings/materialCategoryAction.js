import axios from 'axios'
import {
    LOADING_CATEGORY,
    GET_CATEGORY,
    CREATE_CATEGORY,
    REMOVE_CATEGORY,
    UPDATE_CATEGORY,
    API_URL
} from '../../types/constantTypes'

export const loadingCategory = dispatch => dispatch({type: LOADING_CATEGORY})

export const getCategory = async dispatch => {
    try {
        const { data } = await axios.get(`${API_URL}/material-category`)
        // console.log(data)
        dispatch({
            type: GET_CATEGORY,
            payload: data
        })
    } catch (err) {
        throw err
    }
}

export const createCategory = async (categoryName) => {
    try {
        let { data } = await axios.post(`${API_URL}/material-category`, { name: categoryName })
        return {
            type: CREATE_CATEGORY,
            payload: data
        }
    } catch (err) {
        // // console.log(err.response);
        throw err
    }
}

export const updateCategory = async (id, categoryName) => {
    try {
        await axios.patch(`${API_URL}/material-category/${id}`, { name: categoryName })
        return {
            type: UPDATE_CATEGORY,
            payload: { id, categoryName }
        }
    } catch (err){
        throw err
    }
}

export const removeCategory = async (id) => {
    try {
        await axios.delete(`${API_URL}/material-category/${id}`)
        // console.log(result)
        return {
            type: REMOVE_CATEGORY,
            payload: id
        }
    } catch (err) {
        throw err
    }
}

