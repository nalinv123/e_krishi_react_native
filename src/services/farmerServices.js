import axios from 'axios';
import { farmerBaseUrl } from '../config/config'

export const farmerService = {
    GET,
    POST
}

function GET(apiendpoint,header){
    return axios.get(farmerBaseUrl+apiendpoint,{
        headers:header
    }).then(response=>{
        return response
    }).catch(error=>{
        return error
    })
}

function POST(apiendpoint,header,payload){
    return axios.post(farmerBaseUrl+apiendpoint,
        payload,
        {
        headers:header
    }).then(response=>{
        return response
    }).catch(error=>{
        return error
    })
}