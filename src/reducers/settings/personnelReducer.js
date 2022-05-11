import {
    LOADING_PERSONNEL,
    GET_PERSONNEL_COMPLETED,
    CREATE_PERSONNEL,
    UPDATE_PERSONNEL,
    DELETE_PERSONNEL
} from '../../types/constantTypes'

const initState = {
    loading: false,
    cprenames: [],
    departments: [],
    personnels: []
}

export default (state = initState, action) => {
    switch (action.type) {
        case LOADING_PERSONNEL:
            return {
                ...state,
                loading: true
            }
        case GET_PERSONNEL_COMPLETED:
            const { personnels, cprenames, departments } = action.payload
            return {
                ...state,
                personnels,
                cprenames,
                departments,
                loading: false
            }
        case CREATE_PERSONNEL: 
            return {
                ...state,
                personnels: [action.payload, ...state.personnels]
            }
        case UPDATE_PERSONNEL:
            return {
                ...state,
                personnels: state.personnels.map( person => person.id === action.payload.id ? { ...person, ...action.payload } : person )
            }
        case DELETE_PERSONNEL:
            return {
                ...state,
                personnels: state.personnels.filter( person => person.id !== action.payload )
            }
        default:
            return state
    }
}