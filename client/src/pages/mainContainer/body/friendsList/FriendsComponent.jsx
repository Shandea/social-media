import './FriendsComponent.css'

import API from '../../../../config/api/'
import { connect } from 'react-redux'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import io from 'socket.io-client'
const socket = io.connect('http://localhost:5000')

const FriendsComponent = ({ getAll }) => {


  const [users, setUsers] = useState([])


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

    // }, [])

    // useEffect(() => {
    socket.on("updateLoggedIn", data => {
      console.log("user loggin in")
      axios({
        method: "GET",
        url: 'http://localhost:5000/user/all',
      })
        .then(res => {
          setUsers(res.data)
        })
    })


    socket.on("updateLoggedOut", data => {
      console.log("user loggin out")

      axios({
        method: "GET",
        url: 'http://localhost:5000/user/all',
      })
        .then(res => {
          // console.log("res-getusers", res)
          setUsers(res.data)
        })

    })

  }, [socket])

  /// now for efficency we could use socket to notify the ID thats status changed and jsut update that state.... 
  ///////////////////////

  return (
    <div className='friendscomponentcontainer'>
      {/* <input placeholder='🔍Im a search box? maybe...' /> */}
      {
        // getAll.allUsers.map((friends, i) => friends.map((friend, i) => {
        users.map((friend, i) => {
          return (
            <div key={i}>

              {
                friend?.profileImg ?
                  (
                    <div className='friendCard' key={i}>
                      <Link className='friendLink' to={`/profile/${friend._id}`}>

                        <div id="FeedImage"

                          style={{
                          
                            display: 'flex',
                            justifyContent: 'center',
                            height: '60px',
                            width: '60px',
                            borderRadius: '50%',
                            backgroundImage: `url("http://localhost:5000${friend.profileImg}"), url("http://localhost:5000/public/default.jpeg")`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: 'cover'
                          }}
                        ></div>

                        {/* <img alt='' src={`http://localhost:5000${friend.profileImg}`} /> */}
                        <h4>{friend.username}</h4>



                      </Link>
                      <div className='statusDiv'>
                        <h6>ONLINE</h6>
                        <div className='onlineStatus' style={{ backgroundColor: friend.isOnline ? "lime" : null }}></div>
                      </div>
                    </div>

                  ) :
                  (
                    <p>❌</p>
                  )
              }


            </div>
          )
        })
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    getAll: state.auth
  }
}

export default connect(mapStateToProps, null)(FriendsComponent)
