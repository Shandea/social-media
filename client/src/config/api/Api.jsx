
import instance from "../Axios";
import store from "../redux/Store"
import { getAllUsers, getUser } from "../redux/actions/AuthActions";
import { useNavigate } from "react-router-dom";

const API = {
  userRegister: async (regUser) => {
    let {firstname, lastname, password, confirmPassword, location, birthDate, gender, email, username, phone } = regUser
    const user = {firstname, lastname, email, username, password, confirmPassword, location, birthDate, phone, gender}
    console.log("made api",user)
    try {
      const response = await instance.post(`user/register`, user);
      // console.log("from backend", response.data);
      return response.data;
    } catch (error) {
      console.error("Error in userRegister:", error);
      throw error; // You might want to throw the error to handle it elsewhere
    }
  },

  userLogin: async (login) => {
    console.log("login api",login)
    try {
      const response = await instance.post(`user/login`, login);
      console.log("from backend", response.data);
      return response.data;
      // useNavigate("/profile")
    } catch (error) {
      console.error("Error in userLogin:", error);
      throw error;
    }
  },

  userAll: async () => {
    try {
      const response = await instance.get(`user/all`);
      // console.log("from backend get all", response.data);
      const usersAllData = response.data
      store.dispatch(getAllUsers(usersAllData))
      return usersAllData;
    } catch (error) {
      console.error("Error in userAll:", error);
      throw error;
    }
  },
  getUser: async () => {
    try {
      const response = await instance.get(`user/authCheck`);
      console.log("from backend get AUTH", response.data);
      const usersData = response.data
      store.dispatch(getUser(usersData))
      return usersData;
    } catch (error) {
      console.error("Error in getUser AUTH:", error);
      throw error;
    }
  },
};

export default API;