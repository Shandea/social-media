import React from 'react'
import { connect } from "react-redux";
import ImageUpload from '../ImageUpload';
const EditProfile = ({backtoProfile}) => {
// edit background
// edit banner
// edit layout or night and day lAYOUT

  return (
      <>    
    <div>EditProfile</div>
    <button onClick={()=>backtoProfile()} >BACK</button>


          <div className="outer">
            <div className="profileOuterContainer">
              <div className="" >background banner</div>
              <button>change banner</button>
              <button>change profile</button>
              <ImageUpload/>
              
            

            

            </div>

          </div>
   
    </>
  )
}

const mapStateToProps = (state) => {
    return {
      authState: state.auth,
    };
  };
  
  export default connect(mapStateToProps, null)(EditProfile);