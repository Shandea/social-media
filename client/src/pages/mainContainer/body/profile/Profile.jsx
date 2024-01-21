import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./Profile.css";
import { connect } from "react-redux";
import { CiEdit } from "react-icons/ci";
import { MdDoubleArrow } from "react-icons/md";
import Profileimage from "../../../../imagess/Profileimage.jpg";
import { IoCameraOutline } from "react-icons/io5";
import { GiGraduateCap } from "react-icons/gi";
import { FaHouse } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";

import {
  showOnline,
  handleInputsAuth,
} from "../../../../config/redux/actions/AuthActions";
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
};

const Profile = (props) => {
  let authState = props.authState;

  let nav = useNavigate();

  // console.log("authSTATE,PROFILE", props);
  let srcStr = props.authState.userProfile.profileImg;
  let id = authState.user.userId
  let [pIMG, setPIMG] = useState("");
  let [editProfile, setEditProfile] = useState(false);

  let [editBios, setEditBios] = useState(false);
  let [editDetails, setEditDetails] = useState(false);


  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:5000/api/getfeeds",
      withCredentials: true,
    })
      .then((res) => {
        let filteredFeed = res.data.filter(
          (feed) => feed.author === authState.user.userId
        );
        setFeeds(filteredFeed);
      })
      .catch((err) => console.log("get feed err", err));
  }, []);


  // to fix broken add like / comment in local profile feed.... not following DRY  :)
  const [feeds, setFeeds] = useState([]);


  const handleSetFeeds = (e) => {
    // setFeeds(input)

    console.warn("HandleSetFeed hit  ===>  Rerender Please")
    axios({
      method: "GET",
      url: "http://localhost:5000/api/getfeeds",
      withCredentials: true,
    })
      .then(res => {
        console.log("res", res)
        console.warn("TEST", res.data.filter((item) => item.author === id))
        setFeeds(res.data.filter((item) => item.author === id))
      })
      .catch(err => console.log("get feed err", err))
    // render ? setRender(false) : setRender(true)
    // console.log("TOP lvl handle set feeds")
  }

  const handleAddLike = (e) => {
    console.warn("adding like", e.target.id, e.target.getAttribute("name"))
    // let type = e.target.getAttribute("type")

    let type = e.currentTarget.attributes['type'].value

    console.log("type", type)
    let payload = {
      type: e.currentTarget.attributes['type'].value,
      id: e.target.id

    }

    axios({
      method: "put",
      url: "http://localhost:5000/api/feeds/addfeedlike",
      data: { id: e.target.id },
      data: payload,
      withCredentials: true
    })
      .then(res => {
        console.log("add like RES", res)
        // console.log("FEED LIKE UPDATE", feeds.find((item) => item._id === res.data._id))
        setFeeds(prev => prev.map((item) => item._id === res.data._id ? res.data : item))
        handleSetFeeds()
      })



  }





  useEffect(() => {
    return setPIMG(srcStr);
  }, [srcStr]);

  const getEditProfile = () => {
    return setEditProfile(true);
  };
  const backtoProfile = () => {
    return setEditProfile(false);
  };
  const showMeOnline = () => {
    return props.showOnline();
  };

  const handlebiosUpdate = (e) => {
    e.preventDefault();
    // console.log("got here___", props.authState)
// console.warn('FIRING THE UPDATE BIO API: \n\n', props.authState)
// if(props.authState.details.education == ""){
//   props.authState.details.education = ' '
//   props.authState.details.education2 = ' '
//   props.authState.details.maritalStatus = ' '
//   props.authState.details.localInfo = ' '
// }
// if(props.authState.bio == ""){
//   props.authState.bio = ' '
// }
console.warn('FIRING THE UPDATE BIO API AFTER CHANGES: \n\n', props.authState)
    API.updateProfileBio(props.authState);
    setEditBios(false);
    setEditDetails(false);
    window.location.reload();
  };

  return (
    <>
      {/* {console.log("img src tag", srcStr)} */}
      {/* {console.log("profile page page", feeds)} */}
      {editProfile ? (
        <EditProfile backtoProfile={backtoProfile} />
      ) : (
        <>
          <>
            <div className="header">
              <div className="banner">
                <div className="topbannernav">
                  <div className="arrow">
                    <MdDoubleArrow onClick={showMeOnline} />
                  </div>
                </div>
              </div>
            </div>
            <div className="userimgdiv">

              <div
                className="img"

                style={{
                  // border: 'solid black 2px',
                  // display: 'flex',
                  // justifyContent: 'center',
                  // height: '50px',
                  // width: '50px',
                  // borderRadius: '25px',
                  backgroundImage: `url("http://localhost:5000${authState.userProfile.profileImg}"), url("http://localhost:5000/public/default.jpeg")`,
                  backgroundRepeat: "no-repeat",

                  backgroundSize: 'cover'
                }}
              >
              </div>


              {/* <img alt="" src={Profileimage} className="img" /> */}

              <button className="camera" onClick={getEditProfile}>
                {" "}
                <IoCameraOutline />
              </button>
            </div>
            <div className="mainprofilecontainer">
              <div className="profileleft">
<div className="leftleft1">


                <div className="card">
                  <div className="intro">Intro</div>
                  <div className="innerleft">
                    {editBios == true ? (
                      <>
                        <form onSubmit={handlebiosUpdate} style={dimensions}>
                          <h2 className="bioheader1">Bio</h2>

                          <input
                            className="bioinput"
                            placeholder="Describe who you are!"
                            name="bio"
                            defaultValue={
                              props.authState.userProfile.details?.bio || ""
                            }
                            onChange={(e) => props.handleInputChange(e.target)}
                          />
                          <div className="bottombiobtns">
                            <div className="biobtnleft">
                              <button
                                onClick={() => setEditBios(!editBios)}
                                className="biobtn1"
                              >
                                CANCEL
                              </button>
                            </div>
                            <div className="biobtnright">
                              <button type="submit" className="biobtn2">
                                {" "}
                                UPDATE
                              </button>
                            </div>
                          </div>
                        </form>
                        <div style={dimensions}>
                          {/* <h2>Details</h2> */}
                          <div className="aligndiv1">
                            <div className="edu">
                              <GiGraduateCap className="capicon" />
                              <div className="detailtext"><p>Went to</p></div>
                              <p className="edutext">
                                {props.authState.details?.education}
                              </p>
                            </div>
                          </div>
                          <div className="aligndiv1">
                            <div className="edu">
                              <GiGraduateCap className="capicon" />
                              <div className="detailtext"><p>Studied at</p></div>
                              <p className="edutext">
                                {props.authState.details?.education2}
                              </p>
                            </div>
                          </div>
                          <div className="aligndiv1">
                            <div className="edu">
                              <FaHouse className="capicon" />
                              <div className="detailtext"><p>Lives in</p></div>
                              <p className="edutext">
                                {props.authState.details?.localInfo}
                              </p>
                            </div>
                          </div>
                          <div className="aligndiv1">
                            <div className="edu">
                              <FaHeart className="capicon" />
                              <p className="edutext">
                                {props.authState.details?.maritalStatus}
                              </p>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : editDetails == true ? (
                      <>
                        <div style={dimensions}>
                          <h4>bio</h4>
                          <p>{props.authState.userProfile.details?.bio}</p>
                        </div>

                        <form onSubmit={handlebiosUpdate} style={dimensions}>
                          {/* <h4>Details</h4> */}
                          <label className="bioinputlabels">College</label>
                          <Inputs className="bioinput2"
                            name={"details.education"}
                            defaultValue={
                              props.authState.userProfile.details?.education ||
                              ""
                            }
                          />
                          <br />
                          <label className="bioinputlabels">High School</label>
                          <Inputs className="bioinput2"
                            name={"details.education2"}
                            defaultValue={
                              props.authState.userProfile.details?.education2 ||
                              ""
                            }
                          />
                          <br />
                          <label className="bioinputlabels">Location</label>
                          <Inputs className="bioinput2"
                            name={"details.localInfo"}
                            defaultValue={
                              props.authState.userProfile.details?.localInfo ||
                              ""
                            }
                          />
                          <br />
                          <label className="bioinputlabels">Marital Status</label>
                          <Inputs className="bioinput2"
                            name={"details.maritalStatus"}
                            defaultValue={
                              props.authState.details.userProfile
                                ?.maritalStatus || ""
                            }
                          />
                          <div className="bottombiobtns">
                            <div className="biobtnleft">
                            <button className="biobtn1"
                              onClick={() => setEditDetails(!editDetails)}
                            >
                              CANCEL
                            </button>
                            </div>
                            <div className="biobtnright">
                            <button type="submit" className="biobtn2">UPDATE</button>
                            </div>
                          </div>
                        </form>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => setEditBios(!editBios)}
                          className="biobtn"
                        >
                          Add Bio
                        </button>
                        <div className="biomiddle">
                          <p className="biobio">{authState.userProfile.details?.bio}</p>
                          {/* <h4>bio</h4>
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Dignissimos facilis at labore saepe similique
                          architecto quia id? Veritatis, delectus minus.
                        </p> */}

                          <div className="edu">
                            <GiGraduateCap className="capicon" />
                            <div className="detailtext"><p>Went to</p></div>
                            <p className="edutext">
                              {props.authState.userProfile.details?.education}
                            </p>
                          </div>

                          <div className="edu">
                            <GiGraduateCap className="capicon" />
                            <div className="detailtext"><p>Studied at</p></div>
                            <p className="edutext">
                              {props.authState.userProfile.details?.education2}
                            </p>
                          </div>

                          <div className="edu">
                            <FaHouse className="capicon" />
                            <div className="detailtext"><p>Lives in</p></div>
                            <p className="edutext">
                              {props.authState.userProfile.details?.localInfo}
                            </p>
                          </div>

                          <div className="edu">
                            <FaHeart className="capicon" />
                            <p className="edutext">
                              {
                                props.authState.userProfile.details?.maritalStatus
                              }
                            </p>
                          </div>

                          {/* <p>education</p>
                        <p>location</p>
                        <p>marital status</p> */}
                        </div>
                        <button
                          onClick={() => setEditDetails(!editDetails)}
                          className="biobtn"
                        >
                          edit details
                        </button>
                      </>
                    )}
                  </div>
                </div>
                <div className="photos card">
                  <div className="intro">Photos</div>
                  <div className="photocontainer">
                    <div className="photoimg"></div>
                    <div className="photoimg"></div>
                    <div className="photoimg"></div>
                    <div className="photoimg"></div>
                    <div className="photoimg"></div>
                    <div className="photoimg"></div>
                  </div>
                </div>

                <div className="friends card">
                  <div className="intro">Friends</div>
                  <div className="photocontainer">
                    <div className="photoimg"></div>
                    <div className="photoimg"></div>
                    <div className="photoimg"></div>
                    <div className="photoimg"></div>
                    <div className="photoimg"></div>
                    <div className="photoimg"></div>
                  </div>
                </div>
                </div>


              </div>

              <div className="profileright">
                <div
                  className="feedContainer"
                  style={{
                    marginTop: "20px",
                    overflowY: "auto",
                  }}
                >
                  {feeds
                    .sort(
                      (a, b) =>
                        Date.parse(b.createdAt) - Date.parse(a.createdAt)
                    )
                    .map((obj, i) => {
                      return (
                        <div key={i}>
                          <FeedContainer
                            handleSetFeeds={handleSetFeeds}
                            handleAddLike={handleAddLike}
                            obj={obj}
                          />
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </>
        </>
      )}
    </>
  );
};

{
  /* {
              editBios == true ?
                <>
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

                </> :

                editDetails == true ?
                  <>
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
                        <button onClick={() => setEditDetails(!editDetails)} >CANCEL</button>
                        <button type="submit" >UPDATE</button>
                      </div>
                    </form>


                  </> :
                  <>
                    <h4>bio</h4>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos facilis at labore saepe similique architecto quia id? Veritatis, delectus minus.</p>
                    <button onClick={() => setEditBios(!editBios)} >edit bio</button>

                    <p>education</p>
                    <p>location</p>
                    <p>marital status</p>
                    <button onClick={() => setEditDetails(!editDetails)} >edit details</button>
                  </>
            } */
}
//           <h3>create a post here</h3>
//           <AddFeed />

//           <h3>posts show here</h3>
//           <div
//             className="feedContainer"
//             style={{
//               marginTop: "20px",
//               overflowY: "auto",
//             }}
//           >
//             {feeds
//               .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
//               .map((obj, i) => {
//                 return (
//                   <div key={i}>
//                     <FeedContainer
//                       // handleAddLike={handleAddLike}
//                       obj={obj}
//                     />
//                   </div>
//                 );
//               })}
//           </div>
//         </>
//       )}
//     </>
//   );
// };

const mapStateToProps = (state) => {
  return {
    authState: state.auth,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    showOnline: () => dispatch(showOnline()),
    handleInputChange: (input) => dispatch(handleInputsAuth(input)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);