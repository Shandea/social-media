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

  let [profileView, setProfileView] = useState({});
  let { id } = useParams();
  useEffect(() => {
    API.getViewProfile(id).then((res) => {
      console.log("res data", res);

      setProfileView(res);
    });
    props.hideOnline();
  }, [id]);

  const [feeds, setFeeds] = useState([]);

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

  return (
    <>
      {console.log("img src tag", profileView)}
      {console.log("img src feeds", feeds)}
      {
        <>
          <div className="header">
            <div className="banner">
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
            <p className="biotext">{profileView?.details?.bio || "I Have No Bio"}</p>
            <div className="aligndiv">
              <div><GiGraduateCap className="capicon" /></div>
              <p>Studied at {profileView?.details?.education || "I Have No Education"}</p>
            </div>
            <div className="aligndiv">
              <div><FaHouse className="capicon" /></div>
              <p>Lives In {profileView?.details?.localInfo || "I Have No Local Info"}</p>
            </div>
            <div className="aligndiv">
              <div><FaHeart className="capicon" /></div>
              <p>

                {profileView.details?.maritalStatus || "Single"}
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
