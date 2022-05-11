import axios from 'axios'
import { 
    LOADING_MATERIAL_ORDER, 
    GET_MATERIAL_ORDER, 
    CREATE_MATERIAL_ORDER,
    DELETE_MATERIAL_ORDER,
    UPDATE_MATERIAL_ORDER,
    API_URL,
    UPDATE_ORDER_STATUS_BY_ID,
    UPDATE_ORDER_STATUS_BY_ID_AND_PAID
} from "../types/constantTypes"

export const loadingMaterialOrders = dispatch => dispatch({type: LOADING_MATERIAL_ORDER})

export const getMaterialOrders = async (dispatch, accessToken) => {
    try{
        let { data } = await axios.get(`${API_URL}/order`, {
            headers: {
                authorization: `Bearer ${accessToken}`
            }
        })
        dispatch({
            type: GET_MATERIAL_ORDER,
            payload: data
        })
    } catch (err) {
        throw err
    }
}

export const getMaterialOrderById = async (id, accessToken) => {
    try {
        const { data } = await axios.get(`${API_URL}/order/${id}`, {
            headers: {
                authorization: `Bearer ${accessToken}`
            }
        })
        return data
    } catch (err) {
        throw err
    }
}

export const createMaterialOrder = async (order, accessToken) => {
    try {
        const { data } = await axios.post(`${API_URL}/order`, order, {
            headers: {
                authorization: `Bearer ${accessToken}`
            }
        })
        return {
            type: CREATE_MATERIAL_ORDER,
            payload: data
        }
    } catch (err) {
        throw err
    } 
}

export const updateMaterialOrder = async (order, accessToken) => {
    try {
        let id = order.id
        let {data} = await axios.patch(`${API_URL}/order/${id}`, order, {
            headers: {
                authorization: `Bearer ${accessToken}`
            }
        })
        return {
            type: UPDATE_MATERIAL_ORDER,
            payload: {id, data}
        }
    } catch (err) {
        throw err
    }
}

export const updateOrderStatusById = async (orderId, status, accessToken) => {
    try {
        
        await axios.patch(`${API_URL}/order/status/${orderId}`, { status }, {
            headers: {
                authorization: `Bearer ${accessToken}`
            }
        })
        return {
            type: UPDATE_ORDER_STATUS_BY_ID,
            payload: {orderId, status}
        }
    } catch (error) {
        throw error
    }
}

export const updateOrderStatusByIdAndPaid = async (orderId, orderPaid, accessToken) => {
    try {
        await axios.patch(`${API_URL}/order/paid-and-status/${orderId}`, { orderPaid }, {
            headers: {
                authorization: `Bearer ${accessToken}`
            }
        })
        return {
            type: UPDATE_ORDER_STATUS_BY_ID_AND_PAID,
            payload: {orderId, orderPaid}
        }
    } catch (error) {
        throw error
    }
}

export const deleteMaterialOrder = async (id, accessToken) => {
    try {
        console.log(id)
        await axios.delete(`${API_URL}/order/${id}`, {
            headers: {
                authorization: `Bearer ${accessToken}`
            }
        })
        return {
            type: DELETE_MATERIAL_ORDER,
            payload: id
        }
    } catch (err) {
        throw err
    }
}