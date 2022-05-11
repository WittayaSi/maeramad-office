/* eslint-disable import/no-anonymous-default-export */
import {
    CREATE_MATERIAL_RECEIVE,
    DELETE_MATERIAL_RECEIVE,
    GET_MATERIAL_RECEIVE,
    LOADING_MATERIAL_RECEIVE, 
    UPDATE_MATERIAL_RECEIVE,
    RESET,
    SORTED_ITEMS
} from "../types/constantTypes"

const initState = {
    loading: false,
    receives: []
}

export default (state = initState, action) => {
    switch (action.type) {
        case LOADING_MATERIAL_RECEIVE:
            return {
                ...state,
                loading: true
            }
        case GET_MATERIAL_RECEIVE:
            return {
                ...state,
                receives: action.payload,
                loading: false
            }
        case CREATE_MATERIAL_RECEIVE:
            return {
                ...state,
                receives: [...action.payload, ...state.receives]
            }
        case UPDATE_MATERIAL_RECEIVE:
            return {
                ...state,
                receives: state.receives.map( r => (r.id === action.payload.id ? {...r, ...action.payload.data} : r) )
            }
        case DELETE_MATERIAL_RECEIVE: 
            return {
                ...state,
                receives: state.receives.filter( receive => receive.id !== action.payload )
            }
        case RESET: 
            const oldReceive = action.payload
            // console.log(oldReceive);
            return {
                ...state,
                receives: state.receives.map( r => (r.id === oldReceive.id ? {...r, ...oldReceive} : r) )
            }
        case SORTED_ITEMS:
            // // console.log(action.payload);
            return {
                ...state,
                recevves: [...action.payload]
            }
        default:
            return state
    }
}