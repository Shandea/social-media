import React from 'react'
import { connect } from "react-redux";
import ImageUpload from './ImageUpload';

import Inputs from "../../../../components/block-comps/Inputs"

const EditProfile = ({backtoProfile}) => {

  return (
      <>    
    <div>EditProfile</div>
    <button onClick={()=>backtoProfile()} >BACK</button>
    <ImageUpload/>

    <div>
      <label htmlFor="firstname">First Name</label>
      <Inputs
      name=""
      defaultValue=""
      />
      <label htmlFor="lastname">Last Name</label>
      <Inputs
      name=""
      defaultValue=""
      />
      <label htmlFor="email">Email</label>
      <Inputs
      name=""
      defaultValue=""
      />
      <label htmlFor="phone">Phone Number</label>
      <Inputs
      name=""
      defaultValue=""
      />
      <label htmlFor="location">Location</label>
      <Inputs
      name=""
      defaultValue=""
      />
      <Inputs
      name=""
      defaultValue=""
      />
      <Inputs
      name=""
      defaultValue=""
      />
      <label htmlFor="pronoun">Pronoun</label>
      <Inputs
      name=""
      defaultValue=""
      />
      <label htmlFor="gender">Vibe</label>
      <Inputs
      name=""
      defaultValue=""
      />
      <Inputs
      name=""
      defaultValue=""
      />
      <Inputs
      name=""
      defaultValue=""
      />
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
    return {
      authState: state.auth,
    };
  };
  
  export default connect(mapStateToProps, null)(EditProfile);