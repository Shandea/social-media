
import { FaHome, FaRegComment, FaBell } from "react-icons/fa";
import { PiUsersThreeFill } from "react-icons/pi"
import { IoSearch, IoAdd } from "react-icons/io5"
import { TbGridDots } from "react-icons/tb"

import { TbDoorExit } from "react-icons/tb";
import hacker6 from "../../imagess/hacker6.png"


import { useNavigate, Link } from "react-router-dom";

import { connect } from 'react-redux'
import axios from 'axios'
import io from 'socket.io-client'
const socket = io.connect('http://localhost:5000')





const Navbar = ({ props, authState }) => {
  console.log("header prop", props, authState)

  let nav = useNavigate()


  const handleLogout = (e) => {
    console.log("logging out")
    // e.preventDefault()
    socket.emit("loggedOut", "loggedOut")

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




  }



  return (

    <>

      <div className="navbar">
        <div className="left-nav">
          <div className="circle">
            <p className="logo">S</p>
          </div>
          <div className="search2"><IoSearch /></div>
          <input
            type="search"
            name=""
            className="search"
            placeholder="Search"
          />
        </div>


        <div
          className="welcome"
        >
          <p>Welcome back {authState.user.username}</p>
        </div>

        <div className="middle-nav">
          <div className="middle-left-nav">
            <div className="circle icon">
              <Link to="/feed">

                <FaHome />
              </Link>
            </div>
          </div>
          <div className="middle-right-nav">
            <div className="circle icon">
              <Link to="/friends">
                <PiUsersThreeFill />
              </Link>
            </div>

          </div>

        </div>
        {/* { modal ? <Modal /> : ""}
          { modal1 ? <Modal1 /> : ""} */}
        <div className="right-nav">
          <div className="circle icon add"><IoAdd /> </div>
          <div className="search1">Find friends</div>
          <div className="circle icon dots" ><TbGridDots /></div>
          <div className="circle icon"><FaRegComment /></div>
          <div className="circle icon" ><FaBell /></div>

          <div className="circle icon"
            onClick={handleLogout}

          ><TbDoorExit /></div>

          <div className="circle1">
            {/* <img src={hacker6} alt="" className="img1"/> */}
            <img className="img1" onClick={() => nav("/profile/")} src={`http://localhost:5000${authState.userProfile.profileImg}`} alt="" />
          </div>
        </div>
      </div>
    </>
  )
}


const mapStateToProps = (state) => {
  // console.warn("state redux", state)
  return {
    authState: state.auth
  }
}

export default connect(mapStateToProps, null)(Navbar)