import axios from 'axios'
import { 
    GET_DEPARTMENT_COMPLETED,
    LOADING_DEPARTMENT, 
    CREATE_DEPARTMENT, 
    DELETE_DEPARTMENT, 
    UPDATE_DEPARTMENT,
    API_URL
} from '../../types/constantTypes'

export const loadingDepartment = dispatch => dispatch({ type: LOADING_DEPARTMENT })

export const getDepartment = dispatch => {
    axios.get(`${API_URL}/department`)
        .then( ({ data }) => dispatch({
            type: GET_DEPARTMENT_COMPLETED,
            payload: data
        }) )
        .catch( err => {
            throw err
        })
}

export const createDepartment = async (department) => {
    try {
        let { data } = await axios.post(`${API_URL}/department`, department)
        // console.log(data);
        return {
            type: CREATE_DEPARTMENT,
            payload: data
        }
    } catch(err) {
        throw err
    }
}

export const updateDepartment = async (department, oldName) => {
    try {
        let id = department.id
        let { data } = await axios.patch(`${API_URL}/department/${id}`, {...department, oldName})
        return {
            type: UPDATE_DEPARTMENT,
            payload: {id, data}
        }
    } catch(err) {
        throw err
    }
}

export const deleteDepartment = async id => {
    try {
        await axios.delete(`${API_URL}/department/${id}`)
        return {
            type: DELETE_DEPARTMENT,
            payload: id
        }
    } catch(err) {
        throw err
    }
}