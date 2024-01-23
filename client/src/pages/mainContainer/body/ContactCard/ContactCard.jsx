import React from "react";
import "./ContactCard.css";
import hacker6 from "../../../../imagess/hacker6.png"
import truncate from "../../../../util/truncate"
import { Link } from 'react-router-dom'
import { all } from "axios";
import convertDate from "../../../../util/convertDate"


const ContactCard = ({ item, contact, profile, allMsg, queryId, authState }) => {
  const img = profile.filter((obj) => obj.userId === item.userId)

  return (
    <>
 {/* {console.log("item", item)} */}
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
