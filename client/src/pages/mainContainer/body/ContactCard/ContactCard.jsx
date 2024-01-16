import React from "react";
import "./ContactCard.css";
import hacker6 from "../../../../imagess/hacker6.png"
import truncate from "../../../../util/truncate"
import { Link } from 'react-router-dom'

const ContactCard = ({ item, contact, profile, allMsg, queryId }) => {

  const img = profile.filter((obj) => obj.userId === item.userId)
  let test = profile.filter((msg) => msg.queryId === queryId).sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))

  // let recent
  // let recentMsg
  // if (allMsg) {

  //   recent = allMsg.filter((msg) => msg.queryId === queryId).sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
  // } if (recent.length) {
  //   recentMsg = recent[0].messageContent
  // }

  return (
    <>
      {/* {console.log("contact card item", item)} */}
      {/* {console.log("img", img)} */}
      {/* {console.log("contact card contact", contact)} */}
      {console.log("contact card profile", profile)}
      {console.log("allmsg", allMsg)}
      {/* {console.log("recent", recent[0]?.messageContent)} */}
      {/* {console.log("recentMSG ====>", recentMsg)} */}
      {console.log("queryId", queryId)}
      {console.log("tet", test)}

      {/* {console.log("recent", recent[0].messageContent)} */}
      {/* {console.log("filterImg", profile.filter((obj) => obj.userId === item.userId))} */}

      {/* {console.log("recent", allMsg.filter((msg) => msg.queryId === queryId).sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)))} */}


      <Link to={`/messages/${item.userId}`}>

        <div className="contactcardcontainer">
          <div className="ci"
            style={{
              // backgroundImage: `url("http://localhost:5000${contact?.profileImg}"), url("http://localhost:5000/public/default.jpeg")`,
              backgroundImage: `url("http://localhost:5000${img[0].profileImg}"), url("http://localhost:5000/public/default.jpeg")`,
              backgroundRepeat: "no-repeat",
              backgroundSize: 'cover'
            }}
          >
            {/* <img src={hacker6} alt="contact image" className="ci" /> */}

          </div>

          <div className="nameandmessage">
            <div className="contactcardname">{item.senderName}</div>

            <div className="contactcardmessage">
              {truncate(item.recent).length ? truncate(item.recent) : "no messages"}
              {/* {test[0] && truncate(test[0].messageContent).length ? truncate(test[0].messageContent) : "no messages"} */}
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
