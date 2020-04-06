import { HIDE_ALERT, SERVICE_ERROR, SERVICE_SUCCESS_RESPONSE, SERVICE_FAIL_RESPONSE, SHOW_REGISTRATION_SUCCESS, FETCH_SERVICE_SUCCESS_RESPONSE, LOGIN_SUCCESS } from "../actions/actiontypes"

const INITIAL_STATE = {
    isAlert: false,
    title: "",
    message: "",
    confirmText: ""
}

export function alertState(state = INITIAL_STATE, action) {
    switch(action.type) {
        // when we get a successful login we are hiding the alert.
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAlert: false
            }
        // when we fetch data from service we are hiding the alert.
        case FETCH_SERVICE_SUCCESS_RESPONSE:
            return {
                ...state,
                isAlert: false
            }
        case SERVICE_SUCCESS_RESPONSE:
            return{
                ...state,
                isAlert:true,
                title: "Success",
                message: action.payload.response,
                confirmText: "Okay"
            }
        // when dealer registration is successful we are showing the alert.
        case SHOW_REGISTRATION_SUCCESS:
            return Object.assign({}, state, {
                isAlert: true,
                title: "Success",
                message: action.payload.response,
                confirmText: "Okay"
            });
        // when we get a failure response from service we are showing the alert of failure.
        case SERVICE_FAIL_RESPONSE:
            //console.log(action);
            return Object.assign({}, state, {
                isAlert: true,
                title: "Sorry",
                message: action.payload.response,
                confirmText: "Okay"
            });
        // when we get an error from service we are showing error alert.
        case SERVICE_ERROR:
            return Object.assign({}, state, {
                isAlert: true,
                title: "Sorry",
                message: "Something went wrong. Please try again after some time.",
                confirmText: "Okay"
            });
        case HIDE_ALERT:
            return Object.assign({}, state, {
                isAlert: false,
                title: "",
                message: "",
                confirmText: ""
            });
        default:
            return state;
    }
};