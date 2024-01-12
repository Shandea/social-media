import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


import API from "../../../../../config/api/Api";
import { connect } from "react-redux";
import { hideOnline } from "../../../../../config/redux/actions/AuthActions";
import axios from "axios";
import FeedContainer from "../../../../../components/feeds/feedContainer/FeedContainer";
import AddFeed from "../../../../../components/feeds/addFeed/AddFeed";

import FriendStatus from "../../../../../components/friends/friendStatus/FriendStatus";

const ViewProfile = (props) => {
  console.log(props.authState)

  let [profileView, setProfileView] = useState({});
  let { id } = useParams()
  useEffect(() => {
    API.getViewProfile(id).then(res => {
      console.log("res data", res)

      setProfileView(res)
    })
    props.hideOnline()
  }, [id])

  const [feeds, setFeeds] = useState([])

  useEffect(() => {

    axios({
      method: "GET",
      url: "http://localhost:5000/api/getfeeds",
      withCredentials: true,
    })
      .then(res => {
        let filteredFeed = res.data.filter((feed) => feed.author === profileView._id)
        // console.log("this should be profile view",res.data)
        // console.log("this should be profiles view",profileView._id)
        setFeeds(filteredFeed)
      })
      .catch(err => console.log("get feed err", err))

  }, [profileView._id])

  return (
    <>
      {console.log("img src tag", profileView)}
      {console.log("img src feeds", feeds)}
      {

        <>

          <span>
            <img width={200} height={200} alt="" src={`http://localhost:5000${profileView.profileImg}`} />
          </span>

          <div>
            <FriendStatus id={id} />
          </div>

          <h4>bio</h4>
          <p>{profileView?.details?.bio || "I Have No Bio"}</p>
          <h4>bio details</h4>
          <p>{profileView?.details?.education || "I Have No Education"}</p>
          <p>{profileView?.details?.localInfo || "I Have No Local Info"}</p>
          <p>{profileView.details?.maritalStatus || "I Have No Marital Status"}</p>

          <h3>create a post here</h3>
          <AddFeed />

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
        </>
      }
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    authState: state.auth
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    hideOnline: () => dispatch(hideOnline()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewProfile);