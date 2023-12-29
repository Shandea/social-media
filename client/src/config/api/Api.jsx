import instance from "../Axios";


// this is the api object found through landing signup and login
const API = {
    userRegister : async (user) => {
        
        // instance of axios... check config folder
        await instance
            .post(`user/register`, user)
            .then(res => {
                console.log("from backend", res.data)
                return res.data
            })
            .catch(err => console.log("err"))

    },
    userLogin : async (login) => {

        // console.log("got here", login)
        await instance
            .post(`user/login`, login)
            .then(res => {
                console.log("from backend", res.data)
                return res.data
            })
            .catch(err => console.log("err"))

    }
}


// dont forget to export in the index!!!!!!
// or your import will be messed up... see landing sign up for example of import and usage in handleSubmit
export default API