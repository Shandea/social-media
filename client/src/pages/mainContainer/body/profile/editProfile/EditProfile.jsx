import React from 'react'
import { connect } from "react-redux";
import ImageUpload from '../ImageUpload';

import Inputs from "../../../../../components/block-comps/Inputs"
import API from '../../../../../config/api/Api';


const EditProfile = ({authState,backtoProfile}) => {
let userPro = authState.userProfile
const handleProfileUpdate = (e)=>{
  e.preventDefault()
  API.updateProfile(authState)
}

  return (
      <>    
    <div>EditProfile</div>
    <button onClick={()=>backtoProfile()} >BACK</button>
    <ImageUpload/>

    <div>
      <form onSubmit={handleProfileUpdate} >

      
      <label htmlFor="firstname">First Name</label>
      <Inputs
      name={"firstname"}
      defaultValue={userPro.firstName}
      />
      <label htmlFor="lastname">Last Name</label>
      <Inputs
      name="lastname"
      defaultValue={userPro.lastName}
      />
      <label htmlFor="email">Email</label>
      <Inputs
      name="email"
      defaultValue={userPro.email}
      />
      <label htmlFor="phone">Phone Number</label>
      <Inputs
      name="phone"
      defaultValue={userPro.phone}
      />
      <label htmlFor="location">Location</label>
      <Inputs
      name="location.city"
      defaultValue={userPro.location.city}
      />
      <Inputs
      name="location.state"
      defaultValue={userPro.location.state}
      />
      <Inputs
      name="location.zipcode"
      defaultValue={userPro.location.zipcode}
      />
      <label htmlFor="pronoun">Pronoun</label>
      <Inputs
      name="pronoun"
      defaultValue={userPro.pronoun}
      />
      <label htmlFor="vibe">Vibe</label>
      <Inputs
      name="vibe"
      defaultValue={userPro.vibe}
      />
      <label htmlFor="gender">Gender</label>
      <Inputs
      name="gender"
      defaultValue={userPro.gender}
      />
      {/* <Inputs
      name=""
      defaultValue=""
      />
      <Inputs
      name=""
      defaultValue="" 
      />*/}

      <button type='submit' >UPDATE</button>
      </form>
    </div>

    {/* 
    email
    phone
    gender
    pronoun
    first and last name
    location
    vibe
    
    */}
    </>
  )
}

const mapStateToProps = (state) => {
  console.log("state on edit profile",state)
    return {
      authState: state.auth,
    };
  };
  
  export default connect(mapStateToProps, null)(EditProfile);