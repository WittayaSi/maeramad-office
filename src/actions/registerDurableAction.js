import axios from 'axios'

import { 
    API_URL,
    CREATE_REGISTER_DURABLE,
    GET_REGISTERED_DURABLE,
    LOADING_REGISTERED_DURABLE,
    REMOVE_REGISTER_DURABLE,
    UPDATE_REGISTER_DURABLE
} from '../types/constantTypes'

import { types, styles } from '../assets/dataCode.json'


export const loadingRegisteredDurables = dispatch => dispatch({type: LOADING_REGISTERED_DURABLE})

export const getRegisteredDurables = async (dispatch, fiscalYear) => {
    try {
        const {data} = await axios.get(`${API_URL}/registered-durable?fiscalYear=${fiscalYear}`)
        // console.log(data)
        const newData = await data.regDurables.map( d => ({
            ...d,
            typeName: types.find( t => t.code === d.type ).name,
            styleName: styles.find( t => t.code === d.style ).name,
        }))
        dispatch({
            type: GET_REGISTERED_DURABLE,
            payload: { ...data, regDurables: newData }
        })
    } catch (err) {
        throw err
    }
}

export const createRegisterDurable = async formData => {
    try {
        // console.log(formData);
        const { data } = await axios.post(`${API_URL}/registered-durable`, formData)
        // console.log(data)
        return {
            type: CREATE_REGISTER_DURABLE,
            payload: data
        }
    } catch (err) {
        throw err
    }
}

export const updateRegisterDurable = async (formData, id) => {
    try {
        // // console.log(formData, id)
        const { data } = await axios.patch(`${API_URL}/registered-durable/${id}`, formData)
        // console.log(data)
        return {
            type: UPDATE_REGISTER_DURABLE,
            payload: {...data, id}
        }
    } catch (err) {
        throw err
    }
}

export const deleteRegisteredDurable = async id => {
    try {
        await axios.delete(`${API_URL}/registered-durable/${id}`) 
        // console.log(result)
        return {
            type: REMOVE_REGISTER_DURABLE,
            payload: id
        }
    } catch (err) {
        throw err
    }
}