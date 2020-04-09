import { FETCH_SERVICE_SUCCESS_RESPONSE } from "../actions/actiontypes";

const INITIAL_STATE = {
    farmer: {}
}

export function farmerState(state = INITIAL_STATE, action) {
    switch(action.type) {
        case FETCH_SERVICE_SUCCESS_RESPONSE:
            return Object.assign({}, state, {
                farmer: action.payload
            })
        default:
            return state;
    }
}