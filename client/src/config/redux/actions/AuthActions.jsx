import {
    GET_ALL_USERS,
    GET_CREATE_ACCT,
    HANDLE_INPUTS_AUTH,
    GET_USER,
    GET_PROFILE,
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

export const getUser= (user)=>{
    return{
        type:GET_USER,
        payload:user
    }
}
export const getProfile= (profile)=>{
    return{
        type:GET_PROFILE,
        payload:profile
    }
}