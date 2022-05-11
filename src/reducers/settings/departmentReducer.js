import { 
    LOADING_DEPARTMENT,
    GET_DEPARTMENT_COMPLETED,
    CREATE_DEPARTMENT,
    UPDATE_DEPARTMENT,
    DELETE_DEPARTMENT
} from '../../types/constantTypes'

const initState = {
    loading: false,
    departments: []
}

export default (state = initState, action) => {
    switch (action.type) {
        case LOADING_DEPARTMENT:
            return {
                ...state,
                loading: true
            }
        case GET_DEPARTMENT_COMPLETED:
            return {
                ...state,
                loading: false,
                departments: action.payload
            }
        case CREATE_DEPARTMENT:
            return {
                ...state,
                departments: [ ...state.departments, action.payload]
            }
        case UPDATE_DEPARTMENT:
            return {
                ...state,
                departments: state.departments.map(department =>
                (
                    (department.id === action.payload.id) ?
                        { ...state.departments, ...action.payload.data } : department
                )
                )
            }
        case DELETE_DEPARTMENT:
            return {
                ...state,
                departments: state.departments.filter(department => department.id !== action.payload)
            }
        default:
            return state
    }
}