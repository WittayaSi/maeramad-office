import {
    LOADING_CATEGORY,
    GET_CATEGORY,
    CREATE_CATEGORY,
    REMOVE_CATEGORY,
    UPDATE_CATEGORY
} from '../../types/constantTypes'

const initState = {
    loading: false,
    categories: []
}

export default (state = initState, action) => {
    switch (action.type) {
        case LOADING_CATEGORY:
            return {
                ...state,
                loading: true
            }
        case GET_CATEGORY:
            return {
                ...state,
                categories: action.payload,
                loading: false
            }
        case CREATE_CATEGORY:
            const payload = {...action.payload, materialCount: 0}
            return {
                ...state,
                categories: [payload, ...state.categories]
            }
        case UPDATE_CATEGORY:
            // console.log(action.payload)
            return {
                ...state,
                categories: state.categories.map( category => {
                    if (category.id === action.payload.id){
                        return {...category, name: action.payload.categoryName}
                    } else{
                        return category
                    }
                })
            }
        case REMOVE_CATEGORY: 
            return {
                ...state,
                categories: state.categories.filter( category => category.id !== action.payload )
            }
        default:
            return state
    }
}