import { 
    LOADING_PROCUREMENT, 
    GET_PROCUREMENT,
    CREATE_PROCUREMENT,
    DELETE_PROCUREMENT,
    UPDATE_PROCUREMENT
} from "../types/constantTypes"

const initState = {
    procurements: [],
    loading: false
}

export default (state = initState, action) => {
    switch (action.type) {
        case LOADING_PROCUREMENT:
            return {
                ...state,
                loading: true
            }
        case GET_PROCUREMENT:
            return {
                ...state,
                procurements: action.payload,
                loading: false
            }
        case CREATE_PROCUREMENT:
            return {
                ...state,
                procurements: [action.payload, ...state.procurements]
            }
        case UPDATE_PROCUREMENT:
            return {
                ...state,
                procurements: [action.payload.data, ...state.procurements].filter( procurement => procurement.id !== action.payload.id )
            }
        case DELETE_PROCUREMENT:
            return {
                ...state,
                procurements: state.procurements.filter( procurement => procurement.id !== action.payload )
            }
        default:
            return state
    }
}