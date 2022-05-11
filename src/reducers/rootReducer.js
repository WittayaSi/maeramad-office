import { combineReducers } from 'redux'
import rootSettingReducer from './settings/rootSettingReducer'
import authReducer from './authReducer'
import appSettingReducer from './appSettingReducer'
import orderMaterialReducer from './orderMaterialReducer'
import receiveMaterialReducer from './receiveMaterialReducer'
import registerDurableReducer from './registerDurableReducer'
import procurementReducer from './procurementReducer'
import allowanceReducer from './allowanceReducer'
// import materialOrderReducer from './materials/materialOrderReducer'
// import materialReceiveReducer from './materials/materialReceiveReducer'

// console.log('rootReducer do')

const materialReducer = combineReducers({
    order: orderMaterialReducer,
    receive: receiveMaterialReducer
})

const rootReducer = combineReducers({
    auth: authReducer,
    app: appSettingReducer,
    material: materialReducer,
    durable: registerDurableReducer,
    procurement: procurementReducer,
    allowance: allowanceReducer
    // app: rootSettingReducer,
//     orders: materialOrderReducer,
//     receives: materialReceiveReducer
})

export default rootReducer