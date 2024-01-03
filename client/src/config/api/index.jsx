import api from "./Api"

const Api ={
    register: api.userRegister,
    login: api.userLogin,
    userAll: api.userAll,
    userProfile: api.getUserProfile
}

export default Api