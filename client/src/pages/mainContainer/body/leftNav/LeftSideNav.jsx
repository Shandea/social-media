import "./LeftSideNav.css";
import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'

import { BsGlobeAmericas } from "react-icons/bs";

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
      <div className="leftnavcontainer">
        {/* <h3 className='leftsidenavh3'>Feeds</h3> */}
        <h5 className='leftsidenavh5' >Current View  </h5>
        <div >
          {/* <Link to={`/profile/${authedUser._id}`}></Link> */}
          <Link
            to={`/feed/`}
          // className={leftNav.mainFeed === "User" ? "focusedOption" : null}
          >
            <BsGlobeAmericas title="Feeds" style={{fontSize: "30px"}}/> 

          </Link>

        </div>
        
        <div>

          <Link
            to={`/images/`}
          // className={leftNav.mainFeed === "Images" ? "focusedOption" : null}
          >
           <h2> Images</h2>
          </Link>
        </div>


        <div>

          <Link
            to={`/videos/`}
          // className={leftNav.mainFeed === "Videos" ? "focusedOption" : null}
          >
           <h2>Videos</h2> 
          </Link>
        </div>

        <div>

          <Link
            to={`/friends/`}
          // className={leftNav.mainFeed === "friends" ? "focusedOption" : null}
          >
           <h2>friends</h2> 
          </Link>
        </div>

      
        <div>

          <Link
            to={`/messages/`}
          // className={leftNav.mainFeed === "Messages" ? "focusedOption" : null}
          >
           <h2>Messages</h2> 
          </Link>
        </div>

        <div>
          <Link
            to={`/hobby/`}
            // onClick={(e) => handleLogout(e)}
          // className={leftNav.mainFeed === "Hobby" ? "focusedOption" : null}
          >
            <h2>Hobby</h2>
          </Link>
        </div>



<div onClick={handleLogout}><h2>logout</h2></div>


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
