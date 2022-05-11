import {
    CREATE_MATERIAL_ORDER,
    DELETE_MATERIAL_ORDER,
    GET_MATERIAL_ORDER,
    LOADING_MATERIAL_ORDER,
    UPDATE_MATERIAL_ORDER,
    UPDATE_ORDER_STATUS_BY_ID,
    UPDATE_ORDER_STATUS_BY_ID_AND_PAID
} from '../types/constantTypes'

const initState = {
    loading: false,
    orders: []
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initState, action) => {
    switch (action.type) {
        case LOADING_MATERIAL_ORDER:
            return {
                ...state,
                loading: true
            }
        case GET_MATERIAL_ORDER:
            return {
                ...state,
                orders: action.payload,
                loading: false
            }
        case CREATE_MATERIAL_ORDER:
            return {
                ...state,
                orders: [action.payload, ...state.orders]
            }
        case UPDATE_MATERIAL_ORDER:
            return {
                ...state,
                orders: state.orders.map( order => (order.id === action.payload.id) ? ({ ...action.payload.data, orderMaterials: action.payload.data.orderMaterials }) : (order) )
            }
        case UPDATE_ORDER_STATUS_BY_ID: 
            return {
                ...state,
                orders: state.orders.map( order => (order.id === action.payload.orderId) ? ({ ...order, status: action.payload.status }) : (order) )
            }
        case UPDATE_ORDER_STATUS_BY_ID_AND_PAID:
            return {
                ...state,
                orders: state.orders.map( order => (order.id === action.payload.orderId) ? ({ ...order, status: action.payload.status }) : (order) )
            }
        case DELETE_MATERIAL_ORDER:
            console.log(action.payload)
            return {
                ...state,
                orders: state.orders.filter( order => order.id !== action.payload )
            }
        default:
            return state
    }
}