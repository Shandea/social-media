import React, { useEffect, useState } from "react";
import "./Profile.css";
import { connect } from "react-redux";
import { CiEdit } from "react-icons/ci";
import { MdDoubleArrow } from "react-icons/md";

import { showDM } from "../../../../config/redux/actions/AuthActions"; 


import EditProfile from "./EditProfile";

const Profile = (props) => {

  // console.log("authSTATE,PROFILEIMG", props)
  let srcStr = props.authState.userProfile.profileImg
  let [pIMG, setPIMG] = useState('')
  let [editProfile, setEditProfile] = useState(false)

  useEffect(() => {
    return setPIMG(srcStr)
  }, [srcStr])

  const getEditProfile = () => {
    return setEditProfile(true)
  }
  const backtoProfile = () => {
    return setEditProfile(false)
  }
const showDM = ()=>{
  return props.showDm()
}

  return (
    <>
      {/* {console.log("img src tag", srcStr)} */}
      {
        editProfile ? <EditProfile backtoProfile={backtoProfile} /> :
          <div className="outer">
            <div className="profileOuterContainer">
              <div className="" >background banner</div>
              <span className="badge2">
                <img alt="" src={`http://localhost:5000${pIMG}`} />
                <div className="underbanner">
                  <button onClick={getEditProfile} > <CiEdit style={{ color: "black", fontSize: "large" }} /> EDIT</button>
                </div>
              </span>
              <div>
                <MdDoubleArrow onClick={showDM} className="arrowDrop" />
              </div>
            </div>
            <div className="profileScroll">

              <div className="leftScroll">

                <div className="innerLeftScroll">
                  <div className="bios">
                    <h4>bio</h4>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos facilis at labore saepe similique architecto quia id? Veritatis, delectus minus.</p>
                    <button>edit bio</button>
                    <p>education</p>
                    <p>location</p>
                    <p>marital status</p>
                    <button>edit details</button>
                  </div>

                  <div className="photoWall">
                    <h3>photos show here</h3>
                  </div>
                  <div className="friendWall">
                    <h3>friends show here</h3>
                  </div>
                  <div className="hobbyWall">
                    <h3>hobbies show here</h3>
                  </div>
                </div>

              </div>

              <div className="rightScroll">
                <div className="innerRightScroll">
                  <div className="createPostWall">
                    <h3>create a post here</h3>
                  </div>
                  <div className="postWall">
                    <h3>posts show here</h3>
                  </div>
                </div>
              </div>

            </div>

          </div>
      }
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    authState: state.auth,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    showDm: ()=>dispatch(showDM())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
