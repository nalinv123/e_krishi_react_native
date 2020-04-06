import { SERVICE_FAIL, SERVICE_PENDING, SERVICE_ERROR, SERVICE_SUCCESS_RESPONSE, LOGOUT_SUCCESS, FETCH_SERVICE_SUCCESS_RESPONSE, LOGIN_SUCCESS } from "../actions/actiontypes";

const INITIAL_STATE = {
    dealer: {   
    },
};

/* const farmerReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        default :
            return state;
    }
} */

export function dealerState (state = INITIAL_STATE, action) {
    //console.log("action after logout",action.payload)
    // const name = (action.payload || {}).token;
    // console.log("name : ", name)
    switch(action.type) {
        case SERVICE_PENDING:
        case LOGIN_SUCCESS:
            return {
                ...state,
                dealer: action.payload
            }
        case FETCH_SERVICE_SUCCESS_RESPONSE:
            return {
                ...state,
                dealer: action.payload
            }
        case SERVICE_SUCCESS_RESPONSE:
            return { ...state,
                dealer: action.payload
            };
        case LOGOUT_SUCCESS:
            //console.log("logout success action");
            return {
                ...state,
                dealer: null
            }
        case SERVICE_ERROR:
            return state;
        default :
            return state;
    }
}
