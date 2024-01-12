import React, { useEffect, useState } from "react";
import "./Profile.css";
import { connect } from "react-redux";
import { CiEdit } from "react-icons/ci";
import { MdDoubleArrow } from "react-icons/md";

import { showDM, handleInputsAuth } from "../../../../config/redux/actions/AuthActions";
import Inputs from "../../../../components/block-comps/Inputs";
import API from "../../../../config/api/Api";
import axios from "axios";

import EditProfile from "./editProfile/EditProfile";
import FeedContainer from "../../../../components/feeds/feedContainer/FeedContainer";
import AddFeed from "../../../../components/feeds/addFeed/AddFeed";

const dimensions = {
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
}

const Profile = (props) => {
  let authState = props.authState

  console.log("authSTATE,PROFILE", props)
  let srcStr = props.authState.userProfile.profileImg
  let [pIMG, setPIMG] = useState('')
  let [editProfile, setEditProfile] = useState(false)


  let [editBios, setEditBios] = useState(false)
  let [editDetails, setEditDetails] = useState(false)
  const [feeds, setFeeds] = useState([])

  useEffect(() => {

    axios({
        method: "GET",
        url: "http://localhost:5000/api/getfeeds",
        withCredentials: true,
    })
        .then(res => {
          let filteredFeed = res.data.filter((feed)=>feed.author === authState.user.userId)
          // console.log("res feed on profile page", filteredFeed)
          // console.log("res feed on profile page", res.data[10].author)
          // console.log("res feed on profile page", authState.user.userId)
            setFeeds(filteredFeed)
        })
        .catch(err => console.log("get feed err", err))

}, [])

  useEffect(() => {
    return setPIMG(srcStr)
  }, [srcStr])

  const getEditProfile = () => {
    return setEditProfile(true)
  }
  const backtoProfile = () => {
    return setEditProfile(false)
  }
  const showDM = () => {
    return props.showDm()
  }

  const handlebiosUpdate = (e) => {
    e.preventDefault()
    // console.log("got here___", props.authState)
    let info = {
      bio:props.authState.bio,
      details:props.authState.details
    }
    
    API.updateProfileBio(info)
  }

  return (
    <>
      {/* {console.log("img src tag", srcStr)} */}
      {console.log("profile page page", feeds)}
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
                  {
                    editBios == true ?
                      <div className="bios">
                        <form onSubmit={handlebiosUpdate} style={dimensions}>
                          <h4>bio</h4>
                          <label htmlFor="bio">inputs</label>
                          <textarea name="bio" defaultValue={props.authState.bio || "I Have No Bio"} onChange={(e) => props.handleInputChange(e.target)} />
                          <div>
                            <button onClick={() => setEditBios(!editBios)} >CANCEL</button>
                            <button type="submit" > UPDATE</button>
                          </div>
                        </form>
                        <div style={dimensions}>
                          <h4>details</h4>
                          <p>education</p>
                          <p>location</p>
                          <p>marital status</p>
                        </div>

                      </div> :

                      editDetails == true ?
                        <div className="bios">
                          <div style={dimensions}>
                          <h4>bio</h4>
                          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos facilis at labore saepe similique architecto quia id? Veritatis, delectus minus.</p>
                          </div>

                          <form onSubmit={handlebiosUpdate} style={dimensions} >
                            <h4>Details</h4>
                            <label>Education</label>
                            <Inputs
                                name={"details.education"}
                                value={props.authState.details.education || ""}
                                />
                              <br />
                                <label>Location</label>
                              <Inputs
                                name={"details.localInfo"}
                                value={props.authState.details.localInfo || ""}
                                />
                              <br />
                                <label>Marital Status</label>
                              <Inputs
                                name={"details.maritalStatus"}
                                value={props.authState.details.maritalStatus || ""}
                                />
                            <div>
                            <button onClick={()=>setEditDetails(!editDetails)} >CANCEL</button>
                            <button type="submit" >UPDATE</button>
                            </div>
                          </form>


                        </div> :
                        <div className="bio">
                          <h4>bio</h4>
                          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos facilis at labore saepe similique architecto quia id? Veritatis, delectus minus.</p>
                          <button onClick={() => setEditBios(!editBios)} >edit bio</button>

                          <p>education</p>
                          <p>location</p>
                          <p>marital status</p>
                          <button onClick={()=>setEditDetails(!editDetails)} >edit details</button>
                        </div>
                  }

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
                    <AddFeed/>
                  </div>
                  <div className="postWall">
                    <h3>posts show here</h3>
                    <div className='feedContainer' style={{
                marginTop: "20px",
                overflowY: "auto"
            }}>
                {feeds.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)).map((obj, i) => {
                    return (
                        <div key={i}


                        >
                            <FeedContainer
                                // handleAddLike={handleAddLike}
                                obj={obj} />
                        </div>
                    )

                })}
            </div>
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
    showDm: () => dispatch(showDM()),
    handleInputChange: (input) => dispatch(handleInputsAuth(input))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
