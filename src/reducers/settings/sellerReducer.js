import { 
    LOADING_SELLER, 
    GET_SELLER_COMPLETED, 
    CREATE_SELLER, 
    UPDATE_SELLER, 
    DELETE_SELLER,
    SET_ERRORS
} from '../../types/constantTypes'

const initState = {
    loading: false,
    sellers: []
}

export default (state = initState, action) => {
    switch (action.type) {
        case LOADING_SELLER:
            return {
                ...state,
                loading: true
            }
        case GET_SELLER_COMPLETED:
            return {
                ...state,
                loading: false,
                sellers: action.payload
            }
        case CREATE_SELLER:
            return {
                ...state,
                sellers: [ action.payload, ...state.sellers ]
            }
        case UPDATE_SELLER: 
            return {
                ...state,
                sellers: state.sellers.map( seller => seller.id===action.payload.id ? {...seller, ...action.payload} : seller )
            }
        case DELETE_SELLER:
            return {
                ...state,
                sellers: state.sellers.filter( seller => seller.id!==action.payload )
            }
        default:
            return state
    }
}