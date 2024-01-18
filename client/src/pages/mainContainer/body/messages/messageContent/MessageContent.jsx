import RightMsg from './RightMsg'
import LeftMsg from './LeftMsg'
import React, {useEffect, useRef} from 'react'

const MessageContent = ({ allMsg, authState, contact }) => {
    const messagesEndRef = useRef(null)

    useEffect(() => {
       if(messagesEndRef.current){

           messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
       }
      },[]);

    return (
        <>
            {/* {console.log("Msg Content", allMsg)} */}
<div></div>
            {allMsg.map((obj, i) => {
                // console.log("obj", obj)
                return (
                    <>
                    <div key={i} id={i}>

                        {obj.senderName == authState.user.username ? (
                            // <p>am i here</p>
                            <LeftMsg obj={obj} authState={authState} />
                        ) : (
                            <RightMsg obj={obj} authState={authState} contact={contact} />
                        )
                        }

                    </div>

                </>
                )
            })}

            <div id="chat" ref={messagesEndRef}></div>

        </>
    )
}

export default MessageContent