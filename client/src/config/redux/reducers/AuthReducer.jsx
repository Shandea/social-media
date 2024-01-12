import {
    GET_ALL_USERS,
    GET_CREATE_ACCT,
    HANDLE_INPUTS_AUTH,
    GET_USER,
    GET_PROFILE,
    HIDE_ONLINE,
    SHOW_ONLINE
} from '../Types'

let initialState = {
    //flags
    createAcct: false,
    showOnline: false,


    //state obj

    allUsers: [],
    user: {},
    userProfile: {},
    error: null,

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
        month: "01",
        day: "01",
        year: "2000"
    },
    gender: "",
    bio: "",
    details: {
        education: "",
        localInfo: "",
        maritalStatus: ""
    },
    pronoun: "",
    vibe: ""


}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case HANDLE_INPUTS_AUTH:
            let { name, value } = action.payload

            if
                (name.startsWith('details')) {
                const detailsField = name.split('.')[1];
                return {
                    ...state,
                    details: {
                        ...state.details,
                        [detailsField]: value,
                    },
                };
            }
            if
                (name.startsWith('location')) {
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
                allUsers: [...state.allUsers, action.payload]
            }
        case GET_USER:
            let { username, userId } = action.payload.user
            // console.log(action.payload)
            return {
                ...state,
                user: Object.assign(state.user, { username, userId })
            }
        case GET_PROFILE:

            // console.log("get profile obj_:",action.payload)
            return {
                ...state,
                userProfile: Object.assign(state.userProfile, action.payload)
            }
        case SHOW_ONLINE:

            // console.log("get profile obj_:",action.payload)
            return {
                ...state,
                showOnline: true
            }
        case HIDE_ONLINE:

            // console.log("get profile obj_:",action.payload)
            return {
                ...state,
                showOnline: false
            }
        default:
            return state
    }
}

export default authReducer