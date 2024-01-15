import React from 'react'
import { connect } from "react-redux";
import ImageUpload from '../ImageUpload';
import "./EditProfile.css"
import Inputs from "../../../../../components/block-comps/Inputs"
import API from '../../../../../config/api/Api';
import { IoClose } from "react-icons/io5";
import profilepic from "../../../../../imagess/Profileimage.jpg"


const EditProfile = ({authState,backtoProfile}) => {
let userPro = authState.userProfile
const handleProfileUpdate = (e)=>{
  e.preventDefault()
  API.updateProfile(authState)
}

  return (
      <>
      <div className='editprofilemain'>  
      <div className="editprofilecontent">
        <div className='edittop'>
    <div className='editheader'><h1>Edit Profile</h1></div>
    <div className="editclose"><IoClose onClick={()=>backtoProfile()}/></div>
    </div>
    <hr className='line'/>
   <div className='editimg'>
    <img src={profilepic} alt="pic" className='editpp'/>
   </div>
   <div className='imguploaddiv'>
    <ImageUpload/>
</div>
    <div>
      <form onSubmit={handleProfileUpdate} className='editprofileform'>

      
      <label htmlFor="firstname" className='editprofilelabels'>First Name</label>
      <Inputs className="editprofileinputs"
      name={"firstname"}
      defaultValue={userPro.firstName}
      />
      <label htmlFor="lastname" className='editprofilelabels'>Last Name</label>
      <Inputs className="editprofileinputs"
      name="lastname"
      defaultValue={userPro.lastName}
      />
      <label htmlFor="email" className='editprofilelabels'>Email</label>
      <Inputs className="editprofileinputs"
      name="email"
      defaultValue={userPro.email}
      />
      <label htmlFor="phone" className='editprofilelabels'>Phone Number</label>
      <Inputs className="editprofileinputs"
      name="phone"
      defaultValue={userPro.phone}
      />
      <label htmlFor="location" className='editprofilelabels'>City</label>
      <Inputs className="editprofileinputs"
      name="location.city"
      defaultValue={userPro.location.city}
      />
      <label htmlFor="location" className='editprofilelabels'>State</label>
      <Inputs className="editprofileinputs"
      name="location.state"
      defaultValue={userPro.location.state}
      />
      <label htmlFor="location" className='editprofilelabels'>Zip Code</label>
      <Inputs className="editprofileinputs"
      name="location.zipcode"
      defaultValue={userPro.location.zipcode}
      />
      <label htmlFor="pronoun" className='editprofilelabels'>Pronoun</label>
      <Inputs className="editprofileinputs"
      name="pronoun"
      defaultValue={userPro.pronoun}
      />
      <label htmlFor="vibe" className='editprofilelabels'>Vibe</label>
      <Inputs className="editprofileinputs"
      name="vibe"
      defaultValue={userPro.vibe}
      />
      <label htmlFor="gender" className='editprofilelabels'>Gender</label>
      <Inputs className="editprofileinputs"
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

      <button type='submit' className='btn2'>UPDATE</button>
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
    </div> 
    </div> 
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