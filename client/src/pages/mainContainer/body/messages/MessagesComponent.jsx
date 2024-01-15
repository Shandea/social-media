import "./MessagesComponent.css";
import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { IoMdSearch } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { ImImages } from "react-icons/im";
import ContactCard from "../ContactCard/ContactCard";
import ContactModal from "./ContactModal";


const MessagesComponent = () => {

const [contactModal, setContactModal] = useState(false)

const handleContactModal = () => {

  setContactModal(prev => !prev)
}

  return (
    <>
   {contactModal ? <ContactModal
   handleContactModal={handleContactModal}
   className={contactModal ? "test active" : "test" }/> : null}
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
            <ContactCard /> 
            <ContactCard /> 
            <ContactCard /> 
            <ContactCard /> 
            <ContactCard /> 
            <ContactCard /> 
            <ContactCard /> 
            <ContactCard /> 
            <ContactCard /> 
            <ContactCard /> 
            <ContactCard /> 
          </div>
        </div>
        <div className="messageright">
          <div className="messagerighttop">
            <div className="messagerighttopleft">
              <div className="contactimg">
                <img src="" alt="" />
              </div>
              <div className="contactinfo">
                <p className="text1">Contacts Name</p>
                <p className="text2">Status</p>
              </div>
            </div>
            <div className="messagerighttopright">
              <div className="optiondiv" onClick={() => handleContactModal()}>
                <BsThreeDots />
              </div>
            </div>
          </div>
          <div className="messagerightmiddle">
            <div className="messagemiddleleft">
              <div className="contactpic"></div>
              <div className="contactmessage">This is an example message you will receive form your contact</div>
            </div>
            <div className="messagemiddleright">
              <div className="usermessage">This is an exsample of the message you send to your contact</div>
              <div className="contactpic"></div>
            </div>

            <div className="messagemiddleleft">
              <div className="contactpic"></div>
              <div className="contactmessage">This is an example message you will receive form your contact</div>
            </div>
            <div className="messagemiddleright">
              <div className="usermessage">This is an exsample of the message you send to your contact</div>
              <div className="contactpic"></div>
            </div>

            <div className="messagemiddleleft">
              <div className="contactpic"></div>
              <div className="contactmessage">This is an example message you will receive form your contact</div>
            </div>
            <div className="messagemiddleright">
              <div className="usermessage">This is an exsample of the message you send to your contact</div>
              <div className="contactpic"></div>
            </div>

            <div className="messagemiddleleft">
              <div className="contactpic"></div>
              <div className="contactmessage">This is an example message you will receive form your contact</div>
            </div>
            <div className="messagemiddleright">
              <div className="usermessage">This is an exsample of the message you send to your contact</div>
              <div className="contactpic"></div>
            </div>

            <div className="messagemiddleleft">
              <div className="contactpic"></div>
              <div className="contactmessage">This is an example message you will receive form your contact</div>
            </div>
            <div className="messagemiddleright">
              <div className="usermessage">This is an exsample of the message you send to your contact</div>
              <div className="contactpic"></div>
            </div>
          </div>
          <div className="messagerightbottom">
            <div className="sendmessageicon">
              <div className="plus"><FaPlus /></div>
              <div className="attachimg"><ImImages /></div>
            </div>
            <div className="sendmessageinput">
              <input type="text" className="messageinput" placeholder="Aa"/>
            </div>
            <div className="sendmessagebtn">
              <div className="bttn">Send</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MessagesComponent;
