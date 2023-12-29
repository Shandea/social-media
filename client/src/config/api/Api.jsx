
import instance from "../Axios";

const API = {
  userRegister: async (user) => {
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
    try {
      const response = await instance.post(`user/login`, login);
      // console.log("from backend", response.data);
      return response.data;
    } catch (error) {
      console.error("Error in userLogin:", error);
      throw error;
    }
  },

  userAll: async () => {
    try {
      const response = await instance.get(`user/all`);
      // console.log("from backend get all", response.data);
      return response.data;
    } catch (error) {
      console.error("Error in userAll:", error);
      throw error;
    }
  },
};

export default API;