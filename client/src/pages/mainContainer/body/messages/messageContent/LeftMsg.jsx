import React from 'react'

const LeftMsg = ({ obj, authState }) => {

    return (
        <>

        {/* {console.log("Left", obj)} */}
            <div className="messagemiddleleft">
                <div className="contactpic"
                 style={{
                    backgroundImage: `url("http://localhost:5000${authState.userProfile.profileImg}"), url("http://localhost:5000/public/default.jpeg")`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: 'cover'
                  }}
                ></div>
                
                <div className="contactmessage">{obj.messageContent}</div>
            </div>


        </>
    )
}

export default LeftMsg