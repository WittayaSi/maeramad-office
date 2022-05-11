import { 
    CREATE_REGISTER_DURABLE, 
    GET_REGISTERED_DURABLE,
    LOADING_REGISTERED_DURABLE, 
    REMOVE_REGISTER_DURABLE, 
    UPDATE_REGISTER_DURABLE 
} from "../types/constantTypes"

const initState = {
    registerDurableFormCode: {
        durableCategories: [],
        durableSellers: [],
        durableUsePlaces: []
    },
    registeredDurables: [],
    loading: false
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state=initState, action) => {
    switch (action.type) {
        case LOADING_REGISTERED_DURABLE:
            return {
                ...state,
                loading: true
            }
        case GET_REGISTERED_DURABLE:
            const { durableCategorieWithDurables, durableSellers, usePlaces } = action.payload
            console.log(action.payload)
            const { registerDurableFormCode } = state
            return {
                ...state,
                loading: false,
                registeredDurables: action.payload.regDurables,
                registerDurableFormCode: {
                    ...registerDurableFormCode,
                    durableCategories: durableCategorieWithDurables,
                    durableSellers: durableSellers,
                    durableUsePlaces: usePlaces
                }
            }
        case CREATE_REGISTER_DURABLE:
            return {
                ...state,
                registeredDurables: [ action.payload, ...state.registeredDurables]
            }
        case UPDATE_REGISTER_DURABLE:
            const { registeredDurables } = state
            const { id, ...rest } = action.payload
            return {
                ...state,
                registeredDurables: registeredDurables.map( rd => rd.id===id ? { ...rd, ...rest } : rd )
            }
        case REMOVE_REGISTER_DURABLE:
            // const { registeredDurables } = state
            return {
                ...state,
                registeredDurables: state.registeredDurables.filter( rd => rd.id !== action.payload)
            }
        default:
            return state
    }
}