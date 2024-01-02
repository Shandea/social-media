import {
    GET_ALL_USERS,
    GET_CREATE_ACCT,
    HANDLE_INPUTS_AUTH,
    GET_USER,
} from '../Types'

let initialState = {
    //flags
    createAcct: false,


    //state obj

    allUsers: [],
    user: {},
    error:null,

    firstname: "",
    lastname: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    location: {
        city: "",
        state: "",
        zipcode: ""
    },
    birthDate: {
        month: "",
        day: "",
        year: ""
    },
    gender: ""
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case HANDLE_INPUTS_AUTH:
            let { name, value } = action.payload
            if (name.startsWith('location')) {
                const locationField = name.split('.')[1];
                return {
                    ...state,
                    location: {
                        ...state.location,
                        [locationField]: value,
                    },
                };
            }
            if (name.startsWith('birthDate')) {
                const birthDateField = name.split('.')[1];
                return {
                    ...state,
                    birthDate: {
                        ...state.birthDate,
                        [birthDateField]: value,
                    },
                };
            }
            return {
                ...state,
                [name]: value
            }
        case GET_CREATE_ACCT:
            return {
                ...state,
                createAcct: !state.createAcct
            }
        case GET_ALL_USERS:
            return {
                ...state,
                allUsers:[...state.allUsers, action.payload ]
            }
        case GET_USER:
            let {username, userId} = action.payload.user
            console.log(action.payload)
            return {
                ...state,
                user:Object.assign(state.user,{username, userId})
            }
        default:
            return state
    }
}

export default authReducer