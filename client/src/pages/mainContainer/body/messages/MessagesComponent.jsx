import "./MessagesComponent.css";
import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import { BsThreeDots } from "react-icons/bs";
import { IoMdSearch } from "react-icons/io";

import ContactCard from "../ContactCard/ContactCard";
import ContactModal from "./ContactModal";

import MessageContent from "./messageContent/MessageContent"
import SendMessage from "./sendMessage/SendMessage"

import { connect } from 'react-redux'
import axios from 'axios'

import io from 'socket.io-client'

const socket = io.connect('http://localhost:5000')


const MessagesComponent = ({ authState }) => {

  const { id } = useParams()
  const authed = authState.user.userId
  let queryId = [authed, id].sort().join("")

  const payload = { queryId: queryId }
  const [message, setMessage] = useState({})  // the message you are typing
  const [typing, setTyping] = useState(false)
  const [allMsg, setAllMsg] = useState([])  // the thread of msgs between 2 users

  const [contact, setContact] = useState({})  // user u looking at for most recent pic
  /// if from link get id, else wait for click.... of user card..

  const profile = authState.userProfile.messages

  useEffect(() => {
    console.warn("GET USER")
    axios({
      method: "GET",
      url: `http://localhost:5000/api/getUser/${id}`,
      withCredentials: true
    })
      .then(res => {
        console.log("user res", res)
        setContact(res.data)
      })
      .catch(err => console.log("err", err))
  }, [id])


  useEffect(() => {

    socket.emit('join_room', queryId)

  }, [queryId])

  /// updates chat messages on [socket] change
  useEffect(() => {

    socket.on('recieve_message', (data) => {
      console.log("socket Data", data)
      // console.log("in soccket all msg", allMsg)

      setAllMsg(prev => ([
        ...prev,
        data
      ]))

      // let newChat = document.getElementById("chat");
      // newChat.scrollIntoView({ behavior: 'smooth', block: 'start' })

    })

    return () => socket.off('recieve_message')

  }, [socket])

  useEffect(() => {
    console.log("USEEFF HIT, getting thread messages")
    axios({
      method: 'POST',
      withCredentials: true,
      url: "http://localhost:5000/api/getThreadMessages",
      data: payload
    })
      .then(res => {
        console.log("res", res)
        handleSetAllMsg(res)
      })

      .catch(err => console.log("err", err))

  }, [id])

  useEffect(() => {

    if (allMsg.length) {
      // let newChat = document.getElementById("chat");
      // newChat.scrollIntoView({ behavior: 'instant', block: 'end' })
      // console.log("should scroll - getThreadMessages")
    }

  }, [allMsg])



  const handleSetAllMsg = (input) => {
    console.log("handleSetAllMsg input", input)
    setAllMsg(input.data)
  }



  const [contactModal, setContactModal] = useState(false)

  const handleContactModal = () => {

    setContactModal(prev => !prev)
  }

  const handleSetMessage = (e) => {


    setMessage(prev => ({
      ...prev,
      sender: authed,
      senderName: authState.user.username,
      recipient: id,
      messageContent: e.target.value,
      read: [authed],
      queryId: queryId,
      createdAt: new Date(),
      profileImg: authState.userProfile.profileImg,
      deleted: []

    }))

    // socket.emit("typing", { user: authState.user.username, queryId })

    // setTimeout(() => {
    //     socket.emit("done_typing", { user: authState.user.username, queryId })
    //     // console.log("not typing")
    // }, 2000)
  }

  const handleSubmitMessage = (e) => {
    e.preventDefault()
    console.warn("MESSAGE sending")
    // let data = { "room": queryId, "message": message.messageContent }
    let data = { "room": queryId, "message": message }

    // console.log("data", data)
    // if (!id) { test = id }
    axios({
      method: "POST",
      url: "http://localhost:5000/api/addMessage",
      data: message
    })
      .then(res => {
        console.warn("res-message", res)
        // let newChat = document.getElementById("chat");
        // newChat.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
      .then(() => {
        // console.log("socket-send HIT")
        // allMsg.data.concat()
      })
      .catch(err => console.warn("ADMSG ERROR", err))

    socket.emit('send_message', data)
    // socket.emit('mailCall', [authedUser._id, id])

    // socket.emit('mailCall', message.recipient)
    socket.emit('mailCall', [authed, message.recipient])

    setMessage(prev => ({
      ...prev,
      messageContent: ""
    }))

  }




  return (
    <>
      {console.log("ids", id, authed, queryId)}
      {console.log("c'ONTACT",contact)}
      {console.log("Profile", profile)}
      {/* {console.log("Message Comp - authSt", authState)} */}
      {/* {console.warn("msg input", message)} */}



      {contactModal ? <ContactModal
        handleContactModal={handleContactModal}
        className={contactModal ? "test active" : "test"} /> : null}
      <div className="mainmessagecontainer">
        <div className="messageleft">
          <div className="chatheader">
            <div className="headerleft">
              <h1>Chats</h1>
            </div>
            <div className="headerright">
              <div className="dots">
                <BsThreeDots />
              </div>
            </div>
          </div>
          <div id="search">
            <div className="searchdiv">
              <div className="searchicon">
                <IoMdSearch />
              </div>
              <input
                type="search"
                className="searchinput"
                placeholder=" Search Messages"
              />
            </div>
          </div>

          <div className="contactdiv">

            {profile && profile.map((item, i) => {
              return (

                <ContactCard item={item} contact={contact}/>
              )
            })}
            {/* <ContactCard /> */}
          </div>
        </div>


        {/*message header */}


        <div className="messageright">
          <div className="messagerighttop">
            <div className="messagerighttopleft">
              <div className="contactimg"
                style={{
                  backgroundImage: `url("http://localhost:5000${contact?.profileImg}"), url("http://localhost:5000/public/default.jpeg")`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: 'cover'
                }}
              >
              </div>

              <div className="contactinfo">
                <p className="text1">
                  {contact?.username}
                </p>
                <p className="text2">{contact?.isOnline ? "online" : "offline"}</p>
              </div>

            </div>
            <div className="messagerighttopright">
              <div className="optiondiv" onClick={() => handleContactModal()}>
                <BsThreeDots />
              </div>
            </div>
          </div>


          {/* messgae body */}

          {/* {allMsg.map((obj, i) => { */}
          {/* return ( */}
          <MessageContent allMsg={allMsg} authState={authState} contact={contact} />

          {/* )
})} */}




          {/* footer */}
          <SendMessage
          message={message}
            handleSubmitMessage={handleSubmitMessage}
            handleSetMessage={handleSetMessage}
          />
          {/*           
          <div className="messagerightbottom">
            <div className="sendmessageicon">
              <div className="plus"><FaPlus /></div>
              <div className="attachimg"><ImImages /></div>
            </div>
            <div className="sendmessageinput">
              <input type="text" className="messageinput" placeholder="Aa" />
            </div>
            <div className="sendmessagebtn">
              <div className="bttn">Send</div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  // console.warn("state redux", state)
  return {
    authState: state.auth
  }
}

export default connect(mapStateToProps, null)(MessagesComponent)

