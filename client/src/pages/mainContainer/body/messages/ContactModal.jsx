import React from 'react'
import "./ContactModal.css"
import { BsThreeDots } from "react-icons/bs";
import { IoMdSearch } from "react-icons/io";
import ContactCard from '../ContactCard/ContactCard'

const ContactModal = ( { handleContactModal } ) => {
  return (
    <>
    <div className='contactmodalmain'>
   
          <div className="chatheader">
            <div className="headerleft">
              <h1>Chats</h1>
            </div>
            <div className="headerright">
              <div className="dots" onClick={() => handleContactModal()}>
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
    </>
  )
}

export default ContactModal
