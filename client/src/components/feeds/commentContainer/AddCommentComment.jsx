
import React, { useState } from 'react'

import axios from 'axios'

import { connect } from "react-redux"

const AddCommentComment = ({ authState, obj, item, handleSetFeeds }) => {


    const [addComment, setAddComment] = useState({
        content: ""
    })


    const handleChange = (e) => {

        setAddComment(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
            authorId: authState.user.userId,   /// ID of comment writer
            authorName: authState.user.username, // Name of comment Writer
            likes: 0,                            // Starting Likes
            OgFeed: item.OgFeed,                  // OG feed for notifications
            parentAuthorName: item.authorName,        // Parent Doc Author for notification
            parentAuthorId: item.author,
            parentDoc: item._id,
            authorImg: authState.userProfile.profileImg,  /// MAKE REF to user for most recent img




        }))

    }

    const handleAddComment = (e) => {
        // console.log("submiting", addComment)
        axios({
            method: "POST",
            url: "http://localhost:5000/api/addCommentComment",
            data: addComment,
            withCredentials: true,
        }).then(res => handleSetFeeds)
        handleSetFeeds()
        setAddComment(prev => ({
            prev: ""
        }))
    }




    return (

        <div className='addcomment'>
            {/* {console.warn("COM COM COM Item  ====>", item, "OBJ", obj)} */}

            {/* {console.log("addComment sTATE ==> ", addComment, authState.user)} */}
            <div className='userimg'

                style={{
                    // border: 'solid black 2px',
                    display: 'flex',
                    justifyContent: 'center',
                    height: '25px',
                    width: '25px',
                    borderRadius: '25px',
                    backgroundImage: `url("http://localhost:5000${authState?.userProfile?.profileImg}"), url("http://localhost:5000/public/default.jpeg")`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: 'cover'
                }}

            >

            </div>

            <input
                type="text"
                value={addComment.content || ""}
                name="content"
                className='input1'
                placeholder='  Write a comment...'
                onChange={(e) => handleChange(e)}

            />


            <input
                onClick={(e) => handleAddComment(e)}
                type="submit"></input>

        </div>




    )
}

const mapStateToProps = (state) => {
    return {
        authState: state.auth
    }
}
export default connect(mapStateToProps, null)(AddCommentComment)
