import React from "react";
import "./ContactCard.css";
import hacker6 from "../../../../imagess/hacker6.png"
import truncate from "../../../../util/truncate"
import { Link } from 'react-router-dom'
import { all } from "axios";
import convertDate from "../../../../util/convertDate"
const ContactCard = ({ item, contact, profile, allMsg, queryId, authState }) => {

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
              backgroundImage: `url("http://localhost:5000${img[0].profileImg}"), url("http://localhost:5000/public/default.jpeg")`,
              backgroundRepeat: "no-repeat",
              backgroundSize: 'cover'
            }}
          >
          </div>

          <div className="nameandmessage">
            <div className="contactcardname">{item.senderName}</div>

            {/* {console.warn("ALLMSGS", allMsg.filter((item) => item.queryId === queryId))} */}
            {/* {allMsg[1].sender === authState.user.userId ?(<p>sent user</p>):(null)} */}
            {/* {console.warn("contact", item.filter((user) => user.senderName === authState.user.username))} */}
            {/* {console.warn("item", item, authState.user.username)} */}


            <div className="contactcardmessage">

              {item.fromUser == authState.user.username ?
                (
                  <p><em>
                    you:

                  </em>
                    <span style={{ marginLeft: "5px" }}>

                      {truncate(item.recent).length ?  truncate(item.recent) : "no messages"}
                    </span>
                  </p>
                )

                :

                (
                  <p>

                    {truncate(item.recent).length ? truncate(item.recent) : "no messages"}

                  </p>
                )
              }
            </div>

          </div>
          <div className="datetimenotification">
            <div className="datetime">{convertDate(item.createdAt)}</div>
            <div className="dot">
              <div className="notification">

                <p>

                  {item.messageCount}

                </p>

              </div>
            </div>
          </div>
        </div >
      </Link>
    </>
  );
};

export default ContactCard;
