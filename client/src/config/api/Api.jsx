
import instance from "../Axios";
import store from "../redux/Store"
import { getAllUsers, getUser, getProfile } from "../redux/actions/AuthActions";

const API = {
  userRegister: async (regUser) => {
    let {firstname, lastname, password, confirmPassword, location, birthDate, gender, email, username, phone } = regUser
    const user = {firstname, lastname, email, username, password, confirmPassword, location, birthDate, phone, gender}
    // console.log("made api",user)
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
    // console.log("login api",login)
    try {
      const response = await instance.post(`user/login`, login);
      // console.log("from backend", response.data);
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
 
  getUserProfile: async () => {
    // console.log("firing")
    try {
      const response = await instance.get(`user/getProfile`);
      // console.log("from backend get all", response.data);
      const usersData = response.data
      store.dispatch(getProfile(usersData))
      return usersData;
    } catch (error) {
      console.error("Error in userAll:", error);
      throw error;
    }
  },
  getViewProfile: async (payload) => {
    // console.log("firing",payload)
    try {
      const response = await instance.post(`/user/viewProfile`,{_id:payload});
      // console.log("from backend view profile", response.data);
      const usersData = response.data
      return usersData;
    } catch (error) {
      console.error("Error in userAll:", error);
      throw error;
    }
  },
  updateProfileBio: async (info) => {
    console.log("firing", info)
    
    let details = {
      bio:info?.bio ? info.bio : info.userProfile.details.bio,
      education:info?.details.education ? info.details.education : info.userProfile.details.education,
      education2:info?.details.education2 ? info.details.education2 : info.userProfile.details.education2,
      localInfo:info?.details.localInfo ? info.details.localInfo : info.userProfile.details.localInfo,
      maritalStatus:info?.details.maritalStatus ? info.details.maritalStatus : info.userProfile.details.maritalStatus,
    }
    console.log(details)
    try {
      const response = await instance.patch(`/user/updatebio`,{details:details});
      // console.log("from backend view profile", response.data);
      const usersData = response.data
      return usersData;
    } catch (error) {
      console.error("Error in userAll:", error);
      throw error;
    }
  },
  updateProfile: async (info) => {
    // console.log("firing update profile", info)
    let profileInfo = {
      firstName:info?.firstname ? info.firstname: info.userProfile.firstName,
      lastName:info?.firstname ? info.lastname: info.userProfile.lastName,
      email:info?.firstname ? info.email: info.userProfile.email,
      phone:info?.phone ? info.phone: info.userProfile.phone,
      location:{
        city:info?.location.city ? info.location.city: info.userProfile.location.city,
        state:info?.location.state ? info.location.state: info.userProfile.location.state,
        zipcode:info?.location.zipcode ? info.location.zipcode: info.userProfile.location.zipcode,
      },
      pronoun:info?.pronoun ? info.pronoun: info.userProfile.pronoun,
      vibe:info?.vibe ? info.vibe: info.userProfile.vibe,
      gender:info?.gender ? info.gender: info.userProfile.gender

    }

    try {
      const response = await instance.patch(`/user/updateuserprofile`,profileInfo);
      // console.log("from backend update user profile", response.data);
      const usersData = response.data
      return usersData;
    } catch (error) {
      console.error("Error in update user profile:", error);
      throw error;
    }
  },
};

export default API;