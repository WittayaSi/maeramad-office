import axios from 'axios'
import {
    LOADING_PERSONNEL,
    GET_PERSONNEL_COMPLETED,
    CREATE_PERSONNEL,
    UPDATE_PERSONNEL,
    DELETE_PERSONNEL,
    API_URL
} from '../../types/constantTypes'

export const loadingPersonnel = dispatch => dispatch({ type: LOADING_PERSONNEL })

export const getPersonnels = async dispatch => {

    try {
        const response = await axios.get(`${API_URL}/personnel`)
        const data = await response.data
        dispatch({
            type: GET_PERSONNEL_COMPLETED,
            payload: data
        })
    } catch (error) {
        // console.log(error)
        throw error
    }
}

export const createPersonnel = async (person) => {
    try {
        let { data } = await axios.post(`${API_URL}/personnel`, person)
        return {
            type: CREATE_PERSONNEL,
            payload: data
        }
    } catch (err){
        throw err
    }     
}

export const updatePersonnel = async (newPerson) => {
    try {
        let id = await newPerson.id
        let { data } = await axios.patch(`${API_URL}/personnel/${id}`, newPerson)
        // console.log(data)
        return {
            type: UPDATE_PERSONNEL,
            payload: data
        }
    } catch(err) {
        // console.log(err)
        throw err
    }
}

export const deletePersonnel = async id => {
    try {
        await axios.delete(`${API_URL}/personnel/${id}`)
        // console.log(data)
        return {
            type: DELETE_PERSONNEL,
            payload: id
        }
    } catch (err) {
        throw err
    }
}