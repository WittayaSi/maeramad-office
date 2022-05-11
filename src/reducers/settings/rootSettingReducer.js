import { combineReducers } from 'redux'

import departmentReducer from './departmentReducer'
import materialCategoryReducer from './materialCategoryReducer'
import materialReducer from './materialReducer'
import officeReducer from './officeReducer'
import personnelReducer from './personnelReducer'
import sellerReducer from './sellerReducer'

const rootSettingReducer = combineReducers({
    office: officeReducer,
    department: departmentReducer,
    materialCategory: materialCategoryReducer,
    material: materialReducer,
    seller: sellerReducer,
    personnel: personnelReducer
})

export default rootSettingReducer