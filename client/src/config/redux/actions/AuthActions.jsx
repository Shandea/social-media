import {
    GET_ALL_USERS,
    GET_CREATE_ACCT,
    HANDLE_INPUTS_AUTH,
} from "../Types";

export const getAllUsers = (info)=>{
    return {
        type: GET_ALL_USERS,
        payload:info
    }
}

export const getCreateAcct = ()=>{
    return {
        type:GET_CREATE_ACCT
    }
}

export const handleInputsAuth = (input)=>{
    return{
        type:HANDLE_INPUTS_AUTH,
        payload:input
    }
}