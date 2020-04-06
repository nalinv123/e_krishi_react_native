import { userService } from "../services/"
import { loginUrl, registerUrl, getDealerVegetablesUrl, logoutUrl, updateVegetableUrl } from "../config/config"
import { SERVICE_PENDING, HIDE_ALERT, SERVICE_ERROR, SERVICE_SUCCESS_RESPONSE, SERVICE_FAIL_RESPONSE, SHOW_REGISTRATION_SUCCESS, LOGOUT_SUCCESS, FETCH_SERVICE_SUCCESS_RESPONSE, FETCH_SERVICE_FAIL_RESPONSE, LOGIN_SUCCESS } from "./actiontypes";
import AsyncStorage from "@react-native-community/async-storage";

export const delearAction = {
    login,
    register,
    getDealerVegetables,
    logout,
    updateDealerVegetable
}

function login(email,password){
    return dispatch=>{
        dispatch(serviceActionPending())
        let apiendpoint = loginUrl
        let payload = {
            email:email,
            password:password
        };
        let header={
            "Content-Type":"application/json"
        };

        userService.POST(apiendpoint,header,payload)
        .then(response=>{
            if (response.data.status) {
                dispatch(loginSuccess(response.data));
            } else {
                dispatch(showFailureResponse(respose.data));
            }
        })
        .catch(error=>{
            dispatch(showError(error))
        })
    }
}

function register(dealerInfo) {
    return dispatch => {
        dispatch(serviceActionPending());
        let apiendpoint = registerUrl;
        let payload = dealerInfo;
        let header = {
            "Content-Type":"application/json"
        };

        userService.POST(apiendpoint, header, payload)
            .then(response => {
                if (response.data.status) {
                    //console.log(response.data);
                    dispatch(showRegistrationSuccess(response.data));
                }
                else {
                    console.log("In else : ", response.data.status);
                    dispatch(showFailureResponse(response.data));
                }
            })
            .catch(error => {
                
                dispatch(showError(error))
            })
        console.log("In register action dealer info : ", dealerInfo);
    }
}

function getDealerVegetables(email, token) {
    return dispatch => {
        dispatch(serviceActionPending);
        //setTimeout(5);
        //console.log(email);
        let apiendpoint = getDealerVegetablesUrl;
        let payload = email;
        let header = {
            "Content-Type":"application/json",
            "Authorization":"Bearer " + token
        };
        userService.POST(apiendpoint, header, payload)
            .then(response => {
                //console.log("Get dealer vegetables res : ", response.data);
                if (response.message !== undefined && response.message.includes("401")) {
                    dispatch(logout());
                }
                dispatch(showFetchServiceSuccessResponse(response.data));
            })
            .catch(error => {
                console.log("error :" ,error)
                dispatch(showError(error));
            });
        //dispatch(showSuccessResponse);
    }
}

function logout() {
    return dispatch => {
        dispatch(serviceActionPending);
        let apiendpoint = logoutUrl;

        userService.GET(apiendpoint, null)
            .then(response => {
                // console.log(response.data);
                if (response.data === "Logout Successful") {
                    //console.log(response.data);
                    AsyncStorage.removeItem('dealer');
                    dispatch(showLogoutSuccess(response.data));
                }
            })
            .catch(error => {
                dispatch(showError(error));
            })
    }
}

function updateDealerVegetable(updatedVegetable, token) {
    return dispatch => {
        dispatch(serviceActionPending);
        let apiendpoint = updateVegetableUrl;
        let payload = updatedVegetable;
        let header = {
            "Content-Type":"application/json",
            "Authorization":"Bearer " + token
        };
        userService.POST(apiendpoint, header, payload)
            .then(response => {
                //console.log("Get dealer vegetables res : ", response.data);
                if (response.message !== undefined && response.message.includes("401")) {
                    dispatch(logout());
                }
                if (response.data.status) {
                    //console.log(response.data);
                    dispatch(showSuccessResponse(response.data));
                }
                else {
                    console.log("In else : ", response.data.status);
                    dispatch(showFailureResponse(response.data));
                }
                //dispatch(showSuccessResponse(response.data));
            })
            .catch(error => {
                console.log("error :" ,error)
                dispatch(showError(error));
            });
        //dispatch(showSuccessResponse);
    }
}

export function loginSuccess(response) {
    return {
        type: LOGIN_SUCCESS,
        payload: response
    }
}

export function showSuccessResponse(respose) {
    return{
        type: SERVICE_SUCCESS_RESPONSE,
        payload:respose
    }
}

export function showFailureResponse(response) {
    return {
        type: SERVICE_FAIL_RESPONSE,
        payload:response
    }
}

export function showFetchServiceSuccessResponse(response) {
    return {
        type: FETCH_SERVICE_SUCCESS_RESPONSE,
        payload: response
    }
}

export function showFetchServiceFailureResponse(response) {
    return {
        type: FETCH_SERVICE_FAIL_RESPONSE,
        payload: response
    }
}

export function showError(error){
    return{
        type: SERVICE_ERROR,
        payload:error
    }
}

export function serviceActionPending() {
    return {
        type: SERVICE_PENDING
    }
}

export function hideAlert() {
    return {
        type: HIDE_ALERT
    }
}

export function showRegistrationSuccess(response) {
    return {
        type: SHOW_REGISTRATION_SUCCESS,
        payload: response
    }
}

export function showLogoutSuccess(response) {
    return {
        type: LOGOUT_SUCCESS,
        payload: response
    }
}
