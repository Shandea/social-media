import React from 'react'
import RightMsg from './RightMsg'
import LeftMsg from './LeftMsg'

const MessageContent = ({ allMsg, authState, contact }) => {
    return (
        <>
            {/* {console.log("Msg Content", allMsg)} */}

            {allMsg.map((obj, i) => {
                // console.log("obj", obj)
                return (
                    <div key={i} id={i} >

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


        </>
    )
}

export default MessageContent