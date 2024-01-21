import React from 'react'
import { useNavigate } from 'react-router-dom'
import { MdGroups } from "react-icons/md";
import { PiImageSquareFill } from "react-icons/pi";
import { TbMessages } from "react-icons/tb";
import { LiaFileVideoSolid } from "react-icons/lia";
import { MdInterests } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import { MdFeed } from "react-icons/md";
import "./MenuModal.css"


import { connect } from "react-redux";

import axios from 'axios'

import io from 'socket.io-client'
const socket = io.connect('http://localhost:5000')

const MenuModal = () => {

    const nav = useNavigate();

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
   <div className='menumodalmain'>
    <div className="menuheader"><h1>Menu</h1></div>
    <div >
        <div className="usernameimg1" onClick={() => nav("/profile/")}>
        <div className="userimg11">
          
        </div>
        <div className="username1">User Name</div>
        </div>


<div className="leftnavdiv1" onClick={() => nav(`/friends/`)}>
  <div className="leftnavicon1"><MdGroups /></div>
  <div className="leftnavtext1">Friends</div>
</div>

<div className="leftnavdiv1" onClick={() => nav(`/images/`)}>
  <div className="leftnavicon1"><PiImageSquareFill /></div>
  <div className="leftnavtext1">Photos</div>
</div>

<div className="leftnavdiv1" onClick={() => nav(`/messages/`)}>
  <div className="leftnavicon1"><TbMessages /></div>
  <div className="leftnavtext1">Messages</div>
</div>

<div className="leftnavdiv1" onClick={() => nav(`/Feed/`)}>
  <div className="leftnavicon1"><MdFeed /></div>
  <div className="leftnavtext1">Feeds</div>
</div>

{/* <div className="leftnavdiv1" onClick={() => nav(`/hobby/`)}>
  <div className="leftnavicon1"><MdInterests /></div>
  <div className="leftnavtext1">Hobbies</div>
</div> */}

<div className="leftnavdiv1" onClick={handleLogout}>
  <div className="leftnavicon1"><TbLogout /></div>
  <div className="leftnavtext1">Logout</div>
</div>
        




      </div>
   </div>
   </>
  )
}

export default MenuModal
