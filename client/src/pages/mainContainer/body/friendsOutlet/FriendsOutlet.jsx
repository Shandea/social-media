import "./FriendsOutlet.css";
import API from "../../../../config/api/Api";
import { useEffect } from "react";
import { connect } from "react-redux";

const FriendsOutlet = ({ state }) => {
  // console.log("FriendsOutlet: api: ", getAll)
  // useEffect(() => {
  //   API.userAll()
  // }, [])

  //btton functionality APIs here

  const fakefriends = [
    {
      username: "SBones",
      firstName: "Sarah",
      lastname: "Boneski",
      profileImg:
        "http://localhost:5000/public/images/65970df230938762f3989070/ShowCaseLogo.png",
      friendStatus: "Pending",
    },
    {
      username: "FdaTank",
      firstName: "Frank",
      lastname: "Toniski",
      profileImg:
        "http://localhost:5000/public/images/65970df230938762f3989070/ShowCaseLogo.png",
      friendStatus: "Accepted",
    },
    {
      username: "SammyBoi",
      firstName: "Sam",
      lastname: "Boneski",
      profileImg:
        "http://localhost:5000/public/images/65970df230938762f3989070/ShowCaseLogo.png",
      friendStatus: "Accepted",
    },
    {
      username: "Rileyo",
      firstName: "Riley",
      lastname: "Oregano",
      profileImg:
        "http://localhost:5000/public/images/65970df230938762f3989070/ShowCaseLogo.png",
      friendStatus: "Accepted",
    },
    {
      username: "xX_Chang_Xx",
      firstName: "John",
      lastname: "Littleson",
      profileImg:
        "http://localhost:5000/public/images/65970df230938762f3989070/ShowCaseLogo.png",
      friendStatus: "Accepted",
    },
    {
      username: "Meanie",
      firstName: "Tommy",
      lastname: "Lagru",
      profileImg:
        "http://localhost:5000/public/images/65970df230938762f3989070/ShowCaseLogo.png",
      friendStatus: "Blocked",
    },
  ];
  const PendingFriends = fakefriends.filter((e) => e.friendStatus == "Pending");
  console.log("PendingFriends: ", PendingFriends);
  const AcceptedFriends = fakefriends.filter(
    (e) => e.friendStatus == "Accepted"
  );
  console.log("AcceptedFriends: ", AcceptedFriends);
  const BlockedFriends = fakefriends.filter((e) => e.friendStatus == "Blocked");
  console.log("BlockedFriends: ", BlockedFriends);

  const PendingFriends2 = state.userProfile.friends?.filter(
    (e) => e.friendStatus === "requested"
  );
  console.log("PendingFriends2: ", PendingFriends2);
  const AcceptedFriends2 = state.userProfile.friends?.filter(
    (e) => e.friendStatus === "approved"
  );
  console.log("AcceptedFriends2: ", AcceptedFriends2);
  const BlockedFriends2 = state.userProfile.friends?.filter(
    (e) => e.friendStatus === "Blocked"
  );
  console.log("BlockedFriends2: ", BlockedFriends2);

  return (
    <div className="friendsoutletcontainer">
      {console.warn("REDUX FRIENDS: ", state.userProfile.friends)}

      <div className="friendrequests">
        <h5>Friend Requests</h5>
        <div className="requestsdiv">
          {PendingFriends2 ? (
            PendingFriends2.map((friend, i) => {
              return (
                <div key={i} className="pendingfriend">
                  {/* <h4>{friend.username}</h4> */}
                  <img src={`http://localhost:5000${friend.profileImg}`} alt="friendProfileImg" />
                  <p className="name1">
                    {friend.firstName} {friend.lastName}
                  </p>
                  <p>{friend.username}</p>
                  <div className="pendingfriendsbuttons">
                    <button className="btn">Accept</button>
                    <button className="btn1">Reject</button>
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
        <h4 className="FS">Friends</h4>
        <div className="accepteddiv">
          {AcceptedFriends2 ? (
            AcceptedFriends2.map((friend, i) => {
              return (
                <div key={i} className="acceptedfriend">
                  {/* <h4>{friend.username}</h4> */}
                  <img
                    src={`http://localhost:5000${friend.profileImg}`}
                    alt="friendProfileImg"
                  />
                  <p className="name1">
                    {friend.firstName} {friend.lastname}
                  </p>

                  <div className="acceptedfriendsbuttons">
                    <button className="btn">Message</button>
                    <button className="btn1">Block</button>
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
          {BlockedFriends.map((friend, i) => {
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
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    state: state.auth,
  };
};

export default connect(mapStateToProps, null)(FriendsOutlet);
