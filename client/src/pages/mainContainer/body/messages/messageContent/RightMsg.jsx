import React from 'react'

const RightMsg = ({obj, contact}) => {
    return (

        <>
           <div className="messagemiddleright">
                <div className="usermessage">{obj.messageContent}</div>
                <div className="contactpic"
                 style={{
                    backgroundImage: `url("http://localhost:5000${contact.profileImg}"), url("http://localhost:5000/public/default.jpeg")`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: 'cover'
                  }}
                
                
                ></div>
            </div>
        </>
    )
}

export default RightMsg