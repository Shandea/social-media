import "./FriendsOutlet.css";
import API from "../../../../config/api/Api";
import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import axios from 'axios'
import { Link } from "react-router-dom";

// import FriendStatus from '../../../../components/friends/friendStatus/FriendStatus'


const FriendsOutlet = ({ state }) => {
  // console.log("FriendsOutlet: api: ", getAll)
  // useEffect(() => {
  //   API.userAll()
  // }, [])
  // console.log("STATE", state)
  // const [test, setTest] = useState(false)

  const [friends, setFriends] = useState([])

  const [users, setUsers] = useState([])

  // useEffect(() => {
  //   if (state.userProfile.friends) {

  //     setFriends(state.userProfile.friends)
  //   }
  // }, [])

  useEffect(() => {
    axios({
      method: 'GET',
      url: `http://localhost:5000/user/getProfile`,
      withCredentials: true
    })
      .then(res => {
        console.warn("PROFILE", res)
        setFriends(res.data.friends)
      })
  }, [])

  useEffect(() => {
    // API.userAll()

    axios({
      method: 'get',
      url: 'http://localhost:5000/user/all',
      withCredentials: true
    })
      .then(res => {
        console.log("res", res)
        setUsers(res.data)
      })
  }, [])


  const handleFriendStatus = (e) => {
    console.log("HandleAdd Fre ===> ", e.target.id)
    axios({
      method: "post",
      withCredentials: true,
      url: "http://localhost:5000/socialConnection/addFriend",
      data: { id: e.target.id }
    })
      .then(res => {
        console.warn("FRIEND ADD STATUE =====> ", res)
        setFriends(res.data.friends)
      })
      .catch(err => console.log("err", err))
  }

  // const PendingFriends = fakefriends.filter((e) => e.friendStatus == "Pending");
  // console.log("PendingFriends: ", PendingFriends);
  // const AcceptedFriends = fakefriends.filter(
  //   (e) => e.friendStatus == "Accepted"
  // );
  // console.log("AcceptedFriends: ", AcceptedFriends);
  // const BlockedFriends = fakefriends.filter((e) => e.friendStatus == "Blocked");
  // console.log("BlockedFriends: ", BlockedFriends);

  const PendingFriends2 = friends && friends.filter(
    (e) => e.friendStatus === "requested"
  );
  console.log("PendingFriends2: ", PendingFriends2);

  const AcceptedFriends2 = friends && friends.filter(
    (e) => e.friendStatus === "approved"
  );
  console.log("AcceptedFriends2: ", AcceptedFriends2);

  const BlockedFriends2 = friends && friends.filter(
    (e) => e.friendStatus === "Blocked"
  );
  console.log("BlockedFriends2: ", BlockedFriends2);

  const RequestedFriends2 = friends && friends.filter(
    (e) => e.friendStatus === "pending"
  );
  console.log("RequestedFriends2: ", RequestedFriends2);

  const RemovedFriends2 = friends && friends.filter(
    (e) => e.friendStatus === "removed"
  );
  // console.log("Remove Friend", RemovedFriends2)

  // console.warn('ALL FRIENDS', state.userProfile.friends)


  // console.warn('Users', users)



  return (
    <div className="friendsoutletcontainer">
      {/* {console.warn("REDUX FRIENDS: ", state.userProfile.friends)} */}
      {/* {console.warn("FRIENDS", friends)} */}




      <div className="currentfriends">
        <h6 className="FS">Friends</h6>
        <div className="accepteddiv">
          {AcceptedFriends2 ? (
            AcceptedFriends2.map((friend, i) => {
              // console.log("accepted frirend console log", friend)
              return (
                <div key={i} className="acceptedfriend">
                  {/* <h4>{friend.username}</h4> */}
                  <Link to={`/profile/${friend._id}`}>
                    <div
                      className="friendimages"

                      style={{
                        backgroundImage: `url("http://localhost:5000${friend.profileImg}"), url("http://localhost:5000/public/default.jpeg")`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: 'cover'
                      }}
                    >
                    </div>
                    {/* <img className="friendimages"
                      src={`http://localhost:5000${friend.profileImg}`}
                      alt="friendProfileImg"
                    /> */}
                  </Link>


                  <p className="name2">
                    {friend.username}
                  </p>

                  <p className="name1">
                    {friend.firstName} {friend.lastName}
                  </p>

                  <div className="acceptedfriendsbuttons">

                    <Link to={`/messages/${friend.userId}`}>
                      <button className="btn">Message</button>

                    </Link>


                    {/* <button className="btn1">Block</button> */}
                    <button
                      id={friend.userId}
                      onClick={(e) => handleFriendStatus(e)}
                      className="btn1">Remove</button>
                  </div>
                </div>
              );
            })
          ) : (
            <p>loading</p>
          )}
        </div>
      </div>

      <hr className="line" />
















      <div className="friendrequests">
        <h6>Friend Requests</h6>
        <div className="requestsdiv">
          {PendingFriends2 ? (
            PendingFriends2.map((friend, i) => {
              console.log("pending", friend)
              return (
                <div key={i} className="pendingfriend">
                  {/* <h6>{friend.username}</h6> */}
                  <Link to={`/profile/${friend.userId}`}>
                    <div
                      className="friendimages"

                      style={{
                        backgroundImage: `url("http://localhost:5000${friend.profileImg}"), url("http://localhost:5000/public/default.jpeg")`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: 'cover'
                      }}
                    >
                    </div>
                    {/* <img src={`http://localhost:5000${friend.profileImg}`} alt=" http://localhost:5000/public/default.jpeg" className="friendimages" /> */}
                  </Link>
                  <p className="name2">
                    {friend.username}
                  </p>
                  <p className="name1">
                    {friend.firstName} {friend.lastName}
                  </p>
                  <div className="pendingfriendsbuttons">

                    {/* <FriendStatus id={friend.userId} >
                      <button className="btn1">Add Friend</button>
                    </FriendStatus> */}
                    <button
                      id={friend.userId}
                      onClick={(e) => handleFriendStatus(e)}
                      className="btn1">
                      Add Friend
                    </button>


                    <Link to={`/messages/${friend.userId}`}>
                      <button className="btn">Message</button>
                    </Link>
                  </div>
                </div>
              );
            })
          ) : (
            <p>loading</p>
          )}
          <hr className="line" />

        </div>


        <h6>Pending Requests</h6>
        <div className="requestsdiv">
          {RequestedFriends2 ? (
            RequestedFriends2.map((friend, i) => {
              return (
                <div key={i} className="pendingfriend">
                  {/* <h6>{friend.username}</h6> */}
                  <Link to={`/profile/${friend.userId}`}>


                    {/* <img src={`http://localhost:5000${friend.profileImg}`} alt=" http://localhost:5000/public/default.jpeg" className="friendimages" /> */}
                    <div
                      className="friendimages"

                      style={{
                        backgroundImage: `url("http://localhost:5000${friend.profileImg}"), url("http://localhost:5000/public/default.jpeg")`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: 'cover'
                      }}
                    >
                    </div>

                  </Link>
                  <p className="name2">
                    {friend.username}
                  </p>

                  <p className="name1">
                    {friend.firstName} {friend.lastName}
                  </p>
                  <div className="pendingfriendsbuttons">
                    {/* <button className="btn">Accept</button> */}
                    <Link to={`/messages/${friend.userId}`}>
                      <button className="btn">Message</button>
                    </Link>


                  </div>
                </div>
              );
            })
          ) : (
            <p>loading</p>
          )}
        </div>
      </div>

      <hr className="line" />

      {/* <div className="blockedlist">
        <h4 className="FS">Blocked Friends</h4>
        <div className="blockeddiv">
          {BlockedFriends2?
            BlockedFriends2.map((friend, i) => {
            return (
              <div key={i} className="blockedfriend">
                
                <img src={friend.profileImg} alt="friendProfileImg" />
                <p className="name1">
                  {friend.firstName} {friend.lastname}
                </p>

                <div className="blockedfriendsbuttons">
                  <button className="btn">Unblock</button>
                </div>
              </div>
            );
          })}
        </div>
      </div> */}
      {/* ///////////////////////////////////////////////////// */}

      <div className="currentfriends">
        <h6 className="FS">Removed</h6>
        <div className="accepteddiv">
          {RemovedFriends2 ? (
            RemovedFriends2.map((friend, i) => {
              // console.log("accepted frirend console log", friend)
              return (
                <div key={i} className="acceptedfriend">
                  {/* <h4>{friend.username}</h4> */}
                  <Link to={`/profile/${friend.userId}`}>
                    <div
                      className="friendimages"

                      style={{
                        backgroundImage: `url("http://localhost:5000${friend.profileImg}"), url("http://localhost:5000/public/default.jpeg")`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: 'cover'
                      }}
                    >
                    </div>
                    {/* <img className="friendimages"
                      src={`http://localhost:5000${friend.profileImg}`}
                      alt="friendProfileImg"
                    /> */}
                  </Link>


                  <p className="name2">
                    {friend.username}
                  </p>

                  <p className="name1">
                    {friend.firstName} {friend.lastName}
                  </p>

                  <div className="acceptedfriendsbuttons">

                    <Link to={`/messages/${friend.userId}`}>
                      <button className="btn">Message</button>

                    </Link>


                    {/* <button className="btn1">Block</button> */}
                    <button
                      id={friend.userId}
                      onClick={(e) => handleFriendStatus(e)}
                      className="btn1">Friend</button>
                  </div>
                </div>
              );
            })
          ) : (
            <p>loading</p>
          )}
        </div>
      </div>


      <hr className="line" />















      <div className="currentfriends">
        <h6 className="FS">Suggested Friends</h6>
        <div className="accepteddiv">
          {users ? (

            // users.filter((obj) => !state.userProfile.friends.includes(obj.username).map((friend, i) => {

            users.map((friend, i) => {


              // console.log("map users friend", friend)
              // console.log("at current user friends outlet", state.userProfile.friends)
              return (
                <div key={i} className="acceptedfriend">
                  {/* <h6>{friend.username}</h6> */}
                  <Link to={`/profile/${friend._id}`}>

                    {/* <img className="friendimages"
                    src={`http://localhost:5000${friend.profileImg}`}
                    alt="http://localhost:5000/public/default.jpeg" 
                                     />
                   */}
                    <div
                      className="friendimages"

                      style={{
                        backgroundImage: `url("http://localhost:5000${friend.profileImg}"), url("http://localhost:5000/public/default.jpeg")`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: 'cover'
                      }}
                    >
                    </div>
                  </Link>
                  <p className="name2">
                    {friend.username}
                  </p>

                  <p className="name1">
                    {friend.firstName} {friend.lastName}
                  </p>

                  <div className="acceptedfriendsbuttons">
                    <Link to={`/messages/${friend._id}`}>
                      <button className="btn">Message</button>

                    </Link>
                    {/* <FriendStatus id={friend._id} > */}
                    <button
                      id={friend._id}
                      onClick={(e) => handleFriendStatus(e)}
                      className="btn1">Add Friend</button>
                    {/* </FriendStatus> */}

                  </div>
                </div>
              );
            })

            // )

          ) : (
            <p>loading</p>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    state: state.auth,
  };
};

export default connect(mapStateToProps, null)(FriendsOutlet);
