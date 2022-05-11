import {
    GET_SETTING_DATA_COMPLETED,
    RELOAD_MATERIAL_DATA,
    LOADING_GET_ALL_SETTING_DATA,
    CREATE_OFFICE,
    UPDATE_OFFICE,
    CREATE_DEPARTMENT,
    UPDATE_DEPARTMENT,
    DELETE_DEPARTMENT,
    CREATE_CATEGORY,
    UPDATE_CATEGORY,
    REMOVE_CATEGORY,
    CREATE_MATERIAL,
    UPDATE_MATERIAL,
    REMOVE_MATERIAL,
    CREATE_SELLER,
    UPDATE_SELLER,
    DELETE_SELLER,
    CREATE_PERSONNEL,
    UPDATE_PERSONNEL,
    DELETE_PERSONNEL,
    CREATE_DURABLE_CATEGORY,
    UPDATE_DURABLE_CATEGORY,
    REMOVE_DURABLE_CATEGORY,
    CREATE_DURABLE,
    UPDATE_DURABLE,
    REMOVE_DURABLE,
    CLEAR_APP_SETTING_DATA
} from '../types/constantTypes'

const initialState = {
    isAlreadyOffice: false,
    office: {},
    durableCategories: [],
    durables:[],
    departments: [],
    categories: [],
    materials: [],
    materialWithLabel: [],
    personnels: [],
    sellers: [],
    provinces: [],
    newCategories: [],
    groupedCategories: [],
    cprenames: [],
    cars: [],
    summarize: {
        orderMaterialNo: 0,
        recieveMaterialNo: 0,
        registeredDurableNo: 0,
        procurementNo: 0,
        allowanceNo: 0
    },
    loading: false
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
    switch (action.type) {
        case RELOAD_MATERIAL_DATA:
            console.log(action.payload)
            return {
                ...state,
                materialWithLabel: action.payload
            }
        case LOADING_GET_ALL_SETTING_DATA:
            return {
                ...state,
                loading: true
            }
        case GET_SETTING_DATA_COMPLETED:
            const { 
                office, 
                departments, 
                durableCategories,
                durables,
                categories, 
                materials,
                materialWithLabel,
                personnels, 
                sellers, 
                provinces, 
                newCategories, 
                cprenames, 
                cars, 
                groupedCategories ,
                summarize
            } = action.payload
            return {
                ...state,
                office,
                departments,
                durableCategories,
                durables,
                categories,
                materials,
                materialWithLabel,
                personnels,
                sellers,
                provinces,
                newCategories,
                cprenames,
                cars,
                isAlreadyOffice: Object.keys(office).length > 0,
                groupedCategories,
                summarize,
                loading: false
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
        //// departments case
        case CREATE_DEPARTMENT:
            return {
                ...state,
                departments: [...state.departments, action.payload]
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
        //// categories case
        case CREATE_CATEGORY:
            const payload = {...action.payload, newMaterials: []}
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
        /// materials case
        case CREATE_MATERIAL: 
            //// console.log(action.payload)
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
            console.log(state.materials)
            return {
                ...state,
                materials: state.materials.filter( item => item.id !== action.payload)
            }
        //// seller cases
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
        /// personnels case
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
        /// durable category case
        case CREATE_DURABLE_CATEGORY: 
            return {
                ...state,
                durableCategories: [ action.payload, ...durableCategories ]
            }
        case UPDATE_DURABLE_CATEGORY:
            const { code, name, life } = action.payload
            return {
                ...state,
                durableCategories: state.durableCategories.map( durableCategory => (
                    durableCategory.id===action.payload.id ? 
                    {
                        ...durableCategory, 
                        code,
                        name,
                        life
                    } 
                    : 
                    durableCategory 
                ))
            }
        case REMOVE_DURABLE_CATEGORY:
            return {
                ...state,
                durableCategories: state.durableCategories.filter( durableCategory => ( durableCategory.id !== action.payload ))
            }
        /// durables case
        case CREATE_DURABLE:
            return {
                ...state,
                durables: [action.payload, ...state.durables]
            }
        case UPDATE_DURABLE:
            const { id, ...rest } = action.payload
            // console.log(rest)
            return {
                ...state,
                durables: state.durables.map( durable => durable.id===id ? { ...durable, ...rest } : durable )
            }
        case REMOVE_DURABLE: 
            return {
                ...state,
                durables: state.durables.filter( durable => durable.id !== action.payload)
            }
        case CLEAR_APP_SETTING_DATA: 
            return {
                ...state,
                ...initialState
            }
        default:
            return state
    }
}