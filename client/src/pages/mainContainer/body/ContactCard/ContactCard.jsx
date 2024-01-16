import React from "react";
import "./ContactCard.css";
import hacker6 from "../../../../imagess/hacker6.png"
import truncate from "../../../../util/truncate"
import { Link } from 'react-router-dom'

const ContactCard = ({ item, contact }) => {
  return (
    <>
      {console.log("contact card item", item)}

      {console.log("contact card contact", contact)}

      <Link to={`/messages/${item.userId}`}>

        <div className="contactcardcontainer">
          <div className="contactimage">

            <img src={hacker6} alt="contact image" className="ci" />

          </div>

          <div className="nameandmessage">
            <div className="contactcardname">{item.senderName}</div>

            <div className="contactcardmessage">
              {truncate(item.recent)}
            </div>
            
          </div>
          <div className="datetimenotification">
            <div className="datetime">2d</div>
            <div className="dot">
              <div className="notification">2</div>
            </div>
          </div>
        </div >
      </Link>
    </>
  );
};

export default ContactCard;
