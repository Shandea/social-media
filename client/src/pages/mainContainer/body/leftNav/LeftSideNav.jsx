import "./LeftSideNav.css";
import { useNavigate } from 'react-router-dom'

// import { BsGlobeAmericas } from "react-icons/bs";
import { MdGroups } from "react-icons/md";
import { PiImageSquareFill } from "react-icons/pi";
import { TbMessages } from "react-icons/tb";
import { LiaFileVideoSolid } from "react-icons/lia";
import { MdInterests } from "react-icons/md";
import { TbLogout } from "react-icons/tb";

import { connect } from "react-redux";

import axios from 'axios'

import io from 'socket.io-client'
const socket = io.connect('http://localhost:5000')



const LeftSideNav = ({ profile }) => {

  let nav = useNavigate()

const handleLogout = (e) => {
  console.log("logging out")
  // e.preventDefault()
  axios({
    method: "get",
    url: "http://localhost:5000/user/logout",
    withCredentials: true
  }).then(res => {
    console.log("logout", res)
    nav("/")
  }
  )
  .catch(err => console.log("logouterr", err))
  // nav("/")

  socket.emit("loggedOut", "loggedOut")

}


  return (
    <>
      <div >
        <div className="usernameimg" onClick={() => nav("/profile/")}>
        <div className="userimg1">
          
        </div>
        <div className="username">User Name</div>
        </div>


<div className="leftnavdiv" onClick={() => nav(`/friends/`)}>
  <div className="leftnavicon"><MdGroups /></div>
  <div className="leftnavtext">Friends</div>
</div>

<div className="leftnavdiv" onClick={() => nav(`/images/`)}>
  <div className="leftnavicon"><PiImageSquareFill /></div>
  <div className="leftnavtext">Pictures</div>
</div>

<div className="leftnavdiv" onClick={() => nav(`/messages/`)}>
  <div className="leftnavicon"><TbMessages /></div>
  <div className="leftnavtext">Messages</div>
</div>

<div className="leftnavdiv" onClick={() => nav(`/feed/`)}>
  <div className="leftnavicon"><LiaFileVideoSolid /></div>
  <div className="leftnavtext">Feeds</div>
</div>

{/* <div className="leftnavdiv" onClick={() => nav(`/hobby/`)}>
  <div className="leftnavicon"><MdInterests /></div>
  <div className="leftnavtext">Hobbies</div>
</div> */}

<div className="leftnavdiv" onClick={handleLogout}>
  <div className="leftnavicon"><TbLogout /></div>
  <div className="leftnavtext">Logout</div>
</div>
        




      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    profile: state.auth
  }
}

export default connect(mapStateToProps, null)(LeftSideNav);
