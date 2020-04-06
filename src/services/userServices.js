import axios from 'axios';
import config, { delearBaseUrl } from '../config/config'

export const userService = {
    POST,
    GET,
}

function GET(apiendpoint,header){
    return axios.get(delearBaseUrl+apiendpoint,{
        headers:header
    }).then(response=>{
        return response
    }).catch(error=>{
        return error
    })
}

function POST(apiendpoint,header,payload){
    return axios.post(delearBaseUrl+apiendpoint,
        payload,
        {
        headers:header
    }).then(response=>{
        return response
    }).catch(error=>{
        return error
    })
}

