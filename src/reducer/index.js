import { combineReducers } from "redux"
import { dealerState } from "./dealerReducer"
import { loaderState } from './loaderReducer'
import { alertState } from './alertReducer';
import { farmerState } from './farmerReducer'

const rootReducer = combineReducers({
    dealerState,
    loaderState,
    alertState,
    farmerState
})

export default rootReducer