/* eslint-disable import/no-anonymous-default-export */
import {
    LOADING_MATERIAL, 
    GET_MATERIAL_COMPLETED, 
    CREATE_MATERIAL,
    REMOVE_MATERIAL,
    UPDATE_MATERIAL
} from "../../types/constantTypes"

const initState = {
    loading: false,
    materials: []
}

export default (state = initState, action) => {
    switch (action.type) {
        case LOADING_MATERIAL:
            return {
                ...state,
                loading: true
            }
        case GET_MATERIAL_COMPLETED:
            return {
                ...state,
                materials: action.payload,
                loading: false
            }
        case CREATE_MATERIAL: 
            //console.log(action.payload)
            return {
                ...state,
                materials: [ action.payload, ...state.materials]
            }
        case UPDATE_MATERIAL:
            return {
                ...state,
                materials: state.materials.map(item => item.id === action.payload.id ? { ...item, ...action.payload } : item)
            }
        case REMOVE_MATERIAL:
            return {
                ...state,
                materials: state.materials.filter( item => item.id !== action.payload)
            }
        default:
            return state
    }
}