import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GiGraduateCap } from "react-icons/gi";
import { FaHouse } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import "./ViewProfile.css";

import { Link } from 'react-router-dom'

import API from "../../../../../config/api/Api";
import { connect } from "react-redux";
import { hideOnline } from "../../../../../config/redux/actions/AuthActions";
import axios from "axios";
import FeedContainer from "../../../../../components/feeds/feedContainer/FeedContainer";
import AddFeed from "../../../../../components/feeds/addFeed/AddFeed";

import FriendStatus from "../../../../../components/friends/friendStatus/FriendStatus";

const ViewProfile = (props) => {
  console.log(props.authState);




  let banner = ["http://localhost:5000/public/banner/banner1.jpg", "http://localhost:5000/public/banner/banner2.jpg", "http://localhost:5000/public/banner/banner3.jpg", "http://localhost:5000/public/banner/banner4.jpg", "http://localhost:5000/public/banner/banner5.jpg", "http://localhost:5000/public/banner/banner6.jpg"]

  let [profileView, setProfileView] = useState({});
  let { id } = useParams();

  let [friendsList, setFriendsList] = useState([])


  // let friends

  useEffect(() => {

    API.getViewProfile(id).then((res) => {
      console.log("res data", res);

      setProfileView(res);
      setFriendsList(res.friends)
    }
    )


    // .then(test => {
    // if (Object.keys(profileView).length) {
    //   console.log("profileView", profileView)
    //   if (profileView.friends) {

    //     console.warn("friends", profileView.friends)
    //     friends =
    //       profileView.friends.filter((e) => e.friendStatus === "approved");
    //     console.log("friends: ", friends)
    //   }
    // }

    // })

    props.hideOnline();

  }, [id]);

  const [feeds, setFeeds] = useState([]);

  let [bannerImg, setBannerImg] = useState("")

  useEffect(() => {
    setBannerImg(banner[Math.floor(Math.random() * banner.length)])
  }, [])


  useEffect(() => {
    window.scrollTo(0,0);
  }, [id]);


  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:5000/api/getfeeds",
      withCredentials: true,
    })
      .then((res) => {
        let filteredFeed = res.data.filter(
          (feed) => feed.author === profileView._id
        );
        // console.log("this should be profile view",res.data)
        // console.log("this should be profiles view",profileView._id)
        setFeeds(filteredFeed);
      })
      .catch((err) => console.log("get feed err", err));
  }, [profileView._id]);

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

  // const friends =
  //   Object.keys(profileView).length && profileView.friends.filter((e) => e.friendStatus === "approved");
  // console.log("friends: ", friends);


  return (
    <>
      {/* {console.log("img src tag", profileView)}
      {console.log("img src feeds", feeds)}
      {console.log("friendsLists", friendsList)} */}
      {
        <>
          <div className="header">
            <div className="banner"

              style={{
                // backgroundImage: `url(${banner[Math.floor(Math.random() * banner.length)]}), url("http://localhost:5000/public/default.jpeg")`,
                backgroundImage: `url(${bannerImg}), url("http://localhost:5000/public/default.jpeg")`,
                backgroundRepeat: "no-repeat",
                backgroundSize: 'cover'
              }}

            >
              <div className="topbannernav"></div>
            </div>
          </div>

          <span>
            <img
              className="imgView"
              alt=""
              src={`http://localhost:5000${profileView.profileImg}`}
            />
          </span>

          <div>
            {/* <FriendStatus id={id} /> */}
          </div>

          <div className="biodiv">
            <h2 className="bioheader">Intro</h2>
            <p className="biotext">{profileView?.details?.bio || ""}</p>
            <div className="aligndiv">
              <div><GiGraduateCap className="capicon" /></div>
              <p>College {profileView?.details?.education || ""}</p>
            </div>
            <div className="aligndiv">
              <div><GiGraduateCap className="capicon" /></div>
              <p>High School {profileView?.details?.education2 || ""}</p>
            </div>
            <div className="aligndiv">
              <div><FaHouse className="capicon" /></div>
              <p>Lives In {profileView?.details?.localInfo || ""}</p>
            </div>
            <div className="aligndiv">
              <div><FaHeart className="capicon" /></div>
              <p>

                {profileView.details?.maritalStatus || ""}
              </p>
            </div>
            <hr className="line" />
            <div className="bottombtncontainer">

              <Link to={`/messages/${id}`}>
                <div className="leftmessagebtn">
                  <button className="mabtn">Message</button>
                </div>
              </Link>


              <div className="rightaddbtn">
                <FriendStatus id={id}>
                  <button className="mabtn">Add Friend</button>
                </FriendStatus>
              </div>
            </div>
          </div>


          {/* <AddFeed /> */}
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
              {/* <div className="friendimgcontainer">
                    <div className="photoimg1"></div>
                    <div className="usernametext">Friends name</div>
                    </div>
                    <div className="friendimgcontainer">
                    <div className="photoimg1"></div>
                    <div className="usernametext">Friends name</div>
                    </div>
                    <div className="friendimgcontainer">
                    <div className="photoimg1"></div>
                    <div className="usernametext">Friends name</div>
                    </div>
                    <div className="friendimgcontainer">
                    <div className="photoimg1"></div>
                    <div className="usernametext">Friends name</div>
                    </div>
                    <div className="friendimgcontainer">
                    <div className="photoimg1"></div>
                    <div className="usernametext">Friends name</div>
                    </div>
                    <div className="friendimgcontainer">
                    <div className="photoimg1"></div>
                    <div className="usernametext">Friends name</div>
                    </div>
                    <div className="friendimgcontainer">
                    <div className="photoimg1"></div>
                    <div className="usernametext">Friends name</div>
                    </div>
                    <div className="friendimgcontainer">
                    <div className="photoimg1"></div>
                    <div className="usernametext">Friends name</div>
                    </div> */}

              {friendsList.filter((item) => item.friendStatus === 'approved').map((friend, i) => {

                return (
                 <div key={i} className="acceptedfriend">
                      {/* <h4>{friend.username}</h4> */}
                      <Link to={`/profile/${friend.userId}`}>
                        <div
                          className="friendimages"
                          style={{
                            backgroundImage: `url("http://localhost:5000${friend.profileImg}"), url("http://localhost:5000/public/default.jpeg")`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                          }}
                        ></div>
                        {/* <img className="friendimages"
                      src={`http://localhost:5000${friend.profileImg}`}
                      alt="friendProfileImg"
                    /> */}
                      </Link>

                      <p className="name2">{friend.username}</p>

                      <p className="name1">
                        {friend.firstName} {friend.lastName}
                      </p>

                 

                        {/* <button className="btn1">Block</button> */}
                        {/* <button
                          id={friend.userId}
                          onClick={(e) => handleFriendStatus(e)}
                          className="btn1"
                        >
                          Remove
                        </button> */}
                      {/* </div> */}
                    </div>
                )
              }

              )}




            </div>
          </div>

          <div
            className="feedContainer"
            style={{
              marginTop: "20px",
              overflowY: "auto",
            }}
          >
            {feeds
              .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
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
        </>
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
    hideOnline: () => dispatch(hideOnline()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewProfile);
