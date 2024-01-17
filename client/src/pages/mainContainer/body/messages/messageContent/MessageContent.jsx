import React from 'react'
import RightMsg from './RightMsg'
import LeftMsg from './LeftMsg'


const MessageContent = ({ allMsg, authState, contact }) => {
    return (
        <>
            {console.log("Msg Content", allMsg)}

            {allMsg.map((obj, i) => {
                // console.log("obj", obj)
                return (
                    <div key={i} id={i}>

                        {obj.senderName == authState.user.username ? (
                            // <p>am i here</p>
                            <LeftMsg obj={obj} authState={authState} />
                        ) : (
                            <RightMsg obj={obj} authState={authState} contact={contact} />
                        )
                        }



                    </div>




                )
            })}
            {/* <div className="messagerightmiddle">
                <div className="messagemiddleleft">
                    <div className="contactpic"></div>
                    <div className="contactmessage">This is an example message you will receive form your contact</div>
                </div> */}



{/* 
            <div className="messagemiddleright">
                <div className="usermessage">This is an exsample of the message you send to your contact</div>
                <div className="contactpic"></div>
            </div> */}

        </>)
}

export default MessageContent