import React from "react";
import "./ContactCard.css";
import hacker6 from "../../../../imagess/hacker6.png"

const ContactCard = () => {
  return (
    <>
      <div className="contactcardcontainer">
        <div className="contactimage">
       
            <img src={hacker6} alt="contact image"  className="ci"/>
            
        </div>
       
        <div className="nameandmessage">
          <div className="contactcardname">Contact Name</div>
          
          <div className="contactcardmessage">
            This is the last message sent...
          </div>
        </div>
        <div className="datetimenotification">
<div className="datetime">2d</div>
<div className="dot">
<div className="notification">2</div>
</div>
        </div>
      </div>
    </>
  );
};

export default ContactCard;
