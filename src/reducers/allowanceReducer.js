import { LOADING_ALLOWANCE, GET_ALLOWANCE, DELETE_ALLOWANCE, CREATE_ALLOWANCE } from '../types/constantTypes'

const initState = {
    allowances: [],
    loading: false
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initState, action) => {
    const { payload } = action
    const { allowances } = state
    switch (action.type) {
        case LOADING_ALLOWANCE:
            return {
                ...state,
                loading: true
            }
        case GET_ALLOWANCE: 
            return {
                ...state,
                allowances: payload,
                loading: false
            }
        case CREATE_ALLOWANCE:
            return {
                ...state,
                allowances: [payload, ...allowances]
            }
        case DELETE_ALLOWANCE: 
            return {
                ...state,
                allowances: allowances.filter( allowance => allowance.id !== payload )
            }
        default:
            return state
    }
}