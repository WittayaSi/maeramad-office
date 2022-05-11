import {
    LOADING_OFFICE,
    GET_OFFICE_COMPLETED,
    CREATE_OFFICE,
    UPDATE_OFFICE,
} from '../../types/constantTypes'



export default (state={}, action) => {
    switch (action.type) {
        case LOADING_OFFICE:
            return {
                ...state,
                loading: true
            }
        case GET_OFFICE_COMPLETED: 
            return {
                ...state,
                loading: false,
                isAlreadyOffice: Object.keys(action.payload).length > 0,
                office: { ...action.payload }
            }
        case CREATE_OFFICE:
            return {
                ...state,
                isAlreadyOffice: true,
                office: { ...action.payload }
            }
        case UPDATE_OFFICE:
            return {
                ...state,
                office: action.payload
            }
        default:
            return state
    }
}