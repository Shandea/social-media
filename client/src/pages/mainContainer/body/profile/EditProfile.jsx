import React from 'react'
import { connect } from "react-redux";
import ImageUpload from './ImageUpload';
const EditProfile = ({backtoProfile}) => {

  return (
      <>    
    <div>EditProfile</div>
    <button onClick={()=>backtoProfile()} >BACK</button>
    <ImageUpload/>
    </>
  )
}

const mapStateToProps = (state) => {
    return {
      authState: state.auth,
    };
  };
  
  export default connect(mapStateToProps, null)(EditProfile);