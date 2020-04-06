import { combineReducers } from "redux"
import { dealerState } from "./dealerReducer"
import { loaderState } from './loaderReducer'
import { alertState } from './alertReducer';

const rootReducer = combineReducers({
    dealerState,
    loaderState,
    alertState
})

export default rootReducer